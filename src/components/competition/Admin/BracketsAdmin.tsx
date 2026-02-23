import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Team {
  id: string;
  name: string;
}

interface MatchWithTeams {
  id: string;
  team_one_score: number;
  team_two_score: number;
  match_status: string;
  match_type: string;
  team_one_reference: Team;
  team_two_reference: Team;
  teams?: Team[];
}

interface BracketsProps {
  matches: MatchWithTeams[];
  handleStatusChange: (matchId: string, newStatus: "ONGOING" | "COMPLETED" | "UPCOMMING") => Promise<void>;
}

export default function BracketsAdmin({ matches, handleStatusChange }: BracketsProps) {
  if (!matches || matches.length === 0) {
    return (
      <div className="p-8 text-center text-white/60">
        No matches yet for this competition!
      </div>
    );
  }

  // const quarterFinals = matches.filter(m => m.match_type === "QUARTERFINAL");
  const semiFinals = matches.filter(m => m.match_type === "SEMIFINAL");
  const finals = matches.filter(m => m.match_type === "FINAL");

  const renderMatchCard = (match: MatchWithTeams) => {
    const team1 = match.team_one_reference || match.teams?.[0];
    const team2 = match.team_two_reference || match.teams?.[1];

    return (
      <div key={match.id} className="flex flex-col bg-black/40 backdrop-blur-2xl border-3 border-[white] rounded-lg p-4 shadow-lg mb-4">
        <div className="text-[10px] text-[#AAF3D5]/70 mb-2 font-mono">
          ID: {match.id.slice(0, 8)}
        </div>

        <div className="flex flex-col gap-3">
          <Link href={`/competitions/team/${team1?.id}`} className={`flex justify-between items-center p-3 rounded-md border transition-all duration-300 hover:scale-[1.02] ${match.match_status !== "UPCOMMING" && match.team_one_score > match.team_two_score ? "bg-gradient-to-r from-[#6226A4]/60 to-[#FF6BDB] border-white border-3" : "bg-white/10 border-transparent"}`}>
            <div className='flex justify-center items-center gap-4'>
              <ArrowRight className="text-white" />
              <span className="text-white font-bold truncate pr-2">{team1?.name || "TBA"}</span>
            </div>
            <span className="text-white font-black text-xl">{match.team_one_score}</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex-grow h-[1px] bg-white/20"></div>
            <span className="text-[10px] text-white/40 font-bold italic">VS</span>
            <div className="flex-grow h-[1px] bg-white/20"></div>
          </div>

          <Link href={`/competitions/team/${team2?.id}`} className={`flex justify-between items-center p-3 rounded-md border transition-all duration-300 hover:scale-[1.02] ${match.match_status === "COMPLETED" && match.team_two_score > match.team_one_score ? "bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] border-white" : "bg-white/10 border-transparent"}`}>
            <div className='flex gap-4 items-center justify-center'>
              <ArrowRight className="text-white" />
              <span className="text-white font-bold truncate pr-2">{team2?.name || "TBA"}</span>
            </div>
            <span className="text-white font-black text-xl">{match.team_two_score}</span>
          </Link>

          <select
            value={match.match_status}
            onChange={(e) => handleStatusChange(match.id, e.target.value as "ONGOING" | "COMPLETED" | "UPCOMMING")}
            className={`text-lg px-4 py-2 text-center w-full rounded-lg border-white border-3 font-bold uppercase cursor-pointer bg-black/40 text-white backdrop-blur-2xl hover:bg-purple-800
              }`}
          >
            <option value="UPCOMMING" className="bg-[#390D62]">UPCOMING</option>
            <option value="ONGOING" className="bg-[#390D62]">ONGOING</option>
            <option value="COMPLETED" className="bg-[#390D62]">COMPLETED</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-[#AAF3D5] pb-2">QUARTER FINALS</h1>
          {quarterFinals.length > 0 ? quarterFinals.map(renderMatchCard) : <p className="text-white/40 italic text-sm">No matches scheduled</p>}
        </div> */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-[#AAF3D5] pb-2">SEMI FINALS</h1>
          {semiFinals.length > 0 ? semiFinals.map(renderMatchCard) : <p className="text-white/40 italic text-sm">No matches scheduled</p>}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-[#AAF3D5] pb-2">FINALS</h1>
          {finals.length > 0 ? finals.map(renderMatchCard) : <p className="text-white/40 italic text-sm">No matches scheduled</p>}
        </div>
      </div>
    </div>
  );
}