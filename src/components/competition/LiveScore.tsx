"use client";
import React, { useState, useEffect } from 'react';

interface LiveScoreProps {
  competitionId: string;
}

export default function LiveScore({ competitionId }: LiveScoreProps) {
  const [liveMatch, setLiveMatch] = useState({
    team1: "Team A",
    team2: "Team B",
    score1: 10,
    score2: 20,
  });

  // Simulate live score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMatch(prev => ({
        ...prev,
        score1: prev.score1 + Math.floor(Math.random() * 3),
        score2: prev.score2 + Math.floor(Math.random() * 3),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-6 h-full flex flex-col justify-center">
      {/* Score Display */}
      <div className="grid grid-cols-2 gap-4">
        {/* Team A */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2 rounded-lg border-2 border-[#AAF3D5]">
            <h3 className="text-white font-bold text-center uppercase text-lg sm:text-xl">
              {liveMatch.team1}
            </h3>
          </div>
          <div className="bg-[#5B3A8F] border-4 border-[#AAF3D5] rounded-lg aspect-square flex items-center justify-center">
            <span className="text-white font-bold text-7xl sm:text-9xl">
              {liveMatch.score1}
            </span>
          </div>
        </div>

        {/* Team B */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] px-4 py-2 rounded-lg border-2 border-[#AAF3D5]">
            <h3 className="text-white font-bold text-center uppercase text-lg sm:text-xl">
              {liveMatch.team2}
            </h3>
          </div>
          <div className="bg-[#5B3A8F] border-4 border-[#AAF3D5] rounded-lg aspect-square flex items-center justify-center">
            <span className="text-white font-bold text-7xl sm:text-9xl">
              {liveMatch.score2}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}