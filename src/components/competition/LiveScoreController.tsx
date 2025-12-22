"use client";
import { io } from "socket.io-client";
import { CompetitionContainerProps } from "@/types/competition.md";
import Link from "next/link";

const socket = io();

export default function LiveScoreController({ competitionData }: { competitionData: CompetitionContainerProps }) {

    if (!competitionData.matches || competitionData.matches.length === 0) {
        return <div className="flex flex-col gap-4 text-white">
            <p>No matches available for this competition.</p>
            <Link href="/dashboard/admin/competitions" className="bg-black/40 rounded-lg px-4 py-2 border-white border-4 text-center font-bold hover:bg-purple-800">Go back to competitions</Link>
        </div>;
    }

    const activeMatch = competitionData.matches.find(match => match.match_status === "ONGOING");
    const handleUpdate = (s1: number, s2: number) => {
        socket.emit("update-score-server", {
            competitionId: competitionData.id,
            team1Score: s1,
            team2Score: s2,
            team1Name: "Persija",
            team2Name: "Persib"
        });
    };

    return (
        <div className="flex gap-4 p-4 bg-white rounded">
            <button onClick={() => handleUpdate(1, 0)} className="bg-black p-2 text-white">Update Skor</button>
        </div>
    );
}