import React from 'react';

const Emblem = ({ width = 36, height = 44, color = '#FFFFFF' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      title="State Emblem of India • Satyameva Jayate"
      style={{ flexShrink: 0 }}
    >
      {/* State Emblem of India - Ashoka Lion Capital Detailed SVG */}
      <g stroke={color} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Central Lion Head & Mane */}
        <path d="M50 12 C44 12, 38 16, 38 24 C38 32, 44 38, 50 40 C56 38, 62 32, 62 24 C62 16, 56 12, 50 12 Z" fill={color} opacity="0.15" />
        <path d="M42 20 C42 16, 46 14, 50 14 C54 14, 58 16, 58 20 C58 24, 54 26, 50 28 C46 26, 42 24, 42 20 Z" />
        <path d="M46 18 A2 2 0 1 0 46 18.1" fill={color} />
        <path d="M54 18 A2 2 0 1 0 54 18.1" fill={color} />
        <path d="M47 24 C48 26, 52 26, 53 24" strokeWidth="2" />
        
        {/* Muzzle & Whiskers */}
        <path d="M46 22 L54 22" />
        <path d="M50 22 L50 25" />
        <path d="M44 26 C46 29, 54 29, 56 26" />
        
        {/* Left & Right Side Lions */}
        <path d="M38 22 C32 20, 24 24, 24 32 C24 40, 32 46, 40 48" />
        <path d="M62 22 C68 20, 76 24, 76 32 C76 40, 68 46, 60 48" />
        <path d="M28 26 A1.5 1.5 0 1 0 28 26.1" fill={color} />
        <path d="M72 26 A1.5 1.5 0 1 0 72 26.1" fill={color} />

        {/* Lion Bodies & Torso */}
        <path d="M36 44 L36 68 L44 72 L50 74 L56 72 L64 68 L64 44" strokeWidth="2" />
        <path d="M44 48 L44 68" />
        <path d="M56 48 L56 68" />
        <path d="M50 40 L50 74" />
        
        {/* Paws */}
        <path d="M34 68 L36 74 L42 74 L44 68" />
        <path d="M56 68 L58 74 L64 74 L66 68" />

        {/* Abacus Base Platform */}
        <rect x="18" y="74" width="64" height="12" rx="2" strokeWidth="2" fill={color} opacity="0.1" />
        <path d="M16 74 L84 74 L84 86 L16 86 Z" strokeWidth="2.5" />
        
        {/* Dharma Chakra in Center of Abacus */}
        <circle cx="50" cy="80" r="5" strokeWidth="2" />
        <path d="M50 75 L50 85 M45 80 L55 80 M46.5 76.5 L53.5 83.5 M46.5 83.5 L53.5 76.5" strokeWidth="1" />
        
        {/* Bull on Right & Horse on Left */}
        <path d="M24 80 C26 78, 30 78, 32 80 M32 82 C30 84, 26 84, 24 82" strokeWidth="1.5" />
        <path d="M68 80 C70 78, 74 78, 76 80 M76 82 C74 84, 70 84, 68 82" strokeWidth="1.5" />
        
        {/* Bell Lotus Pedestal Base */}
        <path d="M22 86 C28 92, 38 94, 50 94 C62 94, 72 92, 78 86" strokeWidth="2" />
        <path d="M26 90 L74 90" strokeWidth="1.5" />
      </g>

      {/* Devanagari "सत्यमेव जयते" (Satyameva Jayate) Motto */}
      <text
        x="50"
        y="112"
        fill={color}
        fontSize="12"
        fontWeight="bold"
        fontFamily="'Noto Sans Devanagari', 'Arial', sans-serif"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
};

export default Emblem;
