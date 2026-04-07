import { PrismaClient } from "./generated/prisma/index.js";
const prisma = new PrismaClient();

async function test() {
    const admins = await prisma.admin.findMany({ take: 1 });
    console.log("Admin:", admins[0]);
}

test().catch(console.error).finally(() => prisma.$disconnect());
