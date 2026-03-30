import { getProductsAction } from "@/actions/product-actions";
import ProductTable from "@/components/admin/ProductTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    const res = await getProductsAction(1, 100);
    const products = res.items || [];

    return (
        <div className="p-6 bg-white min-h-screen">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div>
                     <div className="text-xs text-gray-500 mb-1">상품 &gt; 상품 관리 &gt; 상품 리스트</div>
                     <h1 className="text-2xl font-bold text-gray-900">상품 리스트</h1>
                </div>
                <Link href="/admin/products/create" className="btn btn-outline btn-error btn-sm rounded-sm bg-white hover:bg-red-50 hover:border-red-600 text-red-500">
                    <Plus size={14} /> 상품 등록
                </Link>
            </div>
            
            

            <ProductTable initialProducts={products} />
        </div>
    );
}
