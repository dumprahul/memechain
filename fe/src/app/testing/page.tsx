'use client'
import LogIn from "@/components/LogIn";
import { useUser } from "@account-kit/react";


export default function Page(){
  const user = useUser();


    return <div className="flex flex-col justify-center items-center h-screen bg-[#f5f589] px-4 py-8">
        <LogIn/>
    </div>
}