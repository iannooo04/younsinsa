import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
        parentId: true,
        code: true,
      },
      orderBy: {
        createdAt: "desc", // Recently created items first
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch public categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
