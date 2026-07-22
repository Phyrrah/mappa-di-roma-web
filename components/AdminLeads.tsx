"use client";

import { useEffect, useState } from "react";
import { GuideLead, visitorTypeLabel } from "@/lib/guide";

type Payload = {
  leads: GuideLead[];
  total: number;
  newsletterTotal: number;
};

export default function AdminLeads() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/guide-leads")
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).error || "Failed to load");
        return res.json();
      })
      .then((d: Payload) => {
        if (!cancelled) setData(d);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const button =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors";

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex gap-6">
          <div>
            <div className="font-serif text-3xl font-bold text-terracotta">
              {data ? data.total : "—"}
            </div>
            <div className="mt-1 text-xs text-brown-light">downloads</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-crimson">
              {data ? data.newsletterTotal : "—"}
            </div>
            <div className="mt-1 text-xs text-brown-light">newsletter opt-ins</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href="/api/guide-leads/export?scope=all"
            className={`${button} bg-terracotta text-white hover:bg-terracotta-dark`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </a>
          <a
            href="/api/guide-leads/export?scope=newsletter"
            className={`${button} border border-crimson/30 text-crimson hover:bg-crimson/10`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Export for newsletter
          </a>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-cream-dark bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cream-dark bg-cream/60 text-left">
              <th className="px-4 py-3 font-medium text-brown-dark">Date</th>
              <th className="px-4 py-3 font-medium text-brown-dark">Nickname</th>
              <th className="px-4 py-3 font-medium text-brown-dark">Email</th>
              <th className="px-4 py-3 font-medium text-brown-dark">Staying</th>
              <th className="px-4 py-3 font-medium text-brown-dark">NL</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-crimson">
                  {error}
                </td>
              </tr>
            )}
            {!error && !data && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-brown-light">
                  Loading…
                </td>
              </tr>
            )}
            {data?.leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-brown-light">
                  No downloads yet.
                </td>
              </tr>
            )}
            {data?.leads.map((l) => (
              <tr key={l.id} className="border-b border-cream-dark/60 last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-brown-light">
                  {new Date(l.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </td>
                <td className="px-4 py-3 font-medium text-brown-dark">{l.pseudo}</td>
                <td className="px-4 py-3 text-brown-light">{l.email}</td>
                <td className="px-4 py-3 text-brown-light">{visitorTypeLabel(l.visitor_type)}</td>
                <td className="px-4 py-3">
                  {l.newsletter ? (
                    <span className="rounded-full bg-crimson/10 px-2 py-0.5 text-xs font-medium text-crimson">
                      yes
                    </span>
                  ) : (
                    <span className="text-xs text-ink-3">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-ink-3">
        Showing the 10 most recent submissions. Use Download for the complete file — it opens
        directly in Excel.
      </p>
    </div>
  );
}
