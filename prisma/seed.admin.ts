// prisma/seed.admin.ts
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

/** ---- 환경/상수 ----
 * 필요 시 아래 값들을 수정하세요.
 */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Admin1234!@";
const ADMIN_EMAIL = "admin@yimili.com"; // 필요한 실제 이메일로 교체
const ADMIN_NAME = "admin"; // 필요 시 변경
const ADMIN_LEVEL = 31;

/** ---- 유틸 ---- */
function makeReferralCode(username: string): string {
    const prefix = username
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 4)
        .toUpperCase()
        .padEnd(4, "X");
    const rand = randomBytes(4).toString("hex").toUpperCase().slice(0, 6);
    return `${prefix}${rand}`;
}

function isKnownPrismaError(
    e: unknown
): e is Prisma.PrismaClientKnownRequestError {
    return e instanceof Prisma.PrismaClientKnownRequestError;
}

async function upsertAdmin(): Promise<void> {
    // 비밀번호 해시
    const passwordHash: string = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await prisma.$transaction(async (tx) => {
        // 1) 사용자 upsert (username은 @unique 가정)
        const user = await tx.user.upsert({
            where: { username: ADMIN_USERNAME },
            create: {
                username: ADMIN_USERNAME,
                email: ADMIN_EMAIL,
                name: ADMIN_NAME,
                passwordHash,
                countryCode: null,
            },
            update: {
                email: ADMIN_EMAIL,
                name: ADMIN_NAME,
                passwordHash,
            },
            select: { id: true },
        });

        // 2) UserInfo 존재 여부 확인
        const existingInfo = await tx.userInfo.findUnique({
            where: { userId: user.id },
            select: { userId: true },
        });

        if (!existingInfo) {
            // referralCode 유니크 충돌(P2002) 대비 재시도
            let referralCode: string = makeReferralCode(ADMIN_USERNAME);
            for (let i = 0; i < 5; i++) {
                try {
                    await tx.userInfo.create({
                        data: {
                            userId: user.id,
                            referralCode,
                            level: ADMIN_LEVEL,
                        },
                    });
                    break;
                } catch (e: unknown) {
                    if (isKnownPrismaError(e) && e.code === "P2002") {
                        referralCode = makeReferralCode(ADMIN_USERNAME);
                        if (i === 4) throw e;
                    } else {
                        throw e;
                    }
                }
            }
        } else {
            // 이미 있으면 레벨만 보정
            await tx.userInfo.update({
                where: { userId: user.id },
                data: { level: ADMIN_LEVEL },
            });
        }
    });
}

async function main(): Promise<void> {
    await upsertAdmin();

    // 검증 출력
    const data = await prisma.user.findUnique({
        where: { username: ADMIN_USERNAME },
        select: {
            id: true,
            username: true,
            email: true,
            name: true,
            createdAt: true,
            info: {
                select: { level: true, referralCode: true },
            },
        },
    });

    // eslint-disable-next-line no-console
    console.log("Admin seed OK:", data);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err: unknown) => {
        // eslint-disable-next-line no-console
        console.error("Admin seed failed:", err);
        await prisma.$disconnect();
        process.exit(1);
    });
