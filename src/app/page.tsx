import AboutSection from "@/components/home/AboutSection";
import CountdownContainer from "@/components/home/CountdownContainer";
import TrailerSection from "@/components/home/TrailerSection";
import Image from "next/image";
import "@/styles/home.css"
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative bg-[url('/home/background.svg')] bg-cover min-h-screen w-screen flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] opacity-80"></div>
        <Image
          src={"/home/big-green-star.webp"}
          width={1000}
          height={1000}
          alt="rectorcupuc green star"
          className="z-[4] w-screen h-auto absolute bottom-[-60%]"
        ></Image>
        <Image
          src={"/home/big-yellow-star.webp"}
          width={1000}
          height={1000}
          alt="rectorcupuc yellow star"
          className="z-[3] w-screen h-auto absolute bottom-[-50%]"
        ></Image>
        <Image
          src={"/home/arcade-machine-big.webp"}
          width={1000}
          height={1000}
          alt="rectorcupuc giant arcade machine"
          className="z-[5] absolute bottom-0 opacity-[100%] w-[42vw] h-auto"
        ></Image>
        <Image
          src={"/home/card.svg"}
          width={1000}
          height={1000}
          alt="rectorcupuc card"
          className="z-[4] absolute left-[25%] bottom-[-5%] w-[50vw] h-auto"
        ></Image>
        <Image
          src={"/home/tv.webp"}
          width={250}
          height={250}
          alt="rectorcupuc tv right"
          className="z-[5] tv-right absolute bottom-0 right-0"
        ></Image>
        <Image
          src={"/home/arcade-medium-left.webp"}
          width={550}
          height={550}
          alt="rectorcupuc medium arcade machine"
          className="z-[5] arcade-medium-right absolute bottom-[-10%] right-[8rem]"
        ></Image>
        <Image
          src={"/home/tv.webp"}
          width={250}
          height={250}
          alt="rectorcupuc tv left"
          className="z-[5] tv-left rotate-y-180  absolute bottom-0 left-0"
        ></Image>
        <Image
          src={"/home/arcade-medium-right.webp"}
          width={550}
          height={550}
          alt="rectorcupuc meidum arcade machine"
          className="z-[5] absolute arcade-medium-left bottom-[-10%] left-[8rem]"
        ></Image>

        <div className="relative flex flex-col gap-4">
          <Image
            src={"/home/rector-title.svg"}
            width={1050}
            height={1050}
            alt="rectorcupuc title"
            className="rector-title z-[5] w-[50vw] h-auto"
          ></Image>
        </div>
        <CountdownContainer endDate="2026-01-01T00:00:00Z" />
      </div>
      <AboutSection />
      <TrailerSection/>
    </div>
  );
}
