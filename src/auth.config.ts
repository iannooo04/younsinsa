
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/member/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                token.level = (user as any).level;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (session.user as any).level = token.level;
            }
            return session;
        },
    },
    providers: [], // Providers are configured in auth.ts
    session: { strategy: "jwt" },
} satisfies NextAuthConfig;
