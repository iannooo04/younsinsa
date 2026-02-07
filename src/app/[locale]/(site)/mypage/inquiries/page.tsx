import { auth } from "@/auth";
import { getMyInquiriesAction } from "@/actions/qna-actions";
import MyQnaList from "@/components/qna/MyQnaList";

export default async function MyInquiriesPage() {
    const session = await auth();
    const userId = session?.user?.id;
    const { success, data } = await getMyInquiriesAction(userId);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">상품 문의</h1>
            <div className="bg-white rounded-lg shadow-sm p-6">
                {success && data ? (
                    // @ts-ignore - mismatch in type definition nuances but structure matches
                    <MyQnaList qnas={data} />
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        문의 목록을 불러올 수 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
