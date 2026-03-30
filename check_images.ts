import prisma from "./src/lib/prisma";
async function main() {
    const products = await prisma.product.findMany({ include: { images: true }});
    console.log(JSON.stringify(products.map(p => ({id: p.id, name: p.name, images: p.images})), null, 2));
}
main();
