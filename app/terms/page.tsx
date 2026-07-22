import type { Metadata } from "next";
import Link from "next/link";
import { TERMS_VERSION } from "@/lib/guide";

export const metadata: Metadata = {
  title: "Terms of Use & Privacy Notice",
  description:
    "Terms of use and privacy notice for the MappaRoma illustrated guide — what data we collect when you download the booklet, why, how long we keep it, and how to have it deleted.",
  alternates: {
    canonical: "https://mapparoma.vercel.app/terms",
  },
  robots: { index: true, follow: true },
};

const EMAIL = "bpierre@student.romebusinessschool.com";

const sections = [
  {
    title: "1. Who we are",
    body: [
      "MappaRoma is a non-commercial student project developed within the Master in Arts and Culture Management at Rome Business School. It produces a free illustrated cultural guide to Rome and an associated community presence on social media.",
      `For anything concerning this notice or your personal data, write to ${EMAIL}. We answer within 30 days.`,
    ],
  },
  {
    title: "2. The guide and how you may use it",
    body: [
      "The booklet is provided free of charge, as is, for personal and non-commercial use. You may print it, annotate it, and share it with others in its unmodified form.",
      "You may not sell it, redistribute it as part of a paid product or service, or present it as your own work. The illustrations and the MappaRoma name remain the property of their authors.",
      "The guide lists cultural venues and addresses that were accurate when it was compiled. Opening hours, prices and programmes change: we cannot guarantee that every entry is still correct, and we accept no liability for a wasted journey.",
    ],
  },
  {
    title: "3. What we collect, and why",
    body: [
      "To download the guide you provide a nickname, an email address, and how long you are staying in Rome. We also record the date of your request and the version of this notice you accepted.",
      "We use the nickname and email to identify your request and to contact you about the guide itself — for example if a corrected edition is published. We use the length of your stay, in aggregate and anonymously, to understand who the guide reaches and to improve it. This aggregated analysis also supports the academic research behind the project; individual answers are never published.",
      "The lawful basis is your consent, given by ticking the box on the download form. You can withdraw it at any time, which does not affect the lawfulness of what was done before.",
    ],
  },
  {
    title: "4. The newsletter",
    body: [
      "The newsletter is entirely optional and has its own separate checkbox. Leaving it unticked does not prevent you from downloading the guide.",
      "If you subscribe, we send occasional emails about new neighbourhoods, contests and cultural events in Rome. Every email carries an unsubscribe link, and you can also ask us to remove you by writing to the address above.",
    ],
  },
  {
    title: "5. Who can see your data",
    body: [
      "Only the MappaRoma project team. We do not sell your data, we do not rent it, and we do not share it with cultural venues, partners or advertisers.",
      "The data is stored on Supabase, our database provider, acting on our instructions and hosted within the European Union. The site itself is hosted by Vercel. Neither uses your data for their own purposes.",
    ],
  },
  {
    title: "6. How long we keep it",
    body: [
      "Download records are kept for two years from the date of your request, then deleted. Newsletter subscriptions are kept until you unsubscribe.",
      "If the project ends at the close of the academic year without being continued, the database is deleted in full.",
    ],
  },
  {
    title: "7. Your rights",
    body: [
      "Under the GDPR you may ask us for a copy of the data we hold about you, correct it, have it erased, restrict or object to how we use it, and receive it in a portable format. Write to the address above and we will act within 30 days, free of charge.",
      "If you believe we have mishandled your data, you may lodge a complaint with the Italian supervisory authority, the Garante per la protezione dei dati personali (garanteprivacy.it), or with the authority in your country of residence.",
    ],
  },
  {
    title: "8. Cookies",
    body: [
      "This site sets no advertising or analytics cookies. A single technical cookie is used to keep the project team signed in to the private administration area; it is not set for ordinary visitors.",
    ],
  },
  {
    title: "9. Changes to this notice",
    body: [
      `This is version ${TERMS_VERSION}. If we change anything material we will publish a new version here and record the new version number against future submissions. The version you accepted is stored with your request.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <nav className="border-b border-cream-dark bg-cream/95 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="font-grotesk text-xl text-brown-dark" style={{ fontWeight: 800 }}>
            mappa<span className="text-saffron">roma</span>
          </Link>
          <Link href="/" className="text-sm text-brown-light transition-colors hover:text-terracotta">
            ← Back to homepage
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12">
          <div className="mb-4 text-sm font-medium uppercase tracking-widest text-terracotta">
            Legal
          </div>
          <h1 className="mb-4 font-serif text-4xl font-bold text-brown-dark md:text-5xl">
            Terms of use &amp; privacy notice
          </h1>
          <p className="leading-relaxed text-brown-light">
            Plain language, no small print. This page explains what you may do with the guide and
            what happens to the details you give us when you download it.
          </p>
          <p className="mt-4 text-xs text-ink-3">Version {TERMS_VERSION}</p>
        </div>

        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="mb-3 font-serif text-xl font-semibold text-brown-dark">{s.title}</h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-brown-light">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-terracotta/20 bg-gradient-to-br from-terracotta/10 to-crimson/8 p-6">
          <div className="mb-2 font-serif text-lg font-semibold text-brown-dark">
            Want your data removed?
          </div>
          <p className="text-sm leading-relaxed text-brown-light">
            Send one line to{" "}
            <a
              href={`mailto:${EMAIL}?subject=Data%20deletion%20request`}
              className="font-medium text-crimson underline underline-offset-2 hover:text-crimson-light"
            >
              {EMAIL}
            </a>{" "}
            and we will erase everything we hold about you. No reason required.
          </p>
        </div>
      </div>
    </div>
  );
}
