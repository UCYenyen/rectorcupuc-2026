import React from 'react'
import BottomAsset from './competition/BottomAsset'

export default function Footer() {
    return (
        <footer className='relative w-full flex flex-col'>
            <div className='relative z-10 w-full h-[3rem]'>
                <div className='bg-[#390D62] absolute z-4 w-screen h-full'></div>
                <BottomAsset />
            </div>
            <div className='w-full bg-gradient-to-b from-[#390D62] to-[#6226A4] flex flex-col justify-center items-center py-4'>
                <p className='text-white text-sm sm:text-base'>&copy; 2026 Rector Cup. All rights reserved.</p>
            </div>
        </footer>
    )
}
