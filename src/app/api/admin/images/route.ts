
import { type NextRequest, NextResponse } from "next/server";
import { deleteFile, listFiles } from "@/lib/s3";

export const dynamic = "force-dynamic";

import { uploadFile } from "@/lib/s3"; // Ensure uploadFile is imported

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const prefix = searchParams.get("prefix") || "";
        const data = await listFiles(prefix);
        return NextResponse.json(data);
    } catch (error) {
        console.error("List Images Error:", error);
        return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const folder = formData.get("folder") as string || ""; // e.g., "brands/"

        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Clean folder path: ensure it ends with / if not empty
        const folderPath = folder ? (folder.endsWith("/") ? folder : `${folder}/`) : "";
        const fileName = `${folderPath}${file.name}`;
        
        await uploadFile(buffer, fileName, file.type);

        return NextResponse.json({ success: true, key: fileName });
    } catch (error) {
        console.error("Upload Image Error:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const key = searchParams.get("key");

        if (!key) {
            return NextResponse.json({ error: "Key is required" }, { status: 400 });
        }

        // We can pass either the key or the full proxy URL to deleteFile.
        // But since our UI will likely use the key, let's construct a proxy URL format 
        // OR update deleteFile to handle raw keys better. 
        // Looking at s3.ts, deleteFile handles:
        // 1. /api/images?key=...
        // 2. /path/to/obj

        // If we just pass the key, it won't match either case easily unless we construct a fake proxy URL
        // or modify deleteFile to accept raw keys.
        // Let's modify deleteFile to be more robust later if needed, 
        // but for now, we can construct the proxy URL to reuse existing logic.
        const proxyUrl = `/api/images?key=${encodeURIComponent(key)}`;
        await deleteFile(proxyUrl);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Image Error:", error);
        return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }
}
