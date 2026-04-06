
import React from "react";
import { auth } from "@/auth";
import { getMyPageDataAction } from "@/actions/user-actions";
import MemberInfoForm from "./MemberInfoForm";

export default async function MemberInfoPage() {
  const session = await auth();
  const { user } = await getMyPageDataAction(session?.user?.id as string);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="w-full max-w-[960px] bg-white relative">
        {/* Header */}
        <section className="bg-[#F9F9F9] px-5 py-6 border-b border-gray-100">
             <h1 className="text-[16px] font-bold text-black">회원정보 변경</h1>
        </section>

        {/* Form Content */}
        <MemberInfoForm user={user} />
      </div>
    </div>
  );
}
