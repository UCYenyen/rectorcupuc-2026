"use client";

import { useState, useTransition } from 'react';
import { RegistrationStatus, CompetitionRegistration, User, Team, Competition } from '@prisma/client';
import { approveRegistration, rejectRegistration, setRegistrationPending } from '@/lib/action';

// Define the structure of registration with related entities
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
  const [isPending, startTransition] = useTransition();

  // Extract unique competitions and statuses for filtering
  const competitions = Array.from(
    new Set(registrations.map((reg) => reg.competition.name))
  );
  
  const statuses = Object.values(RegistrationStatus);

  // Filter registrations based on selected filters
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesCompetition = 
      !filteredCompetition || reg.competition.name === filteredCompetition;
    const matchesStatus = 
      !filteredStatus || reg.registration_status === filteredStatus;
    return matchesCompetition && matchesStatus;
  });

  const handleApprove = (id: string) => {
    if (confirm("Are you sure you want to approve this registration?")) {
      startTransition(async () => {
        try {
          const result = await approveRegistration(id);
          if (!result.success) {
            // Force this code to run outside the transition for UI updates
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
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className='text-black font-bold'>
          <label htmlFor="competition-filter" className="block text-sm font-medium mb-1">
            Competition
          </label>
          <select
            id="competition-filter"
            className="border rounded px-3 py-2 min-w-64"
            value={filteredCompetition}
            onChange={(e) => setFilteredCompetition(e.target.value)}
          >
            <option value="">All Competitions</option>
            {competitions.map((competition) => (
              <option key={competition} value={competition}>
                {competition}
              </option>
            ))}
          </select>
        </div>

        <div className='text-black font-bold'>
          <label htmlFor="status-filter" className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            id="status-filter"
            className="border rounded px-3 py-2"
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
      </div>

      {/* Registration Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black border border-gray-300 shadow-sm overflow-hidden rounded-md">
          <thead className="bg-gray-50">
            <tr className='rounded-2xl'>
              <th className="px-6 py-3 text-left border bg-zinc-800 border-black text-xs font-medium text-white uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left border bg-zinc-800 border-black text-xs font-medium text-white uppercase tracking-wider">Competition</th>
              <th className="px-6 py-3 text-left border bg-zinc-800 border-black text-xs font-medium text-white uppercase tracking-wider">Team Name</th>
              <th className="px-6 py-3 text-left border bg-zinc-800 border-black text-xs font-medium text-white uppercase tracking-wider">Team Leader</th>
              <th className="px-6 py-3 text-left border bg-zinc-800 border-black text-xs font-medium text-white uppercase tracking-wider">Registration Date</th>
              <th className="px-6 py-3 text-left border bg-zinc-800 border-black text-xs font-medium text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left border bg-zinc-800 border-black text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-black">
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((registration, index) => (
              <tr key={registration.id}>
                <td className="px-6 py-4 bg-zinc-200 border-r border-black whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 bg-zinc-200 border-r border-black whitespace-nowrap text-sm font-medium">{registration.competition.name}</td>
                  <td className="px-6 py-4 bg-zinc-200 border-r border-black whitespace-nowrap text-sm">{registration.team.name}</td>
                  <td className="px-6 py-4 bg-zinc-200 border-r border-black whitespace-nowrap text-sm">{registration.user.name}</td>
                  <td className="px-6 py-4 bg-zinc-200 border-r border-black whitespace-nowrap text-sm">
                    {new Date(registration.created_at).toLocaleDateString()}
                  </td>
                  <td className="bg-zinc-200 px-6 py-4 border-r border-black whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${registration.registration_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        registration.registration_status === 'Registered' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}
                    >
                      {registration.registration_status}
                    </span>
                  </td>
                  <td className="bg-zinc-200 flex gap-4 px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900 hover:cursor-pointer mr-2 bg-white shadow-lg px-4 py-2 rounded-lg">View</button>
                    <button 
                      className="text-green-600 hover:text-green-900 hover:cursor-pointer mr-2 bg-white shadow-lg px-4 py-2 rounded-lg" 
                      onClick={() => handleApprove(registration.id)}
                      disabled={isPending}
                    >
                      {isPending ? "Processing..." : "Approve"}
                    </button>
                    <button className="text-yellow-400 hover:text-yellow-900 hover:cursor-pointer bg-white shadow-lg px-4 py-2 rounded-lg" onClick={() => handleSetPending(registration.id)}>Pending</button>
                    <button className="text-red-600 hover:text-red-900 bg-white shadow-lg hover:cursor-pointer px-4 py-2 rounded-lg" onClick={() => handleReject(registration.id)}>Reject</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-black">
                  No registrations found matching the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-black">
        Showing {filteredRegistrations.length} of {registrations.length} registrations
      </div>
    </>
  );
}