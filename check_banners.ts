import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function checkBanners() {
    const banners = await prisma.banner.findMany({
        orderBy: { displayOrder: 'asc' }
    });
    console.log("Current Banners:");
    for (const b of banners) {
        console.log(`- ${b.id.substring(0,8)} | Order: ${b.displayOrder} | Title: ${b.title}`);
    }
}

checkBanners()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
