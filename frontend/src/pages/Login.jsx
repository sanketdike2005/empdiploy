import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("sanket@gmail.com");
  const [password, setPassword] = useState("sanket@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-950 via-blue-900 to-indigo-950 p-4">

      {/* Animated Water Background */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="water-circle water-one"></div>
        <div className="water-circle water-two"></div>
        <div className="water-circle water-three"></div>

        <div className="absolute bottom-0 left-0 h-1/3 w-full bg-blue-500/10 blur-3xl"></div>

      </div>

      {/* Login Card */}
      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/30 bg-white/15 p-8 shadow-2xl backdrop-blur-xl"
      >

        {/* Logo */}
        <div className="mb-6 flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 text-3xl font-bold text-white shadow-xl backdrop-blur-md">
            EM
          </div>

        </div>

        {/* Heading */}
        <div className="mb-7 text-center">

          <h1 className="text-3xl font-bold text-white">
            Employee Management
          </h1>

          <p className="mt-2 text-sm text-blue-100">
            Welcome back! Sign in to continue
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-300/30 bg-red-500/20 p-3 text-center text-sm text-red-100 backdrop-blur-md">
            ⚠️ {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">

          <label className="mb-2 block text-sm font-semibold text-white">
            Email Address
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
              📧
            </span>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-12 pr-4 text-white placeholder-blue-100 outline-none backdrop-blur-md transition focus:border-white focus:bg-white/20 focus:ring-2 focus:ring-white/30"
              required
            />

          </div>

        </div>

        {/* Password */}
        <div className="mb-6">

          <label className="mb-2 block text-sm font-semibold text-white">
            Password
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
              🔐
            </span>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/30 bg-white/10 py-3 pl-12 pr-4 text-white placeholder-blue-100 outline-none backdrop-blur-md transition focus:border-white focus:bg-white/20 focus:ring-2 focus:ring-white/30"
              required
            />

          </div>

        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-white py-3.5 font-bold text-blue-800 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login →"}
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">

          <p className="text-xs text-blue-100">
            Employee Management System
          </p>

          <p className="mt-1 text-xs text-blue-200">
            Secure • Simple • Professional
          </p>

        </div>

      </form>

      {/* CSS Animation */}
      <style>{`
        .water-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          opacity: 0.35;
          animation: waterMove 8s ease-in-out infinite;
        }

        .water-one {
          width: 350px;
          height: 350px;
          background: rgba(34, 211, 238, 0.45);
          top: -100px;
          left: -100px;
        }

        .water-two {
          width: 450px;
          height: 450px;
          background: rgba(59, 130, 246, 0.35);
          right: -150px;
          bottom: -120px;
          animation-delay: 2s;
        }

        .water-three {
          width: 220px;
          height: 220px;
          background: rgba(129, 140, 248, 0.4);
          right: 20%;
          top: 10%;
          animation-delay: 4s;
        }

        @keyframes waterMove {
          0% {
            transform: translate(0px, 0px) scale(1);
          }

          25% {
            transform: translate(40px, 30px) scale(1.08);
          }

          50% {
            transform: translate(-20px, 60px) scale(0.95);
          }

          75% {
            transform: translate(-50px, 20px) scale(1.05);
          }

          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>

    </div>
  );
}