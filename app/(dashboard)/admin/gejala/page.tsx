import { db } from "@/lib/db";
import { gejala } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
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
import { FileText, Plus } from "lucide-react";
import { GejalaForm } from "./gejala-form";
import { DeleteGejalaButton } from "./delete-button";

export default async function GejalaPage() {
  const session = await getSession();
  const role = (session?.user as { role?: string }).role || "user";

  if (role !== "admin" && role !== "dokter") {
    redirect("/dashboard");
  }

  const allGejala = await db
    .select()
    .from(gejala)
    .orderBy(desc(gejala.createdAt));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Gejala</h1>
          <p className="mt-1 text-gray-500">
            Tambah, edit, dan hapus data gejala penyakit gigi
          </p>
        </div>
        <GejalaForm mode="create">
          <button className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Tambah Gejala
          </button>
        </GejalaForm>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Daftar Gejala
          </CardTitle>
          <CardDescription>
            Total {allGejala.length} gejala terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {allGejala.length === 0 ? (
            <div className="py-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-500">Belum ada data gejala</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Gejala</TableHead>
                  <TableHead>Pertanyaan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allGejala.map((g) => (
                  <TableRow key={g.id}>
                    <TableCell>
                      <Badge variant="outline">{g.kode}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{g.nama}</TableCell>
                    <TableCell className="max-w-md truncate text-gray-500">
                      {g.pertanyaan || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <GejalaForm mode="edit" gejala={g}>
                          <button className="rounded-md px-3 py-1 text-sm text-blue-600 hover:bg-blue-50">
                            Edit
                          </button>
                        </GejalaForm>
                        <DeleteGejalaButton id={g.id} nama={g.nama} />
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
