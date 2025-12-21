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
}

export default function Brackets({ matches }: BracketsProps) {
  if (!matches || matches.length === 0) {
    return (
      <div className="p-8 text-center text-white/60">
        No matches yet for this competition!
      </div>
    );
  }

  const quarterFinals = matches.filter(m => m.match_type === "QUARTERFINAL");
  const semiFinals = matches.filter(m => m.match_type === "SEMIFINAL");
  const finals = matches.filter(m => m.match_type === "FINAL");

  const renderMatchCard = (match: MatchWithTeams) => {
    const team1 = match.team_one_reference || match.teams?.[0];
    const team2 = match.team_two_reference || match.teams?.[1];

    return (
      <div
        key={match.id}
        className="flex flex-col bg-gradient-to-r from-[#390D62]/60 to-[#6226A4]/60 border-2 border-[#AAF3D5] rounded-lg p-4 shadow-lg mb-4"
      >
        <div className="text-[10px] text-[#AAF3D5]/70 mb-2 font-mono">
          Match
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={`/competitions/team/${team1.id}`}
            className={`flex justify-between items-center p-3 rounded-md border transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 ${match.match_status !== "UPCOMMING" && match.team_one_score > match.team_two_score
              ? "bg-gradient-to-r from-[#6226A4]/60 to-[#FF6BDB] border-white border-3"
              : "bg-white/10 border-transparent"
              }`}
          >
            <div className='flex justify-center items-center gap-4'>
              <ArrowRight className="text-white" />
              <span className="text-white font-bold truncate pr-2">
                {team1?.name || "TBA"}
              </span>
            </div>
            <span className="text-white font-black text-xl">
              {match.team_one_score}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex-grow h-[1px] bg-white/20"></div>
            <span className="text-[10px] text-white/40 font-bold italic">VS</span>
            <div className="flex-grow h-[1px] bg-white/20"></div>
          </div>

          <Link
            href={`/competitions/team/${team2.id}`}
            className={`flex justify-between items-center p-3 rounded-md border transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 ${match.match_status === "COMPLETED" && match.team_two_score > match.team_one_score
              ? "bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB] border-white"
              : "bg-white/10 border-transparent"
              }`}
          >
            <div className='flex gap-4 items-center justify-center'>
              <ArrowRight className="text-white" />
              <span className="text-white font-bold truncate pr-2">
                {team2?.name || "TBA"}
              </span>
            </div>
            <span className="text-white font-black text-xl">
              {match.team_two_score}
            </span>
          </Link>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
          <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${match.match_status === "COMPLETED"
            ? "bg-green-500/20 text-green-400"
            : match.match_status === "ONGOING"
              ? "bg-yellow-500/20 text-yellow-400 animate-pulse"
              : "bg-blue-500/20 text-blue-400"
            }`}>
            {match.match_status}
          </span>

          {match.match_status === "COMPLETED" && (
            <span className="text-[10px] text-white/60 italic">
              Match Ended
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-[#AAF3D5] pb-2">
            QUARTER FINALS
          </h1>
          {quarterFinals.length > 0 ? (
            quarterFinals.map(renderMatchCard)
          ) : (
            <p className="text-white/40 italic text-sm">No matches scheduled</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-[#AAF3D5] pb-2">
            SEMI FINALS
          </h1>
          {semiFinals.length > 0 ? (
            semiFinals.map(renderMatchCard)
          ) : (
            <p className="text-white/40 italic text-sm">No matches scheduled</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white mb-4 border-b-2 border-[#AAF3D5] pb-2">
            FINALS
          </h1>
          {finals.length > 0 ? (
            finals.map(renderMatchCard)
          ) : (
            <p className="text-white/40 italic text-sm">No matches scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
}