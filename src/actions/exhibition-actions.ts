"use server";

import { prisma } from "@/lib/prisma";
export type ExhibitionWithProducts = Awaited<ReturnType<typeof getExhibitionsAction>>[number];

export async function getExhibitionsAction(options?: { onlyActive?: boolean }) {
  try {
    const whereClause = options?.onlyActive ? { status: "ONGOING" } : {};
    
    const exhibitions = await prisma.exhibition.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
    return exhibitions;
  } catch (error) {
    console.error("Error fetching exhibitions:", error);
    return [];
  }
}
