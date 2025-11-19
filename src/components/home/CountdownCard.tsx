import React from 'react'
import { Countdown } from '@/types/countdown.md'
import Image from "next/image";
import "@/styles/home.css"

type Props = {
  properties: Countdown;
  cardWidth?: string | undefined;
  innerRef?: (el: HTMLDivElement | null) => void;
}

export default function CountdownCard({ properties, cardWidth, innerRef }: Props) {
  return (
    <div 
      className="countdown-card w-[150px] sm:w-[220px] flex flex-col gap-6" // gap lebih besar
    >
      {/* Card container dengan aspect ratio sesuai image */}
      <div
        ref={innerRef}
        className="relative w-full aspect-[4/5]"
      >
        {/* Background image countdown-card - fills the container */}
        <Image
          src={"/home/countdown-card.svg"}
          fill
          className="object-contain"
          alt="rectorcupuc countdown"
          priority
        />
        
        {/* Content overlay - countdown number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-bold z-10"> {/* Lebih besar */}
            {properties.countdown}
          </h1>
        </div>
      </div>

      {/* Label section dengan background image */}
      <div className="relative w-full aspect-[8/3]">
        <Image
          src={"/home/countdown-label.svg"}
          fill
          className="object-contain"
          alt="rectorcupuc countdown label"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl text-white font-medium z-10"> {/* Lebih besar */}
            {properties.label}
          </h2>
        </div>
      </div>
    </div>
  )
}
