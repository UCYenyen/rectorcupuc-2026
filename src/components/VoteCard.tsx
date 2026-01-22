'use client'
import Image from 'next/image'
import PixelCard from './PixelCard'
import { useState } from 'react'

interface VoteCardProps {
  name: string;
  imageSrc: string;
}

export default function VoteCard({ name, imageSrc }: VoteCardProps) {
  const [imgSrc, setImgSrc] = useState(imageSrc || '/placeholder/no-image.svg');
  
  return (
    <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
      <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full justify-between p-4 gap-2 overflow-hidden'>
        <h2 className="text-white text-xl font-bold text-center line-clamp-2 w-full flex-shrink-0">{name}</h2>
        <div className="flex justify-center w-full flex-1 items-center min-h-0">
          <Image 
            src={imgSrc} 
            alt={name} 
            loading="lazy"
            width={200} 
            height={200} 
            onError={() => setImgSrc('/placeholder/no-image.svg')}
            className="object-center object-cover h-full w-full rounded-lg border-white" 
          />
        </div>
        <button className="bg-black/40 border-white border-3 text-white font-semibold rounded-lg shadow hover:bg-purple-800 duration-200 transition-all w-full py-2 flex-shrink-0">VOTE</button>
      </div>
    </PixelCard>
  )
}
