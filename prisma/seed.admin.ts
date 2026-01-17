// prisma/seed.admin.ts
import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { AdminType } from "../src/generated/prisma";

/** ---- 환경/상수 ---- */
const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "admin"; // 개발용 간단 비번
const ADMIN_NAME = "최고관리자";
const ADMIN_EMAIL = "admin@yunsinsa.com";

async function upsertAdmin(): Promise<void> { 
    // 비밀번호 해시
    const passwordHash: string = await bcrypt.hash(ADMIN_PASSWORD, 12);

    console.log(`Seeding Admin: ${ADMIN_ID} / ${ADMIN_PASSWORD}`);

    await prisma.admin.upsert({
        where: { userId: ADMIN_ID },
        create: {
            userId: ADMIN_ID,
            passwordHash,
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            type: AdminType.SUPER, // 최고관리자
            isEmployee: true,
            department: "본사",
            position: "대표",
            duty: "총괄",
        },
        update: {
            passwordHash,
            name: ADMIN_NAME,
            type: AdminType.SUPER,
        },
    });
}

async function seedOptionTemplates() {
    console.log("Seeding Option Templates...");
    
    // Check if any exist
    const count = await prisma.optionTemplate.count();
    if (count > 0) {
        console.log("Option Templates already exist. Skipping.");
        return;
    }

    const templates = [
        { manageName: "N_SIZE5", type: "integrated", name: "SIZE", supplierName: "니아인터내셔널" },
        { manageName: "S_M_SIZE", type: "integrated", name: "SIZE", supplierName: "니아인터내셔널" },
        { manageName: "F_SIZE", type: "integrated", name: "SIZE", supplierName: "니아인터내셔널" },
        { manageName: "COLOR_BASIC", type: "separated", name: "COLOR", supplierName: "본사" },
    ];

    for (const t of templates) {
        await prisma.optionTemplate.create({
            data: {
                manageName: t.manageName,
                name: t.name,
                type: t.type,
                supplierName: t.supplierName,
                options: [{name: "Option1", price: 0}, {name: "Option2", price: 0}], // Simple JSON
            }
        });
    }
    console.log(`Seeded ${templates.length} Option Templates.`);
}

async function seedShippingPolicies() {
    console.log("Seeding Shipping Policies...");
    
    const count = await prisma.shippingPolicy.count();
    if (count > 0) {
        console.log("Shipping Policies already exist. Skipping.");
        return;
    }

    // Use default values as defined in schema mostly
    await prisma.shippingPolicy.createMany({
        data: [
            { name: "기본 배송비 Free", type: "FREE", defaultFee: 0, isDefault: true },
            { name: "3000원 고정 배송비", type: "FIXED", defaultFee: 3000 },
            { name: "5만원 이상 무료", type: "PRICE", defaultFee: 3000, freePriceThreshold: 50000 },
        ]
    });
    console.log("Seeded Shipping Policies.");
}

async function main(): Promise<void> {
    try {
        await upsertAdmin();
        await seedOptionTemplates();
        await seedShippingPolicies();
        const admin = await prisma.admin.findUnique({ where: { userId: ADMIN_ID } });
        console.log("Admin seed OK:", admin);
    } catch (e) {
        console.error("Admin seed failed:", e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
