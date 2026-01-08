import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/get-session";
import { db } from "@/lib/db";
import { gejala } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as { role?: string }).role || "user";
    if (role !== "admin" && role !== "dokter") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { kode, nama, pertanyaan } = body;

    if (!kode || !nama) {
      return NextResponse.json(
        { error: "Kode dan nama wajib diisi" },
        { status: 400 }
      );
    }

    await db
      .update(gejala)
      .set({
        kode,
        nama,
        pertanyaan: pertanyaan || null,
        updatedAt: new Date(),
      })
      .where(eq(gejala.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating symptom:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as { role?: string }).role || "user";
    if (role !== "admin" && role !== "dokter") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    await db.delete(gejala).where(eq(gejala.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting symptom:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
