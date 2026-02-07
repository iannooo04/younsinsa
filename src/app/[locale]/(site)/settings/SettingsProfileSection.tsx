"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define a type that matches what's passed from the server component
// based on getMyPageDataAction return type
interface UserData {
  id: string;
  name: string; 
  username: string; 
  nickname: string | null;
  image: string | null;
}

interface SettingsProfileSectionProps {
  user: UserData | null | undefined;
}

import { updateProfileImageAction } from "@/actions/user-actions";

export default function SettingsProfileSection({ user }: SettingsProfileSectionProps) {
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Close the first dialog and open confirmation dialog
      setIsImageDialogOpen(false);
      setIsConfirmOpen(true);
    }
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile || !user?.id) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", user.id);

    try {
      const result = await updateProfileImageAction(formData);
      if (result.success) {
        console.log("Profile image updated");
        // Optional: Trigger a toast or refresh if needed, but revalidatePath should handle data refresh
      } else {
        console.error(result.error);
        alert("이미지 변경 실패: " + result.error);
      }
    } catch (error) {
       console.error(error);
       alert("오류가 발생했습니다.");
    } finally {
      setIsConfirmOpen(false);
      setSelectedFile(null); // Reset file
    }
  };

  return (
    <section className="bg-white px-5 pt-2 pb-8">
      <div className="flex items-center gap-4 mb-5">
        {/* Avatar */}
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-200 border border-gray-100 relative flex items-center justify-center">
          {user?.image ? (
            <Image
              src={user.image}
              alt="Profile"
              fill
              className="object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 text-white"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-[18px] font-bold text-black">
            {user?.nickname || user?.name || "사용자"}
          </span>
          <span className="text-[14px] text-gray-500">
            ID: {user?.username?.split("_")[0]}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex-1 border border-gray-300 rounded-[4px] py-3 text-[14px] font-medium text-black hover:bg-gray-50 transition-colors">
              프로필 이미지 변경
            </button>
          </DialogTrigger>
          <DialogContent className="w-[90%] max-w-[400px] p-0 gap-0 rounded-[12px] overflow-hidden bg-white">
            <DialogHeader className="px-5 py-4 flex flex-row items-center justify-between border-b border-gray-100">
              <DialogTitle className="text-[16px] font-bold text-black">프로필 이미지 변경</DialogTitle>
            </DialogHeader>

            <div className="py-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <button 
                  onClick={handleUploadClick}
                  className="w-full text-left px-5 py-3 text-[15px] text-black hover:bg-gray-50 transition-colors"
                >
                    사진 올리기
                </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
           <DialogContent className="w-[90%] max-w-[400px] p-6 rounded-[12px] bg-white gap-6">
             <DialogTitle className="sr-only">프로필 이미지 변경 확인</DialogTitle>
             <div>
                <p className="text-[15px] text-black font-medium leading-normal">
                  스냅의 프로필 이미지도 동일하게 변경됩니다. 변경하시겠습니까?
                </p>
             </div>
             
             <div className="flex gap-3">
               <button 
                 onClick={() => setIsConfirmOpen(false)}
                 className="flex-1 py-3 bg-white border border-gray-200 rounded-[4px] text-[14px] font-medium text-black hover:bg-gray-50"
               >
                 취소
               </button>
               <button 
                 onClick={handleConfirmUpload}
                 className="flex-1 py-3 bg-black border border-black rounded-[4px] text-[14px] font-medium text-white hover:bg-black/90"
               >
                 변경하기
               </button>
             </div>
           </DialogContent>
        </Dialog>

        <Link 
          href="/settings/nickname"
          className="flex-1 border border-gray-300 rounded-[4px] py-3 text-[14px] font-medium text-black hover:bg-gray-50 transition-colors text-center"
        >
          닉네임 변경
        </Link>
      </div>
    </section>
  );
}
