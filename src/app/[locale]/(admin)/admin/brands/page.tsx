import { getBrands } from "@/lib/admin/brands";
import BrandList from "./BrandList";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
    const brands = await getBrands();

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Brands</h2>
                <p className="text-muted-foreground">Manage product brands.</p>
            </div>
            <BrandList initialBrands={brands} />
        </div>
    );
}
