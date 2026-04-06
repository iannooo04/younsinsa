import { prisma } from './src/lib/prisma.js';

async function test() {
  try {
    const admin = await prisma.admin.update({
      where: { userId: "admin01" },
      data: { image: "test.jpg" }
    });
    console.log("Admin find success", admin);
  } catch (e) {
    console.error("Prisma error:", e);
  }
}
test();
