import React, { useState, useRef, useEffect } from "react";
import { Minus, Square, X, Copy } from "lucide-react";

interface WindowFrameProps {
  id: string;
  title: string;
  icon?: string;
  isActive: boolean;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove?: (x: number, y: number) => void;
  menuBar?: React.ReactNode;
  statusBar?: React.ReactNode;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  id,
  title,
  icon,
  isActive,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  initialPosition,
  initialSize,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  menuBar,
  statusBar,
  children,
}) => {
  const [pos, setPos] = useState<{ x: number; y: number }>(initialPosition);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  // Sync initialPosition changes
  useEffect(() => {
    setPos(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  if (!isOpen || isMinimized) {
    return null;
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    onFocus();
    if (isMaximized) return; // cannot drag maximized window

    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    // Viewport constraints (keep window inside screen, below 28px top menu bar)
    const maxX = Math.max(10, window.innerWidth - 100);
    const maxY = Math.max(30, window.innerHeight - 80);

    const newX = Math.min(Math.max(-200, e.clientX - dragOffset.current.x), maxX);
    const newY = Math.min(Math.max(28, e.clientY - dragOffset.current.y), maxY);

    setPos({ x: newX, y: newY });
    onMove?.(newX, newY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  const currentStyle: React.CSSProperties = isMaximized
    ? {
        top: 28,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 28px)",
        zIndex,
      }
    : {
        top: pos.y,
        left: pos.x,
        width: typeof window !== "undefined" && window.innerWidth < 768 ? "96vw" : initialSize.width,
        height: typeof window !== "undefined" && window.innerWidth < 768 ? "85vh" : initialSize.height,
        maxWidth: "98vw",
        maxHeight: "calc(100vh - 40px)",
        zIndex,
      };

  return (
    <div
      ref={frameRef}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      style={currentStyle}
      className={`fixed flex flex-col win-frame select-none overflow-hidden transition-shadow duration-150 ${
        isActive ? "shadow-2xl" : "shadow-md opacity-95"
      }`}
    >
      {/* Title Bar */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={onToggleMaximize}
        className={`flex items-center justify-between px-2 py-1 cursor-move transition-colors duration-150 select-none ${
          isActive ? "win-titlebar-active" : "win-titlebar-inactive"
        }`}
      >
        {/* Title & Icon */}
        <div className="flex items-center space-x-1.5 overflow-hidden pr-2">
          {icon ? (
            <img src={icon} alt="" className="w-4 h-4 object-contain pointer-events-none" />
          ) : (
            <div className="w-3.5 h-3.5 bg-blue-300 rounded-sm" />
          )}
          <span className="font-bold text-xs truncate tracking-wide font-sans">{title}</span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center space-x-1 shrink-0" onPointerDown={(e) => e.stopPropagation()}>
          {/* Minimize */}
          <button
            onClick={onMinimize}
            className="w-4 h-3.5 win-btn flex items-center justify-center p-0 text-black hover:bg-neutral-200"
            title="Minimize"
          >
            <Minus className="w-2.5 h-2.5 stroke-[3]" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={onToggleMaximize}
            className="w-4 h-3.5 win-btn flex items-center justify-center p-0 text-black hover:bg-neutral-200"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? (
              <Copy className="w-2.5 h-2.5 stroke-[2.5]" />
            ) : (
              <Square className="w-2.5 h-2.5 stroke-[2.5]" />
            )}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-4 h-3.5 win-btn flex items-center justify-center p-0 text-black hover:bg-red-500 hover:text-white"
            title="Close"
          >
            <X className="w-2.5 h-2.5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Menu Bar (if present) */}
      {menuBar && (
        <div className="bg-[#ece9d8] border-b border-[#706f65] px-2 py-0.5 text-xs flex items-center space-x-3 text-neutral-800">
          {menuBar}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white win-scrollbar relative">{children}</div>

      {/* Status Bar (if present) */}
      {statusBar && (
        <div className="win-sunken-bar px-2 py-0.5 text-[11px] text-neutral-700 flex items-center justify-between select-none">
          {statusBar}
        </div>
      )}
    </div>
  );
};
