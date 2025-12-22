"use client";
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { MatchWithTeams } from "@/types/competition.md";

interface LiveScoreProps {
  competitionId: string;
  initialMatches: MatchWithTeams[];
}

interface ScoreUpdateData {
  matchId: string;
  team1Score: number;
  team2Score: number;
  team1Name?: string;
  team2Name?: string;
}

let socket: Socket;

export default function LiveScore({ competitionId, initialMatches }: LiveScoreProps) {
  // Filter hanya match yang sedang ONGOING
  const ongoingMatches = initialMatches.filter(m => m.match_status === "ONGOING");
  
  // State untuk menyimpan ID match yang dipilih di dropdown
  const [selectedMatchId, setSelectedMatchId] = useState<string>(
    ongoingMatches.length > 0 ? ongoingMatches[0].id : ""
  );

  // State untuk menampilkan skor match yang sedang aktif
  const [liveMatch, setLiveMatch] = useState({
    team1: "No Active Match",
    team2: "No Active Match",
    score1: 0,
    score2: 0,
  });

  // Effect untuk mengupdate tampilan saat dropdown berubah atau data awal masuk
  useEffect(() => {
    const active = ongoingMatches.find(m => m.id === selectedMatchId);
    if (active) {
      setLiveMatch({
        team1: active.team_one_reference?.name || "Team 1",
        team2: active.team_two_reference?.name || "Team 2",
        score1: active.team_one_score,
        score2: active.team_two_score,
      });
    }
  }, [selectedMatchId, initialMatches]);

  useEffect(() => {
    socket = io();

    socket.on("connect", () => {
      socket.emit("join-competition", competitionId);
    });

    socket.on("score-updated-client", (data: ScoreUpdateData) => {
      // VALIDASI: Hanya update jika matchId yang dikirim socket sama dengan yang sedang dilihat user
      if (data.matchId === selectedMatchId) {
        setLiveMatch((prev) => ({
          ...prev,
          score1: data.team1Score,
          score2: data.team2Score,
          team1: data.team1Name || prev.team1,
          team2: data.team2Name || prev.team2,
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [competitionId, selectedMatchId]);

  if (ongoingMatches.length === 0) {
    return (
      <div className="p-12 text-center text-white/60 italic">
        Belum ada pertandingan yang sedang berlangsung.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Dropdown Pemilihan Match */}
      <div className="flex flex-col gap-2 px-4">
        <label className="text-white text-[10px] font-bold uppercase tracking-wider opacity-60">
          Pilih Pertandingan Live
        </label>
        <select 
          value={selectedMatchId}
          onChange={(e) => setSelectedMatchId(e.target.value)}
          className="bg-black/40 border-2 border-[#AAF3D5] text-white p-2 rounded-lg outline-none text-sm font-bold"
        >
          {ongoingMatches.map((m) => (
            <option key={m.id} value={m.id} className="bg-[#390D62]">
              {m.team_one_reference?.name} vs {m.team_two_reference?.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full p-4">
        {/* Team 1 */}
        <div className="flex flex-col gap-4 w-full">
          <div className="bg-gradient-to-r from-[#6226A4] to-[#FF6BDB] px-4 py-2 rounded-lg border-2 border-[#AAF3D5]">
            <h3 className="text-white font-bold text-center uppercase text-sm truncate">
              {liveMatch.team1}
            </h3>
          </div>
          <div className="bg-[#5B3A8F] border-4 border-[#AAF3D5] rounded-lg aspect-square flex items-center justify-center">
            <span className="text-white font-bold text-6xl sm:text-8xl">
              {liveMatch.score1}
            </span>
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col gap-4 w-full">
          <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2 rounded-lg border-2 border-[#AAF3D5]">
            <h3 className="text-white font-bold text-center uppercase text-sm truncate">
              {liveMatch.team2}
            </h3>
          </div>
          <div className="bg-[#5B3A8F] border-4 border-[#AAF3D5] rounded-lg aspect-square flex items-center justify-center">
            <span className="text-white font-bold text-6xl sm:text-8xl">
              {liveMatch.score2}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mb-4">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <span className="text-red-500 font-black text-xs uppercase tracking-widest">Live Now</span>
      </div>
    </div>
  );
}