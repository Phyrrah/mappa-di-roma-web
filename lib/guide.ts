/** Shared constants for the guide download flow. */

export const BOOKLET_URL =
  "https://github.com/Phyrrah/mapparoma-web/releases/download/v1.0/Booklet.pdf";

/** Bump when the terms text changes — stored with each submission as consent evidence. */
export const TERMS_VERSION = "2026-07";

export const VISITOR_TYPES = [
  { value: "short_term_tourist", label: "Short-term visitor (less than 4 months)" },
  { value: "one_semester", label: "Staying one semester" },
  { value: "one_year", label: "Staying one academic year" },
  { value: "more_than_one_year", label: "Staying more than one year" },
  { value: "local", label: "I live in Rome" },
] as const;

export type VisitorType = (typeof VISITOR_TYPES)[number]["value"];

export const VISITOR_TYPE_VALUES = VISITOR_TYPES.map((v) => v.value) as readonly string[];

export function visitorTypeLabel(value: string): string {
  return VISITOR_TYPES.find((v) => v.value === value)?.label ?? value;
}

export type GuideLead = {
  id: string;
  created_at: string;
  pseudo: string;
  email: string;
  visitor_type: string;
  newsletter: boolean;
  terms_version: string;
};

/** Mirrors the CHECK constraint on the table so bad input never reaches Postgres. */
export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
