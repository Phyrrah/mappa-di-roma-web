"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brown-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-serif text-4xl font-bold text-white mb-2">Mappa di Roma</div>
          <div className="text-white/40 text-sm">Admin Portal — Rome Business School</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-white/70 text-sm mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-terracotta transition-colors"
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-terracotta transition-colors"
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-terracotta hover:bg-terracotta-dark disabled:opacity-50 text-white rounded-xl py-3 font-medium transition-colors"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-white/30 text-xs hover:text-white/60 transition-colors">
            ← Back to the website
          </a>
        </div>
      </div>
    </div>
  );
}
