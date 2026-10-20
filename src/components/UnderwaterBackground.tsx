import React from 'react';

/**
 * Atmospheric deep-plum underwater reef scene featuring clownfish, sea anemones,
 * kelp silhouettes, and rising bubbles. Respects prefers-reduced-motion via CSS.
 */
export const UnderwaterBackground: React.FC = () => {
  return (
    <div className="aquatic-bg" aria-hidden="true">
      {/* Light rays from surface */}
      <div className="aquatic-bg__rays" />

      {/* SVG Clownfish & Coral Reef Artwork */}
      <svg
        className="aquatic-bg__scene"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="deepSea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#280b2c" />
            <stop offset="45%" stop-color="#1b0720" />
            <stop offset="100%" stop-color="#0f0314" />
          </linearGradient>

          <radialGradient id="magentaGlow" cx="80%" cy="25%" r="45%">
            <stop offset="0%" stop-color="rgba(214, 70, 140, 0.22)" />
            <stop offset="100%" stop-color="rgba(27, 7, 32, 0)" />
          </radialGradient>

          <radialGradient id="cyanGlow" cx="18%" cy="75%" r="40%">
            <stop offset="0%" stop-color="rgba(0, 229, 255, 0.14)" />
            <stop offset="100%" stop-color="rgba(15, 3, 20, 0)" />
          </radialGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#deepSea)" />
        <rect width="1440" height="900" fill="url(#magentaGlow)" />
        <rect width="1440" height="900" fill="url(#cyanGlow)" />

        {/* Distant Coral & Kelp Silhouettes */}
        <g fill="#19051e" opacity="0.85">
          <path d="M0 900 L0 740 Q80 690 130 760 Q180 640 260 720 L260 900 Z" />
          <path d="M1140 900 L1140 700 Q1220 630 1290 710 Q1360 620 1440 680 L1440 900 Z" />
        </g>

        {/* Sea Anemone & Kelp Fronds Left */}
        <g stroke="#4b1742" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.65">
          <path d="M55 900 C40 810, 90 730, 62 630" />
          <path d="M85 900 C110 800, 65 720, 98 610" />
          <path d="M125 900 C140 820, 110 760, 138 670" />
        </g>

        {/* Sea Anemone Tentacles Right */}
        <g stroke="#631d4e" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.6">
          <path d="M1320 900 C1300 810, 1350 740, 1330 650" />
          <path d="M1355 900 C1380 820, 1335 720, 1370 630" />
          <path d="M1390 900 C1410 830, 1385 750, 1412 675" />
        </g>

        {/* Clownfish #1 (Top Left Swimming Right) */}
        <g className="clownfish clownfish--one" transform="translate(110, 175)">
          <ellipse cx="46" cy="24" rx="34" ry="18" fill="#ff6a28" stroke="#2a0818" strokeWidth="2" />
          {/* White stripes */}
          <path d="M32 7 Q37 24 32 41" stroke="#fff5ee" strokeWidth="7" fill="none" />
          <path d="M52 8 Q57 24 52 40" stroke="#fff5ee" strokeWidth="6" fill="none" />
          <path d="M32 7 Q37 24 32 41" stroke="#220615" strokeWidth="1.5" fill="none" />
          {/* Fins & Tail */}
          <polygon points="8,24 -10,10 -6,38" fill="#ff6a28" stroke="#2a0818" strokeWidth="2" />
          <path d="M36 6 Q48 -6 60 8" fill="#ff6a28" stroke="#2a0818" strokeWidth="2" />
          {/* Eye */}
          <circle cx="68" cy="20" r="3.2" fill="#120416" />
          <circle cx="69" cy="19" r="1.1" fill="#ffffff" />
        </g>

        {/* Clownfish #2 (Right Side Near Reef Swimming Left) */}
        <g className="clownfish clownfish--two" transform="translate(1285, 520)">
          <ellipse cx="42" cy="22" rx="30" ry="16" fill="#ff7332" stroke="#2a0818" strokeWidth="2" />
          <path d="M30 7 Q26 22 30 37" stroke="#fff5ee" strokeWidth="6" fill="none" />
          <path d="M48 8 Q44 22 48 36" stroke="#fff5ee" strokeWidth="5.5" fill="none" />
          <polygon points="72,22 88,10 85,34" fill="#ff7332" stroke="#2a0818" strokeWidth="2" />
          <circle cx="22" cy="19" r="3" fill="#120416" />
          <circle cx="21" cy="18" r="1" fill="#ffffff" />
        </g>

        {/* Clownfish #3 (Bottom Left) */}
        <g className="clownfish clownfish--three" transform="translate(260, 770) scale(0.8)">
          <ellipse cx="46" cy="24" rx="34" ry="18" fill="#ff6a28" stroke="#2a0818" strokeWidth="2" />
          <path d="M32 7 Q37 24 32 41" stroke="#fff5ee" strokeWidth="7" fill="none" />
          <path d="M52 8 Q57 24 52 40" stroke="#fff5ee" strokeWidth="6" fill="none" />
          <polygon points="8,24 -10,10 -6,38" fill="#ff6a28" stroke="#2a0818" strokeWidth="2" />
          <circle cx="68" cy="20" r="3.2" fill="#120416" />
        </g>
      </svg>

      {/* Rising Retro Bubbles */}
      <div className="aquatic-bg__bubbles">
        <span className="bubble bubble--1" />
        <span className="bubble bubble--2" />
        <span className="bubble bubble--3" />
        <span className="bubble bubble--4" />
        <span className="bubble bubble--5" />
        <span className="bubble bubble--6" />
        <span className="bubble bubble--7" />
        <span className="bubble bubble--8" />
      </div>
    </div>
  );
};
