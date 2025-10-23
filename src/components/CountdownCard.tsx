import React from 'react'
import { Countdown } from '@/types/countdown.md'

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
      className='flex flex-col gap-4 text-4xl text-white font-bold bg-black/25 backdrop-blur-2xl border-2 rounded-2xl text-center justify-center items-center p-4'
      style={cardWidth ? { width: cardWidth } : undefined}
    >
      <h1>{properties.countdown}</h1>
      <h1>{properties.label}</h1>
    </div>
  )
}
