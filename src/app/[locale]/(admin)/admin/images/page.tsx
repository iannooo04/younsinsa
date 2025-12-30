
"use client";

import { useEffect, useState } from "react";
import { Trash2, RefreshCcw, ExternalLink } from "lucide-react";
import Link from "next/link";

interface S3File {
    key: string;
    size: number;
    lastModified: string;
    url: string;
}

export default function AdminImagesPage() {
    const [images, setImages] = useState<S3File[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/images");
            if (res.ok) {
                const data = await res.json();
                setImages(data);
            } else {
                alert("Failed to fetch images");
            }
        } catch (error) {
            console.error(error);
            alert("Error fetching images");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDelete = async (key: string) => {
        if (!confirm("Are you sure you want to delete this image? This cannot be undone.")) return;

        setDeletingKey(key);
        try {
            const res = await fetch(`/api/admin/images?key=${encodeURIComponent(key)}`, {
                method: "DELETE",
            });

            if (res.ok) {
                // Remove from local state
                setImages((prev) => prev.filter((img) => img.key !== key));
            } else {
                alert("Failed to delete image");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting image");
        } finally {
            setDeletingKey(null);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Image Management</h1>
                <button
                    onClick={fetchImages}
                    className="btn btn-sm btn-ghost gap-2"
                    disabled={loading}
                >
                    <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-lg border border-base-200">
                    <p className="text-muted-foreground">No images found in Bucket.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {images.map((img) => (
                        <div key={img.key} className="card bg-base-100 shadow-sm border border-base-200 group">
                            <figure className="relative aspect-square bg-base-200/50 overflow-hidden">
                                <img
                                    src={img.url}
                                    alt={img.key}
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </figure>
                            <div className="card-body p-3">
                                <div className="flex justify-between items-start gap-2">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-xs font-medium truncate" title={img.key}>
                                            {img.key}
                                        </h3>
                                        <p className="text-[10px] text-muted-foreground mt-1">
                                            {formatSize(img.size)} • {new Date(img.lastModified).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Link
                                            href={img.url}
                                            target="_blank"
                                            className="btn btn-ghost btn-xs btn-square text-muted-foreground hover:text-primary"
                                            title="Open in new tab"
                                        >
                                            <ExternalLink size={14} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(img.key)}
                                            className="btn btn-ghost btn-xs btn-square text-error hover:bg-error/10"
                                            title="Delete"
                                            disabled={deletingKey === img.key}
                                        >
                                            {deletingKey === img.key ? (
                                                <span className="loading loading-spinner loading-xs"></span>
                                            ) : (
                                                <Trash2 size={14} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
