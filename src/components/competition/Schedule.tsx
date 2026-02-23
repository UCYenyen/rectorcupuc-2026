"use client";
import { Match, Team } from "@prisma/client";
import React from "react";

interface FormattedMatch {
  date: string;
  time: string;
  team1Name: string;
  team2Name: string;
  status: string;
}

interface DailySchedule {
  date: string;
  matches: FormattedMatch[];
}

type MatchWithVenue = Match & { venue?: string };

export default function Schedule({
  matches,
  teams,
}: {
  matches: MatchWithVenue[];
  teams: Team[];
}) {
  const getTeamName = (teamId: string) => {
    if (!teams || teams.length === 0) return "No Teams Loaded";

    const team = teams.find((t) => String(t.id) === String(teamId));
    return team ? team.name : `Team Not Found (${teamId.substring(0, 5)}...)`;
  };

  const schedules = (matches || []).reduce<DailySchedule[]>((acc, m) => {
    const startTime = new Date(m.startTime);
    // Manual WIB offset (UTC+7) — lebih aman daripada bergantung locale browser
    const WIB_MS = 7 * 60 * 60 * 1000;
    const wibTime = new Date(startTime.getTime() + WIB_MS);
    const date = wibTime.toISOString().split("T")[0]; // YYYY-MM-DD in WIB
    const hours = String(wibTime.getUTCHours()).padStart(2, "0");
    const minutes = String(wibTime.getUTCMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes} WIB`;

    const matchData: FormattedMatch = {
      date,
      time,
      team1Name: getTeamName(m.team_one_id),
      team2Name: getTeamName(m.team_two_id),
      status: (m.match_status || "UPCOMMING").toLowerCase(),
    };

    const existingDay = acc.find((day) => day.date === date);

    if (existingDay) {
      existingDay.matches.push(matchData);
    } else {
      acc.push({ date, matches: [matchData] });
    }

    return acc;
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500";
      case "ongoing":
        return "bg-red-500/20 text-red-400 border-red-500 animate-pulse";
      case "upcomming":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {schedules.length === 0 ? (
        <div className="p-8 text-center text-white/40 border-2 border-dashed border-white/10 rounded-xl">
          No matches scheduled.
        </div>
      ) : (
        <div className="space-y-6">
          {schedules.map((day) => (
            <div
              key={day.date}
              className="bg-gradient-to-r from-[#390D62]/40 to-[#6226A4]/40 border-2 border-[#AAF3D5] rounded-lg p-4"
            >
              <h3 className="text-lg font-bold text-[#AAF3D5] mb-4">
                {new Date(day.date + "T00:00:00Z").toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </h3>
              <div className="space-y-3">
                {day.matches.map((match, matchIndex) => (
                  <div
                    key={`${day.date}-${matchIndex}`}
                    className="bg-black/30 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-lg">
                        {match.time}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-3">
                      <span className="text-white font-medium text-center">
                        {match.team1Name}
                      </span>
                      <span className="text-[#AAF3D5] font-bold">VS</span>
                      <span className="text-white font-medium text-center">
                        {match.team2Name}
                      </span>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(match.status)}`}
                    >
                      {match.status.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
