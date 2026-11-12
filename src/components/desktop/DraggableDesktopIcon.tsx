import React, { useState, useRef } from "react";
import { AppLogo } from "./AppLogos";

interface DraggableDesktopIconProps {
  id: string;
  label: string;
  iconType: "image" | "svg";
  iconSrc?: string;
  svgType?: string;
  tooltip: string;
  position: { x: number; y: number };
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
  onPlayClick?: () => void;
  onPlayDrag?: () => void;
  isRenaming?: boolean;
  onRenameSubmit?: (newName: string) => void;
}

export const DraggableDesktopIcon: React.FC<DraggableDesktopIconProps> = ({
  id,
  label,
  iconType,
  iconSrc,
  svgType,
  tooltip,
  position,
  isSelected,
  onSelect,
  onOpen,
  onPositionChange,
  onPlayClick,
  onPlayDrag,
  isRenaming = false,
  onRenameSubmit,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [editLabel, setEditLabel] = useState<string>(label);
  const dragStart = useRef<{ clientX: number; clientY: number; posX: number; posY: number }>({
    clientX: 0,
    clientY: 0,
    posX: 0,
    posY: 0,
  });
  const hasMoved = useRef<boolean>(false);
  const lastTapTime = useRef<number>(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onSelect(id);
    onPlayClick?.();

    hasMoved.current = false;
    dragStart.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const dx = e.clientX - dragStart.current.clientX;
    const dy = e.clientY - dragStart.current.clientY;

    if (!isDragging && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
      setIsDragging(true);
      hasMoved.current = true;
      onPlayDrag?.();
    }

    if (isDragging) {
      const newX = dragStart.current.posX + dx;
      const newY = dragStart.current.posY + dy;
      onPositionChange(id, newX, newY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    if (isDragging) {
      setIsDragging(false);
      return;
    }

    // Double tap / double click detection
    const now = Date.now();
    if (now - lastTapTime.current < 450) {
      onOpen(id);
    }
    lastTapTime.current = now;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen(id);
      }}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 5 : isSelected ? 3 : 2,
        touchAction: "none",
      }}
      title={tooltip}
      className={`group flex flex-col items-center justify-center p-1.5 rounded w-20 sm:w-22 cursor-pointer select-none transition-shadow ${
        isSelected
          ? "bg-blue-600/40 border border-dotted border-white/80 shadow-sm"
          : "hover:bg-white/15"
      } ${isDragging ? "opacity-80 scale-105 cursor-grabbing" : ""}`}
    >
      {/* Icon Image or SVG */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center relative mb-1 pointer-events-none transition-transform group-hover:scale-105">
        {iconType === "image" && iconSrc ? (
          <img
            src={iconSrc}
            alt={label}
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        ) : (
          <AppLogo type={svgType || "folder"} className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-md" />
        )}
      </div>

      {/* Label or Rename Input */}
      {isRenaming ? (
        <input
          type="text"
          value={editLabel}
          onChange={(e) => setEditLabel(e.target.value)}
          onBlur={() => onRenameSubmit?.(editLabel)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onRenameSubmit?.(editLabel);
          }}
          autoFocus
          className="bg-white text-black text-[11px] px-1 py-0.5 rounded text-center w-full border border-blue-500 outline-none"
        />
      ) : (
        <span
          className={`text-[11px] text-center font-sans font-medium px-1.5 py-0.5 rounded leading-tight tracking-wide pointer-events-none truncate max-w-full ${
            isSelected
              ? "bg-blue-700 text-white shadow"
              : "text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.9)]"
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
};
