"use client";

import { useState } from "react";
import { Folder, FolderPlus, Trash2, Plus, ChevronRight, ChevronDown } from "lucide-react";
import { type CategoryWithChildren } from "@/lib/admin/categories";

interface Props {
    initialCategories: CategoryWithChildren[];
}

export default function CategoryList({ initialCategories }: Props) {
    const [categories, setCategories] = useState<CategoryWithChildren[]>(initialCategories);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const parentId = formData.get("parentId") as string;
        const slug = formData.get("slug") as string;

        try {
            // Remove Content-Type header to let browser set boundary for FormData
            const res = await fetch("/api/admin/categories", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                // Fetch fresh data
                const listRes = await fetch("/api/admin/categories");
                if (listRes.ok) {
                    setCategories(await listRes.json());
                }

                // Reset form but keep parentId if needed.
                const form = e.target as HTMLFormElement;
                (form.elements.namedItem("name") as HTMLInputElement).value = "";

                // Reset file input
                const fileInput = form.elements.namedItem("image") as HTMLInputElement;
                if (fileInput) fileInput.value = "";
                // We do NOT reset parentId select.
            } else {
                alert("Failed to create category");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating category");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;

        try {
            const res = await fetch(`/api/admin/categories?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                // Fetch fresh data
                const listRes = await fetch("/api/admin/categories");
                if (listRes.ok) {
                    setCategories(await listRes.json());
                }
            } else {
                alert("Failed to delete category");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting category");
        }
    };

    const renderTree = (cats: CategoryWithChildren[], parentId: string | null = null, level = 0) => {
        return cats
            .filter((c) => c.parentId === parentId)
            .map((category) => {
                const hasChildren = cats.some((c) => c.parentId === category.id);
                const isExpanded = expanded[category.id];

                return (
                    <div key={category.id} className="select-none">
                        <div
                            className={`flex items-center justify-between p-3 rounded-lg hover:bg-base-200 border-b border-base-200/50 ${level > 0 ? "ml-6 border-l-2 border-l-base-300" : ""}`}
                        >
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleExpand(category.id)}
                                    className={`btn btn-ghost btn-xs btn-square ${!hasChildren && "invisible"}`}
                                >
                                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>
                                <Folder size={18} className="text-secondary" />
                                {category.imageUrl && (
                                    <div className="avatar mr-2">
                                        <div className="w-8 rounded">
                                            <img src={category.imageUrl} alt={category.name} />
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{category.name}</span>
                                        {category.code && <span className="badge badge-sm badge-ghost">{category.code}</span>}
                                    </div>
                                    <span className="text-xs text-muted-foreground ml-2">
                                        ({category._count.products} products)
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleDelete(category.id, category.name)}
                                    className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        {isExpanded && renderTree(cats, category.id, level + 1)}
                    </div>
                );
            });
    };

    const renderCategoryOptions = (cats: CategoryWithChildren[], parentId: string | null = null, level = 0): React.ReactNode[] => {
        const nodes: React.ReactNode[] = [];
        cats
            .filter((c) => c.parentId === parentId)
            .forEach((category) => {
                nodes.push(
                    <option key={category.id} value={category.id}>
                        {level > 0 ? "\u00A0\u00A0".repeat(level) + "└ " : ""}{category.name}
                    </option>
                );
                nodes.push(...renderCategoryOptions(cats, category.id, level + 1));
            });
        return nodes;
    };

    return (
        <div className="space-y-6">
            <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body">
                    <h3 className="card-title text-lg mb-4">Add New Category</h3>
                    <form onSubmit={handleCreate} className="flex gap-4 items-end">
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Category Name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>



                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Image</span>
                                <span className="label-text-alt text-gray-500">(Optional)</span>
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="file-input file-input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Parent Category (Optional)</span>
                            </label>
                            <select name="parentId" className="select select-bordered w-full" defaultValue="">
                                <option value="">None (Top Level)</option>
                                {renderCategoryOptions(categories)}
                            </select>
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
                            <FolderPlus size={18} /> Category Structure
                        </h3>
                    </div>
                    <div className="p-2">
                        {categories.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">No categories found.</div>
                        ) : (
                            renderTree(categories)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
