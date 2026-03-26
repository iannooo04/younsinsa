import "dotenv/config";
import { prisma } from './src/lib/prisma.js'; // Use the Next.js initialized prisma client

async function testUpdate() {
    const banners = await prisma.banner.findMany({ orderBy: { displayOrder: 'asc' } });
    console.log("Before:");
    banners.forEach(b => console.log(`${b.id.substring(0,8)} - Order: ${b.displayOrder} - Title: ${b.title}`));
    
    // Find 'test baneer 001'
    const banner = banners.find(b => b.title === 'test baneer 001');
    if (!banner) return console.log("banner 001 not found");

    console.log(`\nUpdating banner ${banner.id} to order 6...`);

    const targetGroupToCheck = 'home';
    const displayOrderToCheck = 6;
    const id = banner.id;

    if (displayOrderToCheck !== banner.displayOrder) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const existingBanner = await (prisma as any).banner.findFirst({
            where: {
                targetGroup: targetGroupToCheck,
                displayOrder: displayOrderToCheck,
                id: { not: id }
            }
        });

        if (existingBanner) {
            console.log(`Conflict! Found banner ${existingBanner.id} at order 6! Shifting...`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (prisma as any).banner.updateMany({
                where: {
                    targetGroup: targetGroupToCheck,
                    displayOrder: { gte: displayOrderToCheck },
                    id: { not: id }
                },
                data: { displayOrder: { increment: 1 } }
            });
        } else {
            console.log("No conflict found at order 6.");
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any).banner.update({
        where: { id },
        data: { displayOrder: 6 }
    });

    const afterBanners = await prisma.banner.findMany({ orderBy: { displayOrder: 'asc' } });
    console.log("\nAfter:");
    afterBanners.forEach(b => console.log(`${b.id.substring(0,8)} - Order: ${b.displayOrder} - Title: ${b.title}`));
}

testUpdate().catch(console.error).finally(() => prisma.$disconnect());
