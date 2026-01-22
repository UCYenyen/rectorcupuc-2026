"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/types/action.md";

export async function voteForCandidate(candidateId: string, competitionId: string): Promise<ActionResult<void>> {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { success: false, error: "Unauthorized" };
  }

  const userId = session.user.id;

  try {
    // Check if user has already voted in this competition
    const existingVote = await prisma.vote.findFirst({
      where: {
        voter_id: userId,
        competition_id: competitionId,
      },
    });

    if (existingVote) {
      return { success: false, error: "You have already voted in this competition." };
    }

    // Create vote
    await prisma.vote.create({
      data: {
        voter_id: userId,
        competition_id: competitionId,
        user_being_voted_id: candidateId,
      },
    });

    revalidatePath("/vote");
    return { success: true };
  } catch (error) {
    console.error("Failed to vote:", error);
    return { success: false, error: "Failed to submit vote." };
  }
}

export async function unvoteCandidate(competitionId: string): Promise<ActionResult<void>> {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return { success: false, error: "Unauthorized" };
  }

  const userId = session.user.id;

  try {
    const existingVote = await prisma.vote.findFirst({
      where: {
        voter_id: userId,
        competition_id: competitionId,
      },
    });

    if (!existingVote) {
      return { success: false, error: "You have not voted in this competition." };
    }

    await prisma.vote.delete({
      where: {
        id: existingVote.id,
      },
    });

    revalidatePath("/vote");
    return { success: true };
  } catch (error) {
    console.error("Failed to unvote:", error);
    return { success: false, error: "Failed to unvote." };
  }
}
