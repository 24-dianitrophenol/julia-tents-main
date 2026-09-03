import React from 'react';

interface JuliaTentsLogoProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LogoMark({ className = 'w-9 h-9' }: { className?: string; isDarkBg?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-white p-1 shadow-xs border border-stone-200/60 flex items-center justify-center ${className}`}>
      <img
        src="/logo.jpg"
        alt="Julia Tents Logo"
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback if image fails to load
          const target = e.currentTarget;
          target.style.display = 'none';
        }}
      />
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
    lg: { mark: 'w-13 h-13', text: 'text-2xl', sub: 'text-xs' },
    xl: { mark: 'w-16 h-16', text: 'text-3xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
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
