import React from "react";

interface BrandLogo {
  id: string;
  name: string;
  svg: React.ReactNode;
}

const BRAND_LOGOS: BrandLogo[] = [
  {
    id: "royal-enfield",
    name: "Royal Enfield",
    svg: (
      <svg viewBox="0 0 140 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Royal Enfield">
        <path d="M70 3l2.5 4h-5L70 3zm-12 8c4 0 7.5-1.8 9.5-4 2 2.2 5.5 4 9.5 4 1.8 0 3.5-.5 4.5-1.2-1.2 3.5-4.2 6.5-8 7.8-1.8.5-4 .5-6 .5s-4.2 0-6-.5c-3.8-1.3-6.8-4.3-8-7.8.8.7 2.5 1.2 4.5 1.2z" />
        <text
          x="70"
          y="31"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          letterSpacing="2.5"
          fontFamily="sans-serif"
        >
          ROYAL ENFIELD
        </text>
      </svg>
    ),
  },
  {
    id: "maruti-suzuki",
    name: "Maruti Suzuki",
    svg: (
      <svg viewBox="0 0 125 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Maruti Suzuki">
        <g transform="translate(3, 4)">
          <path d="M3 4l10-4h7.5L12 5.5h8.5l-3.8 5-10 4H7.5l8.5-5.5H7.5L11.2 4z" />
          <path d="M4.2 13.5l10-4h7.5L13.2 15h8.5l-3.8 5-10 4H8.7l8.5-5.5H8.7l3.7-5z" />
        </g>
        <text
          x="64"
          y="24"
          fontSize="13"
          fontWeight="900"
          letterSpacing="2"
          fontFamily="sans-serif"
        >
          SUZUKI
        </text>
      </svg>
    ),
  },
  {
    id: "hyundai",
    name: "Hyundai",
    svg: (
      <svg viewBox="0 0 130 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Hyundai">
        <g transform="translate(3, 4)">
          <ellipse
            cx="15"
            cy="14"
            rx="15"
            ry="10.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          />
          <path
            d="M9 8.5c.5 3.5 1.5 8 2 11m7-11c.5 3.5 1.5 8 2 11m-9-5.5c2.5-1.5 4.5-1.5 7.5-1.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <text
          x="70"
          y="24"
          fontSize="12.5"
          fontWeight="900"
          letterSpacing="2"
          fontFamily="sans-serif"
        >
          HYUNDAI
        </text>
      </svg>
    ),
  },
  {
    id: "honda",
    name: "Honda",
    svg: (
      <svg viewBox="0 0 115 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Honda">
        <g transform="translate(5, 5)">
          <path
            d="M1 2C1 1 2 0 3 0h20c1 0 2 1 2 2l-1.8 22c0 1-1 2-2 2H3.8c-1 0-2-1-2-2L1 2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M6.5 5.5v15H10v-6.5h4.5v6.5H18v-15h-3.5v5H10v-5H6.5z" />
        </g>
        <text
          x="66"
          y="24"
          fontSize="13"
          fontWeight="900"
          letterSpacing="2"
          fontFamily="sans-serif"
        >
          HONDA
        </text>
      </svg>
    ),
  },
  {
    id: "tata",
    name: "Tata Motors",
    svg: (
      <svg viewBox="0 0 100 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Tata Motors">
        <g transform="translate(3, 5)">
          <ellipse
            cx="13"
            cy="13"
            rx="13"
            ry="9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
          />
          <path
            d="M5.5 8.5h15m-7.5 0v9m-3.5-9l3.5 3.5 3.5-3.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <text
          x="58"
          y="24"
          fontSize="13.5"
          fontWeight="900"
          letterSpacing="2.5"
          fontFamily="sans-serif"
        >
          TATA
        </text>
      </svg>
    ),
  },
  {
    id: "toyota",
    name: "Toyota",
    svg: (
      <svg viewBox="0 0 125 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Toyota">
        <g transform="translate(3, 5)">
          <ellipse
            cx="15"
            cy="13"
            rx="14.5"
            ry="9.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <ellipse
            cx="15"
            cy="11.5"
            rx="6.5"
            ry="4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <ellipse
            cx="15"
            cy="13"
            rx="3.5"
            ry="7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </g>
        <text
          x="68"
          y="24"
          fontSize="13"
          fontWeight="900"
          letterSpacing="2"
          fontFamily="sans-serif"
        >
          TOYOTA
        </text>
      </svg>
    ),
  },
  {
    id: "mahindra",
    name: "Mahindra",
    svg: (
      <svg viewBox="0 0 140 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Mahindra">
        <g transform="translate(3, 7)">
          <path d="M2 17l8-14 3.5 5.5 3.5-5.5 8 14h-5l-5-8-1.5 2.5-1.5-2.5-5 8H2z" />
        </g>
        <text
          x="72"
          y="24"
          fontSize="11.5"
          fontWeight="900"
          letterSpacing="2"
          fontFamily="sans-serif"
        >
          MAHINDRA
        </text>
      </svg>
    ),
  },
  {
    id: "tvs",
    name: "TVS Motor",
    svg: (
      <svg viewBox="0 0 95 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="TVS Motor">
        <g transform="translate(3, 6)">
          <path d="M2 19l11-13 6.5 5.5-8.5 3.5 5.5 5.5-14.5-1.5z" />
          <path d="M8 5.5l11 5.5-6.5 1-4.5-6.5z" />
        </g>
        <text
          x="54"
          y="24"
          fontSize="14"
          fontWeight="900"
          letterSpacing="2.5"
          fontFamily="sans-serif"
        >
          TVS
        </text>
      </svg>
    ),
  },
  {
    id: "bajaj",
    name: "Bajaj Auto",
    svg: (
      <svg viewBox="0 0 105 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Bajaj Auto">
        <g transform="translate(4, 6)">
          <path d="M2 12l6.5-9h9.5l-6.5 9 6.5 9H8.5l-6.5-9z" />
          <path d="M11 12l6.5-9h4l-6.5 9 6.5 9h-4l-6.5-9z" />
        </g>
        <text
          x="60"
          y="24"
          fontSize="13.5"
          fontWeight="900"
          letterSpacing="2"
          fontFamily="sans-serif"
        >
          BAJAJ
        </text>
      </svg>
    ),
  },
  {
    id: "yamaha",
    name: "Yamaha",
    svg: (
      <svg viewBox="0 0 130 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Yamaha">
        <g transform="translate(3, 5)">
          <circle
            cx="13"
            cy="13"
            r="12.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M13 1.5v23M2.5 7.5l21 11M2.5 18.5l21-11"
            stroke="currentColor"
            strokeWidth="2"
          />
        </g>
        <text
          x="70"
          y="24"
          fontSize="13"
          fontWeight="900"
          letterSpacing="2"
          fontFamily="sans-serif"
        >
          YAMAHA
        </text>
      </svg>
    ),
  },
  {
    id: "ktm",
    name: "KTM",
    svg: (
      <svg viewBox="0 0 85 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="KTM">
        <text
          x="42"
          y="27"
          textAnchor="middle"
          fontSize="23"
          fontWeight="900"
          fontStyle="italic"
          letterSpacing="2"
          fontFamily="sans-serif"
        >
          KTM
        </text>
      </svg>
    ),
  },
  {
    id: "hero",
    name: "Hero MotoCorp",
    svg: (
      <svg viewBox="0 0 100 36" className="h-7 sm:h-8 w-auto fill-current" aria-label="Hero MotoCorp">
        <g transform="translate(5, 5)">
          <path d="M1 1h6.5v10h5.5V1h6.5v24h-6.5v-8.5H7.5V25H1V1z" />
        </g>
        <text
          x="58"
          y="24"
          fontSize="14"
          fontWeight="900"
          letterSpacing="2.5"
          fontFamily="sans-serif"
        >
          HERO
        </text>
      </svg>
    ),
  },
];

interface BrandMarqueeProps {
  onSelectBrand?: (brandName: string) => void;
}

export default function BrandMarquee({ onSelectBrand }: BrandMarqueeProps) {
  // Seamless infinite marquee loop: duplicate array once
  const loopLogos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <div
      aria-label="Car and bike brands in India"
      className="w-full bg-primary bg-[#F97316] py-3.5 sm:py-4 shadow-sm overflow-hidden select-none relative"
    >
      {/* Left smooth fade mask matching the orange rectangle */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F97316] to-transparent z-10" />

      {/* Right smooth fade mask matching the orange rectangle */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F97316] to-transparent z-10" />

      {/* Continuous sliding track: ONLY the logos moving */}
      <div className="flex w-max animate-marquee items-center gap-12 sm:gap-16 hover:[animation-play-state:paused]">
        {loopLogos.map((brand, index) => (
          <div
            key={`${brand.id}-${index}`}
            onClick={() => onSelectBrand?.(brand.name)}
            className="flex items-center justify-center shrink-0 text-white/90 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
            title={brand.name}
          >
            {brand.svg}
          </div>
        ))}
      </div>
    </div>
  );
}
