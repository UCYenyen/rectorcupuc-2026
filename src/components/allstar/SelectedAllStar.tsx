"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AllStarPlayer } from "@/lib/data/allStarData";

const competitions = [
  { name: "Basketball Putri", slug: "basketball-putri" },
  { name: "Futsal", slug: "futsal" },
  { name: "Basketball Putra", slug: "basketball-putra" },
];

const faculties = ["All", "SBM", "SCI", "SOT", "SIFT", "SOM", "SOP", "SOC"];

function AllStarPlayerCard({ player }: { player: AllStarPlayer }) {
  const [imgSrc, setImgSrc] = useState(
    player.image || "/placeholder/no-image.svg",
  );

  return (
    <div className="bg-white/10 border-2 border-[#AAF3D5] rounded-lg p-6 flex flex-col items-center justify-center text-center gap-2">
      <div className="w-20 h-20 relative mb-2 shadow-lg shrink-0 rounded-full overflow-hidden border-2 border-[#AAF3D5]">
        <Image
          src={imgSrc}
          alt={player.name}
          fill
          unoptimized
          loading="lazy"
          onError={() => setImgSrc("/placeholder/no-image.svg")}
          className="object-cover object-center"
        />
      </div>
      <h3 className="text-xl font-bold text-white uppercase">{player.name}</h3>
      <div className="flex gap-2">
        <span className="bg-[#AAF3D5] text-[#390D62] text-xs font-bold px-3 py-1 rounded-full uppercase">
          {player.faculty}
        </span>
        {player.role && (
          <span className="bg-[#EB79F0] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
            {player.role}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-300 mt-2 break-all">{player.email}</p>
    </div>
  );
}

export default function SelectedAllStar({
  players,
}: {
  players: AllStarPlayer[];
}) {
  const [selectedCompSlug, setSelectedCompSlug] = useState(
    competitions[0].slug,
  );
  const [selectedFaculty, setSelectedFaculty] = useState("All");

  const filteredPlayers = players.filter((player) => {
    const matchComp = player.competition === selectedCompSlug;
    const matchFaculty =
      selectedFaculty === "All" || player.faculty === selectedFaculty;
    return matchComp && matchFaculty;
  });

  return (
    <div className="relative z-[2] mb-48 flex flex-col gap-8 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-4 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full border-4 text-white border-[#AAF3D5] rounded-lg py-2 font-bold bg-gradient-to-r from-[#6427A8] to-[#EB79F0] flex justify-center items-center relative">
          <select
            value={selectedCompSlug}
            onChange={(e) => setSelectedCompSlug(e.target.value)}
            className="appearance-none bg-transparent text-xl md:text-2xl text-center w-full h-full cursor-pointer outline-none uppercase px-8 z-10"
          >
            {competitions.map((comp) => (
              <option key={comp.slug} value={comp.slug} className="text-black">
                {"Allstar - " + comp.name}
              </option>
            ))}
          </select>
          <div className="absolute right-6 pointer-events-none text-xl">▼</div>
        </div>

        <div className="w-full border-4 text-white border-[#AAF3D5] rounded-lg py-2 font-bold bg-gradient-to-r from-[#6427A8] to-[#EB79F0] flex justify-center items-center relative">
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="appearance-none bg-transparent text-xl md:text-2xl text-center w-full h-full cursor-pointer outline-none uppercase px-8 z-10"
          >
            {faculties.map((fac) => (
              <option key={fac} value={fac} className="text-black">
                {fac === "All" ? "Semua Jurusan" : `Jurusan - ${fac}`}
              </option>
            ))}
          </select>
          <div className="absolute right-6 pointer-events-none text-xl">▼</div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <AllStarPlayerCard key={player.email} player={player} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-white text-xl font-bold">
            Tidak ada All Star yang ditemukan
          </div>
        )}
      </div>
    </div>
  );
}
