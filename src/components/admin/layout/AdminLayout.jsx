// src/components/admin/layout/AdminLayout.jsx
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { getSession } from "@/lib/admin/auth";

export default async function AdminLayout({ children }) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader user={session} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

