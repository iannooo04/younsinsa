"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    ListOrdered,
    Tags,
    Tag,
    Settings,
    ChevronLeft,
    ChevronRight,
    Image,
    Layers,
    Minus,
    Plus
} from "lucide-react";
import { useState } from "react";

type MenuItem = {
    name: string;
    href?: string;
    icon: any;
    subItems?: { name: string; href: string }[];
};

const menuItems: MenuItem[] = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    {
        name: "상품 관리",
        icon: ShoppingBag,
        subItems: [
            { name: "상품 리스트", href: "/admin/products" },
            { name: "상품 등록", href: "/admin/products/create" },
            { name: "자주쓰는 옵션 관리", href: "/admin/options" },
            { name: "상품 혜택 관리", href: "#" },
            { name: "상품 아이콘 관리", href: "#" },
            { name: "상품 필수정보 관리", href: "#" },
            { name: "삭제 상품 관리", href: "#" },
            { name: "상품 재입고 알림 신청 관리", href: "#" },
        ]
    },
    { name: "Orders", href: "/admin/orders", icon: ListOrdered },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Brands", href: "/admin/brands", icon: Tag },
    { name: "Images", href: "/admin/images", icon: Image },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenus, setOpenMenus] = useState<string[]>(["상품 관리"]);

    const toggleMenu = (name: string) => {
        setOpenMenus(prev => 
            prev.includes(name) 
                ? prev.filter(item => item !== name) 
                : [...prev, name]
        );
    };

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
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isActive = item.href ? pathname.includes(item.href) : false;
                    const isOpen = openMenus.includes(item.name);

                    if (hasSubItems) {
                        return (
                            <div key={item.name} className="space-y-1">
                                <button
                                    onClick={() => !isCollapsed && toggleMenu(item.name)}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors hover:bg-base-200 text-base-content/80 hover:text-base-content ${isCollapsed ? 'justify-center' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon size={20} />
                                        {!isCollapsed && <span className="font-medium">{item.name}</span>}
                                    </div>
                                    {!isCollapsed && (
                                        isOpen ? <Minus size={16} /> : <Plus size={16} />
                                    )}
                                </button>
                                
                                {!isCollapsed && isOpen && (
                                    <div className="pl-12 space-y-1 border-l-2 border-base-200 ml-5 my-2">
                                        {item.subItems!.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className={`block px-3 py-2 text-sm rounded-r-lg transition-colors ${
                                                    pathname === sub.href
                                                        ? "text-primary font-bold bg-primary/5"
                                                        : "text-base-content/60 hover:text-base-content hover:bg-base-100"
                                                }`}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            href={item.href!}
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
