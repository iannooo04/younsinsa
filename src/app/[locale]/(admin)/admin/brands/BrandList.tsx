"use client";

import { useRef, useState } from "react";
import { Folder, Trash2, Plus, Tag } from "lucide-react"; 
import { type CategoryWithChildren } from "@/lib/admin/categories"; 

interface BrandWithCount {
    id: string;
    name: string;
    slug: string | null;
    category: string | null;
    logoUrl: string | null;
    description: string | null; 
    parentId?: string | null; // Add parentId (optional in type for now)
    _count: {
        products: number;
    }
}

interface Props {
    initialBrands: BrandWithCount[];
    // categories: CategoryWithChildren[]; // Removed
}

export default function BrandList({ initialBrands }: Props) {
    const [brands, setBrands] = useState<BrandWithCount[]>(initialBrands);
    const [loading, setLoading] = useState(false);

    // Recursive function to show brand hierarchy in dropdown
    const renderBrandOptions = (allBrands: BrandWithCount[], parentId: string | null = null, level = 0): React.ReactNode[] => {
        const nodes: React.ReactNode[] = [];
        allBrands
            .filter((b) => b.parentId == parentId) // This requires brands to have parentId property loaded. 
            // Warning: initialBrands sent from server need to include parentId. 
            // If API didn't fetch parentId, this filtering will fail (all undefined == undefined -> infinite loop or wrong).
            // Let's assume getBrands() fetches ALL fields. Prisma findMany returns all scalar fields by default.
            // But 'parentId' is scalar, so it should be there.
            .forEach((brand) => {
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
        
        try {
            const res = await fetch("/api/admin/brands", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const listRes = await fetch("/api/admin/brands");
                if (listRes.ok) {
                    setBrands(await listRes.json());
                }

                const form = e.target as HTMLFormElement;
                form.reset();
            } else {
                const data = await res.json();
                alert(data.error || data.details || "Failed to create brand");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating brand");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete brand "${name}"?`)) return;

        try {
            const res = await fetch(`/api/admin/brands?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                const listRes = await fetch("/api/admin/brands");
                if (listRes.ok) {
                    setBrands(await listRes.json());
                }
            } else {
                alert("Failed to delete brand");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting brand");
        }
    };

    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body">
                    <h3 className="card-title text-lg mb-4">Add New Brand</h3>
                    <form onSubmit={handleCreate} className="flex gap-4 items-end flex-wrap">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Brand Name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                         <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Slug</span>
                                <span className="label-text-alt text-gray-500">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                name="slug"
                                placeholder="brand-slug"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Parent Brand (Optional)</span>
                            </label>
                            <select name="parentId" className="select select-bordered w-full" defaultValue="">
                                <option value="">None (Top Level)</option>
                                {renderBrandOptions(brands)}
                            </select>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Logo</span>
                                <span className="label-text-alt text-gray-500">(Optional)</span>
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                            />
                        </div>
                        
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <span className="loading loading-spinner loading-xs"></span> : <Plus size={16} />}
                            Add
                        </button>
                    </form>
                </div>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body p-0">
                    <div className="p-4 border-b bg-base-200/50">
                        <h3 className="font-bold flex items-center gap-2">
                            <Tag size={18} /> Brand List
                        </h3>
                    </div>
                    <div className="p-2">
                        {brands.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">No brands found.</div>
                        ) : (
                            <div className="space-y-1">
                                {brands.map((brand) => (
                                    <div key={brand.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 border-b border-base-200/50">
                                        <div className="flex items-center gap-3">
                                            {brand.logoUrl ? (
                                                <div className="avatar">
                                                    <div className="w-8 rounded-full border border-base-300">
                                                        <img src={brand.logoUrl} alt={brand.name} />
                                                    </div>
                                                </div>
                                            ) : (
                                                 <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center text-xs font-bold text-base-content/50">
                                                    {brand.name.substring(0, 2).toUpperCase()}
                                                 </div>
                                            )}
                                            
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{brand.name}</span>
                                                    {brand.slug && <span className="badge badge-sm badge-ghost text-xs">{brand.slug}</span>}
                                                </div>
                                                 <span className="text-xs text-muted-foreground ml-2">
                                                    ({brand._count.products} products)
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={() => handleDelete(brand.id, brand.name)}
                                            className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
