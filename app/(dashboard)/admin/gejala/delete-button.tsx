"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, X } from "lucide-react";

interface DeleteGejalaButtonProps {
  id: string;
  nama: string;
}

export function DeleteGejalaButton({ id, nama }: DeleteGejalaButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/gejala/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md px-3 py-1 text-sm text-red-600 hover:bg-red-50"
      >
        Hapus
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-red-600">
                Hapus Gejala
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-6 text-gray-600">
              Apakah Anda yakin ingin menghapus gejala <strong>{nama}</strong>?
              Tindakan ini tidak dapat dibatalkan dan akan menghapus semua
              aturan terkait.
            </p>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
