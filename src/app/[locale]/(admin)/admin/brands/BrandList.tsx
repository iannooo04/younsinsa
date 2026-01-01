"use client";

import { useState } from "react";
import { Folder, Trash2, Plus, Tag, ChevronDown, ChevronRight } from "lucide-react";

interface BrandWithCount {
    id: string;
    name: string;
    slug: string | null;
    category: string | null;
    logoUrl: string | null;
    description: string | null;
    parentId?: string | null;
    _count: {
        products: number;
    }
}

interface Props {
    initialBrands: BrandWithCount[];
}

export default function BrandList({ initialBrands }: Props) {
    const [brands, setBrands] = useState<BrandWithCount[]>(initialBrands);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const renderBrandOptions = (allBrands: BrandWithCount[], parentId: string | null = null, level = 0): React.ReactNode[] => {
        const nodes: React.ReactNode[] = [];
        allBrands
            .filter((b) => b.parentId == parentId)
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

    const renderTree = (allBrands: BrandWithCount[], parentId: string | null = null, level = 0) => {
        return allBrands
            .filter((b) => b.parentId == parentId)
            .map((brand) => {
                const hasChildren = allBrands.some((b) => b.parentId === brand.id);
                const isExpanded = expanded[brand.id];

                return (
                    <div key={brand.id} className="select-none">
                        <div
                            className={`flex items-center justify-between p-3 rounded-lg hover:bg-base-200 border-b border-base-200/50 ${level > 0 ? "ml-6 border-l-2 border-l-base-300" : ""}`}
                        >
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleExpand(brand.id)}
                                    className={`btn btn-ghost btn-xs btn-square ${!hasChildren && "invisible"}`}
                                >
                                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>
                                <Folder size={18} className="text-secondary" />
                                {brand.logoUrl && (
                                    <div className="avatar mr-2">
                                        <div className="w-8 h-8 rounded border border-base-300">
                                            <img src={brand.logoUrl} alt={brand.name} className="object-cover" />
                                        </div>
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
                        {isExpanded && renderTree(allBrands, brand.id, level + 1)}
                    </div>
                );
            });
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
                                {renderTree(brands)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
