
import { prisma } from "../src/lib/prisma"; // Correctly import the initialized client
import { DisplayStatus, SaleStatus, ProductGender, TaxType, StockConfigType } from "../src/generated/prisma";

async function main() {
  console.log("Start seeding dummy product...");

  try {
    // 1. Ensure a Category exists
    // Search by code because it is unique, unlike slug which might not be unique or might differ
    let category = await prisma.category.findUnique({
        where: { code: "DUMMY001" }
    });

    if (!category) {
        console.log("Creating dummy category...");
        category = await prisma.category.create({
            data: {
                name: "Dummy Category",
                code: "DUMMY001",
                slug: "dummy-category", // Slug doesn't have to be unique per se, but good to keep consistent
                type: "GENERAL",
                isExposedKR: true,
                displayStatusPC: DisplayStatus.DISPLAY,
                displayStatusMobile: DisplayStatus.DISPLAY,
            }
        });
    }
    console.log("Category ready:", category.id);

    // 2. Ensure a Brand exists
    let brand = await prisma.brand.findFirst({
        where: { slug: "dummy-brand" }
    });

    if (!brand) {
        console.log("Creating dummy brand...");
        brand = await prisma.brand.create({
            data: {
                name: "Dummy Brand",
                slug: "dummy-brand",
                type: "GENERAL",
                isExposedKR: true,
                displayStatusPC: DisplayStatus.DISPLAY,
                displayStatusMobile: DisplayStatus.DISPLAY,
            }
        });
    }
    console.log("Brand ready:", brand.id);

    // 3. Create Dummy Product
    const productCode = "DUMMY_PROD_" + Date.now();
    
    const product = await prisma.product.create({
        data: {
            name: "Dummy Product " + new Date().toISOString(),
            code: productCode,
            customCode: "CUST_" + productCode,
            price: 10000,
            consumerPrice: 15000,
            supplyPrice: 5000,
            categoryId: category.id,
            brandId: brand.id,
            displayStatusPC: DisplayStatus.DISPLAY,
            displayStatusMobile: DisplayStatus.DISPLAY,
            saleStatusPC: SaleStatus.ON_SALE,
            saleStatusMobile: SaleStatus.ON_SALE,
            gender: ProductGender.UNISEX,
            taxType: TaxType.TAX,
            stockType: StockConfigType.LIMITLESS, // Infinite stock
            descriptionPC: "This is a dummy product description.",
            descriptionMobile: "Dummy product description mobile.",
        }
    });

    console.log("Dummy product created:", product.id);
    console.log(product);

  } catch (e) {
    console.error("Error seeding dummy product:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
