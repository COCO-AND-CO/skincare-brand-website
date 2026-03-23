"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate slight delay for premium feel
    await new Promise((r) => setTimeout(r, 800));
    if (email === "officialcocoandco@gmail.com" && password === "Admin@123") {
      router.push("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-[#0a0a0a]">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-16 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a1a] via-[#0f1f0f] to-[#0a0a0a]" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#3d7a3d]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#5a9e5a]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#2d6a2d]/30 rounded-full blur-[80px]" />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Logo mark */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4a9e4a] to-[#2d6a2d] shadow-2xl shadow-green-900/50 mb-8">
            <ShieldCheck className="h-9 w-9 text-white" />
          </div>

          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
            COCO<span className="text-[#6abf6a]">&</span>CO
          </h1>
          <p className="text-[#6abf6a] font-semibold tracking-[0.3em] text-xs uppercase mt-2">
            Admin Console
          </p>

          <div className="mt-12 space-y-4 text-left">
            {["Manage products & inventory", "Track orders in real-time", "View revenue analytics", "Control website content"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6abf6a] flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tag */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <span className="text-xs text-gray-600 tracking-widest uppercase">Secure Admin Access</span>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Subtle right bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#0a0a0a]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a2a1a]/40 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4a9e4a] to-[#2d6a2d] shadow-xl mb-4">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white">COCO<span className="text-[#6abf6a]">&</span>CO</h1>
            <p className="text-[#6abf6a] text-xs tracking-widest uppercase font-semibold mt-1">Admin Console</p>
          </div>

          {/* Card */}
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Welcome back</h2>
              <p className="text-gray-400 text-sm mt-1.5">Sign in to your admin dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#6abf6a] transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#4a9e4a] focus:bg-white/8 focus:ring-1 focus:ring-[#4a9e4a]/50 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#6abf6a] transition-colors">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#4a9e4a] focus:bg-white/8 focus:ring-1 focus:ring-[#4a9e4a]/50 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 relative overflow-hidden bg-gradient-to-r from-[#3d7a3d] to-[#5a9e5a] hover:from-[#4a9e4a] hover:to-[#6abf6a] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2.5 text-sm tracking-wide"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <p className="text-center text-gray-600 text-xs mt-8">
              Restricted access — authorised personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
