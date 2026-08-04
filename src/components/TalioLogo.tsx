import React from 'react';
import { Link } from 'react-router-dom';

interface TalioLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const TalioLogo: React.FC<TalioLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <Link to="/" className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Geometric Vector Logo Mark */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-[#0C0A09] dark:bg-[#1C1917] border border-[#0C0A09]/20 dark:border-white/15 flex items-center justify-center p-1.5 shadow-md group-hover:border-[#D4F268] group-hover:shadow-[#D4F268]/20 transition-all duration-300 relative overflow-hidden shrink-0`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white dark:text-stone-100 group-hover:scale-110 transition-transform duration-300"
        >
          {/* Background subtle grid shape */}
          <rect x="4" y="4" width="32" height="32" rx="8" className="fill-[#0C0A09] dark:fill-[#0C0A09]" />
          
          {/* Main T shape with vector nodes */}
          <path
            d="M10 12C10 10.8954 10.8954 10 12 10H28C29.1046 10 30 10.8954 30 12V14C30 15.1046 29.1046 16 28 16H22V28C22 29.1046 21.1046 30 20 30C18.8954 30 18 29.1046 18 28V16H12C10.8954 16 10 15.1046 10 14V12Z"
            fill="currentColor"
          />

          {/* Glowing Lime Node Dot */}
          <circle cx="28" cy="13" r="3" fill="#D4F268" className="animate-pulse" />
          <circle cx="12" cy="27" r="2.5" fill="#D4F268" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizes[size]} font-serif italic text-stone-900 dark:text-[#E7E5E4] tracking-tight group-hover:text-[#D4F268] transition-colors leading-none`}
          >
            Talio{' '}
            <span className="not-italic font-mono text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Hub
            </span>
          </span>
        </div>
      )}
    </Link>
  );
};
