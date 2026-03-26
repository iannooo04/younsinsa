import { prisma } from "../src/lib/prisma";
import { ClassifyType, DisplayStatus } from "../src/generated/prisma";

async function main() {
  const fixedCategories = [
    { name: 'NKBUS', code: 'NKBUS' },
    { name: 'GOLF', code: 'GOLF' },
    { name: 'PLAYER', code: 'PLAYER' },
    { name: 'WOMEN', code: 'WOMEN' }
  ];

  for (const cat of fixedCategories) {
    const exists = await prisma.category.findFirst({
      where: { name: cat.name }
    });
    
    if (!exists) {
      await prisma.category.create({
        data: {
          name: cat.name,
          code: cat.code,
          type: ClassifyType.GENERAL,
          displayStatusPC: DisplayStatus.DISPLAY,
          displayStatusMobile: DisplayStatus.DISPLAY,
          displaySettings: {
            create: {
              displayMethod: "NORMAL",
              defaultSortType: "REG_DATE_DESC"
            }
          }
        }
      });
      console.log(`Created fixed category: ${cat.name}`);
    } else {
      console.log(`Category ${cat.name} already exists.`);
    }
  }

  console.log("Finished adding fixed categories.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
