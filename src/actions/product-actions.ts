"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DisplayStatus, ProductImageType, Prisma } from "@/generated/prisma";
import * as XLSX from "xlsx";
import { join } from "path";
import { writeFile } from "fs/promises";

// Helper: Save Image
async function saveImage(file: File): Promise<string | null> {
    if (!file || file.size === 0) return null;

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        // Simple unique filename: timestamp-random.ext
        const ext = file.name.split('.').pop() || 'jpg';
        const filename = `${Date.now()}-${Math.round(Math.random() * 10000)}.${ext}`;
        const uploadDir = join(process.cwd(), "public/uploads");
        const filepath = join(uploadDir, filename);

        await writeFile(filepath, buffer);
        return `/uploads/${filename}`;
    } catch (error) {
        console.error("Error saving image:", error);
        return null;
    }
}

// --- Create Product (Existing) ---
export async function createProductAction(prevState: unknown, formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    
    // 1. Basic Data parsing
    const name = rawFormData.name as string;
    const price = parseInt(rawFormData.price as string) || 0;
    const supplyPrice = parseInt(rawFormData.supplyPrice as string) || 0;
    const consumerPrice = parseInt(rawFormData.consumerPrice as string) || 0;
    const stockQuantity = parseInt(rawFormData.stockQuantity as string) || 0;
    const categoryId = rawFormData.categoryId as string;
    
    // Status mapping
    const displayStatusPC = rawFormData.pc_display === '노출함' ? DisplayStatus.DISPLAY : DisplayStatus.HIDDEN;
    const displayStatusMobile = rawFormData.mobile_display === '노출함' ? DisplayStatus.DISPLAY : DisplayStatus.HIDDEN;
    
    // Simple mock code generation
    const code = "P" + Date.now().toString().slice(-8);

    try {
        // Handle Images
        const imageFiles = formData.getAll('images') as File[];
        const uploadedImages: string[] = [];
        
        // Handle Main Image (thumbnail) using 'images' input for now or separate 'mainImage'
        // Assuming current form might use 'images' for multiple files
        // We need to clarify how the form sends images.
        // If ProductForm uses <input type="file" name="images" multiple />
        
        for (const file of imageFiles) {
            const path = await saveImage(file);
            if (path) uploadedImages.push(path);
        }

        const product = await prisma.product.create({
            data: {
                name,
                price,
                supplyPrice,
                consumerPrice,
                stockQuantity,
                code,
                categoryId,
                displayStatusPC,
                displayStatusMobile,
                // Default values for required fields not yet in form
                weight: 0,
                volume: 0,
                mileageConfigType: 'INTEGRATED',
                discountConfigType: 'Use',
                accessAuth: 'ALL',
                returnFee: 3000,
                exchangeFee: 6000,
            }
        });

        // Save Images to ProductImage table
        if (uploadedImages.length > 0) {
            await prisma.productImage.createMany({
                data: uploadedImages.map((url, index) => ({
                    productId: product.id,
                    url: url,
                    type: index === 0 ? ProductImageType.MAIN : ProductImageType.ADDITIONAL,
                    order: index
                }))
            });
        }

        revalidatePath('/admin/products');
        return { success: true, message: "상품이 등록되었습니다." };
    } catch (e) {
        console.error(e);
        return { success: false, message: "상품 등록에 실패했습니다." };
    }
}

export async function updateProductAction(prevState: unknown, formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const id = rawFormData.id as string;
    
    if (!id) return { success: false, message: "상품 ID가 없습니다." };

    // 1. Basic Data parsing
    const name = rawFormData.name as string;
    const price = parseInt(rawFormData.price as string) || 0;
    const supplyPrice = parseInt(rawFormData.supplyPrice as string) || 0;
    const consumerPrice = parseInt(rawFormData.consumerPrice as string) || 0;
    const stockQuantity = parseInt(rawFormData.stockQuantity as string) || 0;
    const categoryId = rawFormData.categoryId as string;
    
    // Status mapping
    const displayStatusPC = rawFormData.pc_display === '노출함' ? DisplayStatus.DISPLAY : DisplayStatus.HIDDEN;
    const displayStatusMobile = rawFormData.mobile_display === '노출함' ? DisplayStatus.DISPLAY : DisplayStatus.HIDDEN;

    try {
        const imageFiles = formData.getAll('images') as File[];
        
        await prisma.product.update({
            where: { id },
            data: {
                name,
                price,
                supplyPrice,
                consumerPrice,
                stockQuantity,
                categoryId,
                displayStatusPC,
                displayStatusMobile,
            }
        });

        // If new images are uploaded, add them
        // Note: Real logic might need to handle deletions or reordering. 
        // For now, we append new images.
        if (imageFiles.length > 0) {
             const uploadedImages: string[] = [];
             for (const file of imageFiles) {
                const path = await saveImage(file);
                if (path) uploadedImages.push(path);
            }
            
            if (uploadedImages.length > 0) {
                // Get current max order
                const maxOrderObj = await prisma.productImage.findFirst({
                    where: { productId: id },
                    orderBy: { order: 'desc' }
                });
                const nextOrder = (maxOrderObj?.order ?? -1) + 1;

                await prisma.productImage.createMany({
                    data: uploadedImages.map((url, index) => ({
                        productId: id,
                        url: url,
                        type: ProductImageType.ADDITIONAL, // Appended images are additional by default
                        order: nextOrder + index
                    }))
                });
            }
        }

        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/edit/${id}`);
        return { success: true, message: "상품이 수정되었습니다." };
    } catch (e) {
        console.error(e);
        return { success: false, message: "상품 수정에 실패했습니다." };
    }
}


// --- Fetch Products ---
export async function getProductsAction(
    page: number = 1,
    pageSize: number = 10,
    searchParams?: {
        supplierType?: string;
        searchType?: string;
        keyword?: string;
        startDate?: string;
        endDate?: string;
        dateType?: string; // 'regDate' | 'delDate'
        isDeleted?: boolean;
        categoryId?: string; // Added categoryId
    }
) {
    try {
        const where: Prisma.ProductWhereInput = {
            deletedAt: searchParams?.isDeleted ? { not: null } : null
        };

        // Category filter
        if (searchParams?.categoryId) {
            // Include children categories if needed, but for now exact match or startsWith for hierarchical code
            // Assuming categoryId is the ID. If it's a code, we might need logic.
            // Let's assume exact match on categoryId for now.
            where.categoryId = searchParams.categoryId;
        }

        // Keyword filter
        if (searchParams?.keyword) {
            if (searchParams.searchType === 'productCode') {
                where.code = { contains: searchParams.keyword, mode: 'insensitive' };
            } else {
                where.name = { contains: searchParams.keyword, mode: 'insensitive' };
            }
        }

        // Date filter
        if (searchParams?.startDate && searchParams?.endDate) {
            const start = new Date(searchParams.startDate);
            const end = new Date(searchParams.endDate);
            end.setHours(23, 59, 59, 999);
            
            if (searchParams.isDeleted && searchParams.dateType === 'delDate') {
                where.deletedAt = { gte: start, lte: end };
            } else if (searchParams.dateType === 'modDate') {
                where.updatedAt = { gte: start, lte: end };
            } else {
                where.createdAt = { gte: start, lte: end };
            }
        }

        const totalCount = await prisma.product.count({ where });
        const items = await prisma.product.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                brand: true,
                supplier: true,
                shippingPolicy: true,
                images: true, // Include images
            }
        });

        // Format for frontend
        const products = items.map(item => {
            const mainImage = item.images.find(img => img.type === ProductImageType.MAIN) || item.images[0];
            return {
                id: item.id,
                productCode: item.code || '-',
                image: mainImage ? mainImage.url : null, // Use actual image URL
                name: item.name,
                supplier: item.supplier?.name || '본사',
                brand: item.brand?.name || '-',
                displayStatus: item.displayStatusPC === DisplayStatus.DISPLAY ? '노출함' : '노출안함',
                saleStatus: item.saleStatusPC === 'ON_SALE' ? '판매함' : '판매안함',
                stockStatus: item.stockQuantity > 0 ? '정상' : '품절',
                stock: item.stockType === 'LIMITLESS' ? '∞' : item.stockQuantity.toString(),
                price: item.price,
                shippingFee: item.shippingPolicy ? item.shippingPolicy.name : (item.shippingFee > 0 ? `${item.shippingFee.toLocaleString()}원` : '무료/미설정'),
                createdAt: item.createdAt,
                deletedAt: item.deletedAt,
            };
        });

        return { success: true, items: products, totalCount };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { success: false, items: [], totalCount: 0 };
    }
}

// --- Fetch Public Products (Frontend) ---
export async function getPublicProductsAction(
    page: number = 1,
    pageSize: number = 20,
    sort: 'newest' | 'priceAsc' | 'priceDesc' | 'name' = 'newest',
    filters?: {
        categoryId?: string;
        keyword?: string;
        gender?: 'M' | 'W' | 'A';
        isBest?: boolean;
        isNew?: boolean;
    }
) {
    try {
        const where: Prisma.ProductWhereInput = {
            deletedAt: null,
            displayStatusPC: DisplayStatus.DISPLAY, // Only show displayed products
            // displayStatusMobile: DisplayStatus.DISPLAY, // Generally we check one or logic depending on device, but for simplicity check PC or both.
        };

        if (filters?.categoryId) {
            where.categoryId = filters.categoryId;
        }

        if (filters?.keyword) {
             where.name = { contains: filters.keyword, mode: 'insensitive' };
        }

        if (filters?.gender && filters.gender !== 'A') {
            const genderValue = filters.gender === 'M' ? 'MEN' : 'WOMEN';
            where.gender = { in: [genderValue as "MEN" | "WOMEN" | "UNISEX", 'UNISEX'] };
        }

        // Sorting
        let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
        if (sort === 'priceAsc') orderBy = { price: 'asc' };
        else if (sort === 'priceDesc') orderBy = { price: 'desc' };
        else if (sort === 'name') orderBy = { name: 'asc' };

        const totalCount = await prisma.product.count({ where });
        const items = await prisma.product.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy,
            include: {
                category: true,
                brand: true,
                images: {
                    orderBy: { order: 'asc' },
                    take: 1 // Optimize: only need main image usually
                },
            }
        });

        // Format
        const products = items.map(item => {
            const mainImage = item.images[0];
            return {
                id: item.id,
                name: item.name,
                image: mainImage ? mainImage.url : '/placeholder.png',
                price: item.price,
                consumerPrice: item.consumerPrice,
                discountRate: item.consumerPrice > item.price 
                    ? Math.round(((item.consumerPrice - item.price) / item.consumerPrice) * 100) 
                    : 0,
                isSoldOut: item.stockQuantity <= 0,
                brandName: item.brand?.name,
            };
        });

        return { success: true, items: products, totalCount };
    } catch (error) {
        console.error("Error fetching public products:", error);
        return { success: false, items: [], totalCount: 0 };
    }
}

export async function getPublicProductDetailAction(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                brand: true,
                images: {
                    orderBy: { order: 'asc' }
                },
                options: {
                    include: { values: true }
                },
                variants: {
                    include: {
                        optionValues: true
                    }
                }
            }
        });

        if (!product) return { success: false, product: null };

        // Logic to check display status? 
        // If strict public, we should check displayStatusPC === 'DISPLAY'
        if (product.displayStatusPC !== DisplayStatus.DISPLAY) {
             return { success: false, product: null, message: "판매 중인 상품이 아닙니다." };
        }

        // Format for frontend
        const formatted = {
            id: product.id,
            name: product.name,
            price: product.price,
            consumerPrice: product.consumerPrice,
            description: product.descriptionPC,
            images: product.images.map(img => img.url),
            brandName: product.brand?.name || '',
            options: product.options.map(opt => ({
                id: opt.id,
                name: opt.name,
                values: opt.values.map(val => ({
                    id: val.id,
                    name: val.name
                }))
            })),
            variants: product.variants.map(v => ({
                id: v.id,
                price: v.price || product.price, // Override or default
                stock: v.stock,
                optionValues: v.optionValues.map(ov => ov.id) // Client needs to match this with selected values
            }))
        };

        return { success: true, product: formatted };
    } catch (error) {
        console.error("Error fetching public product detail:", error);
        return { success: false, product: null };
    }
}


export async function getProductAction(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                brand: true,
                supplier: true,
                shippingPolicy: true,
                images: {
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!product) return { success: false, product: null };

        // Format
         const formatted = {
            id: product.id,
            productCode: product.code || '-',
            images: product.images.map(img => img.url),
            name: product.name,
            supplier: product.supplier?.name || '본사',
            brand: product.brand?.name || '-',
            displayStatus: product.displayStatusPC === DisplayStatus.DISPLAY ? '노출함' : '노출안함',
            saleStatus: product.saleStatusPC === 'ON_SALE' ? '판매함' : '판매안함',
            stockStatus: product.stockQuantity > 0 ? '정상' : '품절',
            stock: product.stockType === 'LIMITLESS' ? '∞' : product.stockQuantity.toString(),
            price: product.price,
            consumerPrice: product.consumerPrice,
            shippingFee: product.shippingPolicy ? product.shippingPolicy.name : (product.shippingFee > 0 ? `${product.shippingFee.toLocaleString()}원` : '무료/미설정'),
            description: product.descriptionPC,
            createdAt: product.createdAt,
            deletedAt: product.deletedAt,
        };

        return { success: true, product: formatted };
    } catch (error) {
        console.error("Error fetching product:", error);
        return { success: false, product: null };
    }
}

// --- Bulk Action: Delete (Soft Delete) ---
export async function deleteProductsAction(ids: string[]) {
    try {
        await prisma.product.updateMany({
            where: { id: { in: ids } },
            data: { deletedAt: new Date() }
        });
        revalidatePath('/admin/products');
        return { success: true, message: "선택한 상품이 삭제되었습니다." };
    } catch (error) {
        console.error("Error deleting products:", error);
        return { success: false, message: "삭제 중 오류가 발생했습니다." };
    }
}

// --- Bulk Action: Restore (Undo Soft Delete) ---
export async function restoreProductsAction(ids: string[]) {
    try {
        await prisma.product.updateMany({
            where: { id: { in: ids } },
            data: { deletedAt: null }
        });
        revalidatePath('/admin/products');
        return { success: true, message: "선택한 상품이 복구되었습니다." };
    } catch (error) {
        console.error("Error restoring products:", error);
        return { success: false, message: "복구 중 오류가 발생했습니다." };
    }
}

// --- Bulk Action: Permanent Delete ---
export async function permanentlyDeleteProductsAction(ids: string[]) {
    try {
        await prisma.product.deleteMany({
            where: { id: { in: ids } }
        });
        revalidatePath('/admin/products');
        return { success: true, message: "선택한 상품이 완전 삭제되었습니다." };
    } catch (error) {
        console.error("Error permanently deleting products:", error);
        return { success: false, message: "완전 삭제 중 오류가 발생했습니다." };
    }
}

// --- Bulk Action: Move Category ---
export async function moveProductsCategoryAction(ids: string[], newCategoryId: string) {
    try {
        await prisma.product.updateMany({
            where: { id: { in: ids } },
            data: { categoryId: newCategoryId }
        });
        revalidatePath('/admin/products');
        return { success: true, message: "선택한 상품의 카테고리가 이동되었습니다." };
    } catch (error) {
        console.error("Error moving products category:", error);
        return { success: false, message: "이동 중 오류가 발생했습니다." };
    }
}

// --- Bulk Action: Copy Products ---
export async function copyProductsAction(ids: string[], targetCategoryId?: string) {
    try {
        const products = await prisma.product.findMany({
            where: { id: { in: ids } }
        });

        for (const p of products) {
            // Generate new code
            const newCode = "P" + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
            
            // Exclude ID and unique fields
            // Exclude ID and unique fields
            const { id: _id, code: _code, createdAt: _createdAt, updatedAt: _updatedAt, ...productData } = p;

            // Handle JSON fields and ensure correct types for creation
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dataToCreate = { ...productData } as any;
            
            // JSON fields cannot be 'null' in CreateInput in some Prisma configurations; use undefined for nulls
            const jsonFields = [
                'extraCategories', 
                'mainDisplayPC', 
                'mainDisplayMobile', 
                'essentialInfo', 
                'kcCertifications', 
                'hsCode'
            ];

            jsonFields.forEach(field => {
                if (dataToCreate[field] === null) {
                    dataToCreate[field] = undefined;
                }
            });

            await prisma.product.create({
                data: {
                    ...dataToCreate,
                    categoryId: targetCategoryId || p.categoryId, // Use target or original
                    code: newCode,
                    name: `(복사) ${p.name}`,
                    deletedAt: null, // Ensure the copy is active
                }
            });
        }
        revalidatePath('/admin/products');
        return { success: true, message: "선택한 상품이 복사되었습니다." };
    } catch (error) {
        console.error("Error copying products:", error);
        return { success: false, message: "복사 중 오류가 발생했습니다." };
    }
}

// --- Bulk Action: Change Brand ---
export async function changeProductsBrandAction(ids: string[], newBrandId: string) {
    try {
        await prisma.product.updateMany({
            where: { id: { in: ids } },
            data: { brandId: newBrandId }
        });
        revalidatePath('/admin/products');
        return { success: true, message: "선택한 상품의 브랜드가 교체되었습니다." };
    } catch (error) {
        console.error("Error changing products brand:", error);
        return { success: false, message: "브랜드 교체 중 오류가 발생했습니다." };
    }
}

// --- Bulk Action: Release Connection (Set null) ---
export async function releaseProductsConnectionAction(ids: string[], target: 'category' | 'brand') {
    try {
        if (target === 'brand') {
            await prisma.product.updateMany({
                where: { id: { in: ids } },
                data: { brandId: null }
            });
        } else if (target === 'category') {
             // Caution: categoryId is usually required in schema. If it's nullable, this works.
             // Checking schema... categoryId String (Required). 
             // We cannot release category unless we have a 'Uncategorized' default or schema allows null.
             // Based on schema `categoryId String`, we CANNOT set it to null.
             // We return error or handled differently.
             return { success: false, message: "카테고리는 필수 항목이므로 해제할 수 없습니다." };
        }
        revalidatePath('/admin/products');
        return { success: true, message: "해제되었습니다." };
    } catch (error) {
        console.error("Error releasing connection:", error);
        return { success: false, message: "해제 중 오류가 발생했습니다." };
    }
}

// --- Fetch Categories (Simple List) ---
export async function getCategoriesSimpleAction() {
    try {
        const categories = await prisma.category.findMany({
            select: { id: true, name: true }
        });
        return categories;
    } catch {
        return [];
    }
}

// --- Fetch Brands (Simple List) ---
export async function getBrandsSimpleAction() {
    try {
        const brands = await prisma.brand.findMany({
            select: { id: true, name: true }
        });
        return brands;
    } catch {
        return [];
    }
}

export async function getProductsForExcelAction(params: {
    supplierType?: 'head' | 'supplier';
    supplierId?: string;
    range?: 'all' | 'partial';
    start?: number;
    count?: number;
}) {
    try {
        const where: Prisma.ProductWhereInput = {
            deletedAt: null
        };

        if (params.supplierType === 'head') {
            where.supplierId = null;
        } else if (params.supplierType === 'supplier' && params.supplierId) {
            where.supplierId = params.supplierId;
        }

        const skip = params.range === 'partial' ? (params.start ? params.start - 1 : 0) : undefined;
        const take = params.range === 'partial' ? (params.count || 100) : undefined;

        const items = await prisma.product.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                brand: true,
                supplier: true,
                shippingPolicy: true,
            }
        });

        return { success: true, items };
    } catch (error) {
        console.error("Excel Fetch Error:", error);
        return { success: false, items: [] };
    }
}

export async function uploadProductsExcelAction(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        const supplierId = formData.get("supplierId") as string | null;

        if (!file) return { success: false, message: "파일이 없습니다." };

        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // 엑셀 4번째 줄부터 데이터임 (0-indexed: 3)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 3 }) as any[][];

        if (jsonData.length === 0) return { success: false, message: "업로드할 데이터가 없습니다." };

        // 2번째 줄(header row)에서 필드명 추출을 위해 range: 1 사용
        const headerRow = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 1 })[0] as string[];
        
        let successCount = 0;
        let failCount = 0;

        for (const row of jsonData) {
            if (!row || row.length === 0) continue;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const productData: any = {
                supplierId: supplierId || null,
            };

            headerRow.forEach((field, index) => {
                const value = row[index];
                if (value === undefined || value === null) return;

                switch (field) {
                    case 'goods_name': productData.name = String(value); break;
                    case 'goods_price': productData.price = Number(value) || 0; break;
                    case 'fixed_price': productData.consumerPrice = Number(value) || 0; break;
                    case 'cost_price': productData.supplyPrice = Number(value) || 0; break;
                    case 'stock_cnt': productData.stockQuantity = Number(value) || 0; break;
                    case 'goods_cd': productData.customCode = String(value); break;
                    case 'category_code': 
                        // Simplified: assuming code is the ID or we'd need a lookup
                        // In real scenario, lookup category by code
                        productData.categoryId = String(value); 
                        break;
                    case 'brand_code':
                        // Lookup brand by code
                        productData.brandId = String(value);
                        break;
                    case 'short_desc': productData.shortDescription = String(value); break;
                    case 'goods_desc_pc': productData.descriptionPC = String(value); break;
                    case 'goods_desc_mobile': productData.descriptionMobile = String(value); break;
                    // Add more mappings as needed based on tableData
                }
            });

            // Basic validation
            if (!productData.name || !productData.categoryId) {
                failCount++;
                continue;
            }

            // Generate system code if not provided
            if (!productData.code) {
                productData.code = "P" + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
            }

            try {
                // Ensure required fields for Product model
                const finalData = {
                    ...productData,
                    price: productData.price || 0,
                    weight: productData.weight || 0,
                    volume: productData.volume || 0,
                };

                await prisma.product.create({ data: finalData });
                successCount++;
            } catch (err) {
                console.error("Row mapping/creation error:", err);
                failCount++;
            }
        }

        revalidatePath('/admin/products');
        return { success: true, message: `업로드 완료: 성공 ${successCount}건, 실패 ${failCount}건` };

    } catch (error) {
        console.error("Excel Upload Error:", error);
        return { success: false, message: "엑셀 처리 중 오류가 발생했습니다." };
    }
}
