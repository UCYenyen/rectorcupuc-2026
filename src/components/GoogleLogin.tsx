import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
export default function GoogleLogin() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="bg-white lg:bg-zinc-600 flex justify-center w-full items-center gap-1 rounded-md p-1 text-base text-gray-900"
    >
      <FcGoogle size={25} />
      <span className="text-md text-white">Sign in with Google</span>
    </button>
  )
}
