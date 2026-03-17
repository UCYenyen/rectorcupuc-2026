"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { BsCopy } from "react-icons/bs";
import StripeBackground from "../StripeBackground";
import gsap from "gsap";

interface CompetitionRegistration {
    id: string;
    competition: {
        id: string;
        name: string;
        category: string;
        team_name: string;
        referal_code: string;
    };
    team: {
        id: string;
        name: string;
        min_team_members: number;
        current_team_members: number;
        max_team_members: number;
    };
    registration_status: string;
}

export default function UserDashboard() {
    const { data: session } = useSession();
    const [joinRequests, setJoinRequests] = useState<CompetitionRegistration[]>([]);
    const [showClosingModal, setShowClosingModal] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const fetchJoinRequests = useCallback(async () => {
        if (!session?.user?.id) return;
        try {
            const res = await fetch(`/api/user/${session.user.id}/registrations/member`);
            if (res.ok) {
                const data = await res.json();
                setJoinRequests(data);
            }
        } catch (err) {
            console.error(err);
        }
    }, [session?.user?.id]);

    useEffect(() => {
        fetchJoinRequests();
    }, [fetchJoinRequests]);

    // AUTO POPUP
    useEffect(() => {
        setShowClosingModal(true);
    }, []);

    // GSAP ANIMATION
    useEffect(() => {
        if (showClosingModal) {
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );

            gsap.fromTo(
                modalRef.current,
                { y: 100, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" }
            );
        }
    }, [showClosingModal]);

    const closeClosingModal = () => {
        gsap.to(modalRef.current, {
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setShowClosingModal(false)
        });

        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-start justify-center p-4 md:p-8">
            <StripeBackground />

            <div className="relative z-10 mt-[10%] w-[90%]">
                <h1 className="text-3xl font-bold text-white mb-6">
                    Hi, {session?.user?.name}
                </h1>

                <div className="backdrop-blur-2xl rounded-xl border-4 border-[#AAF3D5] bg-black/30 overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-purple-600">
                            <tr>
                                <th className="px-4 py-3 text-white">Competition</th>
                                <th className="px-4 py-3 text-white">Team</th>
                                <th className="px-4 py-3 text-white">Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {joinRequests.map((reg) => (
                                <tr key={reg.id}>
                                    <td className="px-4 py-3 text-white">
                                        {reg.competition.name}
                                    </td>
                                    <td className="px-4 py-3 text-white">
                                        {reg.team.name}
                                    </td>
                                    <td className="px-4 py-3 text-white">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    reg.competition.referal_code
                                                );
                                                alert("Copied!");
                                            }}
                                            className="flex items-center gap-2"
                                        >
                                            {reg.competition.referal_code} <BsCopy />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CLOSING CEREMONY MODAL */}
            {showClosingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        ref={overlayRef}
                        className="absolute inset-0 bg-[#5D239F]/60 backdrop-blur-sm"
                        onClick={closeClosingModal}
                    />

                    <div
                        ref={modalRef}
                        className="relative z-10 border-[#DFE5E1] bg-gradient-to-r from-[#FFE694] via-white/80 to-white/60 border-4 backdrop-blur-2xl rounded-2xl shadow-2xl text-center max-w-md w-full overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-[#DD7CDF] via-[#FAE39F] py-3 border-b-4 border-[#DFE5E1]">
                            <h3 className="text-2xl text-[#1E0843] font-bold uppercase">
                                RECTOR CUP 2026 - Closing Ceremony 🏆✨
                            </h3>
                        </div>

                        <div className="flex flex-col gap-4 px-8 py-6 text-[#1E0843]">
                            <p>
                                We warmly invite all participants to attend the
                                <b> Closing Ceremony of Rector Cup 2026! 🎊</b>
                            </p>

                            <div className="bg-white/60 border-2 rounded-xl p-4 text-left">
                                <p>📅 <b>Date & Time:</b></p>
                                <p>15:30 WIB - End</p>
                                <p className="text-xs">
                                    (Open Gate: 15:30 - 16:00 WIB ⏰)
                                </p>

                                <p className="mt-3">📍 <b>Location:</b></p>
                                <p>Dian Auditorium, 7th Floor, UC Main Building</p>
                            </div>

                            <p>
                                Let's come together to celebrate the spirit of
                                sportsmanship and all the incredible moments from
                                Rector Cup 2026. 💫
                            </p>

                            <button
                                onClick={closeClosingModal}
                                className="px-4 py-2 text-white bg-[#1E0843]/70 rounded-lg hover:bg-purple-800"
                            >
                                See You There 👋
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}