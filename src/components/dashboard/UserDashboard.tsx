"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BsCopy } from "react-icons/bs";

interface CompetitionRegistration {
  id: string;
  competition: {
    id: string;
    name: string;
    category: string;
    team_name: string;
    referal_code: string;
  };
  team:{
    id: string;
    name: string;
    min_team_members: number;
    current_team_members: number;
    max_team_members: number;
  }
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
    <div className="flex bg-gradient-to-b from-[#390D62] to-[#6226A4] gap-4 flex-col min-h-screen w-screen overflow-x-hidden justify-start items-center">
      <div className="mt-[5%] w-[90%] flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl w-[90%] text-left font-bold text-white">
           Hi, {session?.user?.name}
          </h1>

          {/* Join Team as a regular button (not a tab) */}
          <button
            className="px-4 py-2 bg-gradient-to-r from-[#10233E]/40 to-[#3B80E3]/40 text-xl border-3 border-white text-white rounded"
            onClick={openJoinModal}
          >
            Join Team
          </button>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-6 bg-gradient-to-r from-[#6427A8]/80 from-18% to-[#EB79F0] border-[5px] border-[#AAF3D5] rounded-xl text-white font-semibold">
            <div className="py-3 px-4 flex items-center">Competition Name</div>
            <div className="py-3 px-4 flex items-center">Category</div>
            <div className="py-3 px-4 flex items-center">Team</div>
            <div className="py-3 px-4 flex items-center">Members</div>
            <div className="py-3 px-4 flex items-center">Code</div>
            <div className="py-3 px-4 flex items-center">Status</div>
          </div>

          <div className="flex flex-col border-[5px] border-[#AAF3D5] rounded-xl bg-gradient-to-r from-[#390D62]/40 from-0% to-[#6226A4]/40 text-black overflow-hidden mt-4">
            {registrations.length === 0 ? (
              <div className="py-8 text-center text-white">
                You have not joined any competitions yet.
              </div>
            ) : (
              registrations.map((reg, index) => (
                <div
                  key={reg.id}
                  className={`grid grid-cols-6 hover:bg-gray-50 ${
                    index !== registrations.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <div className="py-3 px-4 flex items-center overflow-hidden">
                    <span className="truncate">{reg.competition.name}</span>
                  </div>
                  <div className="py-3 px-4 flex items-center">
                    {reg.competition.category}
                  </div>
                  <div className="py-3 px-4 flex items-center">
                    {reg.competition.team_name}
                  </div>
                  <div className="py-3 px-4 flex items-center">
                    {reg.team.current_team_members}/{reg.team.max_team_members}
                  </div>
                  <div className="py-3 px-4 flex items-center">
                    <button
                      className="text-zinc-800 hover:text-zinc-600 flex items-center gap-1"
                      onClick={() => {
                        navigator.clipboard.writeText(reg.competition.referal_code);
                        alert("Text copied to clipboard");
                      }}
                    >
                      {reg.competition.referal_code.length > 20
                        ? `${reg.competition.referal_code.slice(0, 20)}...`
                        : reg.competition.referal_code}
                      <BsCopy />
                    </button>
                  </div>
                  <div className="py-3 px-4 flex items-center font-medium">
                    {reg.registration_status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Join Team Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={closeJoinModal} />
          <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 z-10">
            <h3 className="text-xl text-black font-semibold mb-4">Join Team</h3>
            <form onSubmit={handleJoinSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Referral Code</label>
              <input
                type="text"
                value={referalCode}
                onChange={(e) => setReferalCode(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4 text-gray-600"
                placeholder="Enter team referral code"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeJoinModal}
                  className="px-4 py-2 bg-zinc-200 rounded text-black"
                  disabled={isJoining}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded text-black"
                  disabled={isJoining}
                >
                  {isJoining ? "Joining..." : "Join"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
