/* MappaLogo — React component wrapping the Mappa pictogram system */

interface MappaLogoProps {
  variant?: "inline" | "lockup";
  size?: number;
  className?: string;
}

/* Accordion geometry — 4 panels, alternating up/down folds */
const Tx = [12, 39, 66, 93, 110];
const Ty = [30, 17, 30, 17, 30];
const By = [83, 70, 83, 70, 83];

const SAFFRON = "#F4A52C";
const SAFFRON_LIGHT = "#f7d39a";
const PAPER = "#FAF4EA";
const INK_ALPHA = "rgba(46,36,27,.18)";

function Panels() {
  const fills = [SAFFRON, SAFFRON_LIGHT, SAFFRON, SAFFRON_LIGHT];
  return (
    <>
      {fills.map((fill, i) => (
        <path
          key={i}
          d={`M${Tx[i]} ${Ty[i]} L${Tx[i + 1]} ${Ty[i + 1]} L${Tx[i + 1]} ${By[i + 1]} L${Tx[i]} ${By[i]} Z`}
          fill={fill}
        />
      ))}
      {[1, 2, 3].map((i) => (
        <line
          key={`l${i}`}
          x1={Tx[i]} y1={Ty[i]}
          x2={Tx[i]} y2={By[i]}
          stroke={INK_ALPHA}
          strokeWidth="1.4"
        />
      ))}
    </>
  );
}

function Route() {
  return (
    <>
      <path
        d="M24 64 Q40 50 55 56 T84 44"
        stroke={PAPER}
        strokeWidth="2.2"
        strokeDasharray="4 5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <circle cx="84" cy="44" r="7.5" fill={PAPER} />
      <circle cx="84" cy="44" r="3.4" fill={SAFFRON} />
    </>
  );
}

export default function MappaLogo({ variant = "lockup", size = 140, className = "" }: MappaLogoProps) {
  if (variant === "inline") {
    const h = size * 0.82;
    return (
      <svg
        className={className}
        width={size}
        height={h}
        viewBox="0 0 122 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Panels />
        <Route />
      </svg>
    );
  }

  /* lockup: picto + wordmark */
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size * 0.28}
        height={size * 0.28 * 0.82}
        viewBox="0 0 122 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Panels />
        <Route />
      </svg>
      <span className="font-grotesk font-bold text-ink leading-none" style={{ fontSize: size * 0.17 }}>
        mappa<span className="text-saffron">roma</span>
      </span>
    </span>
  );
}
