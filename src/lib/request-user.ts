import { auth } from "@/auth";

export type RequestUser = {
  userId: string | null;
  email: string | null;
  sessionJti: string | null;
};

/** 사용자 ID만 필요할 때 */
export async function getUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id || null;
}

/** 여러 값을 한 번에 */
export async function getRequestUser(): Promise<RequestUser> {
  const session = await auth();
  return {
    userId: session?.user?.id || null,
    email: session?.user?.email || null,
    sessionJti: null, // NextAuth v5 JWT에서는 jti를 세션 수준에서 직접 노출하지 않으므로 null 처리
  };
}

/** 어드민 여부: 사용자 레벨 21 이상만 어드민 */
export async function isAdmin(): Promise<boolean> {
  const session = await auth();
  const user = session?.user as any;
  if (!user || user.level === undefined) return false;

  const levelNum = Number(user.level);
  if (!Number.isFinite(levelNum)) return false;

  return levelNum > 20;
}
