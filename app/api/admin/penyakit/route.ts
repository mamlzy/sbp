import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/get-session";
import { db } from "@/lib/db";
import { penyakit } from "@/lib/db/schema";

export async function GET() {
  try {
    const allPenyakit = await db.select().from(penyakit);
    return NextResponse.json(allPenyakit);
  } catch (error) {
    console.error("Error fetching diseases:", error);
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
    const { kode, nama, deskripsi, pengobatan } = body;

    if (!kode || !nama) {
      return NextResponse.json(
        { error: "Kode dan nama wajib diisi" },
        { status: 400 }
      );
    }

    await db.insert(penyakit).values({
      id: kode,
      kode,
      nama,
      deskripsi: deskripsi || null,
      pengobatan: pengobatan || null,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating disease:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
