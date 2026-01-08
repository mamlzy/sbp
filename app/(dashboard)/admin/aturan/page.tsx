import { db } from "@/lib/db";
import { penyakit, gejala, aturan } from "@/lib/db/schema";
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
import { ListTree, Plus } from "lucide-react";
import { AturanForm } from "./aturan-form";
import { DeleteAturanButton } from "./delete-button";

export default async function AturanPage() {
  const session = await getSession();
  const role = (session?.user as { role?: string }).role || "user";

  if (role !== "admin" && role !== "dokter") {
    redirect("/dashboard");
  }

  // Get all rules with relations
  const allAturan = await db.query.aturan.findMany({
    with: {
      penyakit: true,
      gejala: true,
    },
  });

  // Get all diseases and symptoms for the form
  const allPenyakit = await db.select().from(penyakit);
  const allGejala = await db.select().from(gejala);

  // Group rules by disease
  const groupedAturan = allAturan.reduce((acc, rule) => {
    const penyakitId = rule.penyakitId;
    if (!acc[penyakitId]) {
      acc[penyakitId] = {
        penyakit: rule.penyakit,
        rules: [],
      };
    }
    acc[penyakitId].rules.push(rule);
    return acc;
  }, {} as Record<string, { penyakit: typeof allPenyakit[0]; rules: typeof allAturan }>);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Kelola Basis Aturan
          </h1>
          <p className="mt-1 text-gray-500">
            Aturan IF-THEN untuk menghubungkan gejala dengan penyakit
          </p>
        </div>
        <AturanForm
          mode="create"
          penyakitList={allPenyakit}
          gejalaList={allGejala}
        >
          <button className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Tambah Aturan
          </button>
        </AturanForm>
      </div>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <ListTree className="h-5 w-5 shrink-0 text-blue-600" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Tentang Basis Aturan</p>
              <p>
                Basis aturan menggunakan format IF-THEN. Contoh: IF [Gusi
                berwarna merah] AND [Gusi membengkak] THEN [Gingivitis]. Setiap
                gejala memiliki bobot yang menentukan tingkat kepentingannya.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rules by Disease */}
      {Object.keys(groupedAturan).length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <ListTree className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">Belum ada aturan yang dibuat</p>
            <p className="text-sm text-gray-400">
              Tambahkan aturan untuk menghubungkan gejala dengan penyakit
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedAturan).map(([penyakitId, data]) => (
            <Card key={penyakitId}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Badge>{data.penyakit.kode}</Badge>
                      {data.penyakit.nama}
                    </CardTitle>
                    <CardDescription>
                      {data.rules.length} gejala terkait
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kode Gejala</TableHead>
                      <TableHead>Nama Gejala</TableHead>
                      <TableHead className="text-center">Bobot</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.rules.map((rule) => (
                      <TableRow key={`${rule.penyakitId}-${rule.gejalaId}`}>
                        <TableCell>
                          <Badge variant="outline">{rule.gejala.kode}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {rule.gejala.nama}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={rule.bobot >= 3 ? "default" : "secondary"}
                          >
                            {rule.bobot}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <AturanForm
                              mode="edit"
                              penyakitList={allPenyakit}
                              gejalaList={allGejala}
                              aturan={{
                                penyakitId: rule.penyakitId,
                                gejalaId: rule.gejalaId,
                                bobot: rule.bobot,
                              }}
                            >
                              <button className="rounded-md px-3 py-1 text-sm text-blue-600 hover:bg-blue-50">
                                Edit
                              </button>
                            </AturanForm>
                            <DeleteAturanButton
                              penyakitId={rule.penyakitId}
                              gejalaId={rule.gejalaId}
                              gejalaNama={rule.gejala.nama}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
