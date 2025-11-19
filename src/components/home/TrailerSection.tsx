import React from 'react'
import Image from "next/image";

export default function TrailerSection() {
  return (
    <div className="relative bg-[url('/home/background.svg')] bg-cover h-[40rem] sm:min-h-screen w-screen flex flex-col justify-center items-center">
        <div className="bg-trailer absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] opacity-80"></div>
        <div className='relative z-10 flex flex-col justify-center items-center gap-12'>
            <h1 className='text-5xl font-bold text-white'>TRAILER</h1>
            <div className="video-frame bg-[url('/home/video-frame.webp')] bg-cover bg-no-repeat bg-center w-[20rem] sm:w-[50rem] h-[12rem] sm:h-[30rem]">
            </div>
        </div>
        <Image
                    src={"/home/border.svg"}
                    className="z-[5] trailer-border-bottom absolute bottom-[-5%] left-0 w-[100rem] sm:w-full h-auto pointer-events-none"
                    alt="rectorcupuc border-bottom"
                    width={1000}
                    height={1000}
                />
    </div>
  )
}
