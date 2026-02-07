"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserDetailAction } from "@/actions/user-actions";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, User, ShoppingBag, CreditCard, Award, MapPin } from "lucide-react";

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [user, setUser] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      setLoading(true);
      const res = await getUserDetailAction(userId);
      if (res.success) {
        setUser(res.user);
      } else {
        alert(res.message);
        router.back();
      }
      setLoading(false);
    }
    fetchData();
  }, [userId, router]);

  if (loading) return <div className="p-10 text-center">로딩중...</div>;
  if (!user) return <div className="p-10 text-center">회원 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="p-6 bg-[#F1F3F5] min-h-screen font-sans text-xs">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-xl font-bold text-gray-900">회원 상세 정보</h1>
            </div>
             <Button variant="outline" className="bg-white border-gray-300" onClick={() => router.back()}>목록으로</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            
            {/* 1. Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                    <User className="w-4 h-4 text-blue-500" />
                    <h2 className="text-sm font-bold text-gray-800">기본 정보</h2>
                </div>
                <div className="space-y-3">
                    <InfoRow label="아이디" value={user.username} />
                    <InfoRow label="이름" value={user.name} />
                    <InfoRow label="닉네임" value={user.nickname} />
                    <InfoRow label="이메일" value={user.email} />
                    <InfoRow label="휴대폰" value={user.mobile} />
                    <InfoRow label="전화번호" value={user.phone} />
                    <InfoRow label="가입일" value={format(new Date(user.createdAt), "yyyy-MM-dd HH:mm")} />
                    <InfoRow label="최종로그인" value={user.info?.lastLoginAt ? format(new Date(user.info.lastLoginAt), "yyyy-MM-dd HH:mm") : "-"} />
                    <InfoRow label="가입경로" value={user.mallId === 'CN' ? '중문몰' : '기준몰(대한민국)'} />
                </div>
            </div>

            {/* 2. Status & Grade */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <h2 className="text-sm font-bold text-gray-800">상태 및 등급</h2>
                </div>
                <div className="space-y-3">
                     <InfoRow label="회원유형" value={user.info?.type === 'BUSINESS' ? '사업자회원' : '개인회원'} />
                     <InfoRow label="회원등급" value={
                        <span className="font-bold text-blue-600">
                            {user.info?.grade?.name || '일반회원'}
                        </span>
                     } />
                     <InfoRow label="가입승인" value={
                         <span className={`px-2 py-0.5 rounded text-[10px] ${user.info?.isApproved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {user.info?.isApproved ? '승인됨' : '미승인'}
                         </span>
                     } />
                     <InfoRow label="탈퇴여부" value={user.info?.isWithdrawn ? <span className="text-red-500 font-bold">탈퇴회원 (삭제예정)</span> : '정상'} />
                     <InfoRow label="SMS 성신여부" value={user.info?.smsConsent ? '동의' : '거부'} />
                     <InfoRow label="이메일 수신여부" value={user.info?.emailConsent ? '동의' : '거부'} />
                     <InfoRow label="추천인" value={user.recommender ? `${user.recommender.name} (${user.recommender.username})` : '-'} />
                </div>
            </div>

            {/* 3. Detail Info */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <h2 className="text-sm font-bold text-gray-800">상세 정보</h2>
                </div>
                <div className="space-y-3">
                     <InfoRow label="성별" value={user.info?.gender === 'MALE' ? '남성' : user.info?.gender === 'FEMALE' ? '여성' : '정보없음'} />
                     <InfoRow label="생일" value={user.info?.birthday ? `${format(new Date(user.info.birthday), "yyyy-MM-dd")} (${user.info.birthdayType === 'LUNAR' ? '음력' : '양력'})` : '-'} />
                     <InfoRow label="결혼여부" value={user.info?.maritalStatus === 'MARRIED' ? '기혼' : '미혼'} />
                     <InfoRow label="기념일" value={user.info?.anniversary ? format(new Date(user.info.anniversary), "yyyy-MM-dd") : '-'} />
                     <InfoRow label="주소" value={
                         <div>
                             <div>[{user.info?.zipcode || '-'}]</div>
                             <div>{user.info?.address} {user.info?.addressDetail}</div>
                         </div>
                     } />
                     <InfoRow label="직업" value={user.info?.job || '-'} />
                     <InfoRow label="관심분야" value={
                        <div className="flex flex-wrap gap-1">
                            {user.info?.interests?.length > 0 ? user.info?.interests.map((i: string, idx: number) => (
                                <span key={idx} className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 text-[10px]">{i}</span>
                            )) : '-'}
                        </div>
                     } />
                     <InfoRow label="메모" value={user.info?.userMemo || '-'} />
                </div>
            </div>

             {/* 4. Statistics */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4 text-purple-500" />
                        <CreditCard className="w-4 h-4 text-purple-500" />
                    </div>
                    <h2 className="text-sm font-bold text-gray-800">활동 및 구매 정보</h2>
                </div>
                <div className="space-y-3">
                     <InfoRow label="로그인 횟수" value={`${user.info?.loginCount || 0} 회`} />
                     <InfoRow label="적립금(마일리지)" value={<span className="font-bold text-blue-600">{user.info?.mileage?.toLocaleString() || 0} 원</span>} />
                     <InfoRow label="예치금" value={`${user.info?.deposit?.toLocaleString() || 0} 원`} />
                     <InfoRow label="구매 건수" value={`${user._count?.orders || 0} 건`} />
                     <InfoRow label="총 구매 금액" value={<span className="font-bold text-red-600">{user.totalOrderAmount?.toLocaleString() || 0} 원</span>} />
                </div>
            </div>

             {/* 5. Business Info (Conditional) */}
             {user.info?.type === 'BUSINESS' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                        <User className="w-4 h-4 text-gray-600" />
                        <h2 className="text-sm font-bold text-gray-800">사업자 정보</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <InfoRow label="상호명" value={user.businessInfo?.companyName} />
                         <InfoRow label="사업자등록번호" value={user.businessInfo?.businessNumber} />
                         <InfoRow label="대표자명" value={user.businessInfo?.ceoName} />
                         <InfoRow label="업태" value={user.businessInfo?.crevice} />
                         <InfoRow label="종목" value={user.businessInfo?.sector} />
                         <InfoRow label="사업장주소" value={`${user.businessInfo?.companyAddress || ''} ${user.businessInfo?.companyAddressDetail || ''}`} />
                    </div>
                </div>
             )}

        </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string, value: React.ReactNode }) {
    return (
        <div className="flex items-start">
            <span className="w-24 text-gray-500 shrink-0">{label}</span>
            <div className="flex-1 text-gray-900 break-all">
                {value || '-'}
            </div>
        </div>
    );
}
