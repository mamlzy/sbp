"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";

interface Penyakit {
  id: string;
  kode: string;
  nama: string;
}

interface Gejala {
  id: string;
  kode: string;
  nama: string;
}

interface Aturan {
  penyakitId: string;
  gejalaId: string;
  bobot: number;
}

interface AturanFormProps {
  mode: "create" | "edit";
  penyakitList: Penyakit[];
  gejalaList: Gejala[];
  aturan?: Aturan;
  children: React.ReactNode;
}

export function AturanForm({
  mode,
  penyakitList,
  gejalaList,
  aturan,
  children,
}: AturanFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [penyakitId, setPenyakitId] = useState(aturan?.penyakitId || "");
  const [gejalaId, setGejalaId] = useState(aturan?.gejalaId || "");
  const [bobot, setBobot] = useState(aturan?.bobot?.toString() || "1");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = "/api/admin/aturan";

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          penyakitId,
          gejalaId,
          bobot: parseInt(bobot),
          oldPenyakitId: aturan?.penyakitId,
          oldGejalaId: aturan?.gejalaId,
        }),
      });

      if (response.ok) {
        setOpen(false);
        router.refresh();
        if (mode === "create") {
          setPenyakitId("");
          setGejalaId("");
          setBobot("1");
        }
      } else {
        const data = await response.json();
        setError(data.error || "Gagal menyimpan data");
      }
    } catch {
      setError("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {mode === "create" ? "Tambah Aturan" : "Edit Aturan"}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="penyakit">Penyakit</Label>
                <select
                  id="penyakit"
                  value={penyakitId}
                  onChange={(e) => setPenyakitId(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                  required
                  disabled={mode === "edit"}
                >
                  <option value="">Pilih Penyakit</option>
                  {penyakitList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.kode} - {p.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gejala">Gejala</Label>
                <select
                  id="gejala"
                  value={gejalaId}
                  onChange={(e) => setGejalaId(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                  required
                  disabled={mode === "edit"}
                >
                  <option value="">Pilih Gejala</option>
                  {gejalaList.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.kode} - {g.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bobot">Bobot (1-5)</Label>
                <Input
                  id="bobot"
                  type="number"
                  min="1"
                  max="5"
                  value={bobot}
                  onChange={(e) => setBobot(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Bobot menentukan tingkat kepentingan gejala terhadap penyakit.
                  Semakin tinggi bobot, semakin penting gejala tersebut.
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {mode === "create" ? "Tambah" : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
