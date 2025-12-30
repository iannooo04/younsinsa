
import { prisma } from "./src/lib/prisma";

async function main() {
  console.log("Checking categories...");
  const golf = await prisma.category.findFirst({
    where: {
      OR: [
        { code: "100001" },
        { name: "골프" }
      ]
    },
    include: {
      children: true
    }
  });

  if (!golf) {
    console.log("Golf category NOT found!");
  } else {
    console.log(`Found Golf category: ${golf.name} (Code: ${golf.code}, ID: ${golf.id})`);
    console.log(`Children count: ${golf.children.length}`);
    golf.children.forEach(c => {
      console.log(` - Child: ${c.name} (Code: ${c.code}, ParentID: ${c.parentId})`);
    });
  }

  const allCats = await prisma.category.findMany({
    select: { name: true, code: true, parentId: true, id: true }
  });
  console.log("Total categories:", allCats.length);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
