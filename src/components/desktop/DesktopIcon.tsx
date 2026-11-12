import React, { useState } from "react";

interface DesktopIconProps {
  id: string;
  label: string;
  iconSrc: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onPlayClick?: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  label,
  iconSrc,
  isSelected,
  onSelect,
  onOpen,
  onPlayClick,
}) => {
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayClick?.();
    const now = Date.now();
    if (now - lastClickTime < 400) {
      // Double click
      onOpen(id);
    } else {
      // Single click select
      onSelect(id);
    }
    setLastClickTime(now);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen(id);
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`group flex flex-col items-center justify-center p-2 rounded w-24 cursor-pointer select-none transition-all duration-150 ${
        isSelected
          ? "bg-blue-600/40 border border-dotted border-white/80 shadow-sm"
          : "hover:bg-white/15"
      }`}
    >
      {/* Icon Image */}
      <div className="w-12 h-12 flex items-center justify-center relative mb-1 transition-transform group-hover:scale-105">
        <img
          src={iconSrc}
          alt={label}
          className="w-full h-full object-contain filter drop-shadow-md pointer-events-none"
        />
      </div>

      {/* Label with retro text shadow */}
      <span
        className={`text-xs text-center font-medium px-1.5 py-0.5 rounded leading-tight tracking-wide ${
          isSelected
            ? "bg-blue-700 text-white shadow"
            : "text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.9)]"
        }`}
      >
        {label}
      </span>
    </div>
  );
};
