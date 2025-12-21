import React from 'react'
import Image from "next/image";
import StripeBackground from '../StripeBackground';

export default function TrailerSection() {
  return (
    <div className="relative bg-cover h-[40rem] sm:min-h-screen w-screen flex flex-col justify-center items-center">
      <div className="bg-trailer absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] opacity-80"></div>
      <div className='relative z-10 flex flex-col justify-center items-center gap-12'>
        <h1 className='text-5xl font-bold text-white'>TRAILER</h1>
        <div className="video-frame bg-[url('/home/video-frame.webp')] bg-cover bg-no-repeat bg-center w-[20rem] sm:w-[50rem] h-[12rem] sm:h-[30rem]">
        </div>
      </div>
      <StripeBackground />
      <Image
        src={"/home/pixelmon.webp"}
        className="z-[10] pixelmon-right absolute bottom-0 left-0"
        alt="rectorcupuc pixelmon"
        width={1000}
        height={1000}
      />
      <Image
        src={"/home/ghost-pink.webp"}
        className="z-[10] ghost-pink-left absolute top-0 right-0"
        alt="rectorcupuc pixelmon"
        width={1000}
        height={1000}
      />
    </div>

  )
}
