// pages/login.tsx
"use client";

import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-purple">
      <div className="flex flex-col items-center p-8 text-gray-200 text-center">
        <h1 className="text-6xl font-black italic mb-4">HAPPY AF</h1>
        <p className="mb-4">Do Good. Feel Good.</p>
        <button type="submit" onClick={()=>signIn("google", { callbackUrl: '/app' })} className="text-xl font-semibold font-serif duration-300 rounded-full bg-pink text-white p-3 w-full ">
        Log In...
        </button>
      </div>
    </div>
  );
}
