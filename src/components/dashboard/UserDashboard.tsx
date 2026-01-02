"use client";
import React, { useCallback, useEffect, useState, useRef } from "react"; // Tambah useRef
import { useSession } from "next-auth/react";
import { BsCopy } from "react-icons/bs";
import StripeBackground from "../StripeBackground";
import gsap from "gsap"; // Import GSAP

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
  const [registrations, setRegistrations] = useState<CompetitionRegistration[]>([]);
  const [showJoinModal, setShowJoinModal] = useState<boolean>(false);
  const [referalCode, setReferalCode] = useState<string>("");
  const [faculty, setFaculty] = useState<string>("");
  const [nim, setNim] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [followProof, setFollowProof] = useState<File | null>(null);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // REFS UNTUK GSAP
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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

  // ANIMASI SAAT MODAL DIBUKA
  useEffect(() => {
    if (showJoinModal) {
      // Overlay fade in
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      // Panel slide up & scale (iOS feel)
      gsap.fromTo(modalRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" }
      );
    }
  }, [showJoinModal]);

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
    setFaculty("");
    setNim("");
    setProfileImage(null);
    setFollowProof(null);
    setShowJoinModal(true);
  };

  const closeJoinModal = () => {
    // Animasi keluar sebelum menutup state
    gsap.to(modalRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setShowJoinModal(false);
        setReferalCode("");
        setFaculty("");
        setNim("");
        setProfileImage(null);
        setFollowProof(null);
        setIsJoining(false);
        setErrorMessage("");
      }
    });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
  };

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!session?.user?.id) {
      setErrorMessage("You must be logged in to join a team.");
      return;
    }
    if (!profileImage || !followProof) {
      setErrorMessage("Please upload both profile image and follow proof.");
      return;
    }
    if (!faculty) {
      setErrorMessage("Please select your faculty.");
      return;
    }
    if (!nim) {
      setErrorMessage("Please enter your NIM.");
      return;
    }

    if (!confirm("Are you sure you want to join this team?")) return;

    setIsJoining(true);
    try {
      const profileUrl = await uploadFile(profileImage);
      const followProofUrl = await uploadFile(followProof);

      const res = await fetch(`/api/user/${session.user.id}/join-team`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referalCode: referalCode.trim(),
          faculty: faculty,
          nim: nim,
          profileUrl: profileUrl,
          followProofUrl: followProofUrl
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMessage(json.error || "Failed to join team");
        setIsJoining(false);
        return;
      }

      await fetchRegistrations();
      alert(json.message || "Joined team successfully!");
      closeJoinModal();
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred");
      setIsJoining(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#390D62] to-[#6226A4] flex items-start justify-center p-4 md:p-8">
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

        {/* Tabel Tetap Sama */}
        <div className="relative z-5 backdrop-blur-2xl overflow-x-auto rounded-xl border-4 sm:border-[5px] border-[#AAF3D5] bg-gradient-to-r from-[#390D62]/40 to-[#6226A4]/40">
          <table className="min-w-full divide-y-4 divide-[#AAF3D5]">
            <thead className="bg-gradient-to-r from-[#6427A8]/80 to-[#EB79F0]">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">Competition Name</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">Team</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">Members</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">Code</th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/20">
              {registrations.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-white text-sm sm:text-base">You have not joined any competitions yet.</td></tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="bg-black/25 hover:bg-white/10 transition-colors duration-200">
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white">{reg.competition.name}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white">{reg.competition.category}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white">{reg.team.name}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white">{reg.team.current_team_members}/{reg.team.max_team_members}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-white">
                      <button onClick={() => { navigator.clipboard.writeText(reg.competition.referal_code); alert("Code copied!"); }} className="flex items-center gap-2">
                        {reg.competition.referal_code} <BsCopy />
                      </button>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm">
                      <span className={`px-2 py-1 rounded-full ${reg.registration_status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
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
          {/* Tambahkan ref ke overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-[#5D239F]/60 backdrop-blur-sm"
            onClick={closeJoinModal}
          />
          {/* Tambahkan ref ke modal panel */}
          <div
            ref={modalRef}
            className="relative z-10 border-[#DFE5E1] bg-gradient-to-r from-[#FFE694] via-white/80 to-white/60 border-4 backdrop-blur-2xl rounded-2xl shadow-2xl text-center max-w-md w-full overflow-hidden"
          >
            <div className="w-full flex justify-center items-center bg-gradient-to-r from-[#DD7CDF] via-[#FAE39F] to-white/0 py-2 shadow-xs border-b-4 border-[#DFE5E1]">
              <h3 className="text-xl sm:text-2xl text-[#1E0843] font-bold uppercase">
                Join Team
              </h3>
            </div>
            <form onSubmit={handleJoinSubmit} className="flex flex-col gap-4 pt-4 px-8 pb-8 text-[#1E0843]">
              {errorMessage && (
                <div className="bg-red-100 border-2 border-red-600 text-red-600 p-3 rounded-lg font-bold text-sm">
                  {errorMessage}
                </div>
              )}
              
              <div className="flex flex-col w-full gap-1">
                <label className="block text-lg w-full text-start font-bold">REFERRAL CODE</label>
                <input
                  type="text"
                  value={referalCode}
                  onChange={(e) => setReferalCode(e.target.value)}
                  className="w-full border-2 border-white rounded-lg px-4 py-2 text-white bg-[#1E0843]/50 backdrop-blur-2xl"
                  placeholder="Enter team referral code"
                  required
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="block text-lg w-full text-start font-bold">
                  NIM (Student ID Number) <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="w-full border-2 border-white rounded-lg px-4 py-2 text-white bg-[#1E0843]/50 backdrop-blur-2xl"
                  placeholder="e.g., 0123456789"
                  required
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="block text-lg w-full text-start font-bold">
                  FACULTY <span className="text-red-600">*</span>
                </label>
                <p className="text-xs text-gray-600 mb-1">Must match team leader's faculty</p>
                <select
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="w-full border-2 border-white rounded-lg px-4 py-2 text-white bg-[#1E0843]/50 backdrop-blur-2xl focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]"
                  required
                >
                  <option value="">Select Faculty</option>
                  <option value="SBM">SBM</option>
                  <option value="SCI">SCI</option>
                  <option value="SOT">SOT</option>
                  <option value="SIFT">SIFT</option>
                  <option value="SOM">SOM</option>
                  <option value="SOP">SOP</option>
                  <option value="SOC">SOC</option>
                </select>
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="block text-lg w-full text-start font-bold uppercase">Profile Image (Selfie)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                  className="w-full border-2 border-white rounded-lg px-4 py-2 text-white bg-[#1E0843]/50 backdrop-blur-2xl"
                  required
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label className="block text-lg w-full text-start font-bold uppercase">Follow Proof (Screenshot)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFollowProof(e.target.files?.[0] || null)}
                  className="w-full border-2 border-white rounded-lg px-4 py-2 text-white bg-[#1E0843]/50 backdrop-blur-2xl"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
                <button
                  type="button"
                  onClick={closeJoinModal}
                  className="w-full sm:w-auto px-4 py-2 text-white bg-[#1E0843]/50 backdrop-blur-2xl border-white border-3 rounded-lg hover:bg-red-900 font-medium transition-colors"
                  disabled={isJoining}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 text-white bg-[#1E0843]/50 backdrop-blur-2xl border-white border-3 rounded-lg hover:bg-purple-800 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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