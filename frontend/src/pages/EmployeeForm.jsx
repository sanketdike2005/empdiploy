import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const initialForm = {
  employeeCode: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  salary: "",
  joiningDate: "",
  status: "active",
};

export default function EmployeeForm() {
  const { id } = useParams();
  const editMode = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode) {
      api
        .get(`/employees/${id}`)
        .then(({ data }) => {
          setForm({
            employeeCode: data.employeeCode || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            department: data.department || "",
            designation: data.designation || "",
            salary: data.salary || "",
            joiningDate: data.joiningDate
              ? data.joiningDate.substring(0, 10)
              : "",
            status: data.status || "active",
          });
        })
        .catch((err) => {
          setMessage(
            err.response?.data?.message || "Could not load employee"
          );
        });
    }
  }, [id, editMode]);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    try {
      if (editMode) {
        await api.put(`/employees/${id}`, data);
      } else {
        await api.post("/employees", data);
      }

      navigate("/employees");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">

      {/* Header */}
      <div className="mx-auto mb-6 max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white shadow-xl">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl backdrop-blur-md">
            👤
          </div>

          <div>
            <p className="text-sm text-blue-100">
              Employee Management System
            </p>

            <h1 className="text-2xl font-bold md:text-3xl">
              {editMode ? "Edit Employee" : "Add New Employee"}
            </h1>

            <p className="mt-1 text-sm text-blue-100">
              {editMode
                ? "Update employee information"
                : "Create a new employee profile"}
            </p>
          </div>

        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={submit}
        className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl"
      >

        {/* Error Message */}
        {message && (
          <div className="m-6 rounded-xl border border-red-200 bg-red-50 p-4 font-medium text-red-600">
            ⚠️ {message}
          </div>
        )}

        {/* Personal Information */}
        <div className="border-b border-slate-200 p-6">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              👨‍💼
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Personal Information
              </h2>

              <p className="text-sm text-slate-500">
                Enter basic employee details
              </p>
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Employee Code */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee Code
              </label>

              <input
                name="employeeCode"
                value={form.employeeCode}
                onChange={change}
                placeholder="EMP001"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* First Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                First Name
              </label>

              <input
                name="firstName"
                value={form.firstName}
                onChange={change}
                placeholder="Enter first name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Last Name
              </label>

              <input
                name="lastName"
                value={form.lastName}
                onChange={change}
                placeholder="Enter last name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={change}
                placeholder="employee@gmail.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={change}
                placeholder="9876543210"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProfileImage(e.target.files?.[0] || null)
                }
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition hover:bg-slate-100 focus:border-blue-500"
              />

              {profileImage && (
                <div className="mt-4 flex items-center gap-4">

                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Preview"
                    className="h-20 w-20 rounded-full border-4 border-blue-100 object-cover shadow-md"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Image Preview
                    </p>

                    <p className="text-xs text-slate-500">
                      {profileImage.name}
                    </p>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>

        {/* Employment Information */}
        <div className="border-b border-slate-200 p-6">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              💼
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Employment Information
              </h2>

              <p className="text-sm text-slate-500">
                Enter job and employment details
              </p>
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Department */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Department
              </label>

              <input
                name="department"
                value={form.department}
                onChange={change}
                placeholder="IT / HR / Finance"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Designation */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Designation
              </label>

              <input
                name="designation"
                value={form.designation}
                onChange={change}
                placeholder="Java Developer"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Salary */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Salary
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-500">
                  ₹
                </span>

                <input
                  name="salary"
                  type="number"
                  value={form.salary}
                  onChange={change}
                  placeholder="25000"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Joining Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Joining Date
              </label>

              <input
                name="joiningDate"
                type="date"
                value={form.joiningDate}
                onChange={change}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={change}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="active">🟢 Active</option>
                <option value="inactive">⚪ Inactive</option>
              </select>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 bg-slate-50 p-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="rounded-xl border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : editMode
              ? "✓ Update Employee"
              : "+ Create Employee"}
          </button>

        </div>

      </form>
    </div>
  );
}