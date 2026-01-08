"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";

interface Penyakit {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string | null;
  pengobatan: string | null;
}

interface PenyakitFormProps {
  mode: "create" | "edit";
  penyakit?: Penyakit;
  children: React.ReactNode;
}

export function PenyakitForm({ mode, penyakit, children }: PenyakitFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [kode, setKode] = useState(penyakit?.kode || "");
  const [nama, setNama] = useState(penyakit?.nama || "");
  const [deskripsi, setDeskripsi] = useState(penyakit?.deskripsi || "");
  const [pengobatan, setPengobatan] = useState(penyakit?.pengobatan || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url =
        mode === "create"
          ? "/api/admin/penyakit"
          : `/api/admin/penyakit/${penyakit?.id}`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kode, nama, deskripsi, pengobatan }),
      });

      if (response.ok) {
        setOpen(false);
        router.refresh();
        if (mode === "create") {
          setKode("");
          setNama("");
          setDeskripsi("");
          setPengobatan("");
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
                {mode === "create" ? "Tambah Penyakit" : "Edit Penyakit"}
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
                <Label htmlFor="kode">Kode Penyakit</Label>
                <Input
                  id="kode"
                  placeholder="P001"
                  value={kode}
                  onChange={(e) => setKode(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nama">Nama Penyakit</Label>
                <Input
                  id="nama"
                  placeholder="Nama penyakit"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  placeholder="Deskripsi penyakit"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pengobatan">Saran Pengobatan</Label>
                <Textarea
                  id="pengobatan"
                  placeholder="Saran pengobatan"
                  value={pengobatan}
                  onChange={(e) => setPengobatan(e.target.value)}
                  rows={3}
                />
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
