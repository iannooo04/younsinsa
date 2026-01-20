'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma';

export async function getMemberJoinPolicyAction() {
  try {
    // Ensure BasicPolicy exists
    let policy = await prisma.basicPolicy.findFirst();
    if (!policy) {
      policy = await prisma.basicPolicy.create({ data: {} });
    }

    let joinPolicy = await prisma.memberJoinPolicy.findUnique({
      where: { basicPolicyId: policy.id }
    });

    if (!joinPolicy) {
      // Create default
      joinPolicy = await prisma.memberJoinPolicy.create({
        data: {
          basicPolicyId: policy.id
        }
      });
    }

    return { success: true, policy: joinPolicy };
  } catch (error) {
    console.error("Error fetching member join policy:", error);
    return { success: false, error: "Failed to fetch member join policy" };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateMemberJoinPolicyAction(data: Record<string, any>) {
  try {
     let policy = await prisma.basicPolicy.findFirst();
    if (!policy) {
      policy = await prisma.basicPolicy.create({ data: {} });
    }

    const updated = await prisma.memberJoinPolicy.upsert({
        where: { basicPolicyId: policy.id },
        update: {
            approvalMethod: data.approvalMethod,
            ageLimitMethod: data.ageLimitMethod,
            useAgeConsent: data.useAgeConsent,
            underageAge: data.underageAge ? Number(data.underageAge) : 14,
            underageAction: data.underageAction,
            simpleLoginAuthMethod: data.simpleLoginAuthMethod,
            rejoinLimitMethod: data.rejoinLimitMethod,
            rejoinLimitDays: data.rejoinLimitDays ? Number(data.rejoinLimitDays) : 0,
            fraudulentIds: data.fraudulentIds
        },
        create: {
            basicPolicyId: policy.id,
            approvalMethod: data.approvalMethod,
            ageLimitMethod: data.ageLimitMethod,
            useAgeConsent: data.useAgeConsent,
            underageAge: data.underageAge ? Number(data.underageAge) : 14,
            underageAction: data.underageAction,
            simpleLoginAuthMethod: data.simpleLoginAuthMethod,
            rejoinLimitMethod: data.rejoinLimitMethod,
            rejoinLimitDays: data.rejoinLimitDays ? Number(data.rejoinLimitDays) : 0,
            fraudulentIds: data.fraudulentIds
        }
    });

    return { success: true, policy: updated };

  } catch (error) {
    console.error("Error updating member join policy:", error);
    return { success: false, error: "Failed to update member join policy" };
  }
}

export async function getMemberJoinItemSettingsAction() {
  try {
    let policy = await prisma.basicPolicy.findFirst();
    if (!policy) {
      policy = await prisma.basicPolicy.create({ data: {} });
    }

    let settings = await prisma.memberJoinItemSettings.findUnique({
      where: { basicPolicyId: policy.id }
    });

    if (!settings) {
      // Default schema
      const defaultSchema = {
          memberType: { personal: true, business: false },
          items: {
            id: { use: true, required: true, min: 4, "max": 16 },
            password: { use: true, required: true },
            name: { use: true, required: true },
            nickname: { use: true, required: true, min: 2, "max": 20 },
            email: { use: true, required: true, marketing: true },
            mobile: { use: true, required: true, marketing: true },
            address: { use: true, required: true },
            phone: { use: true, required: false },
            
            companyName: { use: false, required: false },
            businessNo: { use: false, required: false, overlap: true },
            ceo: { use: false, required: false },
            service: { use: false, required: false },
            item: { use: false, required: false },
            businessAddress: { use: false, required: false },
            businessImage: { use: false, required: false },
            
            fax: { use: false, required: false },
            recommenderId: { use: false, required: false, noChange: false },
            birth: { use: true, required: true, calendar: true },
            sex: { use: false, required: false },
            marriun: { use: false, required: false, date: true },
            job: { use: false, required: false },
            interest: { use: false, required: false },
            expiration: { use: false, required: false },
            memo: { use: false, required: false }
          },
          customItems: [],
          captcha: { use: false }
      };

      settings = await prisma.memberJoinItemSettings.create({
        data: {
          basicPolicyId: policy.id,
          schema: defaultSchema
        }
      });
    }

    return { success: true, settings };
  } catch (error) {
    console.error("Error fetching member join item settings:", error);
    return { success: false, error: "Failed to fetch member join item settings" };
  }
}

export async function updateMemberJoinItemSettingsAction(schema: Prisma.InputJsonValue) {
  try {
    let policy = await prisma.basicPolicy.findFirst();
    if (!policy) {
      policy = await prisma.basicPolicy.create({ data: {} });
    }

    const updated = await prisma.memberJoinItemSettings.upsert({
      where: { basicPolicyId: policy.id },
      update: { schema },
      create: {
        basicPolicyId: policy.id,
        schema
      }
    });

    return { success: true, settings: updated };
  } catch (error) {
    console.error("Error updating member join item settings:", error);
    return { success: false, error: "Failed to update member join item settings" };
  }
}
