import React from 'react'
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";
import { LoaderCircle } from "lucide-react";
export default function loading() {
    return (
        <>
            <div className='w-screen h-[10vh] md:h-[7vh]'></div>
            <div className="relative min-h-screen gap-4 w-screen overflow-hidden flex flex-col justify-center items-center">
                <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
                <StripeBackground />
                <RectorInlineTitle />
                <div className="relative z-2 mb-48 flex flex-col gap-4 max-w-lg justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
                    <CompetitionTitleHeader title="LOADING" shouldFitContent={true} />

                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="bg-black/40 border-white border-3 rounded-full p-4">
                            <LoaderCircle className="w-16 h-16 text-white spin-in" />
                        <style>{`
                            @keyframes spin {
                                to { transform: rotate(360deg); }
                            }
                            .spin-in {
                                animation: spin 1s linear infinite;
                                transform-origin: center;
                            }
                        `}</style>
                        </div>
                        <p className="text-white text-lg leading-relaxed text-center">
                            Please wait, the page is loading...
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
