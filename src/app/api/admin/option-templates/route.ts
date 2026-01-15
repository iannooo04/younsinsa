import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const templates = await prisma.optionTemplate.findMany({
        orderBy: { name: 'asc' }
    });
    return NextResponse.json(templates);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, options, manageName } = body;

        if (!name || !options) {
             return NextResponse.json({ error: "Name and options are required" }, { status: 400 });
        }

        const template = await prisma.optionTemplate.create({
            data: {
                name,
                manageName: manageName || name, // Fallback to name if not provided (though strictly should be provided)
                options
            }
        });

        return NextResponse.json(template);
    } catch (error) {
        console.error("Error creating option template:", error);
        return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        await prisma.optionTemplate.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
         console.error("Error deleting option template:", error);
         return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
    }
}
