import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/get-session";
import { db } from "@/lib/db";
import { aturan } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allAturan = await db.query.aturan.findMany({
      with: {
        penyakit: true,
        gejala: true,
      },
    });
    return NextResponse.json(allAturan);
  } catch (error) {
    console.error("Error fetching rules:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as { role?: string }).role || "user";
    if (role !== "admin" && role !== "dokter") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { penyakitId, gejalaId, bobot } = body;

    if (!penyakitId || !gejalaId) {
      return NextResponse.json(
        { error: "Penyakit dan gejala wajib dipilih" },
        { status: 400 }
      );
    }

    await db.insert(aturan).values({
      penyakitId,
      gejalaId,
      bobot: bobot || 1,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating rule:", error);
    return NextResponse.json(
      { error: "Aturan sudah ada atau terjadi kesalahan" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as { role?: string }).role || "user";
    if (role !== "admin" && role !== "dokter") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { penyakitId, gejalaId, bobot, oldPenyakitId, oldGejalaId } = body;

    await db
      .update(aturan)
      .set({ bobot })
      .where(
        and(
          eq(aturan.penyakitId, oldPenyakitId || penyakitId),
          eq(aturan.gejalaId, oldGejalaId || gejalaId)
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating rule:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as { role?: string }).role || "user";
    if (role !== "admin" && role !== "dokter") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { penyakitId, gejalaId } = body;

    await db
      .delete(aturan)
      .where(
        and(eq(aturan.penyakitId, penyakitId), eq(aturan.gejalaId, gejalaId))
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting rule:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
