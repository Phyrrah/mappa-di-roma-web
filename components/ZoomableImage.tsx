"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Thumbnail that opens a full-screen lightbox with zoom + pan on click.
 * Dependency-free: wheel to zoom (desktop), pinch to zoom (touch), drag to pan,
 * double-click to toggle, Esc / backdrop / button to close.
 */
export default function ZoomableImage({ src, alt, width, height, className, priority, sizes }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} — enlarge`}
        className="group/zoom relative block w-full cursor-zoom-in"
      >
        <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} sizes={sizes} />
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-brown-dark/70 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/zoom:opacity-100">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 8v6m-3-3h6m5 0a8 8 0 11-16 0 8 8 0 0116 0z" />
          </svg>
          Click to zoom
        </span>
      </button>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const MIN = 1;
const MAX = 6;

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  // interaction refs (avoid re-renders mid-gesture)
  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const pinch = useRef<{ dist: number; scale: number } | null>(null);

  const reset = useCallback(() => { setScale(1); setTx(0); setTy(0); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") setScale((s) => clamp(s * 1.3, MIN, MAX));
      else if (e.key === "-") setScale((s) => { const n = clamp(s / 1.3, MIN, MAX); if (n === 1) { setTx(0); setTy(0); } return n; });
      else if (e.key === "0") reset();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose, reset]);

  // zoom anchored at the cursor
  const zoomAt = (cx: number, cy: number, factor: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    const ox = cx - rect.left - rect.width / 2;
    const oy = cy - rect.top - rect.height / 2;
    setScale((s) => {
      const ns = clamp(s * factor, MIN, MAX);
      const k = ns / s;
      if (ns === 1) { setTx(0); setTy(0); }
      else { setTx((t) => ox - (ox - t) * k); setTy((t) => oy - (oy - t) * k); }
      return ns;
    });
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.18 : 1 / 1.18);
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    if (scale > 1) reset();
    else zoomAt(e.clientX, e.clientY, 2.5);
  };

  // mouse / single-touch pan
  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, tx, ty };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setTx(drag.current.tx + (e.clientX - drag.current.x));
    setTy(drag.current.ty + (e.clientY - drag.current.y));
  };
  const endDrag = () => { drag.current = null; };

  // touch pinch
  type Pt = { clientX: number; clientY: number };
  const dist2 = (a: Pt, b: Pt) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  const mid2 = (a: Pt, b: Pt) => ({ x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 });
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) { pinch.current = { dist: dist2(e.touches[0], e.touches[1]), scale }; drag.current = null; }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinch.current) {
      e.preventDefault();
      const m = mid2(e.touches[0], e.touches[1]);
      const d = dist2(e.touches[0], e.touches[1]);
      zoomAt(m.x, m.y, d / pinch.current.dist);
      pinch.current.dist = d;
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => { if (e.touches.length < 2) pinch.current = null; };

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* controls */}
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <button type="button" onClick={() => setScale((s) => clamp(s * 1.3, MIN, MAX))} className={btn} aria-label="Zoom in">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M12 5v14M5 12h14" /></svg>
        </button>
        <button type="button" onClick={() => setScale((s) => { const n = clamp(s / 1.3, MIN, MAX); if (n === 1) reset(); return n; })} className={btn} aria-label="Zoom out">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M5 12h14" /></svg>
        </button>
        <button type="button" onClick={onClose} className={btn} aria-label="Close">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div
        ref={box}
        className="relative h-full w-full touch-none overflow-hidden"
        onWheel={onWheel}
        onDoubleClick={onDoubleClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ cursor: scale > 1 ? "grab" : "zoom-in" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="absolute left-1/2 top-1/2 max-h-full max-w-full select-none"
          style={{
            transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${scale})`,
            transformOrigin: "center",
            transition: drag.current || pinch.current ? "none" : "transform 0.12s ease-out",
          }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60">
        Scroll or pinch to zoom · drag to move · double-click to reset
      </div>
    </div>
  );
}
