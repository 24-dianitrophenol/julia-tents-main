import React, { useState } from 'react';
import { getAssetUrl } from '@/lib/config';

interface JuliaTentsLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LogoMark({ className = 'w-9 h-9' }: { className?: string; isDarkBg?: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-xl bg-white p-1 shadow-xs border border-stone-200/80 flex items-center justify-center flex-shrink-0 ${className}`}>
      {!imgError ? (
        <img
          src={getAssetUrl('logo.jpg')}
          alt="Julia Tents Logo"
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-0.5">
          <path d="M62 18 C58 12, 50 12, 46 18 L12 68 C8 74, 13 82, 21 82 L38 82 C42 82, 46 79, 49 75 L62 54 C66 48, 74 48, 78 54 L91 75 C94 79, 98 82, 102 82 L119 82 C127 82, 132 74, 128 68 Z" fill="#D97706" />
          <path d="M104 6 C100 1, 93 1, 89 6 L78 21 C75 25, 75 31, 79 35 L129 95 C132 99, 137 101, 142 101 L153 101 C159 101, 163 94, 159 88 Z" fill="#1C1917" />
        </svg>
      )}
    </div>
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
    sm: { mark: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
    md: { mark: 'w-10 h-10', text: 'text-lg md:text-xl', sub: 'text-[10px]' },
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
              isDarkBg ? 'text-white drop-shadow-sm' : 'text-stone-900'
            }`}
          >
            Julia <span className="text-amber-500 font-extrabold">Tents</span>
          </span>
          <span
            className={`font-semibold tracking-wider text-[9px] mt-0.5 uppercase ${
              isDarkBg ? 'text-amber-300' : 'text-stone-500'
            }`}
          >
            Quality Shelters Uganda
          </span>
        </div>
      )}
    </div>
  );
}
