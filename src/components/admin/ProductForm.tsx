"use client";

import { useState } from "react";
import { Plus, Image as ImageIcon } from "lucide-react";
import TipTapEditor from "@/components/ui/TipTapEditor";
import { useRouter } from "next/navigation";

interface Props {
    brands: any[];
    categories: any[];
}

export default function ProductForm({ brands, categories }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [detailContent, setDetailContent] = useState("");

    const renderCategoryOptions = (cats: any[], parentId: string | null = null, level = 0): React.ReactNode[] => {
        const nodes: React.ReactNode[] = [];
        cats
            .filter((c: any) => c.parentId === parentId)
            .forEach((category: any) => {
                nodes.push(
                    <option key={category.id} value={category.id}>
                        {level > 0 ? "\u00A0\u00A0".repeat(level) + "└ " : ""}{category.name}
                    </option>
                );
                nodes.push(...renderCategoryOptions(cats, category.id, level + 1));
            });
        return nodes;
    };
    
   const renderBrandOptions = (allBrands: any[], parentId: string | null = null, level = 0): React.ReactNode[] => {
        const nodes: React.ReactNode[] = [];
        allBrands
            .filter((b: any) => b.parentId == parentId)
            .forEach((brand: any) => {
                nodes.push(
                    <option key={brand.id} value={brand.id}>
                        {level > 0 ? "\u00A0\u00A0".repeat(level) + "└ " : ""}{brand.name}
                    </option>
                );
                nodes.push(...renderBrandOptions(allBrands, brand.id, level + 1));
            });
        return nodes;
    };


    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        formData.append("detailContent", detailContent);
        
        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Product created successfully!");
                router.push("/admin/products");
                router.refresh(); // Refresh to show new product in list
            } else {
                const data = await res.json();
                alert(data.error || "Failed to create product");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body">
                <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Product Name</span></label>
                        <input type="text" name="name" className="input input-bordered w-full" required />
                    </div>

                    {/* Brand */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Brand</span></label>
                        <select name="brandId" className="select select-bordered w-full" required defaultValue="">
                            <option value="" disabled>Select Brand</option>
                            {renderBrandOptions(brands)}
                        </select>
                    </div>

                        {/* Category */}
                        <div className="form-control w-full">
                        <label className="label"><span className="label-text">Category</span></label>
                        <select name="categoryId" className="select select-bordered w-full" required defaultValue="">
                            <option value="" disabled>Select Category</option>
                            {renderCategoryOptions(categories)}
                        </select>
                    </div>
                    
                    {/* Gender */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Gender</span></label>
                        <select name="gender" className="select select-bordered w-full" defaultValue="UNISEX">
                            <option value="UNISEX">Unisex</option>
                            <option value="MEN">Men</option>
                            <option value="WOMEN">Women</option>
                        </select>
                    </div>

                    {/* Price */}
                        <div className="form-control w-full">
                        <label className="label"><span className="label-text">Price</span></label>
                        <input type="number" name="price" className="input input-bordered w-full" required min="0" />
                    </div>

                        {/* Original Price */}
                        <div className="form-control w-full">
                        <label className="label"><span className="label-text">Original Price (Optional)</span></label>
                        <input type="number" name="originalPrice" className="input input-bordered w-full" min="0" />
                    </div>

                    {/* Supply Price */}
                        <div className="form-control w-full">
                        <label className="label"><span className="label-text">Supply Price (Cost)</span></label>
                        <input type="number" name="supplyPrice" className="input input-bordered w-full" min="0" />
                    </div>

                        {/* Tags */}
                        <div className="form-control w-full">
                        <label className="label"><span className="label-text">Search Tags (comma separated)</span></label>
                        <input type="text" name="tags" className="input input-bordered w-full" placeholder="summer, casual, new" />
                    </div>

                    <div className="divider md:col-span-2">Delivery & Legal</div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Shipping Fee</span></label>
                        <input type="number" name="shippingFee" className="input input-bordered w-full" defaultValue="0" min="0" />
                    </div>
                        <div className="form-control w-full">
                        <label className="label"><span className="label-text">Shipping Method</span></label>
                         <select name="shippingMethod" className="select select-bordered w-full" defaultValue="CJ">
                            <option value="CJ">CJ Logistics</option>
                            <option value="Post">Post Office</option>
                        </select>
                    </div>
                        <div className="form-control w-full">
                        <label className="label"><span className="label-text">Video URL</span></label>
                        <input type="text" name="videoUrl" className="input input-bordered w-full" placeholder="https://..." />
                    </div>
                    
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Material</span></label>
                        <input type="text" name="material" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                            <label className="label"><span className="label-text">Origin</span></label>
                        <input type="text" name="origin" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                            <label className="label"><span className="label-text">Manufacturer</span></label>
                        <input type="text" name="manufacturer" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full">
                            <label className="label"><span className="label-text">Wash Care</span></label>
                        <input type="text" name="washCare" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full md:col-span-2">
                            <label className="label"><span className="label-text">A/S Info</span></label>
                        <input type="text" name="asInfo" className="input input-bordered w-full" />
                    </div>
                    
                    <div className="divider md:col-span-2">Content</div>

                    {/* Description */}
                    <div className="form-control w-full md:col-span-2">
                        <label className="label"><span className="label-text">Short Description</span></label>
                        <textarea name="description" className="textarea textarea-bordered h-24" placeholder="Brief summary..."></textarea>
                    </div>

                        {/* Detail Content (TipTap) */}
                        <div className="form-control w-full md:col-span-2">
                        <label className="label"><span className="label-text">Detail Content (Rich Text)</span></label>
                        <TipTapEditor content={detailContent} onChange={setDetailContent} />
                    </div>

                    {/* Images */}
                    <div className="form-control w-full md:col-span-2">
                        <label className="label"><span className="label-text">Images</span></label>
                        <input type="file" name="images" className="file-input file-input-bordered w-full" multiple accept="image/*" />
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : <Plus size={16} />}
                            Register Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
