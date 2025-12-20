import React from 'react'

export default function CompetitionTitleHeader({ title }: { title: string }) {
    return (
        <div className="w-full border-4 border-[#AAF3D5] rounded-lg py-2 bg-gradient-to-r from-[#6427A8] to-[#EB79F0] flex justify-center items-center">
            <h1 className="text-2xl">{title.toUpperCase()}</h1>
        </div>
    )
}
