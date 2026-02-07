"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { updateCustomInfoAction, getCustomInfoAction, CustomInfoData } from "@/actions/user-actions";

export default function SettingsCustomInfoPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(true);

  // Form State
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  // const [skinType, setSkinType] = React.useState("");
  // const [skinTone, setSkinTone] = React.useState("");
  const [fashionStyles, setFashionStyles] = React.useState<string[]>([]);
  const [interests, setInterests] = React.useState<string[]>([]);
  const [selectedSports, setSelectedSports] = React.useState<string[]>([]);
  const [activeTab, setActiveTab] = React.useState<'info' | 'size' | 'child'>('info');

  // Fetch Data
  React.useEffect(() => {
    if (session?.user?.id) {
        getCustomInfoAction(session.user.id).then(res => {
            if (res.success && res.data) {
                const d = res.data;
                if (d.height) setHeight(d.height.toString());
                if (d.weight) setWeight(d.weight.toString());
                // if (d.skinType) setSkinType(d.skinType);
                // if (d.skinTone) setSkinTone(d.skinTone);
                if (d.fashionStyles) setFashionStyles(d.fashionStyles);
                if (d.interests) setInterests(d.interests);
                if (d.sports) setSelectedSports(d.sports);
            }
            setFetching(false);
        });
    } else {
        setFetching(false);
    }
  }, [session?.user?.id]);

  const handleSubmit = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    const data: CustomInfoData = {
        height: height ? parseFloat(height) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        // skinType,
        // skinTone,
        fashionStyles,
        interests,
        sports: selectedSports
    };

    try {
        const res = await updateCustomInfoAction(session.user.id, data);
        if (res.success) {
            alert("저장되었습니다.");
            // router.back(); // Optional: Stay on page or go back
        } else {
            alert(res.error || "저장 실패");
        }
    } catch (error) {
        console.error(error);
        alert("오류가 발생했습니다.");
    } finally {
        setLoading(false);
    }
  };

  const toggleSelection = (list: string[], setList: (L: string[]) => void, item: string) => {
      if (list.includes(item)) {
          setList(list.filter(i => i !== item));
      } else {
          setList([...list, item]);
      }
  };

  // --- Constants ---
  // const skinTypes = ["지성", "건성", "복합성", "민감성"];
  // const skinTones = ["봄 웜톤", "여름 쿨톤", "가을 웜톤", "겨울 쿨톤"];
  
  // Mock Images for fashion styles (using placeholders)
  const styleList = [
      { name: "캐주얼", img: "/placeholder-style.png" },
      { name: "시크", img: "/placeholder-style.png" },
      { name: "시티보이", img: "/placeholder-style.png" },
      { name: "클래식", img: "/placeholder-style.png" },
      { name: "에스닉", img: "/placeholder-style.png" },
      { name: "걸리시", img: "/placeholder-style.png" },
      { name: "고프코어", img: "/placeholder-style.png" },
      { name: "미니멀", img: "/placeholder-style.png" },
      { name: "프레피", img: "/placeholder-style.png" },
      { name: "리조트", img: "/placeholder-style.png" },
      { name: "레트로", img: "/placeholder-style.png" },
      { name: "로맨틱", img: "/placeholder-style.png" },
      { name: "스포티", img: "/placeholder-style.png" },
      { name: "스트리트", img: "/placeholder-style.png" },
      { name: "워크웨어", img: "/placeholder-style.png" },
  ];

  const interestCategories = [
      { name: "뷰티", img: "/placeholder-cat.png" },
      { name: "부티크", img: "/placeholder-cat.png" },
      { name: "키즈", img: "/placeholder-cat.png" },
      { name: "아울렛", img: "/placeholder-cat.png" },
      { name: "스포츠", img: "/placeholder-cat.png" },
      { name: "슈즈", img: "/placeholder-cat.png" },
  ];

  const sportsList = [
      "배드민턴", "야구", "농구", "캠핑", "자전거", "낚시", "피트니스", "골프", 
      "등산/아웃도어", "탁구", "러닝", "스키/스노우보드", "축구", "수영", "테니스", "요가/필라테스", "보드/스케이트"
  ];

  if (fetching) return <div className="p-10 text-center">Loading...</div>;


  return (
    <div className="bg-white flex justify-center min-h-screen">
      <div className="w-full max-w-[960px] bg-white relative shadow-sm flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-[56px] border-b border-gray-100 flex items-center px-4">
             <h1 className="text-[16px] font-bold text-black">나의 맞춤 정보</h1>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50">
            <button 
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-3 text-[14px] ${activeTab === 'info' ? 'font-bold text-black border-b-2 border-black bg-white' : 'text-gray-400'}`}
            >
                체형/피부/취향 정보
            </button>
            <button 
                onClick={() => setActiveTab('size')}
                className={`flex-1 py-3 text-[14px] ${activeTab === 'size' ? 'font-bold text-black border-b-2 border-black bg-white' : 'text-gray-400'}`}
            >
                사이즈 추천
            </button>
            <button 
                onClick={() => setActiveTab('child')}
                className={`flex-1 py-3 text-[14px] ${activeTab === 'child' ? 'font-bold text-black border-b-2 border-black bg-white' : 'text-gray-400'}`}
            >
                아이 정보
            </button>
        </div>

        <div className="p-5 pb-32 flex flex-col gap-10">
            {activeTab === 'info' && (
                <>
                    {/* Body Section */}
                    <section>
                        <h2 className="text-[18px] font-bold text-black mb-1">체형</h2>
                        <p className="text-[13px] text-gray-400 mb-4">나의 비슷한 체형의 후기를 모아볼 수 있어요.</p>
                        
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-[14px] font-bold mb-2">키</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={height} 
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full h-[48px] border border-gray-200 rounded-[4px] px-3 focus:outline-none focus:border-black"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[14px]">cm</span>
                                </div>
                            </div>
                             <div>
                                <label className="block text-[14px] font-bold mb-2">몸무게</label>
                                <div className="relative">
                                    <input 
                                        type="number" 
                                        value={weight} 
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full h-[48px] border border-gray-200 rounded-[4px] px-3 focus:outline-none focus:border-black"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[14px]">kg</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Fashion Section */}
                    <section>
                         <h2 className="text-[18px] font-bold text-black mb-1">패션</h2>
                         <p className="text-[13px] text-gray-400 mb-4">선호하는 패션 스타일을 다양하게 제안해 드릴게요.</p>
                         
                         <div className="mb-4">
                             <h3 className="text-[14px] font-bold mb-2">스타일</h3>
                             <div className="grid grid-cols-5 gap-2">
                                {styleList.map(style => {
                                    const isSelected = fashionStyles.includes(style.name);
                                    return (
                                        <button 
                                            key={style.name}
                                            onClick={() => toggleSelection(fashionStyles, setFashionStyles, style.name)}
                                            className="flex flex-col items-center gap-2"
                                        >
                                            <div className={`w-full aspect-[3/4] bg-gray-100 rounded-[4px] relative overflow-hidden ${isSelected ? 'ring-2 ring-black' : ''}`}>
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center p-1">
                                                    {style.name} Image
                                                </div>
                                            </div>
                                            <span className={`text-[12px] ${isSelected ? 'font-bold text-black' : 'text-gray-500'}`}>{style.name}</span>
                                        </button>
                                    );
                                })}
                             </div>
                         </div>
                    </section>

                    {/* Interests Section */}
                    <section>
                         <h2 className="text-[18px] font-bold text-black mb-1">관심 카테고리</h2>
                         <div className="grid grid-cols-6 gap-2 mt-4">
                             {interestCategories.map(cat => {
                                    const isSelected = interests.includes(cat.name);
                                    return (
                                        <button 
                                            key={cat.name}
                                            onClick={() => toggleSelection(interests, setInterests, cat.name)}
                                            className="flex flex-col items-center gap-2"
                                        >
                                            <div className={`w-full aspect-square bg-gray-100 rounded-full overflow-hidden relative ${isSelected ? 'ring-2 ring-black' : ''}`}>
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                                                    {cat.name}
                                                </div>
                                            </div>
                                            <span className={`text-[12px] ${isSelected ? 'font-bold text-black' : 'text-gray-500'}`}>{cat.name}</span>
                                        </button>
                                    );
                             })}
                         </div>
                    </section>

                    {/* Sports Section */}
                     <section>
                         <h2 className="text-[18px] font-bold text-black mb-1">스포츠</h2>
                         <p className="text-[13px] text-gray-400 mb-4">선호하는 스포츠 종목 아이템을 더 많이 보여 드릴게요.</p>
                         <div className="mb-4">
                             <h3 className="text-[14px] font-bold mb-2">유형</h3>
                             <div className="flex gap-2 flex-wrap">
                                {sportsList.map(sport => {
                                    const isSelected = selectedSports.includes(sport);
                                    return (
                                        <button 
                                            key={sport}
                                            onClick={() => toggleSelection(selectedSports, setSelectedSports, sport)}
                                            className={`px-3 py-2 text-[13px] border rounded-[4px] ${isSelected ? 'border-black font-bold text-black' : 'border-gray-200 text-gray-500'}`}
                                        >
                                            {sport}
                                        </button>
                                    );
                                })}
                             </div>
                         </div>
                     </section>

                     <div className="mt-4">
                         <button className="text-[13px] text-gray-500 underline">체형/피부/취향정보 삭제</button>
                     </div>
                     
                     <div className="mt-4 flex justify-between items-center text-[12px] text-gray-500">
                         <span className="font-bold text-black">개인이용정보 수집 및 이용 안내</span>
                         <span className="underline cursor-pointer">개인정보처리방침 보기</span>
                     </div>
                </>
            )}

            {activeTab === 'size' && (
                <div className="flex flex-col gap-6">
                    <section>
                        <h2 className="text-[18px] font-bold text-black mb-1">내 사이즈</h2>
                        <p className="text-[13px] text-gray-400 mb-6">내가 직접 입력한 실측 사이즈에요</p>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="font-bold">총장</span>
                                <span>71cm</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="font-bold">어깨너비</span>
                                <span>55cm</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="font-bold">가슴단면</span>
                                <span>58cm</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px]">
                                <span className="font-bold">소매길이</span>
                                <span>23cm</span>
                            </div>
                        </div>
                    </section>

                    <div>
                        <button className="text-[13px] text-gray-500 underline">내 사이즈 삭제</button>
                    </div>

                    <div className="mt-4 flex justify-between items-center text-[12px] text-gray-500">
                         <span className="font-bold text-black">개인이용정보 수집 및 이용 안내</span>
                         <span className="underline cursor-pointer">개인정보처리방침 보기</span>
                     </div>
                </div>
            )}
            
            {activeTab === 'child' && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-sm">
                    아이 정보 탭 준비중입니다.
                </div>
            )}
        </div>

        {/* Footer Button - Conditional based on tab */}
        <div className="fixed bottom-0 w-full max-w-[960px] bg-white p-5 border-t border-gray-100 z-10">
            {activeTab === 'info' && (
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full h-[56px] bg-black text-white font-bold text-[16px] rounded-[4px]"
                >
                    {loading ? "저장 중..." : "저장하기"}
                </button>
            )}
            {activeTab === 'size' && (
                <div className="flex gap-2">
                    <button 
                        className="flex-1 h-[56px] bg-white text-black border border-gray-200 font-bold text-[14px] rounded-[4px]"
                    >
                        실측 직접 입력하기
                    </button>
                    <button 
                        className="flex-1 h-[56px] bg-black text-white font-bold text-[14px] rounded-[4px]"
                    >
                        구매내역 실측 선택하기
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
