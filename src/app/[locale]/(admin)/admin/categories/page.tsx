import { getCategories } from "@/lib/admin/categories";
import CategoryList from "./CategoryList";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                <p className="text-muted-foreground">
                    Manage product categories and hierarchy.
                </p>
            </div>

            <CategoryList initialCategories={categories} />
        </div>
    );
}
