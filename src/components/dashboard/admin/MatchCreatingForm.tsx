'use client'
import React, { useActionState } from 'react'
import { Team } from '@prisma/client'
import { CompetitionContainerProps } from '@/types/competition.md'
import { CreateMatchFormState } from '@/lib/action';
import { createMatch } from '@/lib/competition';
import { CompetitionMatchType } from '@prisma/client';

export default function MatchCreatingForm({ competition }: { competition: CompetitionContainerProps }) {
    const initialState: CreateMatchFormState = {
        error: "",
        success: undefined,
        matchId: "1"
    };

    // Gunakan createMatch langsung tanpa .bind
    const [state, formAction, isPending] = useActionState(
        createMatch,
        initialState
    );

    return (
        <form action={formAction} className="relative z-10 border-[#AAF3D5] flex flex-col justify-center items-center gap-4 border-4 bg-white/10 text-white backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full">
            <h1 className='text-3xl font-bold'>Create Matches - {competition.name}</h1>
             <input type="hidden" name="competitionId" value={competition.id} />
            <div className='w-full flex flex-col gap-2 text-left'>
                <label htmlFor="startDate" className='font-semibold'>Start Date</label>
                <input
                    type="datetime-local"
                    name="startDate"
                    id="startDate"
                    style={{
                        colorScheme: 'dark',
                    }}
                    required
                    className='w-full px-4 py-2 rounded-lg border-2 border-white bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]'
                />
            </div>
            <div className='w-full flex flex-col gap-2 text-left'>
                <label htmlFor="endDate" className='font-semibold'>End Date</label>
                <input
                    type="datetime-local"
                    name="endDate"
                    id="endDate"
                    required
                    style={{
                        colorScheme: 'dark',
                    }}
                    className='w-full px-4 py-2 rounded-lg border-2 border-white bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]'
                />
            </div>
            <div className='w-full flex flex-col gap-2 text-left'>
                <label htmlFor="duration" className='font-semibold'>Duration (minutes)</label>
                <input
                    type="number"
                    name="duration"
                    id="duration"
                    min={1}
                    required
                    className='w-full px-4 py-2 rounded-lg border-2 border-white bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]'
                />
            </div>
            <div className='w-full flex flex-col gap-2 text-left'>
                <label htmlFor="team1" className='font-semibold'>Team 1</label>
                <select
                    name="team1"
                    id="team1"
                    required
                    className='w-full px-4 py-2 rounded-lg border-2 border-white bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]'
                >
                    <option value="" disabled defaultValue="">Pilih tim 1</option>
                     {competition.teams?.map((team: Team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='w-full flex flex-col gap-2 text-left'>
                <label htmlFor="team2" className='font-semibold'>Team 2</label>
                <select
                    name="team2"
                    id="team2"
                    required
                    className='w-full px-4 py-2 rounded-lg border-2 border-white bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]'
                >
                    <option value="" disabled defaultValue="">Pilih tim 2</option>
                    {competition.teams?.map((team: Team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='w-full flex flex-col gap-2 text-left'>
                <label htmlFor="team2" className='font-semibold'>MATCH TYPE</label>
                <select
                    name="match-type"
                    id="match-type"
                    required
                    className='w-full px-4 py-2 rounded-lg border-2 border-white bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]'
                >
                    <option value="" disabled defaultValue="">Pilih match type</option>
                    {Object.values(CompetitionMatchType).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                disabled={isPending}
                className='bg-black/30 px-4 py-2 text-white rounded-lg text-center border-white border-4 w-fit hover:bg-black/50 transition disabled:opacity-50'
            >
                {isPending ? 'Creating...' : 'Create Matches'}
            </button>

            {state.error && (
                <p className="text-red-400 mt-2 text-sm bg-red-950/30 p-2 rounded">{state.error}</p>
            )}

            {state.success && (
                <p className="text-green-400 mt-2 text-sm bg-green-950/30 p-2 rounded">Match created successfully!</p>
            )}
        </form>
    )
}
