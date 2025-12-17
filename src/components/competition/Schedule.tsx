import React from 'react';

interface ScheduleProps {
  competitionId: string;
}

export default function Schedule({ competitionId }: ScheduleProps) {
  // Mock data untuk schedule
  const schedules = [
    {
      date: "2026-01-15",
      matches: [
        {
          time: "09:00",
          team1: "Team A",
          team2: "Team B",
          venue: "Court 1",
          status: "completed"
        },
        {
          time: "11:00",
          team1: "Team C",
          team2: "Team D",
          venue: "Court 2",
          status: "completed"
        }
      ]
    },
    {
      date: "2026-01-16",
      matches: [
        {
          time: "09:00",
          team1: "Team E",
          team2: "Team F",
          venue: "Court 1",
          status: "upcoming"
        },
        {
          time: "11:00",
          team1: "Team G",
          team2: "Team H",
          venue: "Court 2",
          status: "upcoming"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500';
      case 'live':
        return 'bg-red-500/20 text-red-400 border-red-500 animate-pulse';
      case 'upcoming':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Match Schedule</h2>

      <div className="space-y-6">
        {schedules.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-gradient-to-r from-[#390D62]/40 to-[#6226A4]/40 border-2 border-[#AAF3D5] rounded-lg p-4">
            {/* Date Header */}
            <h3 className="text-lg font-bold text-[#AAF3D5] mb-4">
              {new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>

            {/* Matches */}
            <div className="space-y-3">
              {day.matches.map((match, matchIndex) => (
                <div
                  key={matchIndex}
                  className="bg-black/30 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  {/* Time */}
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-lg">{match.time}</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(match.status)}`}>
                      {match.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="flex-1 flex items-center justify-center gap-3">
                    <span className="text-white font-medium text-center">{match.team1}</span>
                    <span className="text-[#AAF3D5] font-bold">VS</span>
                    <span className="text-white font-medium text-center">{match.team2}</span>
                  </div>

                  {/* Venue */}
                  <div className="text-white/70 text-sm">
                    {match.venue}
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