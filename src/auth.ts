import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
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

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                    include: { info: true },
                });

                if (!user) {
                    throw new Error("USER_NOT_FOUND");
                }

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
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.level = (user as any).level;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                (session.user as any).level = token.level;
            }
            return session;
        },
    },
    pages: {
        signIn: "/member/login",
    },
});
