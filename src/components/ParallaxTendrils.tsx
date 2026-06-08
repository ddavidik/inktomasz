import { useEffect, useRef } from "react";

/** Parallax ratio: inner SVG moves at 10% of scroll speed */
const RATIO = 0.1;

/** SVG coordinate space */
const VB_W = 80;
const VB_H = 2800;
/** Physical height of the SVG element (px) — taller than any viewport */
const SVG_H = 2800;
/** How far above viewport top the SVG starts initially */
const INITIAL_OFFSET = 700;

// ─── Left tendril ────────────────────────────────────────────────────────────
const LeftTendril = () => (
  <g>
    {/* ── Trunk ── winding spine near left edge */}
    <path
      d="M 28 0 C 33 180 20 360 26 540 C 32 720 18 900 25 1080 C 32 1260 19 1440 27 1620 C 35 1800 21 1980 28 2160 C 35 2340 20 2520 27 2800"
      stroke="var(--bone-fade)"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.32"
      fill="none"
    />

    {/* ── Branch cluster y≈100 ── */}
    <path d="M 26 105 C 40 97 57 88 72 79 C 80 74 90 70 80 67" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 57 88 C 62 77 69 66 79 57" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 69 66 C 73 56 77 45 75 33" stroke="var(--bone-fade)" strokeWidth="0.5" strokeLinecap="round" opacity="0.14" fill="none" />
    <circle cx="26" cy="105" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈300 ── */}
    <path d="M 25 302 C 38 293 54 282 70 271 C 78 265 88 259 80 256" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 54 282 C 59 270 65 258 75 247" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 70 271 C 73 282 76 295 74 309" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 65 258 C 68 248 72 237 71 225" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="25" cy="302" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈490 ── */}
    <path d="M 27 492 C 41 484 57 474 71 462 C 79 455 80 448 80 444" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 57 474 C 62 462 69 450 79 440" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 71 462 C 74 474 77 488 75 502" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 69 450 C 72 440 76 429 75 417" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="27" cy="492" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈680 ── goes down-right */}
    <path d="M 22 680 C 35 691 50 703 64 713 C 74 721 80 725 80 723" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 50 703 C 54 691 60 679 70 669" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 64 713 C 67 725 70 739 68 753" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 60 679 C 63 669 67 658 66 646" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="22" cy="680" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈870 ── */}
    <path d="M 27 872 C 41 862 57 851 72 839 C 80 831 80 825 80 821" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 57 851 C 62 839 68 827 78 817" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 68 827 C 71 817 75 806 74 794" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="27" cy="872" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1060 ── down-right drift */}
    <path d="M 23 1062 C 36 1073 51 1085 65 1095 C 75 1103 80 1107 80 1105" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 51 1085 C 55 1073 61 1061 71 1051" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 65 1095 C 68 1107 71 1121 69 1135" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 61 1061 C 64 1051 68 1040 67 1028" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="23" cy="1062" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1250 ── */}
    <path d="M 28 1252 C 42 1243 58 1232 73 1220 C 80 1213 80 1207 80 1203" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 58 1232 C 63 1220 70 1208 80 1198" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 70 1208 C 73 1198 77 1187 76 1175" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="28" cy="1252" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1440 ── down-right */}
    <path d="M 21 1440 C 34 1451 49 1463 63 1473 C 73 1481 80 1485 80 1483" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 49 1463 C 53 1451 59 1439 69 1429" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 63 1473 C 66 1485 69 1499 67 1513" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 59 1439 C 62 1429 66 1418 65 1406" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="21" cy="1440" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1630 ── */}
    <path d="M 29 1632 C 43 1622 59 1611 74 1599 C 80 1592 80 1586 80 1582" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 59 1611 C 64 1599 71 1587 79 1577" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 71 1587 C 74 1577 78 1566 77 1554" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="29" cy="1632" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1820 ── down drift */}
    <path d="M 22 1820 C 35 1831 50 1843 64 1853 C 74 1861 80 1865 80 1863" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 50 1843 C 54 1831 60 1819 70 1809" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 64 1853 C 67 1865 70 1879 68 1893" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <circle cx="22" cy="1820" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈2010 ── */}
    <path d="M 27 2012 C 41 2002 57 1991 72 1979 C 80 1971 80 1965 80 1961" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 57 1991 C 62 1979 69 1967 79 1957" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 69 1967 C 72 1957 76 1946 75 1934" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="27" cy="2012" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈2200 ── */}
    <path d="M 21 2200 C 34 2211 49 2223 63 2233 C 73 2241 80 2245 80 2243" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 49 2223 C 53 2211 59 2199 69 2189" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 63 2233 C 66 2245 69 2259 67 2273" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <circle cx="21" cy="2200" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈2390 ── */}
    <path d="M 28 2392 C 42 2382 58 2371 73 2359 C 80 2352 80 2346 80 2342" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 58 2371 C 63 2359 70 2347 80 2337" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <circle cx="28" cy="2392" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈2580 ── */}
    <path d="M 22 2580 C 35 2591 50 2603 64 2613 C 74 2621 80 2625 80 2623" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 50 2603 C 54 2591 60 2579 70 2569" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <circle cx="22" cy="2580" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Floating atmospheric wisps ── disconnected tendrils */}
    <path d="M 70 195 C 74 184 78 172 77 159 C 76 150 73 142 75 133" stroke="var(--bone-fade)" strokeWidth="0.5" strokeLinecap="round" opacity="0.13" fill="none" />
    <path d="M 65 555 C 68 545 72 534 71 521 C 70 513 67 505 69 496" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.11" fill="none" />
    <path d="M 74 940 C 77 930 80 919 79 906" stroke="var(--bone-fade)" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M 68 1140 C 71 1130 74 1119 73 1106 C 72 1098 69 1090 71 1081" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.11" fill="none" />
    <path d="M 72 1510 C 75 1500 78 1489 77 1476 C 76 1468 73 1460 75 1451" stroke="var(--bone-fade)" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M 69 1700 C 72 1690 76 1679 75 1666" stroke="var(--bone-fade)" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M 73 2080 C 76 2070 79 2059 78 2046 C 77 2038 74 2030 76 2021" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.11" fill="none" />
    <path d="M 67 2450 C 70 2440 73 2429 72 2416" stroke="var(--bone-fade)" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M 71 2670 C 74 2660 77 2649 76 2636 C 75 2628 72 2620 74 2611" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.11" fill="none" />
  </g>
);

// ─── Right tendril ────────────────────────────────────────────────────────────
const RightTendril = () => (
  <g>
    {/* ── Trunk ── mirror of left, near right edge */}
    <path
      d="M 52 0 C 47 180 60 360 54 540 C 48 720 62 900 55 1080 C 48 1260 61 1440 53 1620 C 45 1800 59 1980 52 2160 C 45 2340 60 2520 53 2800"
      stroke="var(--bone-fade)"
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.32"
      fill="none"
    />

    {/* ── Branch cluster y≈105 ── goes left */}
    <path d="M 54 105 C 40 97 23 88 8 79 C 0 74 0 70 0 67" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 23 88 C 18 77 11 66 1 57" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 11 66 C 7 56 3 45 5 33" stroke="var(--bone-fade)" strokeWidth="0.5" strokeLinecap="round" opacity="0.14" fill="none" />
    <circle cx="54" cy="105" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈302 ── */}
    <path d="M 55 302 C 42 293 26 282 10 271 C 2 265 0 259 0 256" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 26 282 C 21 270 15 258 5 247" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 10 271 C 7 282 4 295 6 309" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 15 258 C 12 248 8 237 9 225" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="55" cy="302" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈492 ── */}
    <path d="M 53 492 C 39 484 23 474 9 462 C 1 455 0 448 0 444" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 23 474 C 18 462 11 450 1 440" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 9 462 C 6 474 3 488 5 502" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 11 450 C 8 440 4 429 5 417" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="53" cy="492" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈680 ── down-left */}
    <path d="M 58 680 C 45 691 30 703 16 713 C 6 721 0 725 0 723" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 30 703 C 26 691 20 679 10 669" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 16 713 C 13 725 10 739 12 753" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 20 679 C 17 669 13 658 14 646" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="58" cy="680" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈872 ── */}
    <path d="M 53 872 C 39 862 23 851 8 839 C 0 831 0 825 0 821" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 23 851 C 18 839 12 827 2 817" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 12 827 C 9 817 5 806 6 794" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="53" cy="872" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1062 ── down-left */}
    <path d="M 57 1062 C 44 1073 29 1085 15 1095 C 5 1103 0 1107 0 1105" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 29 1085 C 25 1073 19 1061 9 1051" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 15 1095 C 12 1107 9 1121 11 1135" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 19 1061 C 16 1051 12 1040 13 1028" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="57" cy="1062" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1252 ── */}
    <path d="M 52 1252 C 38 1243 22 1232 7 1220 C 0 1213 0 1207 0 1203" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 22 1232 C 17 1220 10 1208 0 1198" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 10 1208 C 7 1198 3 1187 4 1175" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="52" cy="1252" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1440 ── down-left */}
    <path d="M 59 1440 C 46 1451 31 1463 17 1473 C 7 1481 0 1485 0 1483" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 31 1463 C 27 1451 21 1439 11 1429" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 17 1473 C 14 1485 11 1499 13 1513" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <path d="M 21 1439 C 18 1429 14 1418 15 1406" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="59" cy="1440" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1632 ── */}
    <path d="M 51 1632 C 37 1622 21 1611 6 1599 C 0 1592 0 1586 0 1582" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 21 1611 C 16 1599 9 1587 1 1577" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 9 1587 C 6 1577 2 1566 3 1554" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="51" cy="1632" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈1820 ── down-left */}
    <path d="M 58 1820 C 45 1831 30 1843 16 1853 C 6 1861 0 1865 0 1863" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 30 1843 C 26 1831 20 1819 10 1809" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 16 1853 C 13 1865 10 1879 12 1893" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <circle cx="58" cy="1820" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈2012 ── */}
    <path d="M 53 2012 C 39 2002 23 1991 8 1979 C 0 1971 0 1965 0 1961" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 23 1991 C 18 1979 11 1967 1 1957" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 11 1967 C 8 1957 4 1946 5 1934" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" fill="none" />
    <circle cx="53" cy="2012" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈2200 ── down-left */}
    <path d="M 59 2200 C 46 2211 31 2223 17 2233 C 7 2241 0 2245 0 2243" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 31 2223 C 27 2211 21 2199 11 2189" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <path d="M 17 2233 C 14 2245 11 2259 13 2273" stroke="var(--bone-fade)" strokeWidth="0.6" strokeLinecap="round" opacity="0.16" fill="none" />
    <circle cx="59" cy="2200" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈2392 ── */}
    <path d="M 52 2392 C 38 2382 22 2371 7 2359 C 0 2352 0 2346 0 2342" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 22 2371 C 17 2359 10 2347 0 2337" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <circle cx="52" cy="2392" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Branch cluster y≈2580 ── down-left */}
    <path d="M 58 2580 C 45 2591 30 2603 16 2613 C 6 2621 0 2625 0 2623" stroke="var(--bone-fade)" strokeWidth="1.1" strokeLinecap="round" opacity="0.26" fill="none" />
    <path d="M 30 2603 C 26 2591 20 2579 10 2569" stroke="var(--bone-fade)" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" fill="none" />
    <circle cx="58" cy="2580" r="1.4" fill="var(--bone-fade)" opacity="0.22" />

    {/* ── Floating atmospheric wisps ── */}
    <path d="M 10 195 C 6 184 2 172 3 159 C 4 150 7 142 5 133" stroke="var(--bone-fade)" strokeWidth="0.5" strokeLinecap="round" opacity="0.13" fill="none" />
    <path d="M 15 555 C 12 545 8 534 9 521 C 10 513 13 505 11 496" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.11" fill="none" />
    <path d="M 6 940 C 3 930 0 919 1 906" stroke="var(--bone-fade)" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M 12 1140 C 9 1130 6 1119 7 1106 C 8 1098 11 1090 9 1081" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.11" fill="none" />
    <path d="M 8 1510 C 5 1500 2 1489 3 1476 C 4 1468 7 1460 5 1451" stroke="var(--bone-fade)" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M 11 1700 C 8 1690 4 1679 5 1666" stroke="var(--bone-fade)" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M 7 2080 C 4 2070 1 2059 2 2046 C 3 2038 6 2030 4 2021" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.11" fill="none" />
    <path d="M 13 2450 C 10 2440 7 2429 8 2416" stroke="var(--bone-fade)" strokeWidth="0.4" strokeLinecap="round" opacity="0.1" fill="none" />
    <path d="M 9 2670 C 6 2660 3 2649 4 2636 C 5 2628 8 2620 6 2611" stroke="var(--bone-fade)" strokeWidth="0.45" strokeLinecap="round" opacity="0.11" fill="none" />
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

  const wrapperStyle: React.CSSProperties = {
    width: VB_W,
    zIndex: 0,
  };

  const svgStyle: React.CSSProperties = {
    position: "absolute",
    top: -INITIAL_OFFSET,
    left: 0,
  };

  return (
    <>
      {/* Left */}
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

      {/* Right */}
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
