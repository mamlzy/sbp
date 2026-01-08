import { getSession } from "@/lib/get-session";
import { db } from "@/lib/db";
import { konsultasi, gejala } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { History, Stethoscope, Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function RiwayatPage() {
  const session = await getSession();
  const userId = session!.user.id;

  // Get user's consultation history
  const riwayat = await db.query.konsultasi.findMany({
    where: eq(konsultasi.userId, userId),
    with: {
      penyakit: true,
    },
    orderBy: [desc(konsultasi.createdAt)],
  });

  // Get all symptoms for reference
  const allGejala = await db.select().from(gejala);
  const gejalaMap = new Map(allGejala.map((g) => [g.id, g]));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Riwayat Konsultasi
          </h1>
          <p className="mt-1 text-gray-500">
            Semua riwayat konsultasi Anda tersimpan di sini
          </p>
        </div>
        <Link href="/konsultasi">
          <Button>
            <Stethoscope className="mr-2 h-4 w-4" />
            Konsultasi Baru
          </Button>
        </Link>
      </div>

      {/* History List */}
      {riwayat.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <History className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Belum Ada Riwayat
            </h3>
            <p className="mt-2 text-gray-500">
              Anda belum pernah melakukan konsultasi. Mulai konsultasi pertama
              Anda sekarang!
            </p>
            <Link href="/konsultasi">
              <Button className="mt-6">
                Mulai Konsultasi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {riwayat.map((item) => {
            // Parse symptoms
            let gejalaIds: string[] = [];
            try {
              gejalaIds = JSON.parse(item.gejalaYangDialami || "[]");
            } catch {
              gejalaIds = [];
            }

            const gejalaNama = gejalaIds
              .map((id) => gejalaMap.get(id)?.nama)
              .filter(Boolean);

            return (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {item.penyakit?.nama || "Tidak Terdiagnosa"}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(item.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          (item.nilaiKepastian || 0) >= 70
                            ? "text-green-600"
                            : (item.nilaiKepastian || 0) >= 50
                            ? "text-yellow-600"
                            : "text-orange-600"
                        }`}
                      >
                        {item.nilaiKepastian || 0}%
                      </div>
                      <p className="text-sm text-gray-500">Kepastian</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Certainty Bar */}
                  <div className="mb-4 space-y-1">
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full transition-all ${
                          (item.nilaiKepastian || 0) >= 70
                            ? "bg-green-500"
                            : (item.nilaiKepastian || 0) >= 50
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${item.nilaiKepastian || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Gejala yang Dialami:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {gejalaNama.length > 0 ? (
                        gejalaNama.map((nama, i) => (
                          <Badge key={i} variant="secondary">
                            {nama}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">
                          Tidak ada gejala tercatat
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Treatment Preview */}
                  {item.penyakit?.pengobatan && (
                    <div className="mt-4 rounded-lg bg-blue-50 p-3">
                      <p className="text-sm font-medium text-blue-800">
                        Saran Pengobatan:
                      </p>
                      <p className="mt-1 text-sm text-blue-700 line-clamp-2">
                        {item.penyakit.pengobatan}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
