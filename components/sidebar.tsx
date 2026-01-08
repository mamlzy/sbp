"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Stethoscope,
  History,
  Settings,
  Users,
  FileText,
  ListTree,
  Pill,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface SidebarProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

const userNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Konsultasi",
    href: "/konsultasi",
    icon: Stethoscope,
  },
  {
    title: "Riwayat",
    href: "/riwayat",
    icon: History,
  },
];

const adminNavItems = [
  {
    title: "Penyakit",
    href: "/admin/penyakit",
    icon: Pill,
  },
  {
    title: "Gejala",
    href: "/admin/gejala",
    icon: FileText,
  },
  {
    title: "Aturan",
    href: "/admin/aturan",
    icon: ListTree,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = user.role === "admin" || user.role === "dokter";

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
          <Stethoscope className="h-5 w-5 text-white" />
        </div>
        <span className="font-semibold text-gray-900">Sistem Pakar Gigi</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Menu
        </div>
        {userNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}

        {isAdmin && (
          <>
            <div className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Admin
            </div>
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Keluar
        </button>
      </div>
    </div>
  );
}
