import React from "react";
import StripeBackground from "@/components/StripeBackground";
import RectorInlineTitle from "@/components/competition/RectorInlineTitle";
import VoteCard from "@/components/VoteCard";
import CompetitionSelect from "@/components/CompetitionSelect";
import { SearchIcon, ChevronLeft, ChevronRight } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { allStarData } from "@/lib/data/bestVoteCandidatesData";
import CompetitionTitleHeader from "@/components/competition/CompetitionTitleHeader";

interface VotePageProps {
  searchParams: Promise<{
    page?: string;
    competition?: string;
  }>;
}

export default async function page({ searchParams }: VotePageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const ITEMS_PER_PAGE = 8;
  const selectedCompetitionId = params.competition;
  const session = await auth();
  const currentUserId = session?.user?.id;

  // 1. Fetch Competitions for Filter
  const allowedSlugs = [
    "basketball-putri",
    "futsal",
    "basketball-putra",
    "ping-pong",
  ];

  const competitions = await prisma.competition.findMany({
    where: {
      slug: {
        in: allowedSlugs,
      },
    },
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  const activeCompetitionId =
    selectedCompetitionId || competitions[0]?.id || "";

  // 2. Fetch Candidates (Individual & Team Members)
  let users: { id: string; name: string; imageSrc: string }[] = [];

  if (activeCompetitionId) {
    const activeCompetition = competitions.find(
      (c) => c.id === activeCompetitionId,
    );

    if (activeCompetition && activeCompetition.slug) {
      const candidatesFromData = allStarData.filter(
        (c) => c.competition === activeCompetition.slug,
      );
      const candidateEmails = candidatesFromData.map((c) => c.email);

      const dbUsers = await prisma.user.findMany({
        where: {
          email: { in: candidateEmails },
        },
      });

      // Individual Registrations to fetch profile_url
      const registrations = await prisma.competitionRegistration.findMany({
        where: {
          competition_id: activeCompetitionId,
          user: { email: { in: candidateEmails } },
        },
        include: { user: true },
      });

      // Team Members to fetch profile_url
      const teamMembers = await prisma.teamMember.findMany({
        where: {
          team: {
            competition_id: activeCompetitionId,
          },
          user: { email: { in: candidateEmails } },
        },
        include: { user: true },
      });

      users = candidatesFromData.map((candidateInfo) => {
        const dbUser = dbUsers.find((u) => u.email === candidateInfo.email);
        const reg = registrations.find(
          (r) => r.user.email === candidateInfo.email,
        );
        const tm = teamMembers.find(
          (t) => t.user.email === candidateInfo.email,
        );

        return {
          id: dbUser?.id || candidateInfo.email,
          name: candidateInfo.name,
          imageSrc:
            candidateInfo.image ||
            reg?.profile_url ||
            tm?.profile_url ||
            dbUser?.image ||
            "/placeholder/no-image.svg",
        };
      });
    }
  }

  // 3. Fetch Vote Counts
  const voteCounts = await prisma.vote.groupBy({
    by: ["user_being_voted_id"],
    where: {
      competition_id: activeCompetitionId,
    },
    _count: {
      user_being_voted_id: true,
    },
  });

  const voteCountMap = new Map<string, number>();
  voteCounts.forEach((vc) => {
    voteCountMap.set(vc.user_being_voted_id, vc._count.user_being_voted_id);
  });

  // 4. Check My Vote
  let myVotedCandidateId: string | null = null;
  if (currentUserId && activeCompetitionId) {
    const myVote = await prisma.vote.findFirst({
      where: {
        voter_id: currentUserId,
        competition_id: activeCompetitionId,
      },
      select: { user_being_voted_id: true },
    });
    if (myVote) {
      myVotedCandidateId = myVote.user_being_voted_id;
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, endIndex);

  return (
    <>
      <div className="w-screen h-[10vh] md:h-[7vh]"></div>
      <div className="relative min-h-screen gap-4 w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-[#390D62] to-[#6226A4] z-[1] overflow-hidden"></div>
        <StripeBackground />
        <RectorInlineTitle />

        <div className="relative z-2 mb-48 flex flex-col gap-4 w-[90%] justify-center items-center border-8 border-[#AAF3D5] p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-2xl bg-gradient-to-b from-[#390D62]/40 to-[#6226A4]/40">
          {/* Competition Filter */}
          <CompetitionTitleHeader
            shouldFitContent={false}
            title="Vote Your Allstar"
          ></CompetitionTitleHeader>
          <CompetitionSelect
            competitions={competitions}
            activeCompetitionId={activeCompetitionId}
          />

          <div className="w-full flex justify-center mt-4">
            <input
              type="text"
              placeholder="Cari peserta..."
              className="w-full px-4 py-2 rounded-lg border-2 border-white focus:outline-none focus:ring-white bg-black/40 text-white placeholder-gray-500"
            />
            <button className="ml-2 p-2 bg-black/40 backdrop-blur-2xl rounded-lg border-3 border-white hover:scale-105 transition-transform duration-200">
              <SearchIcon className="text-white w-6 h-6" />
            </button>
          </div>

          <div className="relative w-full">
            {paginatedUsers.length > 0 ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-items-center">
                {paginatedUsers.map((item) => (
                  <VoteCard
                    key={item.id}
                    name={item.name}
                    imageSrc={item.imageSrc}
                    candidateId={item.id}
                    competitionId={activeCompetitionId}
                    initialVoteCount={voteCountMap.get(item.id) || 0}
                    hasVotedInCompetition={!!myVotedCandidateId}
                    isVotedByMe={myVotedCandidateId === item.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-white text-center py-10 font-bold text-xl">
                No candidate found in this competition.
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="w-full flex justify-center md:justify-end items-center gap-4 mt-8">
              <Link
                href={
                  currentPage > 1
                    ? `?page=${currentPage - 1}&competition=${activeCompetitionId}`
                    : "#"
                }
                className={`px-4 py-2 bg-black/40 border-white border-3 rounded-lg font-bold text-white flex items-center gap-2 transition-all ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-800 hover:scale-105"
                }`}
                aria-disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </Link>

              <Link
                href={
                  currentPage < totalPages
                    ? `?page=${currentPage + 1}&competition=${activeCompetitionId}`
                    : "#"
                }
                className={`px-4 py-2 bg-black/40 border-white border-3 rounded-lg font-bold text-white flex items-center gap-2 transition-all ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-800 hover:scale-105"
                }`}
                aria-disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
