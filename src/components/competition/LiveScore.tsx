"use client";
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { MatchWithTeams } from "@/types/competition.md";

let socket: Socket;

export default function LiveScore({ competitionId, initialMatches }: { competitionId: string, initialMatches: MatchWithTeams[] }) {
  const ongoingMatches = initialMatches?.filter(m => m.match_status === "ONGOING") || [];
  const [selectedMatchId, setSelectedMatchId] = useState<string>(ongoingMatches[0]?.id || "");
  const [liveMatch, setLiveMatch] = useState({
    team1: "", team2: "", score1: 0, score2: 0,
  });

  useEffect(() => {
    const active = ongoingMatches.find(m => m.id === selectedMatchId);
    if (active) {
      setLiveMatch({
        team1: active.team_one_reference?.name || "TBA",
        team2: active.team_two_reference?.name || "TBA",
        score1: active.team_one_score,
        score2: active.team_two_score,
      });
    }
  }, [selectedMatchId, initialMatches]);

  useEffect(() => {
    if (!socket) socket = io();
    
    socket.emit("join-competition", competitionId);

    socket.on("score-updated-client", (data) => {
      if (data.matchId === selectedMatchId) {
        setLiveMatch(prev => ({
          ...prev,
          score1: data.team1Score,
          score2: data.team2Score,
          team1: data.team1Name || prev.team1,
          team2: data.team2Name || prev.team2,
        }));
      }
    });

    return () => {
      socket.off("score-updated-client");
    };
  }, [competitionId, selectedMatchId]);

  if (ongoingMatches.length === 0) {
    return <div className="p-12 text-center text-white/40 italic">Tidak ada pertandingan live.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 px-4">
        <label className="text-white text-[10px] font-bold uppercase tracking-wider opacity-60">Pilih Pertandingan Live</label>
        <select 
          value={selectedMatchId}
          onChange={(e) => setSelectedMatchId(e.target.value)}
          className="bg-black/40 border-2 border-[#AAF3D5] text-white p-2 rounded-lg outline-none font-bold"
        >
          {ongoingMatches.map((m) => (
            <option key={m.id} value={m.id} className="bg-[#390D62]">
              {m.team_one_reference?.name} VS {m.team_two_reference?.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4">
        <div className="flex flex-col gap-3">
          <div className="bg-gradient-to-r from-[#6226A4] to-[#FF6BDB] p-2 rounded border border-[#AAF3D5] text-center text-white text-xs font-bold truncate">
            {liveMatch.team1}
          </div>
          <div className="bg-[#5B3A8F]/40 border-4 border-[#AAF3D5] rounded-xl aspect-square flex items-center justify-center text-6xl sm:text-8xl font-black text-white">
            {liveMatch.score1}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] p-2 rounded border border-[#AAF3D5] text-center text-white text-xs font-bold truncate">
            {liveMatch.team2}
          </div>
          <div className="bg-[#5B3A8F]/40 border-4 border-[#AAF3D5] rounded-xl aspect-square flex items-center justify-center text-6xl sm:text-8xl font-black text-white">
            {liveMatch.score2}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 py-4">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-red-500 font-black text-[10px] uppercase tracking-tighter">Live Update Active</span>
      </div>
    </div>
  );
}