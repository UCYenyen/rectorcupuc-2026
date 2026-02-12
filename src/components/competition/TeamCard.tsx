'use client'

import Image from 'next/image'
import PixelCard from '../PixelCard';
import { useState } from 'react'

interface TeamCardProps {
  name: string;
  imageSrc: string;
}

export default function TeamCard({ 
  name, 
  imageSrc,
}: TeamCardProps) {
  // Keep the fallback image logic
  const [imgSrc, setImgSrc] = useState(imageSrc || '/placeholder/no-image.svg');

  return (
    <PixelCard variant="pink" className='border-3 border-white rounded-lg relative h-[320px] max-w-[275px] flex items-stretch'>
      <div className='absolute inset-0 bg-black/40 backdrop-blur-2xl flex flex-col items-center w-full p-4 gap-2 overflow-hidden'>

        {/* Image Section - Now takes up the remaining space */}
        <div className="flex justify-center w-full flex-1 items-center min-h-0 relative mt-2">
          <Image 
            src={imgSrc} 
            alt={name} 
            loading="lazy"
            fill // Changed to fill to adapt to the container size
            sizes="(max-width: 275px) 100vw, 275px"
            onError={() => setImgSrc('/placeholder/no-image.svg')}
            className="object-center object-cover rounded-lg border-white" 
          />
        </div>

      </div>
    </PixelCard>
  )
}