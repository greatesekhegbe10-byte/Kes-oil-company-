import React from 'react';

interface BrandProps {
  compact?: boolean;
  light?: boolean;
  onClick?: () => void;
}

export const Brand: React.FC<BrandProps> = ({ compact = false, light = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2.5 cursor-pointer select-none group text-left ${light ? 'text-white' : 'text-[#0F172A]'}`}
    >
      {/* Blue glowing energy flame / droplet icon matching screenshot */}
      <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9">
          <circle cx="18" cy="18" r="17" fill="#0B2046" stroke="#2563EB" strokeWidth="1.5" />
          <path
            d="M18 7C18 7 11 15 11 20.5C11 24.5 14.1 27.5 18 27.5C21.9 27.5 25 24.5 25 20.5C25 15 18 7 18 7Z"
            fill="url(#kesFlameGrad)"
          />
          <path
            d="M18 13C18 13 13.5 18.5 13.5 22C13.5 24.5 15.5 26.5 18 26.5C20.5 26.5 22.5 24.5 22.5 22C22.5 18.5 18 13 18 13Z"
            fill="#0B132B"
          />
          <circle cx="18" cy="22" r="2.5" fill="#60A5FA" />
          <defs>
            <linearGradient id="kesFlameGrad" x1="11" y1="7" x2="25" y2="27.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {!compact && (
        <div className="flex flex-col leading-tight">
          <span className={`text-[21px] font-black tracking-tight ${light ? 'text-white' : 'text-[#0F172A]'}`}>
            KES
          </span>
          <span className={`text-[8px] font-bold tracking-[0.2em] uppercase -mt-0.5 ${light ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            ENERGY SERVICES
          </span>
        </div>
      )}
    </div>
  );
};
