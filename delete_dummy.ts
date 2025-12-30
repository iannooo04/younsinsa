
import { prisma } from "./src/lib/prisma";

async function main() {
  console.log("Deleting dummy categories (100002-100011)...");
  
  const codesToDelete = [
    "100002", "100003", "100004", "100005", "100006", 
    "100007", "100008", "100009", "100010", "100011"
  ];

  const result = await prisma.category.deleteMany({
    where: {
      code: {
        in: codesToDelete
      }
    }
  });

  console.log(`Deleted ${result.count} categories.`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
