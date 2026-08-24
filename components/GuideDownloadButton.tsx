"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BOOKLET_URL, VISITOR_TYPES } from "@/lib/guide";

type Props = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Renders the download call-to-action. The booklet URL is never exposed as an
 * href — the download is only triggered once the form has been accepted.
 */
export default function GuideDownloadButton({ className, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && <GuideDownloadModal onClose={() => setOpen(false)} />}
    </>
  );
}

function GuideDownloadModal({ onClose }: { onClose: () => void }) {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [visitorType, setVisitorType] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const startDownload = () => {
    // GitHub serves release assets as an attachment, so the browser downloads
    // the file and stays on the page.
    window.location.href = BOOKLET_URL;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/guide-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, email, visitorType, newsletter, terms }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setDone(true);
      setSubmitting(false);
      startDownload();
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  const field =
    "w-full rounded-lg border border-cream-dark bg-white px-3 py-2 text-sm text-brown-dark " +
    "placeholder:text-ink-3 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-dark/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-form-title"
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-cream p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-ink-3 transition-colors hover:text-brown-dark"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {done ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/15">
              <svg className="h-6 w-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 id="guide-form-title" className="mb-2 font-serif text-2xl font-bold text-brown-dark">
              Your download has started
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-brown-light">
              Thank you, {pseudo}. If nothing happens, use the direct link below.
            </p>
            <button
              type="button"
              onClick={startDownload}
              className="text-sm font-medium text-terracotta underline underline-offset-4 hover:text-terracotta-dark"
            >
              Download the booklet again
            </button>
          </div>
        ) : (
          <>
            <h2 id="guide-form-title" className="mb-1 font-serif text-2xl font-bold text-brown-dark">
              Download the booklet
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-brown-light">
              The guide is free. Tell us who you are so we can keep improving it — it takes
              fifteen seconds.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="gd-pseudo" className="mb-1 block text-xs font-medium text-brown-dark">
                  Nickname <span className="text-crimson">*</span>
                </label>
                <input
                  ref={firstField}
                  id="gd-pseudo"
                  type="text"
                  required
                  minLength={2}
                  maxLength={40}
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  placeholder="How should we call you?"
                  className={field}
                />
              </div>

              <div>
                <label htmlFor="gd-email" className="mb-1 block text-xs font-medium text-brown-dark">
                  Email <span className="text-crimson">*</span>
                </label>
                <input
                  id="gd-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.eu"
                  className={field}
                />
              </div>

              <div>
                <label htmlFor="gd-visitor" className="mb-1 block text-xs font-medium text-brown-dark">
                  How long are you in Rome? <span className="text-crimson">*</span>
                </label>
                <select
                  id="gd-visitor"
                  required
                  value={visitorType}
                  onChange={(e) => setVisitorType(e.target.value)}
                  className={field}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {VISITOR_TYPES.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-brown-light">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-terracotta"
                />
                <span>
                  Send me the newsletter — new neighbourhoods, contests and cultural events in Rome.
                  Optional, and you can unsubscribe at any time.
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-brown-light">
                <input
                  type="checkbox"
                  required
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-crimson"
                />
                <span>
                  I have read and accept the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="font-medium text-crimson underline underline-offset-2 hover:text-crimson-light"
                  >
                    terms of use and privacy notice
                  </Link>
                  . <span className="text-crimson">*</span>
                </span>
              </label>

              {error && (
                <p role="alert" className="rounded-lg bg-crimson/10 px-3 py-2 text-xs text-crimson">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-terracotta px-5 py-3 text-sm font-medium text-white shadow-lg shadow-terracotta/20 transition-colors hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Preparing your download…" : "Send and download — PDF (44 MB)"}
              </button>

              <p className="text-center text-[11px] leading-relaxed text-ink-3">
                We never sell or share your data. Ask us to delete it at any time.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
