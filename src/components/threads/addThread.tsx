"use client";

import { useState, useRef } from "react";

import { Button } from "../ui/button";


import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Image } from "lucide-react";
import UserAvatar from "../common/userAvatar";

export default function AddThread() {


  const handleIconClick = () => {
   
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    
  };


  const submit = () => {
   
  };

  return (
    <div className="mt-5">
      {/* {previewUrl ? (
        <div className="mb-5">
          <ImagePreviewCard image={previewUrl} callback={removePriview} />
        </div>
      ) : (
        <></>
      )} */}
      <div className="flex items-start">
        <UserAvatar name={"S"} image="" />
        <textarea
          className="w-full h-24 text-md p-2 bg-muted outline-none  resize-none rounded-lg placeholder:font-normal ml-2"
          placeholder="Type somthing great...."
       
        />
      </div>

      <div className="ml-12  flex justify-between items-center">
        <input
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
        <Image
          onClick={handleIconClick}
          height={20}
          width={20}
          className="cursor-pointer"
        />
        <Button
        
          onClick={submit}
        >
           Post
        </Button>
      </div>
    </div>
  );
}