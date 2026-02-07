
import { auth } from "@/auth";
import { getMyPageDataAction } from "@/actions/user-actions";
import MyPageView from "./MyPageView";

export default async function MyPage() {
  const session = await auth();
  
  // Fetch real data
  const result = await getMyPageDataAction(session?.user?.id as string);
  
  return <MyPageView user={result.user || null} />;
}
