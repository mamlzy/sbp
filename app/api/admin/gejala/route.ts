import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/get-session";
import { db } from "@/lib/db";
import { gejala } from "@/lib/db/schema";

export async function GET() {
  try {
    const allGejala = await db.select().from(gejala);
    return NextResponse.json(allGejala);
  } catch (error) {
    console.error("Error fetching symptoms:", error);
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
    const { kode, nama, pertanyaan } = body;

    if (!kode || !nama) {
      return NextResponse.json(
        { error: "Kode dan nama wajib diisi" },
        { status: 400 }
      );
    }

    await db.insert(gejala).values({
      id: kode,
      kode,
      nama,
      pertanyaan: pertanyaan || null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating symptom:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
