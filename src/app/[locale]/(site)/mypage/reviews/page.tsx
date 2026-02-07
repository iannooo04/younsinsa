import { auth } from "@/auth";
import { getMyReviewsAction } from "@/actions/review-actions";
import MyReviewList from "@/components/review/MyReviewList";

export default async function MyReviewsPage() {
    const session = await auth();
    const userId = session?.user?.id;
    const { success, data } = await getMyReviewsAction(userId);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">상품 후기</h1>
            <div className="bg-white rounded-lg shadow-sm p-6">
                {success && data ? (
                    <MyReviewList reviews={data} />
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        후기 목록을 불러올 수 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
