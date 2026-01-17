"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Youtube,
  ChevronUp,
  List
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@/i18n/routing";
import { checkDuplicateAction, createUserAction, getUserGradesAction } from "@/actions/user-actions";

export default function MemberCreatePage() {
  const router = useRouter();
  const [grades, setGrades] = useState<any[]>([]);

  const [formData, setFormData] = useState({
      memberType: 'PERSONAL',
      gradeId: '',
      isApproved: 'approved',
      
      username: '',
      isUsernameChecked: false,
      
      nickname: '',
      
      name: '',
      password: '',
      passwordConfirm: '',
      
      emailId: '',
      emailDomain: '',
      emailDomainSelect: 'direct',
      
      emailConsent: false,
      
      mobile1: '010',
      mobile2: '',
      mobile3: '',
      smsConsent: false,
      
      zipcode: '',
      address: '',
      addressDetail: '',
      
      phone: '',
      fax: '',
      job: 'select',
      
      gender: 'NONE',
      birthdayType: 'SOLAR',
      birthday: '',
      
      maritalStatus: 'SINGLE',
      anniversary: '',
      
      recommenderId: '',
      
      interests: [] as string[],
      
      retentionPeriod: '1y',
      userMemo: ''
  });

  useEffect(() => {
    getUserGradesAction().then((res: any) => {
        if (res.success && res.grades) {
            setGrades(res.grades);
            if (res.grades.length > 0 && !formData.gradeId) {
                setFormData(prev => ({ ...prev, gradeId: res.grades[0].id }));
            }
        }
    });
  }, []);

  const handleChange = (key: string, value: any) => {
      setFormData(prev => ({ ...prev, [key]: value }));
      
      // Reset checks if key changes
      if (key === 'username') setFormData(prev => ({ ...prev, username: value, isUsernameChecked: false }));
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
      setFormData(prev => {
          const interests = checked 
            ? [...prev.interests, interest]
            : prev.interests.filter(i => i !== interest);
          return { ...prev, interests };
      });
  };

  const handleEmailDomainSelect = (val: string) => {
      if (val === 'direct') {
          handleChange('emailDomainSelect', 'direct');
          handleChange('emailDomain', '');
      } else {
          handleChange('emailDomainSelect', val);
          handleChange('emailDomain', val); 
      }
  };

  const checkDuplicate = async (field: 'username' | 'email' | 'nickname') => {
      let value = '';
      if (field === 'username') value = formData.username;
      else if (field === 'nickname') value = formData.nickname;
      else if (field === 'email') value = `${formData.emailId}@${formData.emailDomain}`;

      if (!value) {
          alert('값을 입력해주세요.');
          return;
      }

      const res = await checkDuplicateAction(field, value);
      if (res.success) {
          if (res.isDuplicate) {
              alert('이미 사용중인 값입니다.');
              if (field === 'username') handleChange('isUsernameChecked', false);
          } else {
              alert('사용 가능한 값입니다.');
              if (field === 'username') handleChange('isUsernameChecked', true);
          }
      } else {
          alert('중복 확인 중 오류가 발생했습니다.');
      }
  };

  const checkRecommender = async () => {
      if (!formData.recommenderId) return alert('추천인 아이디를 입력해주세요.');
      const res = await checkDuplicateAction('username', formData.recommenderId);
      if (res.success) {
          if (res.isDuplicate) alert('확인되었습니다.'); 
          else alert('존재하지 않는 회원입니다.');
      } else {
          alert('오류가 발생했습니다.');
      }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.username) return alert('아이디를 입력해주세요.');
    if (!formData.isUsernameChecked) return alert('아이디 중복확인을 해주세요.');
    if (!formData.name) return alert('이름을 입력해주세요.');
    if (!formData.password) return alert('비밀번호를 입력해주세요.');
    if (formData.password !== formData.passwordConfirm) return alert('비밀번호가 일치하지 않습니다.');
    
    // Construct Payload
    const email = `${formData.emailId}@${formData.emailDomain}`;
    const mobile = `${formData.mobile1}-${formData.mobile2}-${formData.mobile3}`;
    
    const payload = {
        ...formData,
        email,
        mobile,
        isApproved: formData.isApproved === 'approved',
        birthday: formData.birthday || undefined,
        anniversary: formData.anniversary || undefined,
        // memberType is already PERSONAL or BUSINESS
        gradeId: formData.gradeId || undefined, 
    };

    const res = await createUserAction(payload);
    if (res.success) {
        alert('회원이 등록되었습니다.');
        router.push('/admin/users');
    } else {
        alert(res.error || '회원 등록에 실패했습니다.');
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans text-xs pb-24 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-400 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회원 등록</h1>
        <div className="flex gap-1">
             <Link href="/admin/users">
                <Button variant="outline" className="h-9 px-3 text-xs bg-white border-gray-300 text-gray-700 rounded-sm flex items-center gap-1 hover:bg-gray-50">
                    <List className="w-4 h-4" /> 목록
                </Button>
            </Link>
            <Button onClick={handleSubmit} className="h-9 px-6 text-xs bg-[#FF424D] hover:bg-[#FF424D]/90 text-white rounded-sm font-bold border-0">
                저장
            </Button>
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">기본정보</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             {/* Member Type */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    회원구분 <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <RadioGroup 
                        value={formData.memberType} 
                        onValueChange={(v) => handleChange('memberType', v)}
                        className="flex items-center gap-6"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="PERSONAL" id="type-personal" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="type-personal" className="text-gray-700 font-normal cursor-pointer text-xs">개인회원</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="BUSINESS" id="type-business" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="type-business" className="text-gray-700 font-normal cursor-pointer text-xs">사업자회원</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

             {/* Grade / Approval */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    등급 <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
                <div className="flex-1 p-3 border-r border-gray-200">
                    <Select value={formData.gradeId} onValueChange={(v) => handleChange('gradeId', v)}>
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="등급 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            {grades.map(g => (
                                <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    승인
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                     <RadioGroup 
                        value={formData.isApproved} 
                        onValueChange={(v) => handleChange('isApproved', v)}
                        className="flex items-center gap-6"
                     >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="approved" id="status-approved" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="status-approved" className="text-gray-700 font-normal cursor-pointer text-xs">승인</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="pending" id="status-pending" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="status-pending" className="text-gray-700 font-normal cursor-pointer text-xs">미승인</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

             {/* ID / Nickname */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span> 아이디
                </div>
                <div className="flex-1 p-3 border-r border-gray-200 flex items-center gap-1">
                    <Input 
                        value={formData.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        className="w-48 h-7 border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/10 text-xs" 
                    />
                    <Button 
                        onClick={() => checkDuplicate('username')}
                        variant="secondary" 
                        className="h-7 px-3 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]"
                    >
                        중복확인
                    </Button>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    닉네임
                </div>
                <div className="flex-1 p-3 flex items-center gap-1">
                     <Input 
                        value={formData.nickname}
                        onChange={(e) => handleChange('nickname', e.target.value)}
                        className="w-48 h-7 border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/10 text-xs" 
                     />
                    <Button 
                        onClick={() => checkDuplicate('nickname')}
                        variant="secondary" 
                        className="h-7 px-3 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]"
                    >
                        중복확인
                    </Button>
                </div>
            </div>

            {/* Name / Password */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span> 이름
                </div>
                <div className="flex-1 p-3 border-r border-gray-200">
                    <Input 
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-48 h-7 border-gray-300 text-xs" 
                    />
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    <span className="text-red-500 mr-1">*</span> 비밀번호
                </div>
                <div className="flex-1 p-3">
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                            <Input 
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                className="w-48 h-7 border-gray-300 text-xs" 
                                placeholder="비밀번호 입력" 
                            />
                            <span className="text-[11px] text-red-500">{formData.password.length} / 16</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Input 
                                type="password"
                                value={formData.passwordConfirm}
                                onChange={(e) => handleChange('passwordConfirm', e.target.value)}
                                className="w-48 h-7 border-gray-300 text-xs" 
                                placeholder="비밀번호 확인" 
                            />
                            <span className="text-[11px] text-red-500">{formData.passwordConfirm.length} / 16</span>
                        </div>
                        {formData.password && formData.password !== formData.passwordConfirm && (
                            <p className="text-[11px] text-red-500 mt-1">
                                비밀번호가 일치하지 않습니다.
                            </p>
                        )}
                        <p className="text-[11px] text-red-500 mt-1">
                            <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mr-1">!</span>
                            영문대문자/영문소문자/숫자/특수문자 중 2개 이상 포함, 10~16자리 이하
                        </p>
                     </div>
                </div>
            </div>

            {/* Email */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    이메일
                </div>
                <div className="flex-[2] p-3 border-r border-gray-200">
                    <div className="flex items-center gap-1 mb-2">
                        <Input 
                            value={formData.emailId}
                            onChange={(e) => handleChange('emailId', e.target.value)}
                            className="w-32 h-7 border-gray-300 text-xs" 
                        />
                        <span className="text-gray-500">@</span>
                         <Input 
                            value={formData.emailDomain}
                            onChange={(e) => handleChange('emailDomain', e.target.value)}
                            className="w-32 h-7 border-red-300 bg-red-50/10 text-xs" 
                         />
                         <Select 
                            value={formData.emailDomainSelect} 
                            onValueChange={handleEmailDomainSelect}
                         >
                            <SelectTrigger className="w-24 h-7 text-[11px] border-gray-300 bg-white">
                                <SelectValue placeholder="직접입력" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="direct">직접입력</SelectItem>
                                <SelectItem value="naver.com">naver.com</SelectItem>
                                <SelectItem value="gmail.com">gmail.com</SelectItem>
                                <SelectItem value="daum.net">daum.net</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button 
                            onClick={() => checkDuplicate('email')}
                            variant="secondary" 
                            className="h-7 px-3 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]"
                        >
                            중복확인
                        </Button>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                         <Checkbox 
                            id="mail-consent" 
                            checked={formData.emailConsent}
                            onCheckedChange={(c) => handleChange('emailConsent', c === true)}
                            className="border-gray-300 rounded-[2px]" 
                         />
                         <Label htmlFor="mail-consent" className="text-gray-600 font-normal cursor-pointer text-xs">정보/이벤트 MAIL 수신에 동의합니다.</Label>
                    </div>
                     <p className="text-[11px] text-red-500 leading-tight">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mr-1">!</span>
                         수신동의설정 안내메일의 자동발송여부에 따라 회원정보의 수신동의설정 변경 시 해당 회원에게 안내메일이 자동 발송됩니다.
                    </p>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    이메일<br/>수신동의/거부일
                </div>
                <div className="flex-1 p-3 flex items-center text-gray-600">
                    거부 : -
                </div>
            </div>

             {/* Mobile - Added Input */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    휴대폰번호
                </div>
                <div className="flex-[2] p-3 border-r border-gray-200">
                     <div className="mb-2 h-7 flex gap-1 items-center">
                         <Select 
                            value={formData.mobile1}
                            onValueChange={(v) => handleChange('mobile1', v)}
                         >
                            <SelectTrigger className="w-16 h-7 text-xs border-gray-300">
                                <SelectValue placeholder="010"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="010">010</SelectItem>
                                <SelectItem value="011">011</SelectItem>
                                <SelectItem value="016">016</SelectItem>
                            </SelectContent>
                         </Select>
                         -
                         <Input 
                            value={formData.mobile2}
                            onChange={(e) => handleChange('mobile2', e.target.value)}
                            maxLength={4}
                            className="w-16 h-7 text-xs border-gray-300"
                         />
                         -
                         <Input 
                            value={formData.mobile3}
                            onChange={(e) => handleChange('mobile3', e.target.value)}
                            maxLength={4}
                            className="w-16 h-7 text-xs border-gray-300"
                         />
                     </div>
                    <div className="flex items-center gap-1.5 mb-2">
                         <Checkbox 
                            id="sms-consent" 
                            checked={formData.smsConsent}
                            onCheckedChange={(c) => handleChange('smsConsent', c === true)}
                            className="border-gray-300 rounded-[2px]" 
                         />
                         <Label htmlFor="sms-consent" className="text-gray-600 font-normal cursor-pointer text-xs">정보/이벤트 SMS 수신에 동의합니다.</Label>
                    </div>
                     <p className="text-[11px] text-red-500 leading-tight">
                        <span className="inline-block bg-red-500 text-white w-3 h-3 text-[9px] text-center leading-3 rounded-[2px] mr-1">!</span>
                         수신동의설정 안내메일의 자동발송여부에 따라 회원정보의 수신동의설정 변경 시 해당 회원에게 SMS가 자동 발송됩니다.
                    </p>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    SMS<br/>수신동의/거부일
                </div>
                <div className="flex-1 p-3 flex items-center text-gray-600">
                    거부 : -
                </div>
            </div>

            {/* Address */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    주소
                </div>
                <div className="flex-1 p-3">
                     <div className="flex items-center gap-1 mb-2">
                        <Input 
                            value={formData.zipcode}
                            onChange={(e) => handleChange('zipcode', e.target.value)}
                            className="w-24 h-7 border-gray-300 text-xs" 
                            placeholder="우편번호"
                        />
                        <Button variant="secondary" className="h-7 px-3 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]">우편번호찾기</Button>
                     </div>
                     <div className="flex items-center gap-1">
                        <Input 
                            value={formData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            className="w-[300px] h-7 border-gray-300 text-xs" 
                            placeholder="기본주소"
                        />
                        <Input 
                            value={formData.addressDetail}
                            onChange={(e) => handleChange('addressDetail', e.target.value)}
                            className="w-[300px] h-7 border-gray-300 text-xs" 
                            placeholder="상세주소"
                        />
                     </div>
                </div>
            </div>

             {/* Phone */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    전화번호
                </div>
                <div className="flex-1 p-3">
                    <Input 
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-48 h-7 border-gray-300 text-xs" 
                    />
                </div>
            </div>
        </div>
      </div>

       {/* Additional Info Section */}
       <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">부가정보</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
            {/* Fax / Job */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    팩스번호
                </div>
                <div className="flex-1 p-3 border-r border-gray-200">
                    <Input 
                        value={formData.fax}
                        onChange={(e) => handleChange('fax', e.target.value)}
                        className="w-48 h-7 border-gray-300 text-xs" 
                    />
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    직업
                </div>
                <div className="flex-1 p-3">
                    <Select value={formData.job} onValueChange={(v) => handleChange('job', v)}>
                        <SelectTrigger className="w-32 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="select">선택</SelectItem>
                            <SelectItem value="office">회사원</SelectItem>
                            <SelectItem value="student">학생</SelectItem>
                            <SelectItem value="housewife">주부</SelectItem>
                            <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

             {/* Gender / Birthday */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    성별
                </div>
                <div className="flex-1 p-3 border-r border-gray-200 flex items-center gap-6">
                    <RadioGroup 
                        value={formData.gender}
                        onValueChange={(v) => handleChange('gender', v)}
                        className="flex items-center gap-6"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="MALE" id="gender-male" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="gender-male" className="text-gray-700 font-normal cursor-pointer text-xs">남자</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="FEMALE" id="gender-female" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="gender-female" className="text-gray-700 font-normal cursor-pointer text-xs">여자</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="NONE" id="gender-none" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="gender-none" className="text-gray-700 font-normal cursor-pointer text-xs">선택안함</Label>
                        </div>
                    </RadioGroup>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    생일
                </div>
                <div className="flex-1 p-3 flex items-center gap-1">
                     <Select 
                        value={formData.birthdayType}
                        onValueChange={(v) => handleChange('birthdayType', v)}
                     >
                        <SelectTrigger className="w-16 h-7 text-[11px] border-gray-300 bg-white">
                            <SelectValue placeholder="선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SOLAR">양력</SelectItem>
                            <SelectItem value="LUNAR">음력</SelectItem>
                        </SelectContent>
                    </Select>
                     <Input 
                        type="date"
                        value={formData.birthday}
                        onChange={(e) => handleChange('birthday', e.target.value)}
                        className="w-48 h-7 border-gray-300 text-xs" 
                     />
                </div>
            </div>
            
             {/* Marital Status / Anniversary */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    결혼여부
                </div>
                <div className="flex-1 p-3 border-r border-gray-200 flex items-center gap-6">
                    <RadioGroup 
                        value={formData.maritalStatus}
                        onValueChange={(v) => handleChange('maritalStatus', v)}
                        className="flex items-center gap-6"
                    >
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="SINGLE" id="marital-single" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="marital-single" className="text-gray-700 font-normal cursor-pointer text-xs">미혼</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="MARRIED" id="marital-married" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="marital-married" className="text-gray-700 font-normal cursor-pointer text-xs">기혼</Label>
                        </div>
                    </RadioGroup>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    결혼기념일
                </div>
                <div className="flex-1 p-3">
                     <Input 
                        type="date"
                        value={formData.anniversary}
                        onChange={(e) => handleChange('anniversary', e.target.value)}
                        className="w-48 h-7 border-gray-300 text-xs" 
                     />
                </div>
            </div>

             {/* Recommender */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    추천인아이디 <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
                <div className="flex-1 p-3 border-r border-gray-200 flex items-center gap-1">
                     <Input 
                        value={formData.recommenderId}
                        onChange={(e) => handleChange('recommenderId', e.target.value)}
                        className="w-48 h-7 border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/10 text-xs" 
                     />
                     <Button 
                        onClick={checkRecommender}
                        variant="secondary" 
                        className="h-7 px-3 text-[11px] bg-[#999999] text-white rounded-[2px] hover:bg-[#888888]"
                    >
                        확인
                    </Button>
                </div>
                 <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    추천받은횟수
                </div>
                <div className="flex-1 p-3 text-gray-600">
                     0회
                </div>
            </div>

            {/* Interests */}
            <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    관심분야 <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
                <div className="flex-1 p-3 grid grid-cols-5 gap-y-2">
                     {["화장품/향수/미용품", "컴퓨터/SW", "의류/패션잡화", "생활/주방용품", "보석/시계/악세사리", "가전/카메라", "서적/음반/비디오"].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                            <Checkbox 
                                id={`interest-${idx}`} 
                                checked={formData.interests.includes(item)}
                                onCheckedChange={(c) => handleInterestChange(item, c === true)}
                                className="border-gray-300 rounded-[2px]" 
                            />
                            <Label htmlFor={`interest-${idx}`} className="text-gray-600 font-normal cursor-pointer text-xs">{item}</Label>
                        </div>
                     ))}
                </div>
            </div>

             {/* Retention Period */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    개인정보유효기간 <br /> <HelpCircle className="w-3.5 h-3.5 text-gray-400 ml-1" />
                </div>
                <div className="flex-1 p-3 flex items-center gap-6">
                    <RadioGroup 
                        value={formData.retentionPeriod}
                        onValueChange={(v) => handleChange('retentionPeriod', v)}
                        className="flex items-center gap-6"
                    >
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="1y" id="retain-1" className="border-red-500 text-red-500 focus:ring-red-500" />
                            <Label htmlFor="retain-1" className="text-gray-700 font-normal cursor-pointer text-xs">1년</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="3y" id="retain-3" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="retain-3" className="text-gray-700 font-normal cursor-pointer text-xs">3년</Label>
                        </div>
                         <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="5y" id="retain-5" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="retain-5" className="text-gray-700 font-normal cursor-pointer text-xs">5년</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <RadioGroupItem value="withdrawal" id="retain-until" className="border-gray-300 text-gray-600" />
                            <Label htmlFor="retain-until" className="text-gray-700 font-normal cursor-pointer text-xs">탈퇴 시</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

             {/* Memo */}
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    남기는 말씀
                </div>
                <div className="flex-1 p-3">
                     <Textarea 
                        value={formData.userMemo}
                        onChange={(e) => handleChange('userMemo', e.target.value)}
                        className="w-full h-32 resize-none border-gray-300 text-xs" 
                     />
                </div>
            </div>
        </div>
      </div>

       {/* Consent Section (Display Only as per original?) */}
       <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
           <h2 className="font-bold text-base text-gray-800">개인정보 수집·이용 선택동의 내역</h2>
           <HelpCircle className="w-4 h-4 text-gray-400" />
        </div>

        <div className="border-t border-gray-400 border-b border-gray-200">
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    개인정보<br/>수집·이용
                </div>
                <div className="flex-1 p-3 text-gray-600">
                    사용안함
                </div>
            </div>
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    개인정보 취급위탁
                </div>
                <div className="flex-1 p-3 text-gray-600">
                    사용안함
                </div>
            </div>
             <div className="flex border-b border-gray-200">
                <div className="w-40 bg-[#FBFBFB] p-3 pl-4 font-bold text-gray-700 flex items-center">
                    개인정보<br/>제3자 제공
                </div>
                <div className="flex-1 p-3 text-gray-600">
                    사용안함
                </div>
            </div>
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
