import { PrismaClient } from "./generated/prisma/index.js";
const prisma = new PrismaClient();
async function main() {
    console.log("Admins:");
    const admins = await prisma.admin.findMany({ select: { id: true, userId: true, email: true } });
    console.log(admins);
    
    console.log("Users:");
    const users = await prisma.user.findMany({ select: { id: true, username: true, email: true } });
    console.log(users);
}
main().catch(console.error).finally(() => prisma.$disconnect());
