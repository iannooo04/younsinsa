import { getProducts } from "@/lib/admin/products";
import ProductTable from "@/components/admin/ProductTable";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Products</h1>
                    <p className="text-muted-foreground">Manage your products inventory.</p>
                </div>
            </div>
            
            <ProductTable initialProducts={products} />
        </div>
    );
}
