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
    Plus,
    BarChart
} from "lucide-react";
import { useState } from "react";

type SubItem = { name: string; href: string };
type MenuGroup = { title: string; items: SubItem[] };

type MenuItem = {
    name: string;
    href?: string;
    icon: any;
    subItems?: SubItem[];
    groups?: MenuGroup[];
};

const menuItems: MenuItem[] = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Images", href: "/admin/images", icon: Image },
    {
        name: "설정",
        href: "/admin/settings",
        icon: Settings,
        groups: [
            {
                title: "기본정책",
                items: [
                    { name: "기본 정보 설정", href: "/admin/settings" },
                    { name: "약관 / 개인정보처리방침", href: "/admin/settings/terms" },
                    { name: "부가세율 설정", href: "/admin/settings/vat" },
                    { name: "이용 / 탈퇴 안내", href: "/admin/settings/guide" },
                    { name: "금액 / 단위 기준 설정", href: "/admin/settings/currency" },
                    { name: "파일 저장소 관리", href: "/admin/settings/storage" },
                    { name: "저장소 경로 일괄 관리", href: "/admin/settings/storage-path" },
                    { name: "코드 관리", href: "/admin/settings/code" },
                    { name: "외부서비스 설정", href: "/admin/settings/external" },
                    { name: "검색엔진 최적화(SEO) 설정", href: "/admin/settings/seo" },
                ]
            },
            {
                title: "관리 정책",
                items: [
                    { name: "운영자 관리", href: "/admin/settings/manager" },
                    { name: "운영자 권한 설정", href: "/admin/settings/manager-permission" },
                    { name: "운영 보안 설정", href: "/admin/settings/security" },
                    { name: "쇼핑몰 이용 설정", href: "/admin/settings/mall-usage" },
                    { name: "비밀번호 찾기 설정", href: "/admin/settings/password-search" },
                    { name: "비밀번호 변경안내 설정", href: "/admin/settings/password-change-guide" },
                ]
            },
            {
                title: "해외상점",
                items: [
                    { name: "해외 상점 설정", href: "/admin/settings/global" },
                    { name: "환율 설정", href: "/admin/settings/exchange-rate" },
                    { name: "해외 배송조건 관리", href: "/admin/settings/overseas-shipping-condition" },
                    { name: "해외 배송그룹 관리", href: "/admin/settings/overseas-shipping-group" },
                    { name: "해외 결제 설정", href: "/admin/settings/overseas-payment" },
                ]
            },
            {
                title: "상품 정책",
                items: [
                    { name: "상품 기본 설정", href: "/admin/settings/product-basic" },
                    { name: "상품 이미지 사이즈 설정", href: "/admin/settings/product-image-size" },
                    { name: "상품 상세 이용안내 관리", href: "/admin/settings/product-usage-guide" },
                    { name: "최근 본 상품 설정", href: "/admin/settings/recent-products" },
                ]
            },
            {
                title: "본인확인 인증 서비스",
                items: [
                    { name: "휴대폰인증 설정", href: "/admin/settings/mobile-auth" },
                ]
            },
            {
                title: "주문 정책",
                items: [
                    { name: "주문 기본 설정", href: "/admin/settings/order-basic" },
                    { name: "주문 상태 설정", href: "/admin/settings/order-status" },
                    { name: "장바구니 / 관심상품 설정", href: "/admin/settings/cart-wishlist" },
                    { name: "주문서 추가정보 관리", href: "/admin/settings/order-additional-info" },
                    { name: "주문서 인쇄 설정", href: "/admin/settings/order-print" },
                ]
            },
            {
                title: "결제 정책",
                items: [
                    { name: "결제 수단 설정", href: "/admin/settings/payment-methods" },
                    { name: "전자결제(PG) 설정", href: "/admin/settings/pg-settings" },
                    { name: "알리페이 설정", href: "#" },
                    { name: "위챗페이 설정", href: "#" },
                ]
            },
            {
                title: "보안서버관리",
                items: [
                    { name: "관리자 보안서버 관리", href: "/admin/settings/ssl-admin" },
                    { name: "PC쇼핑몰 보안서버 관리", href: "/admin/settings/ssl-pc" },
                    { name: "모바일쇼핑몰 보안서버 관리", href: "/admin/settings/ssl-mobile" },
                ]
            }
        ]
    },
    {
        name: "상품",
        href: "/admin/products",
        icon: ShoppingBag,
        groups: [
            {
                title: "상품 관리",
                items: [
                    { name: "상품 리스트", href: "/admin/products" },
                    { name: "상품 등록", href: "/admin/products/create" },
                    { name: "자주쓰는 옵션 관리", href: "/admin/options" },
                    { name: "상품 필수정보 관리", href: "/admin/products/info" },
                    { name: "삭제 상품 관리", href: "/admin/products/deleted" },
                    { name: "상품 재입고 알림 신청 관리", href: "/admin/products/restock" },
                ]
            },
            {
                title: "상품 일괄 관리",
                items: [
                    { name: "상품 가격 관리", href: "/admin/products/price" },
                    { name: "상품 품절/노출/재고 관리", href: "/admin/products/stock-display" },
                    { name: "상품 이동/복사/삭제 관리", href: "/admin/products/move-copy-delete" },
                    { name: "상품 배송 관리", href: "/admin/products/shipping" },
                    { name: "상품 이미지 일괄 처리", href: "/admin/products/image-bulk-process" },
                    { name: "이미지호스팅 일괄전환", href: "/admin/products/image-hosting-conversion" },
                ]
            },
            {
                title: "상품 진열 관리",
                items: [
                    { name: "메인페이지 상품진열", href: "/admin/products/main-display" },
                    { name: "카테고리페이지 상품진열", href: "/admin/products/category-display" },
                    { name: "브랜드페이지 상품진열", href: "/admin/products/brand-display" },
                    { name: "검색페이지 상품진열", href: "/admin/products/search-display" },
                    { name: "품절상품 진열설정", href: "/admin/products/sold-out-display" },
                ]
            },
            {
                title: "상품 분류 관리",
                items: [
                    { name: "분류 설정 관리", href: "/admin/products/classification-settings" },
                    { name: "카테고리 관리", href: "/admin/categories" },
                    { name: "브랜드 관리", href: "/admin/brands" },
                ]
            },
            {
                title: "상품 노출형태 관리",
                items: [
                    { name: "테마 관리", href: "/admin/products/themes" },
                    { name: "관련상품 노출 설정", href: "/admin/products/related-product-exposure" },
                    { name: "상품상세 노출항목 설정", href: "/admin/products/product-detail-exposure-items" },
                    { name: "상품상세 공통정보 관리", href: "/admin/products/common-info" },
                    { name: "검색창 관련 설정", href: "/admin/products/search-settings" },
                    { name: "인기상품 노출 관리", href: "/admin/products/popular-products" },
                    { name: "검색창 추천상품 노출 설정", href: "/admin/products/search-recommendation" },
                ]
            },
            {
                title: "추가상품 관리",
                items: [
                    { name: "추가상품 관리", href: "/admin/products/add-on-products" },
                    { name: "추가상품 그룹 관리", href: "/admin/products/add-on-group" },
                ]
            },
            {
                title: "상품 엑셀 관리",
                items: [
                    { name: "상품 다운로드", href: "/admin/products/excel-download" },
                    { name: "상품 업로드", href: "/admin/products/excel-upload" },
                ]
            }
        ]
    },
    {
        name: "주문/배송",
        href: "/admin/orders",
        icon: ListOrdered,
        groups: [
            {
                title: "주문 관리",
                items: [
                    { name: "주문통합리스트", href: "/admin/orders" },
                    { name: "입금대기 리스트", href: "/admin/orders/deposit-wait" },
                    { name: "결제완료 리스트", href: "/admin/orders/payment-confirm" },
                    { name: "상품준비중 리스트", href: "/admin/orders/product-prep" },
                    { name: "배송중 리스트", href: "/admin/orders/in-delivery" },
                    { name: "배송완료 리스트", href: "/admin/orders/delivery-complete" },
                    { name: "구매확정 리스트", href: "/admin/orders/purchase-confirm" },
                    { name: "결제 중단/실패 리스트", href: "/admin/orders/payment-fail" },
                    { name: "송장일괄등록", href: "/admin/orders/invoice-bulk" },
                    { name: "주문 내역 삭제", href: "/admin/orders/delete-history" },
                ]
            },
            {
                title: "취소/교환/반품/환불 관리",
                items: [
                    { name: "취소 리스트", href: "/admin/orders/cancellation" },
                    { name: "교환 리스트", href: "/admin/orders/exchange" },
                    { name: "반품 리스트", href: "/admin/orders/return" },
                    { name: "환불 리스트", href: "/admin/orders/refund" },
                    { name: "고객 교환/반품/환불신청 관리", href: "/admin/orders/customer-claims" },
                ]
            },
            {
                title: "수기주문 관리",
                items: [
                    { name: "수기주문 등록", href: "/admin/orders/manual" },
                    { name: "자주쓰는 주소 관리", href: "/admin/orders/address-book" },
                ]
            },
            {
                title: "자동입금확인 서비스",
                items: [
                    { name: "자동입금확인 서비스 안내", href: "/admin/orders/auto-deposit-guide" },
                    { name: "자동입금확인 서비스 신청", href: "/admin/orders/auto-deposit-apply" },
                    { name: "입금조회/실시간입금확인", href: "/admin/orders/deposit-check" },
                    { name: "미확인 입금자 관리", href: "/admin/orders/unknown-deposit" },
                ]
            },
            {
                title: "현금영수증 관리",
                items: [
                    { name: "현금영수증 발급/조회", href: "/admin/orders/receipt-apply" },
                    { name: "현금영수증 개별발급", href: "/admin/orders/receipt-individual" },
                ]
            },
            {
                title: "세금계산서 관리(일반/전자)",
                items: [
                    { name: "세금계산서 설정", href: "/admin/orders/invoice-setting" },
                    { name: "발행 요청 리스트", href: "/admin/orders/invoice-request" },
                    { name: "발행 내역 리스트", href: "/admin/orders/invoice-history" },
                ]
            }
        ]
    },
    {
        name: "회원",
        href: "/admin/users",
        icon: Users,
        groups: [
            {
                title: "회원 관리",
                items: [
                    { name: "회원 리스트", href: "/admin/users" },
                    { name: "회원 등록", href: "/admin/users/create" },
                    { name: "회원 엑셀 업로드", href: "/admin/users/excel-upload" },
                    { name: "회원 가입 정책 관리", href: "/admin/users/join-policy" },
                    { name: "회원 가입 항목 관리", href: "/admin/users/join-items" },
                    { name: "회원 등급 관리", href: "/admin/users/grade" },
                    { name: "회원등급 평가방법 설정", href: "/admin/users/grade/evaluation" },
                    { name: "가입승인/등급변경", href: "/admin/users/approval-change" },
                    { name: "회원정보 이벤트", href: "/admin/users/info-event" },
                    { name: "회원가입 이벤트", href: "/admin/users/join-event" },
                    { name: "휴면 회원 정책", href: "/admin/users/dormant-policy" },
                    { name: "휴면 회원 관리", href: "/admin/users/dormant-management" },
                    { name: "회원 탈퇴 / 삭제 관리", href: "/admin/users/withdrawal-management" },
                ]
            },

            {
                title: "마일리지 / 예치금 관리",
                items: [
                    { name: "마일리지 기본 설정", href: "/admin/users/mileage/basic" },
                    { name: "마일리지 사용 설정", href: "/admin/users/mileage/use" },
                    { name: "마일리지 지급 설정", href: "/admin/users/mileage/provision" },
                    { name: "마일리지 지급/차감", href: "/admin/users/mileage/give-deduct" },
                    { name: "예치금 설정", href: "/admin/users/deposit/settings" },
                    { name: "예치금 지급/차감", href: "/admin/users/deposit/give-deduct" },
                ]
            },
            {
                title: "CRM 그룹 관리",
                items: [
                    { name: "CRM 그룹 리스트", href: "/admin/users/crm-group" },
                    { name: "CRM 그룹 등록", href: "/admin/users/crm-group/create" },
                ]
            },

            {
                title: "SMS 관리",
                items: [
                    { name: "SMS 설정", href: "/admin/sms/settings" },
                    { name: "개별/전체 SMS 발송", href: "/admin/sms/send" },
                    { name: "SMS 발송 내역 보기", href: "/admin/sms/history" },
                    { name: "SMS 포인트 충전", href: "/admin/sms/charge" },
                ]
            },
            {
                title: "간편 로그인",
                items: [
                    { name: "구글 아이디 로그인 설정", href: "/admin/settings/google-login" },
                ]
            }
        ]
    },
    {
        name: "게시판",
        href: "/admin/boards",
        icon: Layers,
        groups: [
            {
                title: "게시판 관리",
                items: [
                    { name: "게시판 리스트", href: "/admin/boards" },
                    { name: "게시판 등록", href: "/admin/boards/create" },
                    { name: "게시글 관리", href: "/admin/boards/posts" },
                    { name: "게시판 스킨 관리", href: "/admin/boards/skins" },
                    { name: "게시판 금칙어 관리", href: "/admin/boards/banned-words" },
                    { name: "게시글 양식 관리", href: "/admin/boards/templates" },
                    { name: "FAQ 관리", href: "/admin/boards/faq" },
                ]
            }
        ]
    },
    {
        name: "통계",
        href: "/admin/statistics",
        icon: BarChart,
        groups: [
            {
                title: "애널리틱스",
                items: [
                    { name: "애널리틱스 메인페이지", href: "/admin/statistics" },
                    { name: "전체 방문자 수", href: "/admin/statistics/total-visitors" },
                    { name: "전체 페이지뷰", href: "/admin/statistics/total-pageviews" },
                    { name: "주문 종합 분석", href: "/admin/statistics/order-analysis" },
                    { name: "유입 경로", href: "/admin/statistics/traffic-source" },
                    { name: "인기 페이지", href: "/admin/statistics/popular-pages" },
                    { name: "회원가입 수", href: "/admin/statistics/signup-count" },
                    { name: "최근 방문자", href: "/admin/statistics/recent-visitors" },
                    { name: "쇼핑몰 체류시간", href: "/admin/statistics/stay-time" },
                ]
            },
            {
                title: "회원분석",
                items: [
                    { name: "신규 회원분석", href: "/admin/statistics/new-members" },
                    { name: "전체 회원분석", href: "/admin/statistics/total-members" },
                    { name: "회원 마일리지 분석", href: "/admin/statistics/mileage" },
                    { name: "회원 예치금 분석", href: "/admin/statistics/deposit" },
                ]
            },
            {
                title: "상품분석",
                items: [
                    { name: "카테고리 분석", href: "/admin/statistics/category" },
                    { name: "판매순위 분석", href: "#" },
                    { name: "메인분류 분석", href: "#" },
                    { name: "검색어순위 분석", href: "#" },
                    { name: "페이지뷰 분석", href: "#" },
                    { name: "장바구니 분석", href: "#" },
                    { name: "관심상품 분석", href: "#" },
                ]
            },
            {
                title: "매출분석",
                items: [
                    { name: "매출통계", href: "#" },
                    { name: "연령별 매출통계", href: "#" },
                    { name: "결제수단별 매출통계", href: "#" },
                    { name: "지역별 매출통계", href: "#" },
                ]
            },
            {
                title: "주문분석",
                items: [
                    { name: "주문통계", href: "#" },
                    { name: "연령별 주문통계", href: "#" },
                    { name: "지역별 주문통계", href: "#" },
                    { name: "성별 주문통계", href: "#" },
                ]
            },
            {
                title: "에이스카운터",
                items: [
                    { name: "에이스카운터 신청/관리", href: "#" },
                    { name: "에이스카운터 관리자", href: "#" },
                ]
            }
        ]
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenus, setOpenMenus] = useState<string[]>(() => {
        const activeMenus: string[] = [];
        menuItems.forEach(item => {
            // Check groups
            if (item.groups) {
                const hasActiveGroup = item.groups.some(group =>
                    group.items.some(sub => sub.href !== "#" && pathname.startsWith(sub.href))
                );
                if (hasActiveGroup) activeMenus.push(item.name);
            }
            // Check legacy subItems if any
            if (item.subItems) {
                const hasActiveSub = item.subItems.some(sub => sub.href !== "#" && pathname.startsWith(sub.href));
                if (hasActiveSub) activeMenus.push(item.name);
            }
        });
        return activeMenus;
    });

    const [openGroups, setOpenGroups] = useState<string[]>(() => {
        const activeGroups: string[] = [];
        menuItems.forEach(item => {
            item.groups?.forEach(group => {
                if (group.items.some(sub => sub.href !== "#" && pathname.startsWith(sub.href))) {
                    activeGroups.push(group.title);
                }
            });
        });
        return activeGroups;
    });

    const toggleMenu = (name: string) => {
        setOpenMenus(prev => 
            prev.includes(name) 
                ? prev.filter(item => item !== name) 
                : [...prev, name]
        );
    };

    const toggleGroup = (title: string) => {
        setOpenGroups(prev =>
            prev.includes(title)
                ? prev.filter(t => t !== title)
                : [...prev, title]
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
                    const hasSubItems = (item.subItems && item.subItems.length > 0) || (item.groups && item.groups.length > 0);
                    const isActive = item.href ? pathname.includes(item.href) : false;
                    const isOpen = openMenus.includes(item.name);

                    if (hasSubItems) {
                        return (
                            <div key={item.name} className="space-y-1">
                                <div className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors hover:bg-base-200 text-base-content/80 hover:text-base-content ${isCollapsed ? 'justify-center' : ''}`}>
                                    <Link 
                                        href={item.href || '#'}
                                        onClick={(e) => {
                                            if (item.href === "#") e.preventDefault();
                                            if (!isCollapsed && !openMenus.includes(item.name)) toggleMenu(item.name);
                                        }}
                                        className={`flex-1 flex items-center gap-4 ${isCollapsed ? 'justify-center' : ''}`}
                                    >
                                        <item.icon size={20} />
                                        {!isCollapsed && <span className="font-medium">{item.name}</span>}
                                    </Link>
                                    {!isCollapsed && (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleMenu(item.name); 
                                            }}
                                            className="p-1 hover:bg-base-300 rounded"
                                        >
                                            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                        </button>
                                    )}
                                </div>
                                
                                {!isCollapsed && isOpen && (
                                    <div className="pl-4 space-y-2 my-2 transition-all">
                                        {item.groups ? (
                                            item.groups.map((group, gIndex) => {
                                                const isGroupOpen = openGroups.includes(group.title);
                                                return (
                                                    <div key={gIndex} className="space-y-1">
                                                        <button 
                                                            onClick={() => toggleGroup(group.title)}
                                                            className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-bold text-base-content/70 hover:text-base-content hover:bg-base-200 rounded transition-colors uppercase tracking-wider"
                                                        >
                                                            <span>{group.title}</span>
                                                            {isGroupOpen ? <Minus size={14} /> : <Plus size={14} />}
                                                        </button>
                                                        
                                                        {isGroupOpen && (
                                                            <div className="pl-2 border-l-2 border-base-200 ml-3 space-y-1">
                                                                {group.items.map((sub) => (
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
                                            })
                                        ) : (
                                            <div className="pl-2 border-l-2 border-base-200 ml-3 space-y-1">
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
