import { getCategories, createCategory, deleteCategory } from "@/lib/admin/categories";
import { type NextRequest, NextResponse } from "next/server";
import { uploadFile, deleteFile } from "@/lib/s3";

export const dynamic = "force-dynamic";

export async function GET() {
    const categories = await getCategories();
    return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const parentId = formData.get("parentId") as string;
        const slug = formData.get("slug") as string;
        const file = formData.get("image") as File | null;

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        let imageUrl: string | undefined;
        if (file && file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            // Generate a unique filename: timestamp-slug-filename
            const filename = `categories/${Date.now()}-${slug || 'cat'}-${file.name.replace(/\s/g, '_')}`;
            imageUrl = await uploadFile(buffer, filename, file.type);
        }

        const category = await createCategory(name, parentId, slug, imageUrl);
        return NextResponse.json(category);
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Failed to create category", details: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const deletedCategory = await deleteCategory(id);

        if (deletedCategory && deletedCategory.imageUrl) {
            await deleteFile(deletedCategory.imageUrl);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
