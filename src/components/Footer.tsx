import React from 'react'
import BottomAsset from './competition/BottomAsset'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className='relative w-full flex flex-col'>
            <div className='relative z-10 w-full h-[3rem]'>
                <div className='bg-[#390D62] absolute z-4 w-full h-full'></div>
                <BottomAsset />
            </div>
            <div className='w-full bg-gradient-to-b from-[#390D62] to-[#6226A4] flex flex-col justify-center items-center py-4'>
                <div className='flex gap-4 items-center justify-center'>
                    <Image src={"/logos/logo-uc.png"} className='h-auto w-16' alt="Rector Cup Logo UC" width={100} height={50} />
                    <Image src={"/logos/logo-sc.png"} className='h-auto w-16' alt="Rector Cup Logo SC" width={100} height={50} />
                </div>
                <p className='text-white text-sm sm:text-base'>&copy; 2026 Rector Cup. All rights reserved.</p>
                <Link href="/privacy-policy" className='text-white text-sm sm:text-base underline mt-2'>Privacy Policy</Link>
            </div>
        </footer>
    )
}
