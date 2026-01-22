"use client";

import { useState, useTransition } from 'react';
import { RegistrationStatus, CompetitionRegistration, User, Team, Competition } from '@prisma/client';
import { approveRegistration, rejectRegistration, setRegistrationPending } from '@/lib/action';

interface RegistrationWithRelations extends CompetitionRegistration {
  competition: Competition;
  team: Team;
  user: User;
}

interface RegistrationTableProps {
  registrations: RegistrationWithRelations[];
}

export default function RegistrationTable({ registrations }: RegistrationTableProps) {
  const [filteredCompetition, setFilteredCompetition] = useState<string>("");
  const [filteredStatus, setFilteredStatus] = useState<string>("");
  const [filteredFaculty, setFilteredFaculty] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [selectedReg, setSelectedReg] = useState<RegistrationWithRelations | null>(null);

  const competitions = Array.from(
    new Set(registrations.map((reg) => reg.competition.name))
  );

  const statuses = Object.values(RegistrationStatus);
  
  const faculties = ["SBM", "SCI", "SOT", "SIFT", "SOM", "SOP", "SOC"];

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesCompetition =
      !filteredCompetition || reg.competition.name === filteredCompetition;
    const matchesStatus =
      !filteredStatus || reg.registration_status === filteredStatus;
    const matchesFaculty =
      !filteredFaculty || reg.user.faculty === filteredFaculty;
    // Add logic if there was a search bar, but User didn't explicitly ask for search bar here, 
    // BUT since I added it to the other table and it's good UX, I might leave it as is 
    // OR just stick to requested columns. 
    // The previous code didn't have search. I won't add search unless asked, strictly NIM and pagination.
    return matchesCompetition && matchesStatus && matchesFaculty;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const paginatedRegistrations = filteredRegistrations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = (id: string) => {
    if (confirm("Are you sure you want to approve this registration?")) {
      startTransition(async () => {
        try {
          const result = await approveRegistration(id);
          if (!result.success) {
            setTimeout(() => alert(result.error || "Failed to approve registration"), 0);
          }
        } catch (error) {
          setTimeout(() => alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`), 0);
        }
      });
    }
  };

  const handleReject = (id: string) => {
    if (confirm("Are you sure you want to reject this registration?")) {
      startTransition(async () => {
        try {
          const result = await rejectRegistration(id);
          if (!result.success) {
            setTimeout(() => alert(result.error || "Failed to reject registration"), 0);
          }
        } catch (error) {
          setTimeout(() => alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`), 0);
        }
      });
    }
  };

  const handleSetPending = (id: string) => {
    if (confirm("Are you sure you want to set this registration to pending?")) {
      startTransition(async () => {
        try {
          const result = await setRegistrationPending(id);
          if (!result.success) {
            setTimeout(() => alert(result.error || "Failed to change status to pending"), 0);
          }
        } catch (error) {
          setTimeout(() => alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`), 0);
        }
      });
    }
  }

  return (
    <>
      {selectedReg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-[#390D62] to-[#1a062d] border-3 border-[#AAF3D5] rounded-2xl max-w-2xl w-full p-6 text-white relative shadow-2xl overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setSelectedReg(null)}
              className="absolute top-4 right-4 text-white hover:text-[#AAF3D5] font-bold text-2xl transition-colors"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-6 text-[#AAF3D5] border-b border-[#AAF3D5]/30 pb-4">
              Registration Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Competition</p>
                <p className="text-xl font-semibold">{selectedReg.competition.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Status</p>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                    ${selectedReg.registration_status === 'Registered' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                      selectedReg.registration_status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                        'bg-red-500/20 text-red-400 border border-red-500/50'}`}
                  >
                    {selectedReg.registration_status}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Team Name</p>
                <p className="text-lg">{selectedReg.team.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Leader Name</p>
                <p className="text-lg">{selectedReg.user.name}</p>
              </div>
               <div className="space-y-1">
                 <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">NIM</p>
                 <p className="text-lg">{selectedReg.user.NIM || '-'}</p>
               </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Leader Email</p>
                <p className="text-lg italic">{selectedReg.user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Faculty</p>
                <p className="text-lg font-semibold">{selectedReg.user.faculty || 'Not Set'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Registered At</p>
                <p className="text-lg">{new Date(selectedReg.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-[#AAF3D5]/70 text-xs uppercase tracking-wider font-bold">Instagram Proof Screenshot</p>
              <div className="rounded-xl overflow-hidden border-2 border-[#AAF3D5]/30 bg-black/20">
                {selectedReg.follow_proof_url ? (
                  <>
                    <img
                      src={selectedReg.follow_proof_url}
                      alt="Proof"
                      className="w-full h-auto object-contain max-h-[500px]"
                    />
                    <a
                      href={selectedReg.follow_proof_url}
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
                {selectedReg.profile_url ? (
                  <>
                    <img
                      src={selectedReg.profile_url}
                      alt="Proof"
                      className="w-full h-auto object-contain max-h-[500px]"
                    />
                    <a
                      href={selectedReg.profile_url}
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

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedReg(null)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-white">
        {/* Competition Filter */}
        <div className='flex flex-col gap-1 font-bold'>
          <label htmlFor="competition-filter" className="block text-lg font-semibold mb-1">
            Competition
          </label>
          <select
            id="competition-filter"
            className="border-2 border-[#AAF3D5] rounded-lg px-3 py-2 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]"
            value={filteredCompetition}
            onChange={(e) => {
              setFilteredCompetition(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Competitions</option>
            {competitions.map((competition) => (
              <option key={competition} value={competition}>
                {competition}
              </option>
            ))}
          </select>
        </div>

        {/* Faculty Filter */}
        <div className='flex flex-col gap-1 font-bold'>
          <label htmlFor="faculty-filter" className="block text-lg font-semibold mb-1">
            Faculty
          </label>
          <select
            id="faculty-filter"
            className="border-2 border-[#AAF3D5] rounded-lg px-3 py-2 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]"
            value={filteredFaculty}
            onChange={(e) => {
              setFilteredFaculty(e.target.value);
              setCurrentPage(1);
            }}
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
          <label htmlFor="status-filter" className="block text-lg font-semibold mb-1">
            Status
          </label>
          <select
            id="status-filter"
            className="border-2 border-[#AAF3D5] rounded-lg px-3 py-2 bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-[#AAF3D5]"
            value={filteredStatus}
            onChange={(e) => {
              setFilteredStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-black/30 shadow-sm rounded-lg border-[#AAF3D5] border-3">
          <thead className="border-3 border-[#AAF3D5] overflow-hidden rounded-lg">
            <tr className='rounded-2xl'>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">No</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Competition</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Team Name</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Team Leader</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">NIM</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Faculty</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Registration Date</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Status</th>
              <th className="px-6 py-3 text-left bg-gradient-to-b from-[#390D62] to-[#6226A4] text-xs font-medium text-white uppercase tracking-wider border-[#AAF3D5] border-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-white">
            {paginatedRegistrations.length > 0 ? (
              paginatedRegistrations.map((registration, index) => (
                <tr key={registration.id}>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm font-medium">{registration.competition.name}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{registration.team.name}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{registration.user.name}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{registration.user.NIM}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">{registration.user.faculty || 'N/A'}</td>
                  <td className="px-6 py-4 bg-black/30 border-r whitespace-nowrap text-sm">
                    {new Date(registration.created_at).toLocaleDateString()}
                  </td>
                  <td className="bg-black/30 px-6 py-4 border-r whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${registration.registration_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        registration.registration_status === 'Registered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'}`}
                    >
                      {registration.registration_status}
                    </span>
                  </td>
                  <td className="bg-black/30 flex gap-4 px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="bg-black/30 hover:bg-purple-300/25 border-white border-3 hover:cursor-pointer mr-2 shadow-lg px-4 py-2 rounded-lg"
                      onClick={() => setSelectedReg(registration)}
                    >
                      View
                    </button>
                    <button
                      className="bg-black/30 hover:bg-purple-300/25 border-white border-3 hover:cursor-pointer mr-2 shadow-lg px-4 py-2 rounded-lg"
                      onClick={() => handleApprove(registration.id)}
                      disabled={isPending}
                    >
                      {isPending ? "..." : "Approve"}
                    </button>
                    <button className="bg-black/30 hover:bg-purple-300/25 border-white border-3 hover:cursor-pointer px-4 py-2 rounded-lg" onClick={() => handleSetPending(registration.id)}>Pending</button>
                    <button className="bg-black/30 hover:bg-purple-300/25 border-white border-3 hover:cursor-pointer px-4 py-2 rounded-lg" onClick={() => handleReject(registration.id)}>Reject</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-sm text-white">
                  No registrations found matching the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col items-center gap-4 text-white w-full">
        <div className="text-sm text-center">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredRegistrations.length)} to {Math.min(currentPage * itemsPerPage, filteredRegistrations.length)} of {filteredRegistrations.length} registrations
        </div>

        {/* Pagination Controls */}
        <div className="flex gap-2">
           {/* First Page */}
           <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-[#AAF3D5] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#AAF3D5]/20 text-[#AAF3D5]"
            title="First Page"
          >
           &lt;&lt;
          </button>

          {/* Previous Page */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-[#AAF3D5] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#AAF3D5]/20 text-[#AAF3D5]"
            title="Previous Page"
          >
            &lt;
          </button>
          
          <div className="flex gap-1">
             {(() => {
                const pages = [];
                if (totalPages <= 7) {
                   for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                   if (currentPage <= 4) {
                      for (let i = 1; i <= 5; i++) pages.push(i);
                      pages.push('...');
                      pages.push(totalPages);
                   } else if (currentPage >= totalPages - 3) {
                      pages.push(1);
                      pages.push('...');
                      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                   } else {
                      pages.push(1);
                      pages.push('...');
                      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                      pages.push('...');
                      pages.push(totalPages);
                   }
                }

                return pages.map((page, idx) => (
                   <button
                    key={idx}
                    onClick={() => {
                       if (typeof page === 'number') setCurrentPage(page);
                    }}
                    disabled={page === '...'}
                    className={`px-3 py-2 border border-[#AAF3D5] rounded-lg min-w-[36px] ${
                       page === currentPage 
                          ? 'bg-[#AAF3D5] text-black font-bold' 
                          : page === '...' 
                             ? 'border-none text-white cursor-default' 
                             : 'hover:bg-[#AAF3D5]/20 text-white'
                    }`}
                   >
                     {page}
                   </button>
                ));
             })()}
          </div>

          {/* Next Page */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-2 border border-[#AAF3D5] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#AAF3D5]/20 text-[#AAF3D5]"
            title="Next Page"
          >
            &gt;
          </button>
          
           {/* Last Page */}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-2 border border-[#AAF3D5] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#AAF3D5]/20 text-[#AAF3D5]"
            title="Last Page"
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  );
}