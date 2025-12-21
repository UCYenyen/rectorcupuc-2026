import Image from "next/image";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";
import { Settings } from "lucide-react";
export default function UnderDevelopmentPage() {
  return (
    <>
      <div className='w-screen h-[10vh] md:h-[7vh]'></div>
      <div className="relative min-h-screen bg-[url('/home/background.svg')] w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <div className="relative z-2 my-[7.5rem] md:my-[10%] flex flex-col gap-4 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <RectorInlineTitle />
          <CompetitionTitleHeader title="UNDER DEVELOPMENT" shouldFitContent={true} />

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-black/40 border-white border-3 rounded-full p-4">
              <Settings className="w-16 h-16 text-white" />
            </div>
            <p className="text-white text-lg leading-relaxed text-center mb-6">
              We&apos;re working hard to bring you an amazing experience. The site
              is currently under development and will be available soon!
            </p>

            <div className="text-sm text-[#AAF3D5] text-center font-bold">
              <p>Expected launch: 3 January 2026</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
