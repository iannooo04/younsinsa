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

import { MemberGradeSettings, UserGrade } from "@/generated/prisma";

export async function updateMemberGradeSettingsAction(data: Partial<MemberGradeSettings>) {
  try {
     const policy = await prisma.basicPolicy.findFirst();
     if (!policy) return { success: false, error: "기본 정책이 없습니다." };

     // Exclude id and basicPolicyId from data if present to avoid update errors
     const { id: _id, basicPolicyId: _basicPolicyId, ...updateData } = data;

     await prisma.memberGradeSettings.upsert({
       where: { basicPolicyId: policy.id },
       create: {
         basicPolicyId: policy.id,
         inputPeriod: updateData.inputPeriod ?? 0, // Ensure required fields are handled if creating
         gradeCount: updateData.gradeCount ?? 0,
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         ...(updateData as any)
       },
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       update: updateData as any
     });
     
     revalidatePath("/admin/users/grade");
     return { success: true };
  } catch(error) {
    console.error("Error updating grade settings:", error);
    return { success: false, error: "등급 설정 저장에 실패했습니다." };
  }
}


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
    return { success: false, error: "회원 등급을 불러오는데 실패했습니다." };
  }
}

export async function deleteUserGradesAction(ids: string[]) {
  try {
    if (!ids || ids.length === 0) return { success: false, error: "삭제할 등급을 선택해주세요." };

    // Check if any of these grades have users
    const gradesWithUsers = await prisma.userGrade.findMany({
      where: {
        id: { in: ids },
        users: { some: {} }
      },
      select: { name: true }
    });

    if (gradesWithUsers.length > 0) {
      const names = gradesWithUsers.map(g => g.name).join(", ");
      return { success: false, error: `다음 등급에 회원이 존재하여 삭제할 수 없습니다: ${names}` };
    }

    // Check for default grade (cannot delete)
     const defaultGrades = await prisma.userGrade.findMany({
      where: {
        id: { in: ids },
        isDefault: true
      },
      select: { name: true }
    });

    if (defaultGrades.length > 0) {
        return { success: false, error: "가입회원등급은 삭제할 수 없습니다." };
    }

    await prisma.userGrade.deleteMany({
      where: { id: { in: ids } }
    });

    revalidatePath("/admin/users/grade");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user grades:", error);
    return { success: false, error: "회원 등급 삭제에 실패했습니다." };
  }
}

export async function updateUserGradeOrderAction(orderItems: { id: string, orderIndex: number }[]) {
  try {
    await prisma.$transaction(
        orderItems.map((item) => 
            prisma.userGrade.update({
                where: { id: item.id },
                data: { orderIndex: item.orderIndex }
            })
        )
    );
    revalidatePath("/admin/users/grade");
    return { success: true };
  } catch (error) {
     console.error("Error updating user grade order:", error);
     return { success: false, error: "등급 순서 저장에 실패했습니다." };
  }
}

export async function getGradeEvaluationAction() {
    try {
        const [settingsRes, gradesRes] = await Promise.all([
            getMemberGradeSettingsAction(),
            getUserGradesAction()
        ]);

        if (!settingsRes.success) return { success: false, error: settingsRes.error };
        if (!gradesRes.success) return { success: false, error: gradesRes.error };

        return {
            success: true,
            settings: settingsRes.settings,
            grades: gradesRes.grades
        };
    } catch (error) {
        console.error("Error fetching evaluation data:", error);
        return { success: false, error: "평가 데이터를 불러오는데 실패했습니다." };
    }
}

export async function updateGradeEvaluationAction(data: {
    settings: Partial<MemberGradeSettings>,
    grades: Partial<UserGrade>[]
}) {
    try {
        const { settings, grades } = data;
        const policy = await prisma.basicPolicy.findFirst();
        if (!policy) return { success: false, error: "기본 정책이 없습니다." };

        // 1. Update Settings
        // Exclude id and basicPolicyId from settings update to be safe
        const { id: _settingsId, basicPolicyId: _basicPolicyId, ...settingsUpdate } = settings;
        
        await prisma.memberGradeSettings.update({
             where: { basicPolicyId: policy.id },
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             data: settingsUpdate as any
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
