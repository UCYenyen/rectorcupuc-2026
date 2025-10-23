import { NextResponse } from "next/server";
import { joinTeamByReferalCode } from "@/lib/team";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    const { referalCode }: { referalCode: string } = await req.json();

    if (!referalCode) {
      return NextResponse.json({ success: false, error: "Referral code is required" }, { status: 400 });
    }

    const team = await joinTeamByReferalCode(userId, referalCode);

    // jika joinTeamByReferalCode mengembalikan null/undefined maka treat sebagai error
    if (!team) {
      return NextResponse.json({ success: false, error: "Invalid referral code or failed to join" }, { status: 400 });
    }

    return NextResponse.json(
      { success: true, message: "Successfully joined the team", team },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to join the team";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}