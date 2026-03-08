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
    <div className="w-full border-4 text-white rounded-lg py-2 font-bold flex justify-center items-center relative focus:outline-none focus:ring-2 focus:ring-[#AAF3D5] bg-black/40 cursor-pointer md:text-lg appearance-none text-center">
      <select
        value={activeCompetitionId}
        onChange={(e) => router.push(`?competition=${e.target.value}`)}
        className="appearance-none bg-transparent text-xl md:text-2xl text-center w-full h-full cursor-pointer outline-none uppercase px-8 z-10"
      >
        <option value="" disabled className="text-black">
          Select Competition
        </option>
        {competitions.map((comp) => (
          <option key={comp.id} value={comp.id} className="text-black">
            {comp.name}
          </option>
        ))}
      </select>
      <div className="absolute right-6 pointer-events-none text-xl">▼</div>
    </div>
  );
}
