import React from 'react';

interface BracketsProps {
  competitionId: string;
}

export default function Brackets({ competitionId }: BracketsProps) {
  // Mock data untuk bracket
  const rounds = [
    {
      name: "Quarter Finals",
      matches: [
        { team1: "Team A", team2: "Team B", score1: 2, score2: 1, completed: true },
        { team1: "Team C", team2: "Team D", score1: 1, score2: 3, completed: true },
        { team1: "Team E", team2: "Team F", score1: null, score2: null, completed: false },
        { team1: "Team G", team2: "Team H", score1: null, score2: null, completed: false },
      ]
    },
    {
      name: "Semi Finals",
      matches: [
        { team1: "Team A", team2: "Team D", score1: null, score2: null, completed: false },
        { team1: "TBD", team2: "TBD", score1: null, score2: null, completed: false },
      ]
    },
    {
      name: "Finals",
      matches: [
        { team1: "TBD", team2: "TBD", score1: null, score2: null, completed: false },
      ]
    }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto">
        {rounds.map((round, roundIndex) => (
          <div key={roundIndex} className="flex-1 min-w-[250px]">
            <h3 className="text-lg font-semibold text-[#AAF3D5] mb-4 text-center uppercase">
              {round.name}
            </h3>
            
            <div className="flex flex-col gap-4">
              {round.matches.map((match, matchIndex) => (
                <div
                  key={matchIndex}
                  className="bg-gradient-to-r from-[#390D62]/60 to-[#6226A4]/60 border-2 border-[#AAF3D5] rounded-lg p-3"
                >
                  {/* Team 1 */}
                  <div className={`flex justify-between items-center p-2 rounded ${
                    match.completed && match.score1! > match.score2! 
                      ? 'bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB]' 
                      : 'bg-gradient-to-r from-[#E94BFF]/20 to-[#FF6BDB]/20'
                  }`}>
                    <span className="text-white font-medium">{match.team1}</span>
                    <span className="text-white font-bold text-lg">
                      {match.score1 !== null ? match.score1 : '-'}
                    </span>
                  </div>

                  <div className="border-t border-[#AAF3D5]/30 my-2"></div>

                  {/* Team 2 */}
                  <div className={`flex justify-between items-center p-2 rounded ${
                    match.completed && match.score2! > match.score1! 
                      ? 'bg-gradient-to-r from-[#E94BFF] to-[#FF6BDB]' 
                      : 'bg-gradient-to-r from-[#E94BFF]/20 to-[#FF6BDB]/20'
                  }`}>
                    <span className="text-white font-medium">{match.team2}</span>
                    <span className="text-white font-bold text-lg">
                      {match.score2 !== null ? match.score2 : '-'}
                    </span>
                  </div>

                  {/* Match Status */}
                  <div className="mt-2 text-center font-bold uppercase">
                    {match.completed ? (
                      <span className="text-green-400 text-xs">Completed</span>
                    ) : (
                      <span className="text-yellow-400 text-xs">Upcoming</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}