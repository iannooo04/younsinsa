import { getCategories, createCategory, deleteCategory, getCategoryDescendants } from "@/lib/admin/categories";
import { type NextRequest, NextResponse } from "next/server";
import { uploadFile, deleteFile, deleteFolder } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    const categories = await getCategories();
    return NextResponse.json(categories);
}


// Helper to get recursive path of IDs
async function getCategoryPath(id: string): Promise<string> {
    const cat = await prisma.category.findUnique({ where: { id }, select: { id: true, parentId: true } });
    if (!cat) return "";
    if (cat.parentId) {
        const parentPath = await getCategoryPath(cat.parentId);
        return `${parentPath}/${cat.id}`;
    }
    return cat.id;
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

        // 1. Create Category first to get ID
        const category = await createCategory(name, parentId, slug, undefined);

        // 2. Upload Image to specific folder if file exists
        if (file && file.size > 0) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            // Construct full nested path
            let pathIds = category.id;
            if (parentId) {
                const parentPath = await getCategoryPath(parentId);
                if (parentPath) {
                    pathIds = `${parentPath}/${category.id}`;
                }
            }
            
            // Folder structure: categories/{id_chain}/{filename}
            const filename = `categories/${pathIds}/${file.name.replace(/\s/g, '_')}`;
            const imageUrl = await uploadFile(buffer, filename, file.type);

            // 3. Update Category with Image URL
            await prisma.category.update({
                where: { id: category.id },
                data: { imageUrl },
            });
            
            category.imageUrl = imageUrl;
        }

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

        // 1. Get root category details
        const rootCategory = await prisma.category.findUnique({
             where: { id },
             select: { id: true, imageUrl: true }
        });
        
        if (!rootCategory) {
             return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        // 2. Get recursive S3 path BEFORE deletion for main folder deletion
        const pathIds = await getCategoryPath(id);

        // 3. Get all descendants (bottom-up order)
        const descendants = await getCategoryDescendants(id);
        const allTargets = [...descendants, rootCategory];

        // 4. Delete files and DB records
        // We iterate bottom-up (descendants first, then root)
        for (const target of allTargets) {
            // Delete individual file (handles flat structure or orphans)
            if (target.imageUrl) {
                await deleteFile(target.imageUrl);
            }
            
            // Delete from DB
            try {
                await deleteCategory(target.id);
            } catch (e) {
                console.error(`Failed to delete category ${target.id} from DB`, e);
                // Continue cleaning up others
            }
        }

        // 5. Delete root S3 folder (handles nested structure)
        if (pathIds) {
             const folderPrefix = `categories/${pathIds}/`;
             await deleteFolder(folderPrefix);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
