"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminNavbar() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  return (
    <nav className="bg-brown-dark text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-serif text-lg font-bold text-white hover:text-terracotta-light transition-colors">
          MappaRoma
        </Link>
        <span className="text-white/30">|</span>
        <span className="text-white/60 text-sm">Admin Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View site
        </Link>
        <button
          onClick={logout}
          className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
