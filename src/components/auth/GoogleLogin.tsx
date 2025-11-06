import React from 'react'
import { signIn } from 'next-auth/react';
export default function GoogleLogin() {
  return (
    <button
      type="button"
      aria-label="Sign in"
      className="w-full flex justify-end rounded-lg bg-zinc-300 items-center whitespace-nowrap px-4 py-2"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Sign in
    </button>
  )
}
