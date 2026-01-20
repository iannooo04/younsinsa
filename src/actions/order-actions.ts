'use server'
// Force revalidation

import prisma from "@/lib/prisma";
import { OrderStatus, Prisma } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export type GetOrdersParams = {
  page?: number;
  limit?: number;
  status?: OrderStatus | OrderStatus[] | 'ALL'; // Specific status, array of statuses, or ALL
  startDate?: string;
  endDate?: string;
  keyword?: string;
  searchType?: string; // 'order_no', 'orderer_name', 'orderer_mobile', 'product_name'
  mallId?: string; // 'KR', 'CN'
  tab?: string; // To handle specific logic per tab if needed
}

export async function getOrdersAction(params: GetOrdersParams) {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      startDate, 
      endDate, 
      keyword, 
      searchType,
      mallId,
      tab
    } = params;

    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {};

    // Filter by Status based on Tab or direct status
    if (tab) {
        switch (tab) {
            case "주문통합리스트":
                // No specific status filter for all
                break;
            case "입금대기 리스트":
                where.status = OrderStatus.DEPOSIT_WAIT;
                break;
            case "결제완료 리스트":
                where.status = OrderStatus.PAYMENT_COMPLETE;
                break;
            case "상품준비중 리스트":
                where.status = OrderStatus.PREPARING;
                break;
            case "배송중 리스트":
                where.status = OrderStatus.SHIPPING;
                break;
            case "배송완료 리스트":
                where.status = OrderStatus.DELIVERED;
                break;
            case "구매확정 리스트":
                where.status = OrderStatus.PURCHASE_CONFIRM;
                break;
            // ... other tabs if needed
        }
    } 
    
    // If explicit status is passed (overriding tab or for detail search)
    if (status && status !== 'ALL') {
        if (Array.isArray(status)) {
            where.status = { in: status };
        } else {
            where.status = status;
        }
    }

    // Date Filter
    if (startDate && endDate) {
        // Assuming filtering by createdAt or custom field like orderDate if it existed.
        // Schema has createdAt.
        where.createdAt = {
            gte: new Date(startDate),
            lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
        };
    }

    // Mall ID
    if (mallId && mallId !== 'all') {
        where.mallId = mallId.toUpperCase();
    }

    // Keyword Search
    if (keyword) {
        if (searchType === 'order_no') {
            where.orderNo = { contains: keyword };
        } else if (searchType === 'orderer_name') {
            where.ordererName = { contains: keyword };
        } else if (searchType === 'recipient_name') {
            where.recipientName = { contains: keyword };
        } else if (searchType === 'orderer_mobile') {
            where.ordererMobile = { contains: keyword };
        } else if (searchType === 'product_name') {
            where.items = {
                some: {
                    productName: { contains: keyword }
                }
            };
        } else {
             // Default search all fields if type not specified or 'all'
            where.OR = [
                { orderNo: { contains: keyword } },
                { ordererName: { contains: keyword } },
                { recipientName: { contains: keyword } },
                { ordererMobile: { contains: keyword } }
            ];
        }
    }

    const [total, items] = await prisma.$transaction([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true, 
          user: true,
          claims: true
        }
      })
    ]);

    return {
      success: true,
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };

  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}

// --- Invoice Bulk Upload Actions ---

type InvoiceUploadItem = {
    orderNo: string;
    productOrderNo?: string; // Optional if matching by orderNo
    deliveryCompany: string;
    trackingNumber: string;
    shippedDate?: string; // YYYY-MM-DD
    deliveryCompleteDate?: string; // YYYY-MM-DD
};


type FailureDetail = {
    row: number;
    orderNo: string;
    reason: string;
};

export async function uploadInvoiceExcelAction(data: InvoiceUploadItem[], registrant: string = "Admin") {
    try {
        let successCount = 0;
        let failCount = 0;
        const failureDetails: FailureDetail[] = [];

        for (const [index, item] of data.entries()) {
            try {
                // Find Order
                const order = await prisma.order.findUnique({
                    where: { orderNo: item.orderNo },
                });

                if (!order) {
                    throw new Error("주문번호를 찾을 수 없습니다.");
                }

                // Determine Status
                let newStatus = order.status;
                if (item.deliveryCompleteDate) {
                    newStatus = OrderStatus.DELIVERED;
                } else if (item.trackingNumber) {
                    newStatus = OrderStatus.SHIPPING;
                }

                // Update Order Items
                await prisma.orderItem.updateMany({
                    where: { orderId: order.id },
                    data: {
                        deliveryCompany: item.deliveryCompany,
                        trackingNumber: item.trackingNumber,
                        status: newStatus
                    }
                });

                // Update Order Status
                await prisma.order.update({
                    where: { id: order.id },
                    data: {
                        status: newStatus,
                        shippedAt: newStatus === OrderStatus.SHIPPING ? new Date() : undefined,
                        deliveredAt: newStatus === OrderStatus.DELIVERED ? new Date() : undefined,
                    }
                });

                successCount++;

            } catch (err) {
                failCount++;
                const message = err instanceof Error ? err.message : "Unknown error";
                failureDetails.push({
                    row: index + 1, 
                    orderNo: item.orderNo,
                    reason: message
                });
            }
        }

        // Create Log
        await prisma.invoiceUploadLog.create({
            data: {
                registrant,
                totalCount: data.length,
                successCount,
                failCount,
                failureDetails: failureDetails
            }
        });

        revalidatePath("/admin/orders/invoice-bulk");
        return { success: true, successCount, failCount, failureDetails };

    } catch (error) {
        console.error("uploadInvoiceExcelAction error:", error);
        return { success: false, error: "엑셀 업로드 처리에 실패했습니다." };
    }
}

export async function getInvoiceUploadHistoryAction(params?: { page?: number; limit?: number }) {
    try {
        const page = params?.page || 1;
        const limit = params?.limit || 20;
        const skip = (page - 1) * limit;

        const [total, items] = await prisma.$transaction([
            prisma.invoiceUploadLog.count(),
            prisma.invoiceUploadLog.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            })
        ]);

        return {
            success: true,
            items,
            total,
            totalPages: Math.ceil(total / limit)
        };

    } catch (error) {
        console.error("getInvoiceUploadHistoryAction error:", error);
        return { success: false, error: "이력을 불러오는데 실패했습니다." };
    }
}

// --- Order Delete History Actions ---

export async function createOrderDeleteRequestAction(registrant: string = "Admin") {
    try {
        // Calculate date 5 years ago
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
        
        // Find orders older than 5 years
        const ordersToDelete = await prisma.order.findMany({
            where: {
                createdAt: {
                    lte: fiveYearsAgo
                }
            },
            select: { id: true }
        });

        if (ordersToDelete.length === 0) {
           return { success: false, error: "삭제 대상 주문(5년 경과)이 없습니다." };
        }

        const targetOrderIds = ordersToDelete.map(o => o.id);

        await prisma.orderDeleteRequest.create({
            data: {
                totalCount: targetOrderIds.length,
                createdBy: registrant,
                targetOrderIds: targetOrderIds,
                status: "PENDING"
            }
        });

        revalidatePath("/admin/orders/delete-history");
        return { success: true, count: targetOrderIds.length };

    } catch (error) {
        console.error("createOrderDeleteRequestAction error:", error);
        return { success: false, error: "삭제 주문 내역 생성에 실패했습니다." };
    }
}

export async function getOrderDeleteRequestsAction(params?: { page?: number; limit?: number }) {
    try {
        const page = params?.page || 1;
        const limit = params?.limit || 20;
        const skip = (page - 1) * limit;

        const [total, items] = await prisma.$transaction([
            prisma.orderDeleteRequest.count(),
            prisma.orderDeleteRequest.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            })
        ]);

        return {
            success: true,
            items,
            total,
            totalPages: Math.ceil(total / limit)
        };

    } catch (error) {
        console.error("getOrderDeleteRequestsAction error:", error);
        return { success: false, error: "목록을 불러오는데 실패했습니다." };
    }
}

export async function executeOrderDeleteAction(requestId: string, processor: string = "Admin") {
    try {
        const request = await prisma.orderDeleteRequest.findUnique({
            where: { id: requestId }
        });

        if (!request) {
            return { success: false, error: "요청을 찾을 수 없습니다." };
        }

        if (request.status !== "PENDING") {
             return { success: false, error: "이미 처리되었거나 만료된 요청입니다." };
        }

        // Check 24 hours expiry
        const now = new Date();
        const created = new Date(request.createdAt);
        const diffHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
        
        if (diffHours > 24) {
             return { success: false, error: "생성 후 24시간이 경과하여 삭제할 수 없습니다. 다시 생성해주세요." };
        }

        // Execute Delete
        await prisma.$transaction([
            prisma.order.deleteMany({
                where: {
                    id: { in: request.targetOrderIds }
                }
            }),
            prisma.orderDeleteRequest.update({
                where: { id: requestId },
                data: {
                    status: "COMPLETED",
                    processedBy: processor,
                    deletedAt: new Date()
                }
            })
        ]);

        revalidatePath("/admin/orders/delete-history");
        return { success: true };

    } catch (error) {
        console.error("executeOrderDeleteAction error:", error);
        return { success: false, error: "주문 삭제 처리에 실패했습니다." };
    }
}
