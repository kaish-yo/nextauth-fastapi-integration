import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);

  // If no session exists, return an empty response
  return NextResponse.json({ authenticated: !!session });
};
