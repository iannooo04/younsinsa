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

async function main(): Promise<void> {
    try {
        await upsertAdmin();
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
