"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, ChevronUp, Youtube, Download } from "lucide-react";
import { Link } from "@/i18n/routing";
import { read, utils, writeFile } from 'xlsx';
import { uploadUsersExcelAction } from "@/actions/user-actions";

export default function MemberExcelUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const tableData = [
    { name: "회원 번호", code: "mem_no", desc: "숫자 10자 이내의 unique 코드, 등록시에는 자동 생성 되므로 등록시에는 넣지 마세요." },
    { name: "아이디", code: "mem_id", desc: "영문, 숫자,특수문자(.-_@) 20자 이내 입력" },
    { name: "등급(번호)", code: "group_sno", desc: "[운영정책>회원등급(레벨)]에서 설정한 등급번호 입력.\n1:일반회원" },
    { name: "이름", code: "mem_name", desc: "영문 40자, 한글 20자 이내 입력." },
    { name: "닉네임", code: "nick_name", desc: "영문 50자, 한글 25자 이내 입력." },
    { name: "비밀번호", code: "mem_password", desc: "2가지 이상 조합하여야 합니다. 암호화되어 저장됩니다. 16자 이내 입력." },
    { name: "비밀번호(암호화문자)", code: "mem_password_enc", desc: "암호화(password)된 150자 이내 입력." },
    { name: "가입승인", code: "app_fl", desc: "y:승인, n:미승인, 기본은 n(미승인)입니다." },
    { name: "성별", code: "sex_fl", desc: "m:남자, w:여자, 기본은 m(남자)입니다." },
    { name: "생일", code: "birth_dt", desc: "생년월일 입력" },
    { name: "양력,음력", code: "calendar_fl", desc: "s:양력, l:음력, 기본은 s(양력)입니다." },
    { name: "이메일", code: "email", desc: "영문 100자, 한글 50자 이내 입력." },
    { name: "우편번호", code: "zonecode", desc: "5자리의 신규 우편번호 입력. 형식) XXXXX" },
    { name: "주소", code: "address", desc: "영문 150자, 한글 75자 이내 입력." },
    { name: "상세주소", code: "address_sub", desc: "영문 100자, 한글 50자 이내 입력." },
    { name: "전화번호", code: "phone", desc: "하이픈(-) 를 포함한 13자리의 번호 입력. 형식) XXX-XXXX-XXXX" },
    { name: "휴대폰", code: "cell_phone", desc: "하이픈(-) 를 포함한 13자리의 번호 입력. 형식) XXX-XXXX-XXXX" },
    { name: "팩스번호", code: "fax", desc: "하이픈(-) 를 포함한 13자리의 번호 입력. 형식) XXX-XXXX-XXXX" },
    { name: "회사명", code: "company", desc: "영문 50자, 한글 25자" },
    { name: "업태", code: "service", desc: "영문 30자, 한글 15자" },
    { name: "종목", code: "item", desc: "영문 30자, 한글 15자" },
    { name: "사업자번호", code: "business_no", desc: "하이픈(-) 를 포함한 12자리의 번호 입력. 형식) XXX-XX-XXXXX" },
    { name: "대표자명", code: "ceo_name", desc: "영문 20자, 한글 10자" },
    { name: "사업장우편번호", code: "com_zonecode", desc: "5자리의 신규 우편번호 입력. 형식) XXXXX" },
    { name: "사업장주소", code: "com_address", desc: "영문 150자, 한글 75자 이내 입력." },
    { name: "사업장상세주소", code: "com_address_sub", desc: "영문 100자, 한글 50자 이내 입력." },
    { name: "마일리지", code: "mileage", desc: "숫자 10자 이내 입력." },
    { name: "예치금", code: "deposit", desc: "숫자 10자 이내 입력." },
    { name: "메일수신동의", code: "mailling_fl", desc: "y:받음, n:거부, 기본은 y(받음)입니다." },
    { name: "SMS수신동의", code: "sms_fl", desc: "y:받음, n:거부, 기본은 y(받음)입니다." },
    { name: "결혼여부", code: "marri_fl", desc: "n:미혼, y:기혼, 기본은 n(미혼)입니다." },
    { name: "결혼기념일", code: "marri_date", desc: "형식) YYYY-MM-DD" },
    { name: "직업", code: "job", desc: "[운영정책>코드관리]에서 설정한 직업코드번호 입력.\n01002001:학생\n01002002:컴퓨터전문직\n01002003:회사원\n01002004:전업주부\n01002005:건축/토목\n01002006:금융업\n01002007:교수직\n01002008:공무원\n01002009:의료계\n01002010:법조계\n01002011:언론/출판\n01002012:자영업\n01002013:방송/연예/예술\n01002014:기타" },
    { name: "관심분야", code: "interest", desc: "[운영정책>코드관리]에서 설정한 관심분야번호 입력. 다수 경우 '|' 를 구분자로 입력) 004001|004002\n01001001:화장품/향수/미용품\n01001002:컴퓨터/SW\n01001003:의류/패션잡화\n01001004:생활/주방용품\n01001005:보석/시계/악세사리\n01001006:가전/카메라\n01001007:서적/음반/비디오" },
    { name: "재가입여부", code: "re_entry_fl", desc: "n:신규가입, y:재가입, 기본은 n(신규가입)입니다." },
    { name: "회원가입일", code: "entry_dt", desc: "형식) YYYY-MM-DD HH:II:SS" },
    { name: "가입경로", code: "entry_path", desc: "pc:PC, mobile:모바일, 기본은 pc(PC)입니다." },
    { name: "최종로그인", code: "last_login_dt", desc: "형식) YYYY-MM-DD HH:II:SS" },
    { name: "최종로그인IP", code: "last_login_ip", desc: "" },
    { name: "최종구매일", code: "last_sale_dt", desc: "형식) YYYY-MM-DD HH:II:SS" },
    { name: "로그인횟수", code: "login_count", desc: "로그인한 횟수 입력. 숫자 5자 이내 입력." },
    { name: "상품주문건수", code: "sale_count", desc: "구매 확정된 상품주문의 수 입력. 숫자 5자 이내 입력." },
    { name: "총 주문금액", code: "sale_amount", desc: "구매한 주문 금액 입력. 숫자 10자 이내 입력." },
    { name: "남기는말", code: "memo", desc: "회원이 남긴 말 입력. 영문 255자, 한글 127자" },
    { name: "추천인ID", code: "recomm_id", desc: "추천인 회원아이디 입력. 영문 20자, 한글 10자" },
    { name: "추천인아이디등록여부", code: "recomm_fl", desc: "n:등록안함, y:등록함, 기본은 n(등록안함)입니다." },
    { name: "추가1", code: "ex1", desc: "추가정보 입력." },
    { name: "추가2", code: "ex2", desc: "추가정보 입력." },
    { name: "추가3", code: "ex3", desc: "추가정보 입력." },
    { name: "추가4", code: "ex4", desc: "추가정보 입력." },
    { name: "추가5", code: "ex5", desc: "추가정보 입력." },
    { name: "추가6", code: "ex6", desc: "추가정보 입력." },
    { name: "개인정보 수집 및 이용 필수", code: "private_approval_fl", desc: "n:동의안함, y:동의함, 기본은 n(동의안함)입니다." },
    { name: "개인정보 수집 및 이용 선택", code: "private_approval_option_fl", desc: "n:동의안함, y:동의함, 기본은 n(동의안함)입니다." },
    { name: "개인정보동의 제3자 제공", code: "private_offer_fl", desc: "n:동의안함, y:동의함, 기본은 n(동의안함)입니다." },
    { name: "개인정보동의 취급업무 위탁", code: "private_consign_fl", desc: "n:동의안함, y:동의함, 기본은 n(동의안함)입니다." },
    { name: "내외국인구분", code: "foreigner", desc: "1:내국인, 2:외국인, 기본은 1(내국인)입니다." },
    { name: "본인확인 중복가입확인정보", code: "dupeinfo", desc: "영문 64자" },
    { name: "성인여부", code: "adult_fl", desc: "n:인증 안된 회원, y:인증된 회원" },
    { name: "성인여부인증시간", code: "adult_confirm_dt", desc: "성인여부인증시간" },
    { name: "본인확인 번호", code: "pakey", desc: "영문 13자" },
    { name: "본인확인 방법", code: "rncheck", desc: "none:안함, realname:실명인증, ipin:아이핀, authCellphone:휴대폰본인확인,기본은 none(안함)입니다." },
    { name: "관리자 메모", code: "admin_memo", desc: "관리자 메모를 입력." },
    { name: "개인정보유효기간", code: "expiration_fl", desc: "1:1년, 3:3년, 5:5년, 999:탈퇴시 기본은 1(1년)입니다." },
  ];

  const handleDownloadSample = () => {
    // Row 1: Korean Field Names
    const headers1 = tableData.map(t => t.name);
    // Row 2: English Codes (DB Keys)
    const headers2 = tableData.map(t => t.code);
    // Row 3: Descriptions
    const headers3 = tableData.map(t => t.desc);

    // Create worksheet
    const ws = utils.aoa_to_sheet([
        headers1,
        headers2,
        headers3
    ]);

    // Set column widths
    ws['!cols'] = tableData.map(() => ({ wch: 20 }));

    // Create workbook and append sheet
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "회원일괄등록샘플");

    // Save file
    writeFile(wb, "member_excel_sample.xlsx");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('파일을 선택해주세요.');

    setIsLoading(true);
    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = e.target?.result;
            const workbook = read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            
            // Read as array of arrays
            // Row 0: Description
            // Row 1: Keys (mem_id, etc) - This is what we map to
            // Row 2: Description
            // Row 3+: Data
            const rawData = utils.sheet_to_json(sheet, { header: 1 }) as any[][];
            
            if (rawData.length < 2) {
                 alert('엑셀 파일 형식이 올바르지 않습니다. (헤더를 찾을 수 없습니다)');
                 setIsLoading(false);
                 return;
            }

            const keys = rawData[1] as string[]; 
            // Basic validation of keys
            if (!keys.includes('mem_id') || !keys.includes('mem_name')) {
                 alert('엑셀 파일 형식이 올바르지 않습니다. 2번째 줄에 영문필드명이 있어야 합니다.');
                 setIsLoading(false);
                 return;
            }

            // Data starts at Row 3 (index 3) per instructions "4번째 줄부터 데이터"
            const dataRows = rawData.slice(3); // items from index 3 to end
            
            if (dataRows.length === 0) {
                 alert('데이터가 없습니다.');
                 setIsLoading(false);
                 return;
            }

            const formattedData = dataRows.map(row => {
                const obj: any = {};
                keys.forEach((key, index) => {
                     // Check if key exists and row has value
                     if (key && row[index] !== undefined) obj[key] = row[index];
                });
                return obj;
            });

            // Filter out completely empty rows
            const validData = formattedData.filter(d => Object.keys(d).length > 0 && d.mem_id);

            if (validData.length === 0) {
                 alert('유효한 데이터가 없습니다.');
                 setIsLoading(false);
                 return;
            }

            const res = await uploadUsersExcelAction(validData);
            
            if (res.success) {
                let msg = `${res.count}명 등록 성공, ${res.failCount}명 실패.`;
                if (res.errors && res.errors.length > 0) {
                    msg += `\n\n[실패 사유 (최대 10건)]\n${res.errors.join('\n')}`;
                }
                alert(msg);
                if (res.count > 0) {
                    setFile(null);
                    // Reset file input
                    const input = document.getElementById('excel-file-input') as HTMLInputElement;
                    if (input) input.value = '';
                }
            } else {
                alert(res.error || '업로드 실패');
            }
            setIsLoading(false);
        };
        reader.onerror = () => {
            alert('파일 읽기 실패');
            setIsLoading(false);
        };
        reader.readAsBinaryString(file);
    } catch (e) {
        console.error(e);
        alert('오류가 발생했습니다.');
        setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
       {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회원 엑셀 업로드</h1>
      </div>

       {/* Upload Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">회원 엑셀 업로드</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="border border-gray-200">
             <div className="flex border-b border-gray-200">
                <div className="w-48 bg-[#FBFBFB] p-4 text-center font-bold text-gray-700 flex items-center justify-center border-r border-gray-200">
                    엑셀파일 업로드
                </div>
                <div className="flex-1 p-4">
                     <div className="flex items-center gap-1 mb-3">
                         <div className="relative flex items-center">
                            <Button 
                                variant="secondary" 
                                className="h-7 px-3 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888] absolute left-0 z-10 pointer-events-none"
                            >
                                찾아보기
                            </Button>
                            <Input 
                                type="file" 
                                id="excel-file-input"
                                className="w-72 h-7 pl-20 text-xs border border-gray-300 relative z-20 opacity-0 cursor-pointer" 
                                onChange={handleFileChange}
                                accept=".xlsx, .xls"
                            />
                             {/* Visual Input to show filename (hacky but standard for custom file input) */}
                             <div className="absolute left-[85px] top-[2px] w-[200px] text-xs text-gray-600 truncate pointer-events-none">
                                {file ? file.name : "선택된 파일 없음"}
                             </div>
                         </div>
                         <Button 
                            onClick={handleUpload}
                            disabled={isLoading}
                            variant="secondary" 
                            className="h-7 px-3 text-[11px] bg-white border border-gray-300 text-gray-700 rounded-[2px] hover:bg-gray-50 disabled:opacity-50"
                         >
                             {isLoading ? '업로드 중...' : '엑셀업로드'}
                         </Button>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[11px] text-red-500 flex items-start gap-1">
                             <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                             엑셀업로드를 통해 신규 회원 등록 시 자동발송 설정에 따라 회원에게 SMS/메일로 안내메시지가 발송되므로 주의하시기 바랍니다.
                        </p>
                        <p className="text-[11px] text-[#888888] flex items-start gap-1">
                             <span className="inline-block bg-[#888888] text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mt-0.5">!</span>
                             <span>
                                엑셀업로드 전 회원가입 시 발송 가능한 항목(회원가입, 마일리지 지급, 회원가입 축하 쿠폰)의 발송설정을 확인해주시기 바랍니다.
                                <Link href="#" className="text-blue-500 hover:underline mx-1">SMS설정&gt;</Link>
                                <Link href="#" className="text-blue-500 hover:underline">자동 메일 설정&gt;</Link>
                             </span>
                        </p>
                     </div>
                </div>
            </div>
        </div>
      </div>

       <hr className="border-gray-200 mb-6" />

       {/* Guide Sections */}
       <div className="space-y-6 mb-8 text-gray-600">
           {/* Sample Download */}
           <div>
               <h3 className="font-bold text-gray-800 text-[13px] mb-2">회원 엑셀 샘플 다운로드</h3>
               <ol className="list-decimal pl-4 space-y-1 text-xs">
                   <li>아래 "회원 엑셀 샘플 다운로드" 버튼을 눌러 샘플을 참고하시기 바랍니다.</li>
                   <li>엑셀 파일 저장은 반드시 "Excel 통합 문서(xlsx)" 혹은 "Excel 97-2003 통합문서(xls)"로 저장하셔야 합니다. 그 외 csv나 xml 파일등은 지원 되지 않습니다.</li>
               </ol>
               <Button 
                    variant="outline" 
                    onClick={handleDownloadSample}
                    className="mt-2 h-8 px-3 text-[11px] bg-white border-gray-300 text-green-600 hover:text-green-700 hover:bg-green-50 flex items-center gap-1 rounded-sm"
                >
                   <span className="text-green-600 bg-green-100 p-0.5 rounded-sm"><Download className="w-3 h-3"/></span>
                   회원 엑셀 샘플 다운로드
               </Button>
           </div>

           {/* Upload Method */}
           <div>
               <h3 className="font-bold text-gray-800 text-[13px] mb-2">회원 업로드 방법</h3>
               <ol className="list-decimal pl-4 space-y-1 text-xs">
                   <li>아래 항목 설명되어 있는 것을 기준으로 엑셀 파일을 작성을 합니다.</li>
                   <li>회원 다운로드에서 받은 엑셀이나 "회원 엑셀 샘플 다운로드"에서 받은 엑셀을 기준으로 파일을 작성을 합니다.</li>
                   <li>엑셀 파일 저장은 반드시 "Excel 통합 문서(xlsx)" 혹은 "Excel 97-2003 통합문서(xls)"로 저장하셔야 합니다. 해당 확장자 외 다른 확장자는 업로드 불가합니다.</li>
                   <li>작성된 엑셀 파일을 업로드 합니다.</li>
               </ol>
           </div>
           
            {/* Precautions */}
           <div>
               <h3 className="font-bold text-gray-800 text-[13px] mb-2">주의사항</h3>
               <ol className="list-decimal pl-4 space-y-1 text-xs">
                   <li>엑셀 파일 저장은 반드시 "Excel 통합 문서(xlsx)" 혹은 "Excel 97-2003 통합문서(xls)" 만 저장 가능하며, csv 파일은 업로드 불가합니다.</li>
                   <li>엑셀 2003 사용자의 경우는 그냥 저장을 하시면 되고, 엑셀 2007 이나 엑셀 2010 인 경우는 새이름으로 저장을 선택 후 "Excel 통합 문서(xlsx)" 혹은 "Excel 97-2003 통합문서" 로 저장을 하십시요.</li>
                   <li>엑셀의 내용이 너무 많은 경우 업로드가 불가능 할수 있으므로 100개나 200개 단위로 나누어 올리시기 바랍니다.</li>
                   <li>엑셀 파일이 작성이 완료 되었다면 하나의 회원만 테스트로 올려보고 확인후 이상이 없으시면 나머지를 올리시기 바랍니다.</li>
                   <li>엑셀 내용중 "1번째 줄은 설명", "2번째 줄은 excel DB 코드", "3번째 줄은 설명" 이며, "4번째 줄부터" 데이터 입니다.</li>
                   <li>엑셀 내용중 2번째 줄 "excel DB" 코드는 필수 데이타 입니다. 그리고 반드시 내용은 "4번째 줄부터" 작성 하셔야 합니다.</li>
                   <li>엑셀샘플파일 내 일부 열을 삭제하고 업로드하면 회원정보 등록 및 수정이 불가능하니 유의 바랍니다.</li>
               </ol>
           </div>
       </div>

       {/* Item Description Table */}
       <div className="mb-10">
           <h3 className="font-bold text-gray-800 text-[13px] mb-2">항목 설명</h3>
           <p className="text-xs text-gray-600 mb-2">1. 아래 설명된 내용을 확인후 작성을 해주세요.</p>
           
           <div className="border-t-2 border-gray-600">
               <table className="w-full text-xs text-left border-collapse border border-gray-300">
                   <colgroup>
                       <col className="w-48" />
                       <col className="w-48" />
                       <col className="" />
                   </colgroup>
                   <thead>
                       <tr className="bg-[#333333] text-white h-9">
                           <th className="px-3 border-r border-[#666666] font-bold">한글필드명</th>
                           <th className="px-3 border-r border-[#666666] font-bold">영문필드명</th>
                           <th className="px-3 font-bold">설명</th>
                       </tr>
                   </thead>
                   <tbody>
                       {tableData.map((row, idx) => (
                           <tr key={idx} className="border-b border-gray-300 h-9 hover:bg-gray-50">
                               <td className="px-3 border-r border-gray-300 font-bold bg-[#FBFBFB]">{row.name}</td>
                               <td className="px-3 border-r border-gray-300 text-blue-500">{row.code}</td>
                               <td className="px-3 py-2 text-gray-600 whitespace-pre-wrap leading-relaxed">{row.desc}</td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           </div>
       </div>
       
        {/* Floating Actions */}
        <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50">
            <Button className="rounded-full w-10 h-10 bg-[#FF424D] hover:bg-[#FF424D]/90 shadow-lg text-white p-0 flex items-center justify-center border-0">
                <span className="text-[10px] font-bold"><Youtube size={16}/></span>
            </Button>
                <Button className="rounded-full w-10 h-10 bg-[#7B4DFF] hover:bg-[#7B4DFF]/90 shadow-lg text-white p-0 flex items-center justify-center border-0 text-[10px] leading-tight flex-col">
                <span className="block">따라</span>
                <span className="block">하기</span>
            </Button>
            <div className="flex flex-col gap-0 rounded-full bg-white shadow-lg overflow-hidden border border-gray-200">
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none border-b border-gray-100 p-0">
                        <ChevronUp className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-10 hover:bg-gray-50 text-gray-400 rounded-none p-0">
                         <ChevronUp className="w-4 h-4 rotate-180" />
                </Button>
            </div>
        </div>

    </div>
  );
}
