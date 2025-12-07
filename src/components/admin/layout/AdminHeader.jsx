// src/components/admin/layout/AdminHeader.jsx
"use client";

export default function AdminHeader({ user }) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Admin Panel</h2>
          <p className="text-sm text-slate-600">Manage your content</p>
        </div>
        
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{user.name || user.email}</p>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {(user.name || user.email).charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

