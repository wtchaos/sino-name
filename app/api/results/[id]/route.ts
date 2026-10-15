import { NextResponse } from "next/server";
import { getResult } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const result = await getResult(id);
  if (!result) {
    return NextResponse.json(
      { error: "This result has expired or is no longer available." },
      { status: 404 },
    );
  }
  return NextResponse.json({ result });
}
