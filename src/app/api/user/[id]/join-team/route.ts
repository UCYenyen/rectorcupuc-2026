import { NextResponse, NextRequest } from "next/server";
import { joinTeamByReferalCode } from "@/lib/team";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await context.params;
    const { referalCode, faculty, nim, followProofUrl, profileUrl } =
      await request.json();

    if (!referalCode || !followProofUrl || !profileUrl || !faculty || !nim) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Referral code, faculty, NIM, profile image, and follow proof are required",
        },
        { status: 400 }
      );
    }

    const team = await joinTeamByReferalCode(
      userId,
      referalCode,
      followProofUrl,
      profileUrl,
      faculty,
      nim
    );

    if (!team || (typeof team === "object" && "error" in team)) {
      return NextResponse.json(
        {
          success: false,
          error: team?.error || "Invalid referral code or failed to join",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Successfully joined the team", team },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to join the team";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
