"use client";

import Link from "next/link";
import { Mail, MailIcon } from "lucide-react";
import Image from "next/image";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";

export default function AuthErrorPage() {
    return (
        <>
            <div className='w-screen h-[10vh] md:h-[7vh]'></div>
            <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen overflow-hidden flex flex-col justify-center items-center">
                <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
                <StripeBackground />
                <div className="relative z-2 my-[7.5rem] md:my-[10%] flex flex-col gap-4 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
                    <RectorInlineTitle />
                    <CompetitionTitleHeader title="UNAUTHORIZED" shouldFitContent={true} />
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="bg-black/40 border-white border-3 rounded-full p-4">
                            <MailIcon className="w-16 h-16 text-white" />
                        </div>
                        <p className="text-white text-center text-lg md:text-xl">
                           You must use a valid ciputra email to log in!
                        </p>
                        <Link href={"/"} className="text-white text-2xl font-bold bg-black/30 border-white border-3 px-4 py-2 rounded-lg hover:cursor-pointer uppercase">Back To Home</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
