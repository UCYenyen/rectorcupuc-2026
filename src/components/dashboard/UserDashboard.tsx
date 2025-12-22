"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BsCopy } from "react-icons/bs";
import StripeBackground from "../StripeBackground";

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
  const [registrations, setRegistrations] = useState<CompetitionRegistration[]>(
    []
  );
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);
  const [referalCode, setReferalCode] = useState<string>("");
  const [isJoining, setIsJoining] = useState<boolean>(false);

  const fetchRegistrations = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const res = await fetch(`/api/user/${session.user.id}/registrations`);
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      } else {
        console.error("Failed to fetch registrations, status:", res.status);
      }
    } catch (err) {
      console.error("Failed to fetch registrations", err);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const openJoinModal = () => {
    setReferalCode("");
    setShowJoinModal(true);
  };

  const closeJoinModal = () => {
    setShowJoinModal(false);
    setReferalCode("");
    setIsJoining(false);
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert("You must be logged in to join a team.");
      return;
    }
    if (!referalCode.trim()) {
      alert("Please enter a referral code.");
      return;
    }

    if (!confirm("Are you sure you want to join this team?")) return;

    setIsJoining(true);
    try {
      const res = await fetch(`/api/user/${session.user.id}/join-team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referalCode: referalCode.trim() }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        alert(json.error || "Failed to join team");
        return { success: false, error: json.error };
      }

      // refresh registrations after successful join
      await fetchRegistrations();

      alert(json.message || "Joined team");
      closeJoinModal();
      return { success: true, team: json.team };
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="relative flex bg-gradient-to-b from-[#390D62] to-[#6226A4] gap-4 flex-col min-h-screen w-screen overflow-x-hidden justify-start items-center px-4 py-8">
      <StripeBackground />
      <div className="relative z-4 mt-[10%] sm:mt-[5%] w-[90%] flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Hi, {session?.user?.name}
          </h1>

          {/* Join Team Button */}
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 bg-black/40 backdrop-blur-2xl border-white border-3 rounded-lg hover:bg-purple-800 text-white text-base sm:text-xl sm:border-3 hover:scale-105 transition-transform duration-200 whitespace-nowrap"
            onClick={openJoinModal}
          >
            Join Team
          </button>
        </div>

        {/* Table Section with Horizontal Scroll */}
        <div className="relative z-5 backdrop-blur-2xl overflow-x-auto rounded-xl border-4 sm:border-[5px] border-[#AAF3D5] bg-gradient-to-r from-[#390D62]/40 to-[#6226A4]/40">
          <table className="min-w-full divide-y-4 divide-[#AAF3D5]">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-[#6427A8]/80 to-[#EB79F0]">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  Competition Name
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  Category
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  Team
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  Members
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  Code
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200/20">
              {registrations.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-white text-sm sm:text-base"
                  >
                    You have not joined any competitions yet.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr
                    key={reg.id}
                    className="bg-black/25 hover:bg-white/10 transition-colors duration-200"
                  >
                    {/* Competition Name */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white">
                      <span className="line-clamp-2 max-w-[200px]">
                        {reg.competition.name}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-white">
                      {reg.competition.category}
                    </td>

                    {/* Team Name */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white">
                      <span className="line-clamp-1 max-w-[150px]">
                        {reg.competition.team_name}
                      </span>
                    </td>

                    {/* Members */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-white">
                      {reg.team.current_team_members}/{reg.team.max_team_members}
                    </td>

                    {/* Referral Code */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-white">
                      <button
                        className="flex items-center gap-1 sm:gap-2 hover:text-[#AAF3D5] transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            reg.competition.referal_code
                          );
                          alert("Code copied to clipboard!");
                        }}
                        title="Click to copy"
                      >
                        <span className="max-w-[100px] truncate">
                          {reg.competition.referal_code}
                        </span>
                        <BsCopy className="flex-shrink-0" />
                      </button>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          reg.registration_status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : reg.registration_status === "Registered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {reg.registration_status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Join Team Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={closeJoinModal}
          />
          <div className="relative bg-white/10 backdrop-blur-sm border-[#AAF3D5] border-3 rounded-lg shadow-2xl w-full max-w-md p-6 z-10">
            <h3 className="text-xl sm:text-2xl text-white font-bold mb-4">
              Join Team
            </h3>
            <form onSubmit={handleJoinSubmit}>
              <label className="block text-sm font-medium text-white mb-2">
                Referral Code
              </label>
              <input
                type="text"
                value={referalCode}
                onChange={(e) => setReferalCode(e.target.value)}
                className="w-full border-2 border-white rounded-lg px-4 py-2 mb-4 text-white focus:border-[#AAF3D5] focus:outline-none"
                placeholder="Enter team referral code"
                required
              />

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={closeJoinModal}
                  className="w-full sm:w-auto px-4 py-2 bg-black/40 backdrop-blur-2xl border-white border-3 rounded-lg hover:bg-purple-800 text-white font-medium transition-colors"
                  disabled={isJoining}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-black/40 backdrop-blur-2xl border-white border-3 rounded-lg hover:bg-purple-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isJoining}
                >
                  {isJoining ? "Joining..." : "Join Team"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}