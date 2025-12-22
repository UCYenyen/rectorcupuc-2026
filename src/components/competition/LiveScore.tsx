"use client";
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface LiveScoreProps {
  competitionId: string;
}

interface ScoreUpdateData {
  team1Score: number;
  team2Score: number;
  team1Name?: string;
  team2Name?: string;
}

let socket: Socket;

export default function LiveScore({ competitionId }: LiveScoreProps) {
  const [liveMatch, setLiveMatch] = useState({
    team1: "Loading...",
    team2: "Loading...",
    score1: 0,
    score2: 0,
  });

  useEffect(() => {
    // Inisialisasi koneksi socket
    socket = io();

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
      // Bergabung ke room spesifik kompetisi ini
      socket.emit("join-competition", competitionId);
    });

    // Mendengarkan update skor dari server
    socket.on("score-updated-client", (data: ScoreUpdateData) => {
      setLiveMatch((prev) => ({
        ...prev,
        score1: data.team1Score,
        score2: data.team2Score,
        // Update nama jika dikirim dari server
        team1: data.team1Name || prev.team1,
        team2: data.team2Name || prev.team2,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [competitionId]);

  return (
    <div className="p-4 sm:p-6 h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-4">
        {/* Team 1 */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2 rounded-lg border-2 border-[#AAF3D5]">
            <h3 className="text-white font-bold text-center uppercase text-lg sm:text-xl truncate">
              {liveMatch.team1}
            </h3>
          </div>
          <div className="bg-[#5B3A8F] border-4 border-[#AAF3D5] rounded-lg aspect-square flex items-center justify-center">
            <span className="text-white font-bold text-7xl sm:text-9xl animate-pulse-short">
              {liveMatch.score1}
            </span>
          </div>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2 rounded-lg border-2 border-[#AAF3D5]">
            <h3 className="text-white font-bold text-center uppercase text-lg sm:text-xl truncate">
              {liveMatch.team2}
            </h3>
          </div>
          <div className="bg-[#5B3A8F] border-4 border-[#AAF3D5] rounded-lg aspect-square flex items-center justify-center">
            <span className="text-white font-bold text-7xl sm:text-9xl animate-pulse-short">
              {liveMatch.score2}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          <span className="ml-4 text-xs text-white/50 uppercase tracking-widest">Live Connection Active</span>
        </span>
      </div>
    </div>
  );
}