import CompetitionPicker from "@/components/competition/CompetitionPicker";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPORTS Competitions - Rector Cup 2026",
  description: "Explore the thrilling SPORTS competitions at Rector Cup 2026. Join us for an unforgettable experience!",
};

export default function page() {
  return (
    <>
      <div className='w-screen h-[10vh] md:h-[7vh]'></div>
      <div className="relative min-h-screen w-screen overflow-hidden flex flex-col justify-center items-center gap-4">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <RectorInlineTitle />
        <div className="relative z-2 flex flex-col gap-4 w-[90%] mb-48 justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          <CompetitionTitleHeader title="SPORTS" shouldFitContent={false} />
          <div className="w-full grid grid-cols-1 grid-rows-1 md:grid-cols-6 md:grid-rows-7 gap-3 md:h-[70vh]">
            <CompetitionPicker
              src="/competitions/hero/basketball-putra.webp"
              link="/competitions/sports/basketball-putra"
              title="Basketball Putra"
              alt="rectorcup"
              className="w-full h-full aspect-square md:aspect-auto row-start-1 col-start-1 col-span-1 md:col-start-1 md:row-start-1 md:col-span-4 md:row-span-2"
            />
            <CompetitionPicker
              src="/competitions/hero/basketball-putri.webp"
              link="/competitions/sports/basketball-putri"
              title="Basketball Putri"
              alt="rectorcup"
              className="w-full h-full aspect-square md:aspect-auto md:col-start-5 md:row-start-1 md:col-span-2 md:row-span-2"
            />

            <CompetitionPicker
              src="/competitions/hero/futsal.webp"
              link="/competitions/sports/futsal"
              title="Futsal"
              alt="rectorcup"
              className="w-full h-full aspect-square md:aspect-auto md:col-start-1 md:row-start-3 md:col-span-2 md:row-span-3"
            />

            <CompetitionPicker
              src="/competitions/hero/billiard.webp"
              link="/competitions/sports/billiard"
              title="Billiard"
              alt="rectorcup"
              className="w-full h-full aspect-square md:aspect-auto md:col-start-3 md:row-start-3 md:col-span-2 md:row-span-2"
            />

            <CompetitionPicker
              src="/competitions/hero/badminton.webp"
              link="/competitions/sports/badminton"
              title="Badminton"
              alt="rectorcup"
              className="w-full h-full aspect-square md:aspect-auto md:col-start-5 md:row-start-3 md:col-span-2 md:row-span-5"
            />

            <CompetitionPicker
              src="/competitions/hero/ping-pong.webp"
              link="/competitions/sports/ping-pong"
              title="Ping Pong"
              alt="rectorcup"
              className="w-full h-full aspect-square md:aspect-auto md:col-start-3 md:row-start-5 md:col-span-2 md:row-span-3"
            />

            <CompetitionPicker
              src="/competitions/hero/taekwondo.webp"
              link="/competitions/sports/taekwondo"
              title="Taekwondo"
              alt="rectorcup"
              className="w-full h-full aspect-square md:aspect-auto md:col-start-1 md:row-start-6 md:col-span-2 md:row-span-2"
            />
          </div>
        </div>
      </div>
    </>
  );
}