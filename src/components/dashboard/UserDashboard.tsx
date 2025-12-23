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
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [followProof, setFollowProof] = useState<File | null>(null);
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

  const uploadFile = async (file: File) => {
    const uploadFd = new FormData();
    uploadFd.append("file", file);
    const res = await fetch("/api/image/upload", {
      method: "POST",
      body: uploadFd,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error || "Upload failed");
    return json.url;
  };

  const openJoinModal = () => {
    setReferalCode("");
    setProfileImage(null);
    setFollowProof(null);
    setShowJoinModal(true);
  };

  const closeJoinModal = () => {
    setShowJoinModal(false);
    setReferalCode("");
    setProfileImage(null);
    setFollowProof(null);
    setIsJoining(false);
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert("You must be logged in to join a team.");
      return;
    }
    if (!profileImage || !followProof) {
      alert("Please upload both profile image and follow proof.");
      return;
    }

    if (!confirm("Are you sure you want to join this team?")) return;

    setIsJoining(true);
    try {
      // 1. Upload Images first
      const profileUrl = await uploadFile(profileImage);
      const followProofUrl = await uploadFile(followProof);

      // 2. Join Team
      const res = await fetch(`/api/user/${session.user.id}/join-team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          referalCode: referalCode.trim(),
          profileUrl: profileUrl,
          followProofUrl: followProofUrl
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        alert(json.error || "Failed to join team");
        return;
      }

      await fetchRegistrations();
      alert(json.message || "Joined team successfully!");
      closeJoinModal();
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="relative flex bg-gradient-to-b from-[#390D62] to-[#6226A4] gap-4 flex-col min-h-screen w-screen overflow-x-hidden justify-start items-center px-4 py-8">
      <StripeBackground />
      <div className="relative z-4 mt-[10%] sm:mt-[5%] w-[90%] flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Hi, {session?.user?.name}
          </h1>

          <button
            className="px-4 py-2 sm:px-6 sm:py-3 bg-black/40 backdrop-blur-2xl border-white border-3 rounded-lg hover:bg-purple-800 text-white text-base sm:text-xl sm:border-3 hover:scale-105 transition-transform duration-200 whitespace-nowrap"
            onClick={openJoinModal}
          >
            Join Team
          </button>
        </div>

        <div className="relative z-5 backdrop-blur-2xl overflow-x-auto rounded-xl border-4 sm:border-[5px] border-[#AAF3D5] bg-gradient-to-r from-[#390D62]/40 to-[#6226A4]/40">
          <table className="min-w-full divide-y-4 divide-[#AAF3D5]">
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
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white">
                      <span className="line-clamp-2 max-w-[200px]">
                        {reg.competition.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-white">
                      {reg.competition.category}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white">
                      <span className="line-clamp-1 max-w-[150px]">
                        {reg.team.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-white">
                      {reg.team.current_team_members}/{reg.team.max_team_members}
                    </td>
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

      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black opacity-60"
            onClick={closeJoinModal}
          />
          <div className="relative bg-[#390D62] border-[#AAF3D5] border-3 rounded-lg shadow-2xl w-full max-w-md p-6 z-10 overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl sm:text-2xl text-white font-bold mb-4 uppercase">
              Join Team
            </h3>
            <form onSubmit={handleJoinSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Referral Code
                </label>
                <input
                  type="text"
                  value={referalCode}
                  onChange={(e) => setReferalCode(e.target.value)}
                  className="w-full border-2 border-white bg-transparent rounded-lg px-4 py-2 text-white focus:border-[#AAF3D5] focus:outline-none"
                  placeholder="Enter team referral code"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                  className="w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Follow Proof (Screenshot)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFollowProof(e.target.files?.[0] || null)}
                  className="w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 cursor-pointer"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
                <button
                  type="button"
                  onClick={closeJoinModal}
                  className="w-full sm:w-auto px-4 py-2 bg-black/40 backdrop-blur-2xl border-white border-3 rounded-lg hover:bg-red-900 text-white font-medium transition-colors"
                  disabled={isJoining}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-black/40 backdrop-blur-2xl border-white border-3 rounded-lg hover:bg-purple-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isJoining}
                >
                  {isJoining ? "Uploading..." : "Join Team"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}