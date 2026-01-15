import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";

export interface GetUsersParams {
    page?: number;
    limit?: number;
    query?: string;
}

export interface UserResult {
    id: string;
    name: string;
    email: string;
    username: string;
    createdAt: Date;
    info: {
        gradeId: string | null;
    } | null;
    country: {
        name: string;
        code: string;
    } | null;
}

export async function getUsers({ page = 1, limit = 10, query }: GetUsersParams) {
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = query
        ? {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
                { username: { contains: query, mode: "insensitive" } },
            ],
        }
        : {};

    const [users, total] = await Promise.all([
        prisma.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                createdAt: true,
                info: {
                    select: {
                        gradeId: true,
                    },
                },
                country: {
                    select: {
                        name: true,
                        code: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma.user.count({ where }),
    ]);

    return {
        users,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
}
