import React from 'react'
import { signIn } from 'next-auth/react';
export default function GoogleLogin() {
  return (
    <button
      type="button"
      aria-label="Sign in"
      className="w-full flex justify-end rounded-lg bg-black/30 backdrop-blur-2xl border-white border-3 px-4 py-2 whitespace-nowrap"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Sign in
    </button>
  )
}
