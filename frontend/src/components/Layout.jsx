import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-2 ${isActive ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-200"}`;

  return (
    <div className="min-h-screen md:flex">
      <aside className="w-full bg-white p-5 shadow md:min-h-screen md:w-64">
        <h1 className="mb-6 text-xl font-bold text-blue-700">EMS Admin</h1>
        <div className="mb-6 rounded-lg bg-slate-100 p-3 text-sm">
          <div className="font-semibold">{user?.name}</div>
          <div className="text-slate-500">{user?.role}</div>
        </div>

        <nav className="space-y-2">
          <NavLink to="/" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/employees" className={linkClass}>Employees</NavLink>
          {(user?.role === "admin" || user?.role === "manager") && (
            <NavLink to="/employees/new" className={linkClass}>Add Employee</NavLink>
          )}
        </nav>

        <button
          onClick={logout}
          className="mt-8 w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
