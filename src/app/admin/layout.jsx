// src/app/admin/layout.jsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/auth";
import AdminLayout from "@/components/admin/layout/AdminLayout";

export default async function Layout({ children }) {
  // For all admin pages, require authentication
  try {
    const session = await getSession();
    if (!session) {
      redirect("/admin/login");
    }
    return <AdminLayout>{children}</AdminLayout>;
  } catch (error) {
    redirect("/admin/login");
  }
}

