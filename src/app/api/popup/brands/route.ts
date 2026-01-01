import { getBrands } from "@/lib/admin/brands";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    const brands = await getBrands();
    return NextResponse.json(brands);
}
