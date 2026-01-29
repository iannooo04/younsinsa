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
  
  // Date Ranges
  startDate?: string; // Join Date Start
  endDate?: string;   // Join Date End
  lastLoginStart?: string;
  lastLoginEnd?: string;
  birthdayStart?: string;
  birthdayEnd?: string;
  anniversaryStart?: string;
  anniversaryEnd?: string;
  // dormantReleaseStart?: string; // Not typically stored directly, skipping for now unless 'withdrawalDate' is used? UI says 'Dormant Release Date'.

  // Numeric Ranges
  visitCountMin?: number;
  visitCountMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  depositMin?: number;
  depositMax?: number;
  orderCountMin?: number;
  orderCountMax?: number;
  orderAmountMin?: number;
  orderAmountMax?: number;

  // Enums / Booleans
  smsConsent?: string; // 'all', 'true', 'false'
  emailConsent?: string; // 'all', 'true', 'false'
  gender?: string; // 'all', 'MALE', 'FEMALE'
  maritalStatus?: string; // 'all', 'SINGLE', 'MARRIED'
  
  // Others
  joinPath?: string; // Not in schema yet, but used in UI
  linkedProvider?: string;
};

export async function getUsersAction(params: GetUsersParams) {
  try {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;
    const where = buildUserWhereClause(params);

    const [total, items] = await prisma.$transaction([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        take: limit,
        skip,
        orderBy: { createdAt: 'desc' },
        include: {
          info: true,
          recommender: { select: { username: true } },
          businessInfo: true,
          accounts: true,
        },
      }),
    ]);

    return { success: true, items, total };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, items: [], total: 0, error: '회원 목록을 불러오는데 실패했습니다.' };
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
      endDate,
      
      // New Params
      lastLoginStart,
      lastLoginEnd,
      birthdayStart,
      birthdayEnd,
      anniversaryStart,
      anniversaryEnd,
      
      visitCountMin,
      visitCountMax,
      mileageMin,
      mileageMax,
      depositMin,
      depositMax,
      
      orderCountMin,
      orderCountMax,

      smsConsent,
      emailConsent,
      gender,
      maritalStatus,
      linkedProvider
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
          
          // New Fields
          else if (searchType === 'phone') where.phone = keyword;
          else if (searchType === 'fax') where.fax = keyword;
          else if (searchType === 'recommenderId') where.recommender = { username: keyword };
          
          // Business Info Fields
          else if (searchType === 'companyName') where.businessInfo = { companyName: keyword };
          else if (searchType === 'businessNumber') where.businessInfo = { businessNumber: keyword };
          else if (searchType === 'ceoName') where.businessInfo = { ceoName: keyword };
          
          else {
              where.OR = [
                  { username: keyword },
                  { name: keyword },
                  { email: keyword },
                  { nickname: keyword },
                  { mobile: keyword },
                  { phone: keyword }
              ];
          }
      } else {
          // Partial Match
          const containsVal = { contains: keyword, mode: 'insensitive' as Prisma.QueryMode };
          
          if (searchType === 'id') where.username = containsVal;
          else if (searchType === 'name') where.name = containsVal;
          else if (searchType === 'email') where.email = containsVal;
          else if (searchType === 'nickname') where.nickname = containsVal;
          else if (searchType === 'mobile') where.mobile = containsVal;

          // New Fields
          else if (searchType === 'phone') where.phone = containsVal;
          else if (searchType === 'fax') where.fax = containsVal;
          else if (searchType === 'recommenderId') where.recommender = { username: containsVal };

           // Business Info Fields
          else if (searchType === 'companyName') where.businessInfo = { companyName: containsVal };
          else if (searchType === 'businessNumber') where.businessInfo = { businessNumber: containsVal };
          else if (searchType === 'ceoName') where.businessInfo = { ceoName: containsVal };

          else {
              where.OR = [
                  { username: containsVal },
                  { name: containsVal },
                  { email: containsVal },
                  { nickname: containsVal },
                  { mobile: containsVal },
                  { phone: containsVal }
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

    // --- New Filters ---
    
    // 1. Visit Count (loginCount)
    if (visitCountMin !== undefined || visitCountMax !== undefined) {
        infoWhere.loginCount = {};
        if (visitCountMin !== undefined) infoWhere.loginCount.gte = visitCountMin;
        if (visitCountMax !== undefined) infoWhere.loginCount.lte = visitCountMax;
        hasInfoFilter = true;
    }

    // 2. Mileage
    if (mileageMin !== undefined || mileageMax !== undefined) {
        infoWhere.mileage = {};
        if (mileageMin !== undefined) infoWhere.mileage.gte = mileageMin;
        if (mileageMax !== undefined) infoWhere.mileage.lte = mileageMax;
        hasInfoFilter = true;
    }

    // 3. Deposit
    if (depositMin !== undefined || depositMax !== undefined) {
        infoWhere.deposit = {};
        if (depositMin !== undefined) infoWhere.deposit.gte = depositMin;
        if (depositMax !== undefined) infoWhere.deposit.lte = depositMax;
        hasInfoFilter = true;
    }

    // 4. Consents
    if (smsConsent && smsConsent !== 'all') {
        infoWhere.smsConsent = (smsConsent === 'true');
        hasInfoFilter = true;
    }
    if (emailConsent && emailConsent !== 'all') {
        infoWhere.emailConsent = (emailConsent === 'true');
        hasInfoFilter = true;
    }

    // 5. Gender
    if (gender && gender !== 'all') {
        if (gender === 'MALE') infoWhere.gender = Gender.MALE;
        else if (gender === 'FEMALE') infoWhere.gender = Gender.FEMALE;
        hasInfoFilter = true;
    }

    // 6. Marital Status
    if (maritalStatus && maritalStatus !== 'all') {
        if (maritalStatus === 'SINGLE') infoWhere.maritalStatus = MaritalStatus.SINGLE;
        else if (maritalStatus === 'MARRIED') infoWhere.maritalStatus = MaritalStatus.MARRIED;
        hasInfoFilter = true;
    }

    // 7. Dates
    if (lastLoginStart || lastLoginEnd) {
        infoWhere.lastLoginAt = {};
        if (lastLoginStart) infoWhere.lastLoginAt.gte = new Date(lastLoginStart);
        if (lastLoginEnd) infoWhere.lastLoginAt.lte = new Date(new Date(lastLoginEnd).setHours(23, 59, 59, 999));
        hasInfoFilter = true;
    }

    if (birthdayStart || birthdayEnd) {
        infoWhere.birthday = {};
        if (birthdayStart) infoWhere.birthday.gte = new Date(birthdayStart);
        if (birthdayEnd) infoWhere.birthday.lte = new Date(new Date(birthdayEnd).setHours(23, 59, 59, 999));
        hasInfoFilter = true;
    }

    if (anniversaryStart || anniversaryEnd) {
        infoWhere.anniversary = {};
        if (anniversaryStart) infoWhere.anniversary.gte = new Date(anniversaryStart);
        if (anniversaryEnd) infoWhere.anniversary.lte = new Date(new Date(anniversaryEnd).setHours(23, 59, 59, 999));
        hasInfoFilter = true;
    }

    // 8. Order Count
    if (orderCountMin !== undefined || orderCountMax !== undefined) {
        // Using Type Assertion for Prisma relation count filter
        const countFilter: Record<string, number> = {};
        if (orderCountMin !== undefined) countFilter.gte = orderCountMin;
        if (orderCountMax !== undefined) countFilter.lte = orderCountMax;
        
        if (Object.keys(countFilter).length > 0) {
            // Prisma.UserWhereInput does not always expose _count in types depending on version/config
            // We cast strictly to avoid 'any' lint warning
            (where as unknown as { orders: { _count: Record<string, number> } }).orders = {
                _count: countFilter
            };
        }
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

    // Linked Providers
    if (linkedProvider && linkedProvider !== 'all') {
        where.accounts = {
            some: {
                provider: linkedProvider
            }
        };
    }

    // Join Date (createdAt)
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

export async function checkDuplicateAction(field: 'username' | 'email' | 'nickname', value: string) {
  try {
    const where: Prisma.UserWhereInput = {};
    if (field === 'username') where.username = value;
    else if (field === 'email') where.email = value;
    else if (field === 'nickname') where.nickname = value;

    const count = await prisma.user.count({ where });
    return { success: true, isDuplicate: count > 0 };
  } catch (error) {
    console.error('Error checking duplicate:', error);
    return { success: false, error: '중복 확인 실패' };
  }
}

export interface CreateUserParams {
  username: string;
  password?: string;
  name: string;
  nickname?: string;
  email?: string;
  mobile?: string;
  isApproved?: boolean;
  gradeId?: string | number;
  birthday?: string | Date;
  anniversary?: string | Date;
  memberType?: string;
  smsConsent?: boolean;
  emailConsent?: boolean;
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  phone?: string;
  fax?: string;
  job?: string;
  gender?: string;
  birthdayType?: string;
  maritalStatus?: string;
  recommenderId?: string;
  interests?: string | string[];
  userMemo?: string;
}

export async function createUserAction(data: CreateUserParams) {
  try {
    const {
      username,
      password,
      name,
      nickname,
      email,
      mobile,
      isApproved,
      gradeId,
      birthday,
      anniversary,
      memberType,
      smsConsent,
      emailConsent,
      zipcode,
      address,
      addressDetail,
      phone,
      fax,
      job,
      gender,
      birthdayType,
      maritalStatus,
      recommenderId,
      interests,
      userMemo
    } = data;

    // Check username again to be safe
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return { success: false, error: '이미 존재하는 아이디입니다.' };
    }

    if (!password) {
      return { success: false, error: '비밀번호를 입력해주세요.' };
    }

    if (!email) {
      return { success: false, error: '이메일을 입력해주세요.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.$transaction(async (tx) => {
      // 1. Create User
      const user = await tx.user.create({
        data: {
          username,
          passwordHash: hashedPassword,
          name,
          nickname,
          email,
          mobile,
          phone,
          fax,
          mallId: 'KR', // Default to Base Mall
        }
      });

      // 2. Handle Recommender
      if (recommenderId) {
        const recommender = await tx.user.findUnique({ where: { username: recommenderId } });
        if (recommender) {
          await tx.user.update({
            where: { id: user.id },
            data: { recommenderId: recommender.id }
          });
        }
      }

      // 3. Create UserInfo
      await tx.userInfo.create({
        data: {
          userId: user.id,
          type: memberType === 'BUSINESS' ? MemberType.BUSINESS : MemberType.PERSONAL,
          isApproved,
          gradeId: (gradeId === 'select' || gradeId === undefined) ? undefined : String(gradeId),
          smsConsent,
          emailConsent,
          zipcode,
          address,
          addressDetail,
          job: job === 'select' ? undefined : job,
          gender: gender === 'MALE' ? Gender.MALE : gender === 'FEMALE' ? Gender.FEMALE : Gender.NONE,
          birthday: birthday ? new Date(birthday) : null,
          birthdayType: birthdayType === 'LUNAR' ? DateType.LUNAR : DateType.SOLAR, 
          maritalStatus: maritalStatus === 'MARRIED' ? MaritalStatus.MARRIED : MaritalStatus.SINGLE,
          anniversary: anniversary ? new Date(anniversary) : null,
          interests: typeof interests === 'string' ? interests.split(',') : interests,
          userMemo: userMemo,
          // retentionPeriod not mapped to DB yet? Assuming it might not be in schema or is default.
        }
      });
      
      // 4. Create BusinessInfo if needed
      // Currently formData doesn't show business specific fields other than memberType
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: '회원 등록 실패' };
  }
}

export type GetWithdrawnUsersParams = {
  page?: number;
  limit?: number;
  mallId?: string;
  keyword?: string;
  withdrawalType?: string; // 'all', 'admin', 'user'
  canRejoin?: string; // 'all', 'possible', 'impossible'
  startDate?: string;
  endDate?: string;
};

export async function getWithdrawnUsersAction(params: GetWithdrawnUsersParams) {
  try {
    const { page = 1, limit = 10, mallId, keyword, withdrawalType, canRejoin, startDate, endDate } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      info: {
        isWithdrawn: true
      }
    };

    // Mall ID
    if (mallId && mallId !== 'all') {
       if (mallId === 'base') where.mallId = 'KR';
       else if (mallId === 'chinese') where.mallId = 'CN';
       else where.mallId = mallId;
    }

    // Keyword (ID Search mainly as per UI)
    if (keyword) {
        where.username = { contains: keyword, mode: 'insensitive' };
    }

    // Info Filters
    const infoWhere: Prisma.UserInfoWhereInput = { isWithdrawn: true };

    if (withdrawalType && withdrawalType !== 'all') {
        infoWhere.withdrawalType = withdrawalType;
    }

    if (canRejoin && canRejoin !== 'all') {
        infoWhere.canRejoin = (canRejoin === 'possible');
    }

    if (startDate && endDate) {
        infoWhere.withdrawalDate = {
            gte: new Date(startDate),
            lte: new Date(new Date(endDate).setHours(23, 59, 59, 999))
        };
    }
    
    where.info = infoWhere;

    const [total, items] = await prisma.$transaction([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        take: limit,
        skip,
        orderBy: { 
             info: {
                 withdrawalDate: 'desc'
             }
        },
        include: {
          info: true,
          businessInfo: true,
        },
      }),
    ]);

    return { success: true, items, total };
  } catch (error) {
    console.error('Error fetching withdrawn users:', error);
    return { success: false, items: [], total: 0, error: '탈퇴 회원 목록을 불러오는데 실패했습니다.' };
  }
}

export async function deleteWithdrawnUsersAction(ids: string[]) {
    try {
        if (!ids || ids.length === 0) return { success: false, error: '삭제할 회원이 없습니다.' };

        await prisma.user.deleteMany({
            where: {
                id: { in: ids },
                info: { isWithdrawn: true } // Safety
            }
        });

        revalidatePath('/admin/users/withdrawal-management');
        return { success: true };
    } catch (error) {
        console.error('Error deleting withdrawn users:', error);
        return { success: false, error: '영구 삭제에 실패했습니다.' };
    }
}

export async function restoreWithdrawnUsersAction(ids: string[]) {
    try {
        if (!ids || ids.length === 0) return { success: false, error: '복구할 회원이 없습니다.' };

        await prisma.userInfo.updateMany({
            where: { userId: { in: ids } },
            data: {
                isWithdrawn: false,
                withdrawalDate: null,
                withdrawalType: null,
                withdrawalReason: null,
                canRejoin: true 
            }
        });
        
        revalidatePath('/admin/users/withdrawal-management');
        return { success: true };
    } catch (error) {
        console.error('Error restoring withdrawn users:', error);
        return { success: false, error: '회원 복구에 실패했습니다.' };
    }
}

interface ExcelUserRow {
  mem_id?: string | number | boolean | null;
  mem_name?: string | number | boolean | null;
  mem_password?: string | number | boolean | null;
  nick_name?: string | number | boolean | null;
  email?: string | number | boolean | null;
  cell_phone?: string | number | boolean | null;
  phone?: string | number | boolean | null;
  fax?: string | number | boolean | null;
  sex_fl?: string | number | boolean | null;
  birth_dt?: string | number | boolean | null;
  calendar_fl?: string | number | boolean | null;
  marri_fl?: string | number | boolean | null;
  marri_date?: string | number | boolean | null;
  recomm_id?: string | number | boolean | null;
  interest?: string | number | boolean | null;
  zonecode?: string | number | boolean | null;
  address?: string | number | boolean | null;
  address_sub?: string | number | boolean | null;
  group_sno?: string | number | boolean | null;
  app_fl?: string | number | boolean | null;
  sms_fl?: string | number | boolean | null;
  mailling_fl?: string | number | boolean | null;
  admin_memo?: string | number | boolean | null;
  company?: string | number | boolean | null;
  business_no?: string | number | boolean | null;
}

export async function uploadUsersExcelAction(data: ExcelUserRow[]) {
  try {
    let count = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (const item of data) {
      try {
        const params: CreateUserParams = {
            username: String(item.mem_id),
            name: String(item.mem_name),
            password: item.mem_password ? String(item.mem_password) : '1234',
            nickname: item.nick_name ? String(item.nick_name) : undefined,
            email: item.email ? String(item.email) : undefined,
            mobile: item.cell_phone ? String(item.cell_phone) : undefined,
            phone: item.phone ? String(item.phone) : undefined,
            fax: item.fax ? String(item.fax) : undefined,
            gender: item.sex_fl === 'w' ? 'FEMALE' : (item.sex_fl === 'm' ? 'MALE' : 'NONE'),
            birthday: item.birth_dt ? new Date(String(item.birth_dt)) : undefined,
            birthdayType: item.calendar_fl === 'l' ? 'LUNAR' : 'SOLAR',
            maritalStatus: item.marri_fl === 'y' ? 'MARRIED' : 'SINGLE',
            anniversary: item.marri_date ? new Date(String(item.marri_date)) : undefined,
            recommenderId: item.recomm_id ? String(item.recomm_id) : undefined,
            interests: item.interest ? String(item.interest).split('|') : undefined,
            zipcode: item.zonecode ? String(item.zonecode) : undefined,
            address: item.address ? String(item.address) : undefined,
            addressDetail: item.address_sub ? String(item.address_sub) : undefined,
            gradeId: item.group_sno as string | number | undefined,
            isApproved: item.app_fl === 'y',
            smsConsent: item.sms_fl === 'y',
            emailConsent: item.mailling_fl === 'y',
            userMemo: item.admin_memo ? String(item.admin_memo) : undefined,
            memberType: (item.company || item.business_no) ? 'BUSINESS' : 'PERSONAL'
        };

        const res = await createUserAction(params);
        if (res.success) {
            count++;
        } else {
            failCount++;
            errors.push(`${item.mem_id}: ${res.error}`);
        }
      } catch (e) {
        failCount++;
        errors.push(`${item.mem_id}: ${(e as Error).message}`);
      }
    }

    revalidatePath('/admin/users');
    return { success: true, count, failCount, errors };
  } catch (error) {
      console.error('Error uploading excel:', error);
      return { success: false, error: '업로드 중 오류가 발생했습니다.', count: 0, failCount: 0, errors: [] };
  }
}
