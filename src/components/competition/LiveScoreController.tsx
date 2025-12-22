"use client";
import React, { useState, useEffect, useTransition } from "react";
import { io } from "socket.io-client";
import { CompetitionContainerProps } from "@/types/competition.md";
import { handleUpdateMatchScore } from "@/lib/action";
import { Plus, Minus, Trophy } from "lucide-react";

const socket = io();

export default function LiveScoreController({ competitionData, slug }: { competitionData: CompetitionContainerProps, slug: string }) {
    const [isPending, startTransition] = useTransition();
    const ongoingMatches = competitionData.matches?.filter(m => m.match_status === "ONGOING") || [];
    
    const [selectedMatchId, setSelectedMatchId] = useState<string>(ongoingMatches[0]?.id || "");
    const activeMatch = ongoingMatches.find(m => m.id === selectedMatchId);

    useEffect(() => {
        if (!selectedMatchId && ongoingMatches.length > 0) {
            setSelectedMatchId(ongoingMatches[0].id);
        }
    }, [ongoingMatches, selectedMatchId]);

    const updateScore = (t1Delta: number, t2Delta: number) => {
        if (!activeMatch) return;

        const newS1 = Math.max(0, activeMatch.team_one_score + t1Delta);
        const newS2 = Math.max(0, activeMatch.team_two_score + t2Delta);

        socket.emit("update-score-server", {
            competitionId: competitionData.id,
            matchId: activeMatch.id,
            team1Score: newS1,
            team2Score: newS2,
            team1Name: activeMatch.team_one_reference?.name || "Team 1",
            team2Name: activeMatch.team_two_reference?.name || "Team 2"
        });

        startTransition(async () => {
            await handleUpdateMatchScore(activeMatch.id, newS1, newS2, slug);
        });
    };

    if (ongoingMatches.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-white/60 border-4 border-dashed border-white/20 rounded-xl">
                <Trophy size={48} className="mb-4 opacity-20" />
                <p className="font-bold">No Ongoing Matches Found</p>
                <p className="text-sm">Set a match status to "ONGOING" in Brackets tab first.</p>
            </div>
        );
    }

    return (
        <div className={`flex flex-col gap-6 p-4 ${isPending ? "opacity-70 pointer-events-none" : ""}`}>
            <div className="flex flex-col gap-2">
                <label className="text-white text-xs font-bold uppercase tracking-widest">Select Active Match</label>
                <select 
                    value={selectedMatchId}
                    onChange={(e) => setSelectedMatchId(e.target.value)}
                    className="w-full bg-black/40 border-2 border-[#AAF3D5] text-white p-3 rounded-lg outline-none font-bold"
                >
                    {ongoingMatches.map(m => (
                        <option key={m.id} value={m.id} className="bg-[#390D62]">
                            {m.team_one_reference?.name} vs {m.team_two_reference?.name} ({m.match_type})
                        </option>
                    ))}
                </select>
            </div>

            {activeMatch && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Team 1 Control */}
                    <div className="flex flex-col gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-[#AAF3D5] font-black text-center uppercase truncate">{activeMatch.team_one_reference?.name}</h3>
                        <div className="text-7xl font-black text-white text-center py-4">{activeMatch.team_one_score}</div>
                        <div className="flex gap-4">
                            <button onClick={() => updateScore(-1, 0)} className="flex-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 p-4 rounded-xl border border-red-500/50 transition-all flex justify-center"><Minus /></button>
                            <button onClick={() => updateScore(1, 0)} className="flex-1 bg-green-500/20 hover:bg-green-500/40 text-green-400 p-4 rounded-xl border border-green-500/50 transition-all flex justify-center"><Plus /></button>
                        </div>
                    </div>

                    {/* Team 2 Control */}
                    <div className="flex flex-col gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-[#FF6BDB] font-black text-center uppercase truncate">{activeMatch.team_two_reference?.name}</h3>
                        <div className="text-7xl font-black text-white text-center py-4">{activeMatch.team_two_score}</div>
                        <div className="flex gap-4">
                            <button onClick={() => updateScore(0, -1)} className="flex-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 p-4 rounded-xl border border-red-500/50 transition-all flex justify-center"><Minus /></button>
                            <button onClick={() => updateScore(0, 1)} className="flex-1 bg-green-500/20 hover:bg-green-500/40 text-green-400 p-4 rounded-xl border border-green-500/50 transition-all flex justify-center"><Plus /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}