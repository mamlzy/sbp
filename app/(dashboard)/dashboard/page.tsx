import { getSession } from "@/lib/get-session";
import { db } from "@/lib/db";
import { konsultasi, penyakit, gejala } from "@/lib/db/schema";
import { eq, count, desc } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Stethoscope,
  Activity,
  History,
  Pill,
  FileText,
  ArrowRight,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await getSession();
  const userId = session!.user.id;
  const userRole = (session!.user as { role?: string }).role || "user";
  const isAdmin = userRole === "admin" || userRole === "dokter";

  // Get statistics
  const [totalPenyakit] = await db.select({ count: count() }).from(penyakit);
  const [totalGejala] = await db.select({ count: count() }).from(gejala);
  const [userKonsultasi] = await db
    .select({ count: count() })
    .from(konsultasi)
    .where(eq(konsultasi.userId, userId));

  // Get recent consultations
  const recentKonsultasi = await db.query.konsultasi.findMany({
    where: eq(konsultasi.userId, userId),
    with: {
      penyakit: true,
    },
    orderBy: [desc(konsultasi.createdAt)],
    limit: 5,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Selamat datang, {session!.user.name}!
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Mulai Konsultasi</CardTitle>
                <CardDescription>
                  Diagnosa penyakit gigi Anda
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/konsultasi">
              <Button className="w-full">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <History className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Riwayat Konsultasi</CardTitle>
                <CardDescription>
                  {userKonsultasi.count} kali konsultasi
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Link href="/riwayat">
              <Button variant="outline" className="w-full">
                Lihat Riwayat
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Basis Pengetahuan</CardTitle>
                <CardDescription>
                  {totalPenyakit.count} penyakit, {totalGejala.count} gejala
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isAdmin ? (
              <Link href="/admin/penyakit">
                <Button variant="outline" className="w-full">
                  Kelola Data
                </Button>
              </Link>
            ) : (
              <p className="text-sm text-gray-500">
                Database siap untuk konsultasi
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistics for Admin */}
      {isAdmin && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Penyakit
              </CardTitle>
              <Pill className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPenyakit.count}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Gejala
              </CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGejala.count}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Konsultasi Saya
              </CardTitle>
              <Stethoscope className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userKonsultasi.count}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Role
              </CardTitle>
              <Activity className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userRole}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Consultations */}
      <Card>
        <CardHeader>
          <CardTitle>Konsultasi Terakhir</CardTitle>
          <CardDescription>
            Riwayat konsultasi Anda yang terbaru
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentKonsultasi.length === 0 ? (
            <div className="py-8 text-center">
              <Stethoscope className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-500">
                Belum ada riwayat konsultasi
              </p>
              <Link href="/konsultasi">
                <Button className="mt-4">Mulai Konsultasi Pertama</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentKonsultasi.map((k) => (
                <div
                  key={k.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {k.penyakit?.nama || "Tidak terdiagnosa"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(k.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {k.nilaiKepastian}% yakin
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
