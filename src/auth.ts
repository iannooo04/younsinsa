import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("MISSING_CREDENTIALS");
                }

                // 1. Try to find user in User table
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                    include: { info: true },
                });

                if (user) {
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password as string,
                        user.passwordHash || ""
                    );

                    if (!isPasswordValid) {
                        throw new Error("INVALID_PASSWORD");
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        level: 1, // Default, as schema doesn't have level property
                    };
                }

                // 2. Try to find admin in Admin table
                const admin = await prisma.admin.findFirst({
                    where: {
                        OR: [
                            { userId: credentials.email as string },
                            { email: credentials.email as string },
                        ],
                    },
                });

                if (admin) {
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password as string,
                        admin.passwordHash
                    );

                    if (!isPasswordValid) {
                        throw new Error("INVALID_PASSWORD");
                    }

                    return {
                        id: admin.id,
                        email: admin.email,
                        name: admin.name,
                        level: 99, // Admin level
                        isAdmin: true,
                    };
                }

                throw new Error("USER_NOT_FOUND");
            },
        }),
    ],
});
