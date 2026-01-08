import { db } from "@/lib/db";
import { penyakit, aturan } from "@/lib/db/schema";
import { desc, count, eq } from "drizzle-orm";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pill, Plus } from "lucide-react";
import { PenyakitForm } from "./penyakit-form";
import { DeletePenyakitButton } from "./delete-button";

export default async function PenyakitPage() {
  const session = await getSession();
  const role = (session?.user as { role?: string }).role || "user";

  if (role !== "admin" && role !== "dokter") {
    redirect("/dashboard");
  }

  // Get all diseases with symptom count
  const allPenyakit = await db
    .select({
      penyakit: penyakit,
      gejalaCount: count(aturan.gejalaId),
    })
    .from(penyakit)
    .leftJoin(aturan, eq(penyakit.id, aturan.penyakitId))
    .groupBy(penyakit.id)
    .orderBy(desc(penyakit.createdAt));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Penyakit</h1>
          <p className="mt-1 text-gray-500">
            Tambah, edit, dan hapus data penyakit gigi
          </p>
        </div>
        <PenyakitForm mode="create">
          <button className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Tambah Penyakit
          </button>
        </PenyakitForm>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Daftar Penyakit
          </CardTitle>
          <CardDescription>
            Total {allPenyakit.length} penyakit terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {allPenyakit.length === 0 ? (
            <div className="py-8 text-center">
              <Pill className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-500">Belum ada data penyakit</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Penyakit</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead className="text-center">Jumlah Gejala</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allPenyakit.map(({ penyakit: p, gejalaCount }) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Badge variant="outline">{p.kode}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{p.nama}</TableCell>
                    <TableCell className="max-w-xs truncate text-gray-500">
                      {p.deskripsi || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{gejalaCount} gejala</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <PenyakitForm mode="edit" penyakit={p}>
                          <button className="rounded-md px-3 py-1 text-sm text-blue-600 hover:bg-blue-50">
                            Edit
                          </button>
                        </PenyakitForm>
                        <DeletePenyakitButton id={p.id} nama={p.nama} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
