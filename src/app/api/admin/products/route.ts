import { getProducts, createProduct, deleteProduct } from "@/lib/admin/products";
import { type NextRequest, NextResponse } from "next/server";
import { uploadFile, deleteFile } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const detailContent = formData.get("detailContent") as string;
        const price = parseInt(formData.get("price") as string);
        const originalPrice = parseInt(formData.get("originalPrice") as string) || 0;
        const supplyPrice = parseInt(formData.get("supplyPrice") as string) || 0;
        const videoUrl = formData.get("videoUrl") as string;
        const shippingFee = parseInt(formData.get("shippingFee") as string) || 0;
        const shippingMethod = formData.get("shippingMethod") as string;
        const shippingDuration = formData.get("shippingDuration") as string;
        const material = formData.get("material") as string;
        const origin = formData.get("origin") as string;
        const manufacturer = formData.get("manufacturer") as string;
        const washCare = formData.get("washCare") as string;
        const asInfo = formData.get("asInfo") as string;
        const tagsStr = formData.get("tags") as string;
        const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()) : [];

        const gender = (formData.get("gender") as "MEN" | "WOMEN" | "UNISEX") || "UNISEX";
        const brandId = formData.get("brandId") as string;
        const categoryId = formData.get("categoryId") as string;
        
        // Handle Images (expecting 'images' field, multiple)
        const files = formData.getAll("images") as File[];

        if (!name || isNaN(price) || !brandId || !categoryId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Create Product
        // 1. Create Product
        const product = await createProduct({
            name,
            shortDescription: description,
            descriptionPC: detailContent,
            descriptionMobile: detailContent,
            isDescriptionSame: true,
            price,
            consumerPrice: originalPrice, // Assuming originalPrice is consumerPrice
            supplyPrice,
            externalVideoUrl: videoUrl,
            shippingFee,
            shippingMethod,
            // shippingDuration, // Not in schema, ignoring or add to essentialInfo
            origin,
            manufacturer,
            // Map extra fields to essentialInfo
            essentialInfo: {
                material,
                washCare,
                asInfo,
                shippingDuration
            },
            keywords: tags,
            gender: gender as any, // Enum cast
            brand: { connect: { id: brandId } },
            category: { connect: { id: categoryId } },
        });

        // 2. Upload Images
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.size > 0) {
                     const arrayBuffer = await file.arrayBuffer();
                     const buffer = Buffer.from(arrayBuffer);
                     const filename = `products/${product.id}/${Date.now()}_${i}_${file.name.replace(/\s/g, '_')}`;
                     const url = await uploadFile(buffer, filename, file.type);
                     
                     await prisma.productImage.create({
                         data: {
                             productId: product.id,
                             url: url,
                             order: i
                         }
                     });
                }
            }
        }
        
        // 3. Create Options
        const optionsStr = formData.get("options") as string;
        if (optionsStr) {
            const options = JSON.parse(optionsStr);
            for (const opt of options) {
                if (opt.name && opt.values.length > 0) {
                    await prisma.productOption.create({
                        data: {
                            productId: product.id,
                            name: opt.name,
                            values: {
                                create: opt.values.map((val: any) => ({ name: val.name }))
                            }
                        }
                    });
                }
            }
        }
        
        // Return updated product with images
        const updatedProduct = await prisma.product.findUnique({
            where: { id: product.id },
            include: { images: true, brand: true, category: true, options: { include: { values: true } } }
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Failed to create product", details: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        // Get product to delete images
        const product = await prisma.product.findUnique({
             where: { id },
             include: { images: true }
        });

        if (product) {
            for (const img of product.images) {
                await deleteFile(img.url);
            }
        }

        await deleteProduct(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
