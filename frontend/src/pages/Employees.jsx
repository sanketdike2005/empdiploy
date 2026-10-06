import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Employees() {
  const { user } = useAuth();

  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      setError("");

      const { data } = await api.get("/employees", {
        params: {
          page,
          limit: 8,
          search,
        },
      });

      setEmployees(data.employees);
      setPagination(data.pagination);
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not load employees"
      );
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadEmployees();
  };

  const remove = async (id) => {
    if (!confirm("Delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      loadEmployees();
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not delete employee"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">

      {/* Header */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white shadow-xl">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <p className="mb-1 text-sm font-medium text-blue-100">
              Employee Management
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Employees
            </h2>

            <p className="mt-2 text-sm text-blue-100">
              Manage your organization employees easily
            </p>
          </div>

          <div className="rounded-xl bg-white/15 px-6 py-4 backdrop-blur-md">
            <p className="text-sm text-blue-100">
              Total Employees
            </p>

            <p className="text-3xl font-bold">
              {pagination.total}
            </p>
          </div>

        </div>
      </div>

      {/* Search + Add */}
      <div className="mb-6 rounded-2xl bg-white p-4 shadow-md md:p-5">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <form
            onSubmit={handleSearch}
            className="flex w-full gap-2 md:max-w-xl"
          >
            <div className="relative flex-1">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>

              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                placeholder="Search name, email or employee code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
            >
              Search
            </button>
          </form>

          {(user?.role === "admin" || user?.role === "manager") && (
            <Link
              to="/employees/new"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-center font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              + Add Employee
            </Link>
          )}

        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 font-medium text-red-600">
          ⚠️ {error}
        </div>
      )}

      {/* Employee Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

        <div className="overflow-x-auto">

          <table className="min-w-full text-left">

            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employee
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Code
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Department
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Designation
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {employees.map((e) => (

                <tr
                  key={e.id}
                  className="border-b border-slate-100 transition hover:bg-blue-50/50"
                >

                  {/* Employee */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      {/* Avatar */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-sm">

                        {e.profileImage ? (
                          <img
                            src={e.profileImage}
                            alt={`${e.firstName} ${e.lastName}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          `${e.firstName?.charAt(0) || ""}${e.lastName?.charAt(0) || ""}`
                        )}

                      </div>

                      <div>
                        <div className="font-semibold text-slate-800">
                          {e.firstName} {e.lastName}
                        </div>

                        <div className="text-xs text-slate-500">
                          {e.email}
                        </div>
                      </div>

                    </div>

                  </td>

                  {/* Code */}
                  <td className="px-5 py-4">

                    <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                      {e.employeeCode}
                    </span>

                  </td>

                  {/* Department */}
                  <td className="px-5 py-4">

                    <span className="font-medium text-slate-700">
                      {e.department}
                    </span>

                  </td>

                  {/* Designation */}
                  <td className="px-5 py-4">

                    <span className="text-slate-600">
                      {e.designation}
                    </span>

                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                        e.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >

                      <span
                        className={`h-2 w-2 rounded-full ${
                          e.status === "active"
                            ? "bg-green-500"
                            : "bg-slate-400"
                        }`}
                      ></span>

                      {e.status === "active" ? "Active" : "Inactive"}

                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      {(user?.role === "admin" ||
                        user?.role === "manager") && (

                        <Link
                          to={`/employees/${e.id}/edit`}
                          className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                        >
                          ✏️ Edit
                        </Link>

                      )}

                      {user?.role === "admin" && (

                        <button
                          onClick={() => remove(e.id)}
                          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                        >
                          🗑 Delete
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

              {!employees.length && (

                <tr>

                  <td
                    colSpan="6"
                    className="px-5 py-16 text-center"
                  >

                    <div className="text-5xl">
                      👥
                    </div>

                    <p className="mt-3 text-lg font-semibold text-slate-700">
                      No employees found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try searching with another name, email or code.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-md sm:flex-row">

        <p className="text-sm text-slate-500">
          Page{" "}
          <span className="font-bold text-slate-800">
            {pagination.page}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-800">
            {pagination.totalPages || 1}
          </span>
        </p>

        <div className="flex gap-2">

          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <button
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>

        </div>

      </div>

    </div>
  );
}