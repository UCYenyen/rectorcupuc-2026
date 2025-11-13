import React from 'react'

export default function TrailerSection() {
  return (
    <div className="relative bg-[url('/home/background.svg')] bg-cover min-h-screen w-screen flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] opacity-80"></div>
        <div className='relative z-10 flex flex-col justify-center items-center gap-12'>
            <h1 className='text-5xl font-bold text-white'>TRAILER</h1>
            <div className="bg-[url('/home/video-frame.webp')] bg-cover bg-no-repeat bg-center w-[50rem] h-[30rem]">
               
            </div>
        </div>
    </div>
  )
}
