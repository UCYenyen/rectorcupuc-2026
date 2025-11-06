import React from 'react'
import { Countdown } from '@/types/countdown.md'
import Image from "next/image";

type Props = {
  properties: Countdown;
  cardWidth?: string | undefined;
  innerRef?: (el: HTMLDivElement | null) => void;
}

export default function CountdownCard({ properties, cardWidth, innerRef }: Props) {
  return (
    // gunakan style width jika diberikan, dan pastikan konten mengisi lebar (w-full)
    <div
      ref={innerRef}
      className='relative flex flex-col gap-4 text-4xl text-white font-bold backdrop-blur-2xl text-center justify-center items-center p-4'
      style={cardWidth ? { width: cardWidth } : undefined}
    >
      <h1 className='relative z-10'>{properties.countdown}</h1>
      <h1 className='relative z-10'>{properties.label}</h1>
      <Image src={"/home/countdown-card.svg"} className="absolute w-full h-auto" height={80} width={80} alt="rectorcupuc countdown"></Image>
    </div>
  )
}
