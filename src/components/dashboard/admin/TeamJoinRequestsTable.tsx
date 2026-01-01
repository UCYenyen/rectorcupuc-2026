"use client";

import { useState, useTransition } from 'react';
import { User, Team, TeamMember, Competition } from '@prisma/client';
import { 
  approveTeamJoinRequest, 
  rejectTeamJoinRequest, 
  setTeamJoinRequestPending 
} from '@/lib/action';

type TeamJoinRequestWithRelations = TeamMember & {
  user: User;
  team: Team & {
    competition: Competition;
    leader: User | null;
  };
};

interface TeamJoinRequestsTableProps {
  initialRequests: TeamJoinRequestWithRelations[];
  competitions: Competition[];
}

export default function TeamJoinRequestsTable({ 
  initialRequests, 
  competitions 
}: TeamJoinRequestsTableProps) {
  const [filteredCompetition, setFilteredCompetition] = useState<string>("");
  const [filteredStatus, setFilteredStatus] = useState<string>("Pending");
  const [filteredFaculty, setFilteredFaculty] = useState<string>("");
  const [searchParticipant, setSearchParticipant] = useState<string>("");
  const [searchTeamName, setSearchTeamName] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [selectedRequest, setSelectedRequest] = useState<TeamJoinRequestWithRelations | null>(null);

  const statuses = ["Pending", "Registered", "Failed"];
  const faculties = ["SBM", "SCI", "SOT", "SIFT", "SOM", "SOP", "SOC"];

  // Filter requests based on all criteria
  const filteredRequests = initialRequests.filter((request) => {
    const matchesCompetition =
      !filteredCompetition || request.team.competition.id === filteredCompetition;
    
    const matchesStatus =
      !filteredStatus || request.join_request_status === filteredStatus;
    
    const matchesFaculty =
      !filteredFaculty || request.user.faculty === filteredFaculty;
    
    const matchesParticipant =
      !searchParticipant || 
      request.user.name?.toLowerCase().includes(searchParticipant.toLowerCase()) ||
      request.user.email?.toLowerCase().includes(searchParticipant.toLowerCase());
    
    const matchesTeamName =
      !searchTeamName || 
      request.team.name.toLowerCase().includes(searchTeamName.toLowerCase());

    return matchesCompetition && matchesStatus && matchesFaculty && matchesParticipant && matchesTeamName;
  });

  const handleApprove = (id: string) => {
    if (confirm("Are you sure you want to approve this team join request?")) {
      startTransition(async () => {
        try {
          const result = await approveTeamJoinRequest(id);
          if (!result.success) {
            setTimeout(() => alert(result.error || "Failed to approve request"), 0);
          }
        } catch (error) {
          setTimeout(() => alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`), 0);
        }
      });
    }
  };

  const handleReject = (id: string) => {
    if (confirm("Are you sure you want to reject this team join request?")) {
      startTransition(async () => {
        try {
          const result = await rejectTeamJoinRequest(id);
          if (!result.success) {
            setTimeout(() => alert(result.error || "Failed to reject request"), 0);
          }
        } catch (error) {
          setTimeout(() => alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`), 0);
        }
      });
    }
  };

  const handleSetPending = (id: string) => {
    if (confirm("Are you sure you want to set this request to pending?")) {
      startTransition(async () => {
        try {
          const result = await setTeamJoinRequestPending(id);
          if (!result.success) {
            setTimeout(() => alert(result.error || "Failed to change status to pending"), 0);
          }
        } catch (error) {
          setTimeout(() => alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`), 0);
        }
      });
    }
  };

  return (
    <>
      {/* Modal Detail */}
      {selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-[#390D62] to-[#1a062d] border-3 border-[#AAF3D5] rounded-2xl max-w-2xl w-full p-6 text-white relative shadow-2xl overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-4 right-4 text-white hover:text-[#AAF3D5] font-bold text-2xl transition-colors"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-6 text-[#AAF3D5] border-b border-[#AAF3D5]/30 pb-4">
              Team Join Request Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Competition</p>
                <p className="text-xl font-semibold">{selectedRequest.team.competition.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Status</p>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                    ${selectedRequest.join_request_status === 'Registered' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                      selectedRequest.join_request_status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                        'bg-red-500/20 text-red-400 border border-red-500/50'}`}
                  >
                    {selectedRequest.join_request_status}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Team Name</p>
                <p className="text-lg">{selectedRequest.team.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Team Leader</p>
                <p className="text-lg">{selectedRequest.team.leader?.name || 'Unknown'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Participant Name</p>
                <p className="text-lg">{selectedRequest.user.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Participant Email</p>
                <p className="text-lg italic">{selectedRequest.user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Faculty</p>
                <p className="text-lg font-semibold">{selectedRequest.user.faculty || 'Not Set'}</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Instagram Follow Proof</p>
              <div className="rounded-xl overflow-hidden border-2 border-[#AAF3D5]/30 bg-black/20">
                {selectedRequest.follow_proof_url ? (
                  <>
                    <img
                      src={selectedRequest.follow_proof_url}
                      alt="Follow Proof"
                      className="w-full h-auto object-contain max-h-[500px]"
                    />
                    <a
                      href={selectedRequest.follow_proof_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full text-center bg-[#AAF3D5] text-black font-bold py-3 hover:bg-white transition-colors uppercase text-sm"
                    >
                      Open Full Quality Image
                    </a>
                  </>
                ) : (
                  <div className="p-8 text-center text-red-400 italic">No proof image found</div>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Selfie Image</p>
              <div className="rounded-xl overflow-hidden border-2 border-[#AAF3D5]/30 bg-black/20">
                {selectedRequest.profile_url ? (
                  <>
                    <img
                      src={selectedRequest.profile_url}
                      alt="Profile"
                      className="w-full h-auto object-contain max-h-[500px]"
                    />
                    <a
                      href={selectedRequest.profile_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full text-center bg-[#AAF3D5] text-black font-bold py-3 hover:bg-white transition-colors uppercase text-sm"
                    >
                      Open Full Quality Image
                    </a>
                  </>
                ) : (
                  <div className="p-8 text-center text-red-400 italic">No profile image found</div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              {selectedRequest.join_request_status !== 'Registered' && (
                <button
                  onClick={() => {
                    handleApprove(selectedRequest.id);
                    setSelectedRequest(null);
                  }}
                  className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-xl font-bold transition-all"
                  disabled={isPending}
                >
                  Approve
                </button>
              )}
              {selectedRequest.join_request_status !== 'Failed' && (
                <button
                  onClick={() => {
                    handleReject(selectedRequest.id);
                    setSelectedRequest(null);
                  }}
                  className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl font-bold transition-all"
                  disabled={isPending}
                >
                  Reject
                </button>
              )}
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section - Updated to 5 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* Competition Filter */}
        <div className='flex flex-col gap-1 font-bold'>
          <label htmlFor="competition-filter" className="block text-lg font-semibold text-white mb-1">
            Competition
          </label>
          <select
            id="competition-filter"
            className="border-2 border-[#AAF3D5] rounded-lg px-3 py-2 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]"
            value={filteredCompetition}
            onChange={(e) => setFilteredCompetition(e.target.value)}
          >
            <option value="">All Competitions</option>
            {competitions.map((competition) => (
              <option key={competition.id} value={competition.id}>
                {competition.name}
              </option>
            ))}
          </select>
        </div>

        {/* Faculty Filter */}
        <div className='flex flex-col gap-1 font-bold'>
          <label htmlFor="faculty-filter" className="block text-lg font-semibold text-white mb-1">
            Faculty
          </label>
          <select
            id="faculty-filter"
            className="border-2 border-[#AAF3D5] rounded-lg px-3 py-2 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]"
            value={filteredFaculty}
            onChange={(e) => setFilteredFaculty(e.target.value)}
          >
            <option value="">All Faculties</option>
            {faculties.map((fac) => (
              <option key={fac} value={fac}>
                {fac}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className='flex flex-col gap-1 font-bold'>
          <label htmlFor="status-filter" className="block text-lg font-semibold text-white mb-1">
            Status
          </label>
          <select
            id="status-filter"
            className="border-2 border-[#AAF3D5] rounded-lg px-3 py-2 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]"
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Participant Search */}
        <div className='flex flex-col gap-1 font-bold'>
          <label htmlFor="participant-search" className="block text-lg font-semibold text-white mb-1">
            Search Participant
          </label>
          <input
            id="participant-search"
            type="text"
            placeholder="Name or email..."
            className="border-2 border-[#AAF3D5] rounded-lg px-3 py-2 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]"
            value={searchParticipant}
            onChange={(e) => setSearchParticipant(e.target.value)}
          />
        </div>

        {/* Team Name Search */}
        <div className='flex flex-col gap-1 font-bold'>
          <label htmlFor="team-search" className="block text-lg font-semibold text-white mb-1">
            Search Team
          </label>
          <input
            id="team-search"
            type="text"
            placeholder="Team name..."
            className="border-2 border-[#AAF3D5] rounded-lg px-3 py-2 bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]"
            value={searchTeamName}
            onChange={(e) => setSearchTeamName(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black/30 shadow-sm rounded-lg border-[#AAF3D5] border-3">
          <thead className="border-3 border-[#AAF3D5] overflow-hidden rounded-lg">
            <tr>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">No</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Competition</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Team Name</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Participant</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Faculty</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Email</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Status</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-white">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr key={request.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{index + 1}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm font-medium">{request.team.competition.name}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{request.team.name}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{request.user.name}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{request.user.faculty || 'N/A'}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{request.user.email}</td>
                  <td className="bg-black/30 px-6 py-4 border-r whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${request.join_request_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.join_request_status === 'Registered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'}`}
                    >
                      {request.join_request_status}
                    </span>
                  </td>
                  <td className="bg-black/30 px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        className="bg-black/30 hover:bg-purple-300/25 border-white border-2 px-3 py-2 rounded-lg text-sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        View
                      </button>
                      <button
                        className="bg-green-500/20 hover:bg-green-500/30 border-green-500 border-2 px-3 py-2 rounded-lg text-sm"
                        onClick={() => handleApprove(request.id)}
                        disabled={isPending || request.join_request_status === 'Registered'}
                      >
                        {isPending ? "..." : "Approve"}
                      </button>
                      <button 
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500 border-2 px-3 py-2 rounded-lg text-sm" 
                        onClick={() => handleSetPending(request.id)}
                        disabled={isPending || request.join_request_status === 'Pending'}
                      >
                        Pending
                      </button>
                      <button 
                        className="bg-red-500/20 hover:bg-red-500/30 border-red-500 border-2 px-3 py-2 rounded-lg text-sm" 
                        onClick={() => handleReject(request.id)}
                        disabled={isPending || request.join_request_status === 'Failed'}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-sm text-white">
                  No team join requests found matching the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-white">
        Showing {filteredRequests.length} of {initialRequests.length} team join requests
      </div>
    </>
  );
}