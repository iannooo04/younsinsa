"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    ListOrdered,
    Tags,
    Settings,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { useState } from "react";

const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Products", href: "/admin/products", icon: ShoppingBag },
    { name: "Orders", href: "/admin/orders", icon: ListOrdered },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={`bg-base-100 border-r flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
                } h-screen sticky top-0`}
        >
            <div className="p-4 flex items-center justify-between border-b">
                {!isCollapsed && <span className="font-bold text-xl tracking-tight text-primary">ADMIN</span>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="btn btn-ghost btn-sm btn-square"
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname.includes(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-colors ${isActive
                                ? "bg-primary text-primary-content"
                                : "hover:bg-base-200 text-base-content/80 hover:text-base-content"
                                }`}
                        >
                            <item.icon size={20} />
                            {!isCollapsed && <span className="font-medium">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                {!isCollapsed && (
                    <div className="text-xs text-base-content/50 text-center">
                        &copy; 2025 YIMILI Admin
                    </div>
                )}
            </div>
        </aside>
    );
}
