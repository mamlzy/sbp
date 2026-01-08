"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";

interface UpdateRoleButtonProps {
  userId: string;
  currentRole: string;
  userName: string;
  isCurrentUser: boolean;
}

export function UpdateRoleButton({
  userId,
  currentRole,
  userName,
  isCurrentUser,
}: UpdateRoleButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(currentRole);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isCurrentUser) {
    return (
      <span className="text-sm text-gray-400">Anda sendiri</span>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
      >
        Ubah Role
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Ubah Role</h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-4 text-gray-600">
              Ubah role untuk <strong>{userName}</strong>
            </p>

            <div className="mb-6 space-y-2">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
              >
                <option value="user">User (Pasien)</option>
                <option value="dokter">Dokter</option>
                <option value="admin">Admin</option>
              </select>
              <p className="text-xs text-gray-500">
                <strong>User:</strong> Dapat melakukan konsultasi
                <br />
                <strong>Dokter:</strong> Dapat mengelola penyakit, gejala, dan
                aturan
                <br />
                <strong>Admin:</strong> Akses penuh termasuk kelola users
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
