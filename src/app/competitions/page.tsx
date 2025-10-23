import React from 'react'
import { getAllCompetitions } from '@/lib/competition'
import CompetitionContainer from '@/components/competition/CompetitionContainer';

export default async function page() {
  const competitionData = await getAllCompetitions();
  return (
    <div className="min-h-screen w-screen overflow-hidden bg-zinc-300 flex flex-col justify-center items-center p-4">
      <h1 className="text-6xl text-black font-bold text-center mb-8">Competitions</h1>
      <div className="w-full max-w-5xl">
        <CompetitionContainer items={competitionData} />
      </div>
    </div>
  )
}
