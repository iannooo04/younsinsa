

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { Trash2, RefreshCcw, ExternalLink, Folder, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- Types ---
interface S3File {
    key: string;
    size: number;
    lastModified: string;
    url: string;
}

interface Category {
    id: string;
    name: string;
    parentId: string | null;
    children?: Category[];
}

interface Brand {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
    children?: Brand[];
}

// --- Tree Component ---
const TreeItem = ({ 
    label, 
    id, 
    currentFullPath, // Changed from pathPrefix
    childrenItems, 
    onSelect, 
    isActive 
}: { 
    label: string, 
    id: string, 
    currentFullPath: string, 
    childrenItems?: any[], 
    onSelect: (path: string) => void,
    isActive: (path: string) => boolean
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const path = `${currentFullPath}/${id}`; // No trailing slash here to keep clean, usually add / for folder later or effectively usage

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (childrenItems && childrenItems.length > 0) {
            setIsOpen(!isOpen);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(path + "/"); // Add slash for folder navigation
        if (childrenItems && childrenItems.length > 0) {
            setIsOpen(true); 
        }
    };

    const active = isActive(path + "/");

    return (
        <div className="pl-3">
            <div 
                className={`flex items-center gap-1 py-1 px-2 rounded-md cursor-pointer text-sm transition-colors ${active ? 'bg-primary text-primary-content font-bold' : 'hover:bg-base-200 text-base-content'}`}
                onClick={handleClick}
            >
                {childrenItems && childrenItems.length > 0 ? (
                    <button onClick={handleToggle} className="p-0.5 hover:bg-black/10 rounded">
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                ) : (
                    <span className="w-4" /> // Spacer
                )}
                <Folder size={14} className={active ? "fill-current" : "text-yellow-500 fill-yellow-500"} />
                <span className="truncate">{label} <span className="text-[10px] opacity-70 ml-1">({id})</span></span>
            </div>
            {isOpen && childrenItems && (
                <div className="border-l border-base-300 ml-2">
                    {childrenItems.map((child: any) => (
                        <TreeItem 
                            key={child.id} 
                            id={child.id} 
                            label={child.name} 
                            currentFullPath={path} // Pass accumulated path
                            childrenItems={child.children} 
                            onSelect={onSelect}
                            isActive={isActive}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function AdminImagesPage() {
    // --- State ---
    const [folders, setFolders] = useState<string[]>([]);
    const [files, setFiles] = useState<S3File[]>([]);
    const [currentPath, setCurrentPath] = useState("");
    const [loading, setLoading] = useState(true);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    // Metadata State
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [metaLoading, setMetaLoading] = useState(true);

    // --- Actions ---
    const fetchMetadata = async () => {
        setMetaLoading(true);
        try {
            const [catRes, brandRes] = await Promise.all([
                fetch("/api/admin/categories"),
                fetch("/api/admin/brands")
            ]);
            
            if (catRes.ok) setCategories(await catRes.json());
            if (brandRes.ok) setBrands(await brandRes.json());
        } catch (error) {
            console.error("Error fetching metadata:", error);
        } finally {
            setMetaLoading(false);
        }
    };

    const fetchImages = async (path: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/images?prefix=${encodeURIComponent(path)}`);
            if (res.ok) {
                const data = await res.json();
                setFolders(data.folders || []);
                setFiles(data.files || []);
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
        fetchMetadata();
    }, []);

    useEffect(() => {
        fetchImages(currentPath);
    }, [currentPath]);

    const handleNavigate = (folder: string) => {
        setCurrentPath(folder);
    };

    const handleBreadcrumbClick = (index: number) => {
        const parts = currentPath.split("/").filter(Boolean);
        const newPath = parts.slice(0, index + 1).join("/") + "/";
        setCurrentPath(index === -1 ? "" : newPath);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", currentPath);

        try {
            const res = await fetch("/api/admin/images", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                fetchImages(currentPath); 
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error(error);
            alert("Error uploading image");
        } finally {
            setUploading(false);
            e.target.value = ""; 
        }
    };

    const handleDelete = async (key: string) => {
        if (!confirm("Are you sure you want to delete this image?")) return;

        setDeletingKey(key);
        try {
            const res = await fetch(`/api/admin/images?key=${encodeURIComponent(key)}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setFiles((prev) => prev.filter((img) => img.key !== key));
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

    // Flatten categories and brands for quick ID lookup
    const idToNameMap = useMemo(() => {
        const map = new Map<string, string>();
        
        const traverse = (items: any[]) => {
            items.forEach(item => {
                map.set(item.id, item.name);
                if (item.children) traverse(item.children);
            });
        };
        
        traverse(categories);
        traverse(brands);
        return map;
    }, [categories, brands]);

    // Helper to check active state
    const isPathActive = (path: string) => currentPath === path;

    // Filter top-level items for trees
    const rootCategories = categories.filter(c => !c.parentId);
    const rootBrands = brands.filter(b => !b.parentId);

    const pathParts = currentPath.split("/").filter(Boolean);

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            {/* ... Sidebar ... */}
            <div className="w-64 bg-base-100 border-r border-base-200 flex flex-col shrink-0">
                <div className="p-4 border-b border-base-200">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        <Folder size={18} />
                        System Structure
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {metaLoading ? (
                        <div className="flex justify-center p-4"><span className="loading loading-spinner loading-sm"></span></div>
                    ) : (
                        <div className="space-y-4">
                            {/* Root Item */}
                            <div>
                                <div 
                                    className={`flex items-center gap-2 py-1.5 px-3 rounded-md cursor-pointer text-sm font-medium ${currentPath === "" ? "bg-primary text-primary-content" : "hover:bg-base-200"}`}
                                    onClick={() => setCurrentPath("")}
                                >
                                    <span className="text-lg">🏠</span> Root
                                </div>
                            </div>

                            {/* Brands Tree */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase px-3 mb-1">Brands</h3>
                                {rootBrands.map(brand => (
                                    <TreeItem 
                                        key={brand.id}
                                        id={brand.id}
                                        label={brand.name}
                                        currentFullPath="brands"
                                        childrenItems={brand.children}
                                        onSelect={setCurrentPath}
                                        isActive={isPathActive}
                                    />
                                ))}
                            </div>

                            {/* Categories Tree */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase px-3 mb-1 mt-4">Categories</h3>
                                {rootCategories.map(cat => (
                                    <TreeItem 
                                        key={cat.id}
                                        id={cat.id}
                                        label={cat.name}
                                        currentFullPath="categories"
                                        childrenItems={cat.children}
                                        onSelect={setCurrentPath}
                                        isActive={isPathActive}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ... Right Content ... */}
            <div className="flex-1 flex flex-col overflow-hidden bg-base-50">
                {/* Header */}
                <div className="p-6 pb-0 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Image Management</h1>
                    <div className="flex gap-2">
                        <label className={`btn btn-sm btn-primary gap-2 ${uploading ? 'loading' : ''}`}>
                            {uploading ? 'Uploading...' : 'Upload Here'}
                            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                        </label>
                        <button
                            onClick={() => fetchImages(currentPath)}
                            className="btn btn-sm btn-ghost gap-2"
                            disabled={loading}
                        >
                            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="px-6 pt-4">
                     <div className="text-sm breadcrumbs py-2 px-4 bg-white rounded-lg border border-base-200 shadow-sm">
                        <ul>
                            <li>
                                <button onClick={() => setCurrentPath("")} className="flex items-center gap-1 hover:text-primary">
                                    <span className="font-bold">Root</span>
                                </button>
                            </li>
                            {pathParts.map((part, index) => (
                                <li key={index}>
                                    <button onClick={() => handleBreadcrumbClick(index)} className="hover:text-primary font-medium">
                                        {part}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Grid Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="py-20 text-center">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                        </div>
                    ) : folders.length === 0 && files.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-lg border border-base-200 shadow-sm">
                            <p className="text-muted-foreground">No items found in <span className="font-bold">/{currentPath}</span></p>
                            <p className="text-xs text-gray-400 mt-1">Upload a file to create this folder automatically.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 pb-20">
                            {/* Folders */}
                            {folders.map((folder) => {
                               const folderKey = folder.replace(currentPath, "").replace("/", ""); // This is the ID or folder name
                               const displayName = idToNameMap.get(folderKey) || folderKey;
                               
                               return (
                                <div 
                                    key={folder} 
                                    onClick={() => handleNavigate(folder)}
                                    className="card bg-yellow-50 shadow-sm border border-yellow-100 group cursor-pointer hover:shadow-md transition-all aspect-square"
                                >
                                    <div className="card-body p-2 flex flex-col items-center justify-center">
                                        <span className="text-5xl mb-2">📁</span>
                                        <span className="text-sm font-bold text-center truncate w-full px-1">{displayName}</span>
                                        {displayName !== folderKey && (
                                            <span className="text-[10px] text-gray-400 truncate w-full text-center">{folderKey}</span>
                                        )}
                                    </div>
                                </div>
                               );
                            })}

                            {/* Files */}
                            {files.map((img) => (
                                <div key={img.key} className="card bg-white shadow-sm border border-base-200 group">
                                    <figure className="relative aspect-square bg-base-200/50 overflow-hidden">
                                        <Image
                                            src={img.url}
                                            alt={img.key}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            sizes="200px"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </figure>
                                    <div className="card-body p-2">
                                        <div className="flex justify-between items-start gap-1">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-xs font-medium truncate" title={img.key}>
                                                    {img.key.replace(currentPath, "")}
                                                </h3>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                                    {formatSize(img.size)}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <Link
                                                    href={img.url}
                                                    target="_blank"
                                                    className="btn btn-ghost btn-xs btn-square h-6 w-6 text-muted-foreground hover:text-primary"
                                                    title="Open"
                                                >
                                                    <ExternalLink size={12} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(img.key)}
                                                    className="btn btn-ghost btn-xs btn-square h-6 w-6 text-error hover:bg-error/10"
                                                    title="Delete"
                                                    disabled={deletingKey === img.key}
                                                >
                                                    {deletingKey === img.key ? (
                                                        <span className="loading loading-spinner loading-xs scale-50"></span>
                                                    ) : (
                                                        <Trash2 size={12} />
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
            </div>
        </div>
    );
}
