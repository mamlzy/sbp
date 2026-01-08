import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
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
import { Users } from "lucide-react";
import { UpdateRoleButton } from "./update-role-button";
import { formatDate } from "@/lib/utils";

export default async function UsersPage() {
  const session = await getSession();
  const role = (session?.user as { role?: string }).role || "user";

  if (role !== "admin") {
    redirect("/dashboard");
  }

  const allUsers = await db.select().from(user).orderBy(desc(user.createdAt));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kelola Users</h1>
        <p className="mt-1 text-gray-500">
          Kelola akun dan role pengguna sistem
        </p>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Daftar Users
          </CardTitle>
          <CardDescription>
            Total {allUsers.length} pengguna terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        u.role === "admin"
                          ? "default"
                          : u.role === "dokter"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {formatDate(u.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <UpdateRoleButton
                      userId={u.id}
                      currentRole={u.role}
                      userName={u.name}
                      isCurrentUser={u.id === session?.user.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
