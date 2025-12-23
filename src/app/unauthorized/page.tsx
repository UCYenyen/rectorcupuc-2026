import Link from "next/link";
import { Settings } from "lucide-react";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";
export default function UnauthorizedPage() {
  return (
    <>
      <div className='w-screen h-[10vh] md:h-[7vh]'></div>
      <div className="relative min-h-screen gap-4 w-screen overflow-hidden flex flex-col  items-center justify-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <RectorInlineTitle />
        <div className="relative mb-48 z-2 flex flex-col gap-4 justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <CompetitionTitleHeader title="ERROR 403" shouldFitContent={true} />
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-black/40 border-white border-3 rounded-full p-4">
              <Settings className="w-16 h-16 text-white" />
            </div>
            <p className="text-white text-lg leading-relaxed text-center max-w-lg">
              You are not allowed to access this page. Please make sure you are logged in with the correct account or have the necessary permissions.
            </p>

            <div className="text-2x; text-white bg-black/30 border-white border-3 rounded-lg px-4 py-2 text-center font-bold uppercase">
              <Link href={"/"}>Go back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
