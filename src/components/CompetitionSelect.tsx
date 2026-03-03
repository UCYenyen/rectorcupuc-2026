"use client";

import { useRouter } from "next/navigation";

interface Competition {
  id: string;
  name: string;
}

interface CompetitionSelectProps {
  competitions: Competition[];
  activeCompetitionId: string;
}

export default function CompetitionSelect({
  competitions,
  activeCompetitionId,
}: CompetitionSelectProps) {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center">
      <select
        value={activeCompetitionId}
        onChange={(e) => router.push(`?competition=${e.target.value}`)}
        className="w-full px-4 py-3 rounded-lg border-2 border-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5] bg-black/40 text-white font-bold cursor-pointer md:text-lg appearance-none text-center"
      >
        <option value="" disabled className="bg-[#390D62] text-white">
          Select Competition
        </option>
        {competitions.map((comp) => (
          <option
            key={comp.id}
            value={comp.id}
            className="bg-[#390D62] text-white text-left font-bold"
          >
            {comp.name}
          </option>
        ))}
      </select>
    </div>
  );
}
