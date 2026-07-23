"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Mode = "day" | "night";

/**
 * Showcases the base cartography behind the guide, with a day/night switch.
 *
 * Both renders come from the same source at the same scale and projection, so
 * the two layers are pixel-aligned and can simply cross-fade.
 */
export default function MapSection() {
  const [mode, setMode] = useState<Mode>("day");
  const [touched, setTouched] = useState(false);

  // Follow the visitor's system preference until they choose for themselves.
  useEffect(() => {
    if (touched) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setMode(mq.matches ? "night" : "day");
    const onChange = (e: MediaQueryListEvent) => setMode(e.matches ? "night" : "day");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [touched]);

  const night = mode === "night";

  const choose = (next: Mode) => {
    setTouched(true);
    setMode(next);
  };

  return (
    <section
      id="map"
      className={`py-24 transition-colors duration-700 ${night ? "bg-brown-dark" : "bg-cream-dark"}`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div
            className={`font-medium text-sm uppercase tracking-widest mb-4 transition-colors duration-700 ${
              night ? "text-saffron" : "text-terracotta"
            }`}
          >
            The Cartography
          </div>
          <h2
            className={`font-serif text-4xl md:text-5xl font-bold mb-6 transition-colors duration-700 ${
              night ? "text-cream" : "text-brown-dark"
            }`}
          >
            Rome, drawn street by street
          </h2>
          <p
            className={`max-w-2xl mx-auto leading-relaxed transition-colors duration-700 ${
              night ? "text-cream/60" : "text-brown-light"
            }`}
          >
            Every neighbourhood page of the guide is built on our own base map, drawn from open
            geographic data — all eighteen historic districts, the full street network, the
            buildings and the Tiber. Two renderings of the same drawing: one for paper, one for
            the night.
          </p>
        </div>

        {/* Map with cross-fading day / night layers */}
        <figure className="relative">
          <div
            className={`relative aspect-square overflow-hidden rounded-2xl shadow-2xl transition-colors duration-700 ${
              night ? "bg-[#111]" : "bg-white"
            }`}
          >
            <Image
              src="/map-roma-day.webp"
              alt="Base map of Rome in grey and colour — the full street network, buildings, parks and the Tiber"
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className={`object-cover transition-opacity duration-700 ${
                night ? "opacity-0" : "opacity-100"
              }`}
            />
            <Image
              src="/map-roma-night.webp"
              alt="Night rendering of the same base map of Rome — white streets on black with the Tiber in gold"
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className={`object-cover transition-opacity duration-700 ${
                night ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Day / night switch */}
            <div
              className="absolute top-4 right-4 flex gap-1 rounded-full p-1 backdrop-blur-sm shadow-lg"
              style={{ backgroundColor: night ? "rgba(20,18,16,.72)" : "rgba(255,255,255,.78)" }}
              role="group"
              aria-label="Map rendering"
            >
              <button
                type="button"
                onClick={() => choose("day")}
                aria-pressed={!night}
                title="Day rendering"
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  night ? "text-cream/60 hover:text-cream" : "bg-terracotta text-white"
                }`}
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" strokeWidth={2} />
                  <path
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                  />
                </svg>
                Day
              </button>
              <button
                type="button"
                onClick={() => choose("night")}
                aria-pressed={night}
                title="Night rendering"
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  night ? "bg-saffron text-brown-dark" : "text-brown-light hover:text-brown-dark"
                }`}
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"
                  />
                </svg>
                Night
              </button>
            </div>
          </div>

          <figcaption
            className={`mt-4 text-center text-xs transition-colors duration-700 ${
              night ? "text-cream/40" : "text-ink-3"
            }`}
          >
            MappaRoma base map — 18 districts, 1:9,000, generated from OpenStreetMap data.
            {night ? " Night rendering: gold water on black." : " Day rendering: grey on paper."}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
