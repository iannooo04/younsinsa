"use client";

import { useState } from "react";
import { Trash2, Image as ImageIcon, Plus } from "lucide-react";
import Link from 'next/link';

interface Props {
    initialProducts: any[];
}

export default function ProductTable({ initialProducts }: Props) {
    const [products, setProducts] = useState(initialProducts);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete product "${name}"?`)) return;

        try {
            const res = await fetch(`/api/admin/products?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                 const listRes = await fetch("/api/admin/products");
                 if (listRes.ok) setProducts(await listRes.json());
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Link href="/admin/products/create" className="btn btn-primary">
                    <Plus size={16} />
                    Add New Product
                </Link>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body p-0">
                    <div className="p-4 border-b bg-base-200/50">
                        <h3 className="font-bold">Product List ({products.length})</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Gender</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product: any) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded">
                                                    {product.images?.[0]?.url ? (
                                                        <img src={product.images[0].url} alt={product.name} />
                                                    ) : (
                                                        <div className="bg-base-200 w-full h-full flex items-center justify-center">
                                                            <ImageIcon size={20} className="text-base-content/30" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{product.name}</div>
                                            <div className="text-xs opacity-50">{product.id}</div>
                                            <div className="flex gap-1 mt-1">
                                                {product.tags?.map((tag:string, i:number) => (
                                                    <span key={i} className="badge badge-xs badge-ghost">{tag}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>{product.brand?.name}</td>
                                        <td>{product.category?.name}</td>
                                        <td><span className="badge badge-ghost badge-sm">{product.gender}</span></td>
                                        <td>{product.price.toLocaleString()}</td>
                                        <td>
                                            <button 
                                                onClick={() => handleDelete(product.id, product.name)}
                                                className="btn btn-ghost btn-xs text-error"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
