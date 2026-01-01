import { getBrands, createBrand, deleteBrand } from "@/lib/admin/brands";
import { type NextRequest, NextResponse } from "next/server";
import { uploadFile, deleteFile } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    const brands = await getBrands();
    return NextResponse.json(brands);
}

// Helper to get recursive path of IDs
async function getBrandPath(id: string): Promise<string> {
    const brand = await prisma.brand.findUnique({ where: { id }, select: { id: true, parentId: true } });
    if (!brand) return "";
    if (brand.parentId) {
        const parentPath = await getBrandPath(brand.parentId);
        return `${parentPath}/${brand.id}`;
    }
    return brand.id;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const slug = formData.get("slug") as string; 
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;
        const parentId = formData.get("parentId") as string;
        const file = formData.get("image") as File | null;

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        // 1. Create Brand first
        const brand = await createBrand(name, slug, undefined, description, category, parentId);

        // 2. Upload Image
        if (file && file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            // Construct full nested path
            let pathIds = brand.id;
            if (parentId) {
                const parentPath = await getBrandPath(parentId);
                if (parentPath) {
                    pathIds = `${parentPath}/${brand.id}`;
                }
            }

            // Folder structure: brands/{id_chain}/{filename}
            const filename = `brands/${pathIds}/${file.name.replace(/\s/g, '_')}`;
            const logoUrl = await uploadFile(buffer, filename, file.type);

            // 3. Update Brand
            await prisma.brand.update({
                where: { id: brand.id },
                data: { logoUrl },
            });
            brand.logoUrl = logoUrl;
        }

        return NextResponse.json(brand);
    } catch (error) {
        console.error("Error creating brand:", error);
        return NextResponse.json({ error: "Failed to create brand", details: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const deletedBrand = await deleteBrand(id);

        if (deletedBrand && deletedBrand.logoUrl) {
            await deleteFile(deletedBrand.logoUrl);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
    }
}
