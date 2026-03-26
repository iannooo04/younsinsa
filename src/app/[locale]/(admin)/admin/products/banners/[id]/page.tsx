"use client";

import { useEffect, useState } from "react";
import BannerForm from "../_components/BannerForm";
import { getBannerByIdAction } from "@/actions/banner-actions";
import { useParams } from "next/navigation";

export default function BannerEditPage() {
    const params = useParams();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            const id = params.id;
            if (typeof id === 'string') {
                const res = await getBannerByIdAction(id);
                if (res.success) {
                    setInitialData(res.banner);
                } else {
                    alert(res.error || "배너를 불러오지 못했습니다.");
                }
            }
            setLoading(false);
        };
        fetchBanner();
    }, [params]);

    if (loading) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    if (!initialData) {
        return <div className="p-10 text-center">배너 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <BannerForm initialData={initialData} />
        </div>
    );
}
