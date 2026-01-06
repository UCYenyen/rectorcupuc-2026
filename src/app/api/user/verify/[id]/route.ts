import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true },
    });

    if (user) {
      return NextResponse.json({ exists: true, user });
    }

    return NextResponse.json({ exists: false }, { status: 404 });
  } catch (error) {
    console.error("User verification error:", error);
    return NextResponse.json(
      { exists: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}