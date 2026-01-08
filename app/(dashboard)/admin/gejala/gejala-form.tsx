"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";

interface Gejala {
  id: string;
  kode: string;
  nama: string;
  pertanyaan: string | null;
}

interface GejalaFormProps {
  mode: "create" | "edit";
  gejala?: Gejala;
  children: React.ReactNode;
}

export function GejalaForm({ mode, gejala, children }: GejalaFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [kode, setKode] = useState(gejala?.kode || "");
  const [nama, setNama] = useState(gejala?.nama || "");
  const [pertanyaan, setPertanyaan] = useState(gejala?.pertanyaan || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url =
        mode === "create"
          ? "/api/admin/gejala"
          : `/api/admin/gejala/${gejala?.id}`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kode, nama, pertanyaan }),
      });

      if (response.ok) {
        setOpen(false);
        router.refresh();
        if (mode === "create") {
          setKode("");
          setNama("");
          setPertanyaan("");
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
                {mode === "create" ? "Tambah Gejala" : "Edit Gejala"}
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
                <Label htmlFor="kode">Kode Gejala</Label>
                <Input
                  id="kode"
                  placeholder="G001"
                  value={kode}
                  onChange={(e) => setKode(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nama">Nama Gejala</Label>
                <Input
                  id="nama"
                  placeholder="Nama gejala"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pertanyaan">Pertanyaan (opsional)</Label>
                <Textarea
                  id="pertanyaan"
                  placeholder="Apakah Anda mengalami...?"
                  value={pertanyaan}
                  onChange={(e) => setPertanyaan(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  Jika kosong, sistem akan menggunakan format: &quot;Apakah Anda
                  mengalami [nama gejala]?&quot;
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
