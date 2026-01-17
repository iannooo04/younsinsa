"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Grade Settings ---

export async function getMemberGradeSettingsAction() {
  try {
    let policy = await prisma.basicPolicy.findFirst();
    if (!policy) {
      policy = await prisma.basicPolicy.create({ data: {} });
    }

    let settings = await prisma.memberGradeSettings.findUnique({
      where: { basicPolicyId: policy.id }
    });

    if (!settings) {
      settings = await prisma.memberGradeSettings.create({
        data: {
          basicPolicyId: policy.id,
          gradeDisplayName: "등급",
        }
      });
    }

    return { success: true, settings };
  } catch (error) {
    console.error("Error fetching grade settings:", error);
    return { success: false, error: "등급 설정을 불러오는데 실패했습니다." };
  }
}

export async function updateMemberGradeSettingsAction(data: any) {
  try {
     const policy = await prisma.basicPolicy.findFirst();
     if (!policy) return { success: false, error: "기본 정책이 없습니다." };

     // Exclude id and basicPolicyId from data if present to avoid update errors
     const { id, basicPolicyId, ...updateData } = data;

     await prisma.memberGradeSettings.upsert({
       where: { basicPolicyId: policy.id },
       create: {
         basicPolicyId: policy.id,
         ...updateData
       },
       update: updateData
     });
     
     revalidatePath("/admin/users/grade");
     return { success: true };
  } catch(error) {
    console.error("Error updating grade settings:", error);
    return { success: false, error: "등급 설정 저장에 실패했습니다." };
  }
}


// --- User Grades ---

export async function getUserGradesAction() {
    try {
        const grades = await prisma.userGrade.findMany({
            orderBy: { orderIndex: 'asc' },
            include: {
                _count: {
                    select: { users: true }
                }
            }
        });
        return { success: true, grades };
    } catch (error) {
        console.error("Error fetching user grades:", error);
        return { success: false, error: "회원등급 리스트를 불러오는데 실패했습니다." };
    }
}

export async function deleteUserGradesAction(ids: string[]) {
    try {
        // Check if any grade has users
        const gradesWithUsers = await prisma.userGrade.findMany({
            where: {
                id: { in: ids },
                users: { some: {} }
            }
        });
        
        if (gradesWithUsers.length > 0) {
             const names = gradesWithUsers.map(g => g.name).join(", ");
             return { success: false, error: `회원이 속해 있는 등급은 삭제할 수 없습니다. (${names})` };
        }

        await prisma.userGrade.deleteMany({
            where: { id: { in: ids } }
        });

        revalidatePath("/admin/users/grade");
        return { success: true };
    } catch (error) {
        console.error("Error deleting user grades:", error);
        return { success: false, error: "회원등급 삭제에 실패했습니다." };
    }
}

export async function updateUserGradeOrderAction(items: {id: string, orderIndex: number}[]) {
    try {
        await prisma.$transaction(
            items.map((item) => 
                prisma.userGrade.update({
                    where: { id: item.id },
                    data: { orderIndex: item.orderIndex }
                })
            )
        );
        revalidatePath("/admin/users/grade");
        return { success: true };
    } catch (error) {
         console.error("Error updating grade order:", error);
         return { success: false, error: "등급 순서 저장에 실패했습니다." };
    }
}

// --- Evaluation Page Actions ---

export async function getGradeEvaluationAction() {
  try {
    let policy = await prisma.basicPolicy.findFirst();
    if (!policy) {
      policy = await prisma.basicPolicy.create({ data: {} });
    }

    let settings = await prisma.memberGradeSettings.findUnique({
      where: { basicPolicyId: policy.id }
    });

    if (!settings) {
      settings = await prisma.memberGradeSettings.create({
        data: {
          basicPolicyId: policy.id,
          gradeDisplayName: "등급",
          // default score settings
           scoreSettings: {
               orderAmount: { used: true, unit: 10000, point: 100 },
               mobileOrderAmount: { unit: 10000, point: 50 },
               orderCount: { used: true, unit: "per_buy", point: 10 },
               reviewCount: { used: true, unit: "per_review", point: 5 },
               loginCount: { used: true, unit: "per_login", point: 1 }
           }
        }
      });
    }

    const grades = await prisma.userGrade.findMany({
      orderBy: { orderIndex: 'asc' }
    });

    return { success: true, settings, grades };
  } catch (error) {
    console.error("Error fetching evaluation data:", error);
    return { success: false, error: "평가 설정 데이터를 불러오는데 실패했습니다." };
  }
}

export async function updateGradeEvaluationAction(data: {
    settings: any,
    grades: any[]
}) {
    try {
        const { settings, grades } = data;
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책이 없습니다." };

        // 1. Update Settings
        // Exclude id and basicPolicyId from settings update to be safe
        const { id: settingsId, basicPolicyId, ...settingsUpdate } = settings;
        
        await prisma.memberGradeSettings.update({
             where: { basicPolicyId: policy.id },
             data: settingsUpdate
        });

        // 2. Update Grades
        // We do this in a transaction or Promise.all. 
        // Since we are updating specific fields for evaluation, we trust the 'id' is present.
        await prisma.$transaction(
            grades.map((grade) => {
                const { id, ...gradeData } = grade;
                // Only pick fields relevant to evaluation to avoid accidental overwrites of others if any (though here we likely pass full object)
                // But safest is to just update what we expect.
                return prisma.userGrade.update({
                    where: { id: id },
                    data: {
                         minPurchaseAmount: gradeData.minPurchaseAmount,
                         minOrderCount: gradeData.minOrderCount,
                         minReviewCount: gradeData.minReviewCount,
                         minScore: gradeData.minScore,
                         calcPeriodType: gradeData.calcPeriodType,
                         calcPeriod: gradeData.calcPeriod,
                         calcPeriodStart: gradeData.calcPeriodStart,
                         evalCycle: gradeData.evalCycle,
                         evalDay: gradeData.evalDay
                    }
                });
            })
        );
        
        revalidatePath("/admin/users/grade/evaluation");
        return { success: true };
    } catch (error) {
        console.error("Error updating evaluation data:", error);
        return { success: false, error: "평가 설정을 저장하는데 실패했습니다." };
    }
}
