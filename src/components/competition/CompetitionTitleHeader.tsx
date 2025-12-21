import React from 'react'

export default function CompetitionTitleHeader({ title, shouldFitContent }: { title: string, shouldFitContent : boolean }) {
    return (
        <div className={(shouldFitContent ? "w-fit px-4 py-2" : "w-full") + " border-4 text-white border-[#AAF3D5] rounded-lg py-2 font-bold bg-gradient-to-r from-[#6427A8] to-[#EB79F0] flex justify-center items-center"}>
            <h1 className="text-2xl">{title.toUpperCase()}</h1>
        </div>
    )
}
