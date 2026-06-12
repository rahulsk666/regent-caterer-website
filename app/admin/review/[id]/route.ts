import { NextRequest, NextResponse } from "next/server";
import { updateReview } from "@/lib/db";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const updates = await request.json();

    await updateReview(Number(id), updates);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Failed to update review:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update review",
      },
      {
        status: 500,
      },
    );
  }
}
