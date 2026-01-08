import { NextResponse } from "next/server";
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
