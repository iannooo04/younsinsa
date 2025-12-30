import { getUsers } from "@/lib/admin/users";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const query = searchParams.get("query") || undefined;

    const result = await getUsers({ page, limit, query });

    return NextResponse.json(result);
}
