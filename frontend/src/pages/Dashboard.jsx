import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
  });

  useEffect(() => {
    api.get("/employees/stats").then((res) => setStats(res.data));
  }, []);

  const cards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: "👥",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Active Employees",
      value: stats.activeEmployees,
      icon: "✅",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Inactive Employees",
      value: stats.inactiveEmployees,
      icon: "⏸️",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-500">
          Welcome back! Here's your employee overview.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">

        {cards.map((card) => (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${card.gradient} p-6 text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
          >

            {/* Background Circle */}
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10"></div>

            <div className="relative flex items-center justify-between">

              {/* Text */}
              <div>
                <p className="text-sm font-medium text-white/80">
                  {card.title}
                </p>

                <h3 className="mt-3 text-5xl font-bold">
                  {card.value}
                </h3>
              </div>

              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
                {card.icon}
              </div>

            </div>

            {/* Bottom Text */}
            <div className="relative mt-6 border-t border-white/20 pt-3">
              <span className="text-sm text-white/80">
                Employee Management System
              </span>
            </div>

          </div>
        ))}

      </div>

      {/* Bottom Section */}
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">

        <div className="flex items-center justify-between">

          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Employee Overview
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current employee statistics
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Live Data
          </div>

        </div>

        {/* Progress */}
        <div className="mt-6">

          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-500">
              Active Employees
            </span>

            <span className="font-semibold text-slate-700">
              {stats.activeEmployees} / {stats.totalEmployees}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-700"
              style={{
                width:
                  stats.totalEmployees > 0
                    ? `${(stats.activeEmployees / stats.totalEmployees) * 100}%`
                    : "0%",
              }}
            ></div>

          </div>

        </div>

      </div>

    </div>
  );
}