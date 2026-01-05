"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <>
      <div className="w-screen h-[10vh] md:h-[7vh]"></div>
      <div className="relative min-h-screen gap-4 w-screen overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <RectorInlineTitle />
        <div className="relative mb-48 z-2 flex flex-col gap-4 justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <CompetitionTitleHeader title="SIGN IN" shouldFitContent={true} />
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-white text-lg leading-relaxed text-center w-[80%] font-semibold">
              Please sign in with your Ciputra University account to continue.
            </p>
            <button
              onClick={() => signIn("google", { callbackUrl })}
              className="text-white bg-black/40 border-white border-3 rounded-lg px-6 py-3 text-center font-bold uppercase hover:bg-purple-800 transition-all"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4]" />}>
      <SignInContent />
    </Suspense>
  );
}