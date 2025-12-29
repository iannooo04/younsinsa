import { redirect } from "next/navigation";

export default function LocaleIndexPage() {
  // ✅ [수정] 처음 접속 시 yimili 추천 페이지로 이동 (파라미터 포함)
  redirect("/main/yimili/recommend?gf=A");
}
