import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/get-session";
import { db } from "@/lib/db";
import { konsultasi } from "@/lib/db/schema";
import { diagnose } from "@/lib/inference-engine";
import { generateId } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { gejalaIds } = body as { gejalaIds: string[] };

    if (!gejalaIds || !Array.isArray(gejalaIds)) {
      return NextResponse.json(
        { error: "gejalaIds is required and must be an array" },
        { status: 400 }
      );
    }

    // Run diagnosis
    const results = await diagnose(gejalaIds);

    // Get the top result
    const topResult = results[0];

    // Save consultation to database
    const konsultasiId = generateId();
    await db.insert(konsultasi).values({
      id: konsultasiId,
      userId: session.user.id,
      penyakitId: topResult?.penyakit.id || null,
      gejalaYangDialami: JSON.stringify(gejalaIds),
      nilaiKepastian: topResult?.nilaiKepastian || 0,
    });

    return NextResponse.json({
      success: true,
      konsultasiId,
      results,
    });
  } catch (error) {
    console.error("Consultation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
