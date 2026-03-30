import { prisma } from "./src/lib/prisma";

async function main() {
  try {
    console.log("Adding customUrl column to Brand table...");
    await prisma.$executeRawUnsafe(`ALTER TABLE "Brand" ADD COLUMN "customUrl" text;`);
    console.log("Successfully added customUrl column!");
  } catch (err) {
    if (err instanceof Error && err.message.includes('already exists')) {
      console.log("Column customUrl already exists.");
    } else {
      console.error("Error adding column:", err);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
