import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
// import { randomBytes } from "crypto";

// function makeReferralCode(username: string): string {
//     const prefix = username
//         .replace(/[^a-z0-9]/g, "")
//         .slice(0, 4)
//         .toUpperCase()
//         .padEnd(4, "X");
//     const rand = randomBytes(4).toString("hex").toUpperCase().slice(0, 6);
//     return `${prefix}${rand}`;
// }

export async function POST(req: Request) {
    try {
        const { email, password, username, name, nickname } = await req.json();

        if (!email || !password || !username || !name || !nickname) {
            return NextResponse.json(
                { ok: false, message: "필수 정보가 누락되었습니다." },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }, { nickname }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { ok: false, message: "이미 사용 중인 이메일 또는 닉네임입니다." },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);

        console.log("Creating user with:", { email, username, name, nickname });

        const newUser = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    username,
                    name,
                    nickname,
                    passwordHash,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { ok: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
