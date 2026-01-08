import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/get-session";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
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

    const currentRole = (session.user as { role?: string }).role || "user";
    if (currentRole !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { role } = body;

    if (!role || !["user", "dokter", "admin"].includes(role)) {
      return NextResponse.json({ error: "Role tidak valid" }, { status: 400 });
    }

    // Prevent changing own role
    if (id === session.user.id) {
      return NextResponse.json(
        { error: "Tidak dapat mengubah role sendiri" },
        { status: 400 }
      );
    }

    await db
      .update(user)
      .set({
        role,
        updatedAt: new Date(),
      })
      .where(eq(user.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
