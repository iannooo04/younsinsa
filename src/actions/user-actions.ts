'use server';

import { prisma } from '@/lib/prisma';
import { Prisma, MemberType, Gender, DateType, MaritalStatus } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

export type GetUsersParams = {
  page?: number;
  limit?: number;
  mallId?: string;
  searchType?: string; // id, name, email, nickname, mobile
  keyword?: string;
  exactMatch?: boolean;
  memberGrade?: string;
  memberType?: string; // all, personal, business
  approved?: string; // all, approved, pending
  startDate?: string;
  endDate?: string;
  dateSearchType?: string; // join_date
};

export async function getUsersAction(params: GetUsersParams) {
  try {
    const {
      page = 1,
      limit = 20
    } = params;

    const where = buildUserWhereClause(params);
    const skip = (page - 1) * limit;

    const [total, users] = await prisma.$transaction([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          info: {
            include: {
              grade: true,
              orders: {
                  where: { status: 'PURCHASE_CONFIRM' },
                  select: {
                      totalPayAmount: true
                  }
              }
            }
          }
        }
      })
    ]);

    // Calculate aggregates for display
    const usersWithStats = users.map(user => {
        const orders = user.info?.orders || [];
        const orderCount = orders.length;
        const totalOrderAmount = orders.reduce((acc, order) => acc + (order.totalPayAmount || 0), 0);
        return {
            ...user,
            orderCount,
            totalOrderAmount
        };
    });

    return {
      success: true,
      items: usersWithStats,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };

  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

// Actions for Withdrawal Management

export type GetWithdrawnUsersParams = {
    page?: number;
    limit?: number;
    mallId?: string;
    keyword?: string; // id only in UI, but keep generic
    withdrawalType?: string; // all, admin, user
    canRejoin?: string; // all, possible, impossible
    startDate?: string;
    endDate?: string;
    targetId?: string; // Search by ID
};

export async function getWithdrawnUsersAction(params: GetWithdrawnUsersParams) {
    try {
        const {
            page = 1,
            limit = 20,
            mallId,
            keyword,
            withdrawalType,
            canRejoin,
            startDate,
            endDate,
            targetId
        } = params;

        const where: Prisma.UserWhereInput = {};
        const infoWhere: Prisma.UserInfoWhereInput = { isWithdrawn: true };

        // Mall
        if (mallId && mallId !== 'all') {
            if (mallId === 'base') where.mallId = 'KR';
            else if (mallId === 'chinese') where.mallId = 'CN';
            else where.mallId = mallId;
        }

        // Search by ID/Keyword
        if (targetId) {
             where.username = targetId;
        } else if (keyword) {
             where.username = { contains: keyword, mode: 'insensitive' };
        }

        // Withdrawal Type
        if (withdrawalType && withdrawalType !== 'all') {
             if (withdrawalType === 'admin') infoWhere.withdrawalType = 'admin';
             else if (withdrawalType === 'user') infoWhere.withdrawalType = 'user';
        }

        // Rejoin
        if (canRejoin && canRejoin !== 'all') {
             infoWhere.canRejoin = (canRejoin === 'possible');
        }

        // Date (Withdrawal Date)
        if (startDate && endDate) {
            infoWhere.withdrawalDate = {
                gte: new Date(startDate),
                lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
            };
        }

        where.info = infoWhere;

        const skip = (page - 1) * limit;

        const [total, users] = await prisma.$transaction([
            prisma.user.count({ where }),
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { info: { withdrawalDate: 'desc' } }, // Sort by withdrawal date
                include: {
                    info: {
                        include: {
                             grade: true
                        }
                    }
                }
            })
        ]);

        return {
            success: true,
            items: users,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };

    } catch (error) {
        console.error("Error fetching withdrawn users:", error);
         return { success: false, error: "탈퇴 회원을 불러오는데 실패했습니다." };
    }
}

export async function deleteWithdrawnUsersAction(ids: string[]) {
    try {
        if (!ids || ids.length === 0) return { success: false, error: "선택된 회원이 없습니다." };
        
        await prisma.user.deleteMany({
            where: { id: { in: ids } }
        });

        revalidatePath("/admin/users/withdrawal-management");
        return { success: true };
    } catch (error) {
         console.error("Error deleting users:", error);
         return { success: false, error: "회원 삭제에 실패했습니다." };
    }
}

export async function restoreWithdrawnUsersAction(ids: string[]) {
    try {
        if (!ids || ids.length === 0) return { success: false, error: "선택된 회원이 없습니다." };

        await prisma.userInfo.updateMany({
            where: { userId: { in: ids } },
            data: {
                isWithdrawn: false,
                withdrawalDate: null,
                withdrawalType: null,
                withdrawalReason: null,
                withdrawalIp: null,
                processor: null
            }
        });

        revalidatePath("/admin/users/withdrawal-management");
        return { success: true };
    } catch (error) {
        console.error("Error restoring users:", error);
        return { success: false, error: "회원 복구에 실패했습니다." };
    }
}


export async function checkDuplicateAction(field: 'username' | 'email' | 'nickname', value: string) {
  try {
    const where: Prisma.UserWhereInput = {};
    if (field === 'username') where.username = value;
    else if (field === 'email') where.email = value;
    else if (field === 'nickname') where.nickname = value;

    const count = await prisma.user.count({ where });
    return { success: true, isDuplicate: count > 0 };
  } catch (error) {
    console.error(`Error checking duplicate ${field}:`, error);
    return { success: false, error: "Failed to check duplicate" };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createUserAction(data: Record<string, any>) {
  try {
    // 1. Validate Recommender if provided
    let recommenderId = null;
    if (data.recommenderId) {
       const recommender = await prisma.user.findUnique({
           where: { username: data.recommenderId }
       });
       if (!recommender) {
           return { success: false, error: "존재하지 않는 추천인 아이디입니다." };
       }
       recommenderId = recommender.id;
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Create User
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        passwordHash: hashedPassword,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        phone: data.phone,
        fax: data.fax,
        nickname: data.nickname,
        mallId: 'KR', // Default
        
        recommenderId: recommenderId,

        info: {
            create: {
                type: data.memberType as MemberType || MemberType.PERSONAL,
                gradeId: data.gradeId,
                isApproved: data.isApproved,
                
                zipcode: data.zipcode,
                address: data.address,
                addressDetail: data.addressDetail,
                
                emailConsent: data.emailConsent,
                emailConsentDate: data.emailConsent ? new Date() : null,
                smsConsent: data.smsConsent,
                smsConsentDate: data.smsConsent ? new Date() : null,
                
                job: data.job,
                interests: data.interests || [],
                
                gender: data.gender as Gender || Gender.NONE,
                birthday: data.birthday ? new Date(data.birthday) : null,
                birthdayType: data.birthdayType as DateType || DateType.SOLAR,
                
                maritalStatus: data.maritalStatus as MaritalStatus || MaritalStatus.SINGLE,
                anniversary: data.anniversary ? new Date(data.anniversary) : null,
                
                retentionPeriod: data.retentionPeriod || 'UNLIMITED',
                userMemo: data.userMemo,
            }
        },
        
        // Handle Business Info if type is BUSINESS
        ...(data.memberType === 'BUSINESS' && {
            businessInfo: {
                create: {
                    companyName: data.companyName,
                    ceoName: data.ceoName,
                    businessNumber: data.businessNumber,
                    category: data.businessCategory,
                    item: data.businessItem,
                    companyZipcode: data.companyZipcode,
                    companyAddress: data.companyAddress
                }
            }
        })
      }
    });

    return { success: true, userId: newUser.id };

  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
             return { success: false, error: "이미 존재하는 회원정보(아이디, 이메일 등)입니다." };
        }
    }
    return { success: false, error: "회원 등록에 실패했습니다." };
  }
}

export type UploadUsersResult = 
  | { success: true; count: number; failCount: number; errors: string[] }
  | { success: false; error: string };

export async function uploadUsersExcelAction(data: Record<string, string | number | boolean | null>[]): Promise<UploadUsersResult> {
  try {
    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (const row of data) {
        try {
            // Validation / Mapping
            const usernameRaw = row['mem_id'];
            if (!usernameRaw) {
                failCount++;
                errors.push(`Row missing username (mem_id)`);
                continue;
            }
            const username = String(usernameRaw);

            // Check if user exists
            const existing = await prisma.user.findUnique({ where: { username } });
            if (existing) {
                failCount++;
                errors.push(`User ${username} already exists`);
                continue;
            }

            // Password
            const passwordRaw = row['mem_password'] || '1234'; // Default if missing
            const hashedPassword = await bcrypt.hash(String(passwordRaw), 10);

            // Mapping Fields
            const name = String(row['mem_name'] || 'Unknown');
            const email = String(row['email'] || `${username}@example.com`);
            const mobile = String(row['cell_phone'] || row['mobile'] || '');
            const phone = String(row['phone'] || '');
            const fax = String(row['fax'] || '');
            const nickname = String(row['nick_name'] || username);
            
            // Approvals
            const isApproved = row['app_fl'] === 'y';
            const emailConsent = row['mailling_fl'] === 'y';
            const smsConsent = row['sms_fl'] === 'y';

            // Gender
            let gender: Gender = Gender.NONE;
            if (row['sex_fl'] === 'm') gender = Gender.MALE;
            else if (row['sex_fl'] === 'w') gender = Gender.FEMALE;

            // Birthday
            const birthday = (row['birth_dt'] && typeof row['birth_dt'] !== 'boolean') ? new Date(row['birth_dt']) : null;
            const birthdayType = row['calendar_fl'] === 'l' ? DateType.LUNAR : DateType.SOLAR;

            // Marital
            const maritalStatus = row['marri_fl'] === 'y' ? MaritalStatus.MARRIED : MaritalStatus.SINGLE;
            const anniversary = (row['marri_date'] && typeof row['marri_date'] !== 'boolean') ? new Date(row['marri_date']) : null;

            await prisma.user.create({
                data: {
                    username,
                    passwordHash: hashedPassword,
                    name,
                    email,
                    mobile,
                    phone,
                    fax,
                    nickname,
                    mallId: 'KR',
                    info: {
                        create: {
                            type: MemberType.PERSONAL,
                            isApproved,
                            gender,
                            birthday,
                            birthdayType,
                            emailConsent,
                            smsConsent,
                            maritalStatus,
                            anniversary,
                            zipcode: row['zonecode'] ? String(row['zonecode']) : null,
                            address: row['address'] ? String(row['address']) : null,
                            addressDetail: row['address_sub'] ? String(row['address_sub']) : null,
                            userMemo: row['memo'] ? String(row['memo']) : null,
                        }
                    },
                    ...(row['business_no'] && {
                        businessInfo: {
                            create: {
                                companyName: String(row['company'] || ''),
                                ceoName: String(row['ceo_name'] || ''),
                                businessNumber: String(row['business_no']),
                                item: row['item'] ? String(row['item']) : null,
                                category: row['service'] ? String(row['service']) : null,
                                companyZipcode: row['com_zonecode'] ? String(row['com_zonecode']) : null,
                                companyAddress: row['com_address'] ? String(row['com_address']) : null
                            }
                        }
                    })
                }
            });
            successCount++;

        } catch (e: unknown) {
            const error = e as Error;
            console.error(`Error importing row ${row['mem_id']}:`, error);
            failCount++;
            errors.push(`Error importing ${row['mem_id']}: ${error.message}`);
        }
    }

    return { 
        success: true, 
        count: successCount, 
        failCount, 
        errors: errors.slice(0, 10) 
    };

  } catch (error) {
    console.error("Critical error in uploadUsersExcelAction:", error);
    return { success: false, error: "System error during upload" };
  }
}

// Helper to build where clause
function buildUserWhereClause(params: GetUsersParams): Prisma.UserWhereInput {
    const {
      mallId,
      searchType,
      keyword,
      exactMatch,
      memberGrade,
      memberType,
      approved,
      startDate,
      endDate
    } = params;

    const where: Prisma.UserWhereInput = {};

    // Mall ID Filter
    if (mallId && mallId !== 'all') {
      if (mallId === 'base') where.mallId = 'KR';
      else if (mallId === 'chinese') where.mallId = 'CN';
      else where.mallId = mallId;
    }

    // Keyword Search
    if (keyword) {
      if (exactMatch) {
          if (searchType === 'id') where.username = keyword;
          else if (searchType === 'name') where.name = keyword;
          else if (searchType === 'email') where.email = keyword;
          else if (searchType === 'nickname') where.nickname = keyword;
          else if (searchType === 'mobile') where.mobile = keyword;
          else {
              where.OR = [
                  { username: keyword },
                  { name: keyword },
                  { email: keyword },
                  { nickname: keyword },
                  { mobile: keyword }
              ];
          }
      } else {
         if (searchType === 'id') where.username = { contains: keyword, mode: 'insensitive' };
          else if (searchType === 'name') where.name = { contains: keyword, mode: 'insensitive' };
          else if (searchType === 'email') where.email = { contains: keyword, mode: 'insensitive' };
          else if (searchType === 'nickname') where.nickname = { contains: keyword, mode: 'insensitive' };
          else if (searchType === 'mobile') where.mobile = { contains: keyword, mode: 'insensitive' };
          else {
              where.OR = [
                  { username: { contains: keyword, mode: 'insensitive' } },
                  { name: { contains: keyword, mode: 'insensitive' } },
                  { email: { contains: keyword, mode: 'insensitive' } },
                  { nickname: { contains: keyword, mode: 'insensitive' } },
                  { mobile: { contains: keyword, mode: 'insensitive' } }
              ];
          }
      }
    }

    const infoWhere: Prisma.UserInfoWhereInput = {};
    let hasInfoFilter = false;

    if (memberType && memberType !== 'all') {
        if (memberType === 'personal') {
            infoWhere.type = MemberType.PERSONAL;
            hasInfoFilter = true;
        } else if (memberType === 'business') {
            infoWhere.type = MemberType.BUSINESS;
            hasInfoFilter = true;
        }
    }

    if (approved && approved !== 'all') {
        infoWhere.isApproved = (approved === 'approved');
        hasInfoFilter = true;
    }

    if (memberGrade && memberGrade !== 'grade') {
        infoWhere.gradeId = memberGrade;
        hasInfoFilter = true;
    }

    if (hasInfoFilter) {
        // Default to active users only for regular getUsersAction
        if (infoWhere.isWithdrawn === undefined) {
             infoWhere.isWithdrawn = false;
        }
        where.info = infoWhere;
    } else {
        // If no info filter was set, still default to active users
        where.info = { isWithdrawn: false };
    }

    if (startDate && endDate) {
        where.createdAt = {
            gte: new Date(startDate),
            lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
        };
    }

    return where;
}

export type BatchProcessParams = {
    targetType: 'selected' | 'all';
    selectedIds?: string[];
    searchParams?: GetUsersParams; // Required if targetType is 'all'
    actionType: 'approve' | 'grade';
    value: string | boolean; // 'true'/'false' (as bool or string approved/pending) or gradeId
};

import { revalidatePath } from 'next/cache';

export async function processUserBatchAction(params: BatchProcessParams) {
    try {
        const { targetType, selectedIds, searchParams, actionType, value } = params;
        
        // 1. Identify Target User IDs (User table PK)
        let targetUserIds: string[] = [];

        if (targetType === 'selected') {
            if (!selectedIds || selectedIds.length === 0) {
                return { success: false, error: "선택된 회원이 없습니다." };
            }
            targetUserIds = selectedIds;
        } else {
             // targetType === 'all'
             if (!searchParams) return { success: false, error: "검색 조건이 없습니다." };
             const where = buildUserWhereClause(searchParams);
             const users = await prisma.user.findMany({ 
                 where,
                 select: { id: true }
             });
             targetUserIds = users.map(u => u.id);
        }

        if (targetUserIds.length === 0) {
            return { success: false, error: "처리할 회원이 없습니다." };
        }

        // 2. Perform Update on UserInfo
        // Note: targetUserIds are from 'User' table. 'UserInfo' uses userId as FK but PK is 'id'.
        // We need to update UserInfo where userId is in targetUserIds.
        
        if (actionType === 'approve') {
             const isApproved = (value === 'approved' || value === true);
             await prisma.userInfo.updateMany({
                 where: { userId: { in: targetUserIds } },
                 data: { isApproved }
             });
        } else if (actionType === 'grade') {
             // value should be gradeId
             await prisma.userInfo.updateMany({
                 where: { userId: { in: targetUserIds } },
                 data: { gradeId: String(value) }
             });
        }

        revalidatePath("/admin/users/approval-change");
        return { success: true, count: targetUserIds.length };

    } catch (error) {
        console.error("Error processing batch users:", error);
        return { success: false, error: "일괄 처리에 실패했습니다." };
    }
}
