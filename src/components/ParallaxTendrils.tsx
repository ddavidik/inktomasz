import { useEffect, useRef } from "react";

const RATIO = 0.1;
const VB_W = 160;
const VB_H = 2800;
const SVG_H = 2800;
const INITIAL_OFFSET = 700;

// ─── Shared style buckets ──────────────────────────────────────────────────────
// Main spike — closed filled-stroke path
const SK: React.SVGProps<SVGPathElement> = {
  stroke: "var(--bone-warm)",
  strokeWidth: 1.8,
  strokeLinejoin: "round",
  strokeLinecap: "round",
  fill: "var(--bone-warm)",
  fillOpacity: 0.05,
};

// Secondary spike — same but thinner
const SK2: React.SVGProps<SVGPathElement> = {
  ...SK,
  strokeWidth: 1.2,
  fillOpacity: 0.03,
};

// Back barb — open V-shape at spine
const BB: React.SVGProps<SVGPathElement> = {
  stroke: "var(--bone-warm)",
  strokeWidth: 1.2,
  strokeLinejoin: "round",
  strokeLinecap: "round",
  fill: "none",
};

// Fine tip extension
const TIP: React.SVGProps<SVGPathElement> = {
  stroke: "var(--bone-warm)",
  strokeWidth: 0.9,
  strokeLinecap: "round",
  fill: "none",
};

// ─── Left Tendril ──────────────────────────────────────────────────────────────
//
// Single spine along x≈8 (left screen edge). Six spike clusters, each with:
//   • 2 main blades (upper + lower), tips reaching x≈140–156
//   • 0–2 secondary blades
//   • 2 back barbs (V-shapes pointing left)
//   • optional sharp tip extensions at blade endpoints
//
// Spike path anatomy (upper blade example):
//   M spine_base_top
//   C outer_c1 outer_c2 tip        ← long convex sweep to tip
//   C inner_c1 inner_c2 spine_base_bottom   ← compressed return
//   Z
//
const LeftTendril = () => (
  <g>
    {/* ── Spine ── */}
    <path
      d="M 8 0 C 11 500 5 1000 8 1500 C 11 2000 5 2500 8 2800"
      stroke="var(--bone-warm)"
      strokeWidth={2.5}
      strokeLinecap="round"
      opacity={0.42}
      fill="none"
    />

    {/* ════════════════════════════════════════ */}
    {/* CLUSTER 1 — y≈220 — small, top of run */}
    {/* ════════════════════════════════════════ */}
    <path
      d="M 8 178 C 30 160 62 143 90 128 C 72 136 44 154 8 198 Z"
      {...SK2}
      opacity={0.26}
    />
    <path
      d="M 8 262 C 30 280 62 297 90 312 C 72 304 44 286 8 242 Z"
      {...SK2}
      opacity={0.26}
    />
    <path d="M 8 208 L 0 196 L 8 184" {...BB} opacity={0.24} />
    <path d="M 8 232 L 0 244 L 8 256" {...BB} opacity={0.24} />

    {/* ════════════════════════════════════════ */}
    {/* CLUSTER 2 — y≈640 */}
    {/* ════════════════════════════════════════ */}
    {/* Main upper */}
    <path
      d="M 8 585 C 52 555 110 516 152 484 C 124 498 78 534 8 622 Z"
      {...SK}
      opacity={0.32}
    />
    {/* Main lower */}
    <path
      d="M 8 695 C 52 725 110 764 152 796 C 124 782 78 746 8 658 Z"
      {...SK}
      opacity={0.32}
    />
    {/* Secondary upper */}
    <path
      d="M 8 542 C 38 522 70 504 96 490 C 78 498 48 516 8 554 Z"
      {...SK2}
      opacity={0.24}
    />
    {/* Secondary lower */}
    <path
      d="M 8 738 C 38 758 70 776 96 790 C 78 782 48 764 8 726 Z"
      {...SK2}
      opacity={0.24}
    />
    <path d="M 8 614 L 0 600 L 8 586" {...BB} opacity={0.26} />
    <path d="M 8 666 L 0 680 L 8 694" {...BB} opacity={0.26} />
    {/* Tip extensions */}
    <path d="M 152 484 C 150 469 148 454 152 440" {...TIP} opacity={0.18} />
    <path d="M 152 796 C 150 811 148 826 152 841" {...TIP} opacity={0.18} />

    {/* ════════════════════════════════════════ */}
    {/* CLUSTER 3 — y≈1060 — largest */}
    {/* ════════════════════════════════════════ */}
    {/* Main upper */}
    <path
      d="M 8 994 C 54 960 116 918 158 882 C 128 898 82 938 8 1032 Z"
      {...SK}
      opacity={0.34}
    />
    {/* Main lower */}
    <path
      d="M 8 1126 C 54 1160 116 1202 158 1238 C 128 1222 82 1182 8 1088 Z"
      {...SK}
      opacity={0.34}
    />
    {/* Secondary upper */}
    <path
      d="M 8 946 C 40 924 76 904 104 888 C 86 898 56 918 8 958 Z"
      {...SK2}
      opacity={0.26}
    />
    {/* Secondary lower */}
    <path
      d="M 8 1174 C 40 1196 76 1216 104 1232 C 86 1222 56 1202 8 1162 Z"
      {...SK2}
      opacity={0.26}
    />
    <path d="M 8 1028 L 0 1012 L 8 996" {...BB} opacity={0.28} />
    <path d="M 8 1092 L 0 1108 L 8 1124" {...BB} opacity={0.28} />
    {/* Tip extensions */}
    <path d="M 158 882 C 156 865 154 848 158 832" {...TIP} opacity={0.20} />
    <path d="M 158 1238 C 156 1255 154 1272 158 1289" {...TIP} opacity={0.20} />

    {/* ════════════════════════════════════════ */}
    {/* CLUSTER 4 — y≈1480 */}
    {/* ════════════════════════════════════════ */}
    {/* Main upper */}
    <path
      d="M 8 1424 C 52 1392 110 1352 154 1320 C 126 1334 80 1372 8 1460 Z"
      {...SK}
      opacity={0.32}
    />
    {/* Main lower */}
    <path
      d="M 8 1536 C 52 1568 110 1608 154 1640 C 126 1626 80 1588 8 1500 Z"
      {...SK}
      opacity={0.32}
    />
    <path d="M 8 1452 L 0 1436 L 8 1420" {...BB} opacity={0.26} />
    <path d="M 8 1508 L 0 1524 L 8 1540" {...BB} opacity={0.26} />

    {/* ════════════════════════════════════════ */}
    {/* CLUSTER 5 — y≈1900 — large */}
    {/* ════════════════════════════════════════ */}
    {/* Main upper */}
    <path
      d="M 8 1840 C 54 1806 116 1764 158 1728 C 128 1744 82 1784 8 1876 Z"
      {...SK}
      opacity={0.34}
    />
    {/* Main lower */}
    <path
      d="M 8 1960 C 54 1994 116 2036 158 2072 C 128 2056 82 2016 8 1924 Z"
      {...SK}
      opacity={0.34}
    />
    {/* Secondary upper */}
    <path
      d="M 8 1792 C 38 1770 72 1750 98 1736 C 80 1746 50 1766 8 1804 Z"
      {...SK2}
      opacity={0.26}
    />
    {/* Secondary lower */}
    <path
      d="M 8 2008 C 38 2030 72 2050 98 2064 C 80 2054 50 2034 8 2016 Z"
      {...SK2}
      opacity={0.26}
    />
    <path d="M 8 1868 L 0 1852 L 8 1836" {...BB} opacity={0.28} />
    <path d="M 8 1932 L 0 1948 L 8 1964" {...BB} opacity={0.28} />
    <path d="M 158 1728 C 156 1711 154 1694 158 1678" {...TIP} opacity={0.20} />
    <path d="M 158 2072 C 156 2089 154 2106 158 2123" {...TIP} opacity={0.20} />

    {/* ════════════════════════════════════════ */}
    {/* CLUSTER 6 — y≈2320 — fading toward bottom */}
    {/* ════════════════════════════════════════ */}
    {/* Main upper */}
    <path
      d="M 8 2264 C 50 2234 108 2196 148 2166 C 120 2180 76 2216 8 2300 Z"
      {...SK}
      opacity={0.28}
    />
    {/* Main lower */}
    <path
      d="M 8 2376 C 50 2406 108 2444 148 2474 C 120 2460 76 2424 8 2340 Z"
      {...SK}
      opacity={0.28}
    />
    <path d="M 8 2296 L 0 2280 L 8 2264" {...BB} opacity={0.24} />
    <path d="M 8 2344 L 0 2360 L 8 2376" {...BB} opacity={0.24} />
  </g>
);

// ─── Right Tendril ─────────────────────────────────────────────────────────────
// Horizontal mirror of LeftTendril: spine moves to x≈152, blades sweep leftward.
const RightTendril = () => (
  <g transform={`translate(${VB_W}, 0) scale(-1, 1)`}>
    <LeftTendril />
  </g>
);

// ─── Component ────────────────────────────────────────────────────────────────
export const ParallaxTendrils = () => {
  const leftSvgRef = useRef<SVGSVGElement>(null);
  const rightSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * RATIO;
        const t = `translateY(${y}px)`;
        if (leftSvgRef.current) leftSvgRef.current.style.transform = t;
        if (rightSvgRef.current) rightSvgRef.current.style.transform = t;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const wrapperStyle: React.CSSProperties = { width: VB_W, zIndex: 0 };
  const svgStyle: React.CSSProperties = {
    position: "absolute",
    top: -INITIAL_OFFSET,
    left: 0,
  };

  return (
    <>
      <div
        className="pointer-events-none fixed inset-y-0 left-0 hidden overflow-hidden xl:block"
        style={wrapperStyle}
        aria-hidden="true"
      >
        <svg
          ref={leftSvgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          width={VB_W}
          height={SVG_H}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={svgStyle}
        >
          <LeftTendril />
        </svg>
      </div>

      <div
        className="pointer-events-none fixed inset-y-0 right-0 hidden overflow-hidden xl:block"
        style={wrapperStyle}
        aria-hidden="true"
      >
        <svg
          ref={rightSvgRef}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          width={VB_W}
          height={SVG_H}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={svgStyle}
        >
          <RightTendril />
        </svg>
      </div>
    </>
  );
};
