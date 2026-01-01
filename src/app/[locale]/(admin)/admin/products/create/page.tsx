import { getBrands } from "@/lib/admin/brands";
import { getCategories } from "@/lib/admin/categories";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function CreateProductPage() {
    const [brands, categories] = await Promise.all([
        getBrands(),
        getCategories(),
    ]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Register Product</h1>
                    <p className="text-muted-foreground">Add a new product to your inventory.</p>
                </div>
            </div>
            
            <ProductForm brands={brands} categories={categories} />
        </div>
    );
}
