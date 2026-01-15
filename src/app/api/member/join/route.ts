import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

function makeReferralCode(username: string): string {
    const prefix = username
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 4)
        .toUpperCase()
        .padEnd(4, "X");
    const rand = randomBytes(4).toString("hex").toUpperCase().slice(0, 6);
    return `${prefix}${rand}`;
}

export async function POST(req: Request) {
    try {
        const { email, password, username, name, mobile } = await req.json();

        if (!email || !password || !username || !name || !mobile) {
            return NextResponse.json(
                { ok: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { ok: false, message: "User already exists with this email or username" },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    username,
                    name,
                    passwordHash,
                    mobile, // Added required field
                },
            });

            // Removed invalid referralCode and level fields
            await tx.userInfo.create({
                data: {
                    userId: user.id,
                },
            });

            return user;
        });

        return NextResponse.json({
            ok: true,
            data: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { ok: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
