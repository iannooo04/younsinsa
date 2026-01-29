
import { getBrands } from "@/lib/admin/brands";
import { getCategories } from "@/lib/admin/categories";
import { getProduct } from "@/lib/admin/products";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
    const { id } = await params;

    const [brands, categories, product] = await Promise.all([
        getBrands(),
        getCategories(),
        getProduct(id),
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Edit Product</h1>
                    <p className="text-muted-foreground">Edit existing product.</p>
                </div>
            </div>
            
            <ProductForm brands={brands} categories={categories} initialProduct={product} />
        </div>
    );
}
