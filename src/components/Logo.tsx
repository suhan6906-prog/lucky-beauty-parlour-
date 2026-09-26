import React from 'react';
import logoImg from '../assets/images/lucky_logo_1790414775802.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  light = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official circular logo badge matching user design */}
      <div
        className={`${sizeMap[size]} rounded-full overflow-hidden shrink-0 border border-[#D5C7B8] bg-[#F9F7F5] shadow-xs relative flex items-center justify-center`}
      >
        <img
          src={logoImg}
          alt="Lucky Beauty Parlour by Riz - LBP Logo"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-serif tracking-wide leading-none ${
                light ? 'text-[#FAF7F2]' : 'text-[#2D2521]'
              } ${size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl sm:text-2xl'}`}
            >
              Lucky
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`text-[8.5px] uppercase tracking-[0.22em] font-sans font-medium ${
                light ? 'text-[#A69790]' : 'text-[#86756C]'
              }`}
            >
              Beauty Parlour
            </span>
            <span
              className={`text-[7.5px] uppercase tracking-[0.2em] px-1 py-[1px] rounded font-sans font-semibold ${
                light ? 'bg-[#3A312B] text-[#D8C7BF]' : 'bg-[#EFE8DF] text-[#7A6B63]'
              }`}
            >
              BY RIZ
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
