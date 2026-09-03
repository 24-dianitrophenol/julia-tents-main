import React from 'react';

interface JuliaTentsLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto'; // 'dark' = for dark backgrounds (white text/beams), 'light' = for light backgrounds (stone text/beams)
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LogoMark({ className = 'w-8 h-8', isDarkBg = false }: { className?: string; isDarkBg?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Julia Tents logo mark"
    >
      {/* Left Main Tent Peak / Canopy Chevron */}
      <path
        d="M62 18 C58 12, 50 12, 46 18 L12 68 C8 74, 13 82, 21 82 L38 82 C42 82, 46 79, 49 75 L62 54 C66 48, 74 48, 78 54 L91 75 C94 79, 98 82, 102 82 L119 82 C127 82, 132 74, 128 68 Z"
        fill="url(#amberGradient)"
      />

      {/* Right Diagonal High-Span Rafter Beam */}
      <path
        d="M104 6 C100 1, 93 1, 89 6 L78 21 C75 25, 75 31, 79 35 L129 95 C132 99, 137 101, 142 101 L153 101 C159 101, 163 94, 159 88 Z"
        fill={isDarkBg ? '#FFFFFF' : '#1C1917'}
      />

      {/* Lower Right Anchor Footing Notch */}
      <path
        d="M136 94 L158 94 C162 94, 165 98, 163 102 L160 108 C158 111, 154 113, 150 113 L134 113 C129 113, 126 108, 128 103 Z"
        fill="#F59E0B"
      />

      <defs>
        <linearGradient id="amberGradient" x1="12" y1="12" x2="128" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function JuliaTentsLogo({
  className = '',
  theme = 'auto',
  showText = true,
  size = 'md',
}: JuliaTentsLogoProps) {
  const isDarkBg = theme === 'dark';

  const sizeClasses = {
    sm: { mark: 'w-7 h-7', text: 'text-lg', sub: 'text-[9px]' },
    md: { mark: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { mark: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
    xl: { mark: 'w-16 h-16', text: 'text-3xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <LogoMark className={sizeClasses.mark} isDarkBg={isDarkBg} />
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-display font-black tracking-tight ${sizeClasses.text} ${
              isDarkBg ? 'text-white' : 'text-stone-900'
            }`}
          >
            Julia <span className="text-amber-500 font-extrabold">Tents</span>
          </span>
          <span
            className={`font-medium tracking-widest text-[9px] mt-0.5 ${
              isDarkBg ? 'text-amber-300/90' : 'text-stone-500'
            }`}
          >
            Company
          </span>
        </div>
      )}
    </div>
  );
}
