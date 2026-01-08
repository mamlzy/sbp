import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={{
          name: session.user.name,
          email: session.user.email,
          role: (session.user as { role?: string }).role || "user",
        }}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
