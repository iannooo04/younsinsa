import { prisma } from './src/lib/prisma';

async function main() {
  const driver = await prisma.category.findFirst({
    where: { name: '드라이버' },
  });
  console.log("Category Driver ImageUrl:", driver?.imageUrl);
}

main().catch(console.error).finally(() => prisma.$disconnect());
