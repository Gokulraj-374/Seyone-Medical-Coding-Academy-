
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  showSubtext?: boolean;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  className = "h-12",
  showText = true,
  showSubtext = true,
  light = false
}) => {
  const greenColor = "#76BC21";
  const blackColor = light ? "#FFFFFF" : "#1A1A1B";
  const subtextColor = light ? "rgba(255,255,255,0.8)" : "#1A1A1B";

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative h-full w-auto shrink-0">
        <img
          src="/full-logo-transparent.png"
          alt="Seyone Medical Coding Academy"
          className="h-full w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;
