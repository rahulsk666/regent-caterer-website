import {
  clearAdminCookie,
  createAuthResponse,
  verifyAdminPassword,
} from "@/lib/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body?.password || "");

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { error: "Invalid admin password." },
        { status: 401 },
      );
    }

    return createAuthResponse();
  } catch {
    return NextResponse.json(
      { error: "Unable to process login request." },
      { status: 400 },
    );
  }
}

export async function DELETE() {
  return clearAdminCookie();
}
