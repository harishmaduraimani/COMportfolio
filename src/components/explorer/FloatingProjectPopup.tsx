import React, { useState, useRef } from "react";
import { Minus, X, Square } from "lucide-react";
import { ProjectData } from "../../data/projects";

interface FloatingProjectPopupProps {
  project: ProjectData;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  onOpenProject: (project: ProjectData) => void;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onPlayClick?: () => void;
}

export const FloatingProjectPopup: React.FC<FloatingProjectPopupProps> = ({
  project,
  position,
  onPositionChange,
  onOpenProject,
  onClose,
  containerRef,
  onPlayClick,
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ clientX: number; clientY: number; posX: number; posY: number }>({
    clientX: 0,
    clientY: 0,
    posX: 0,
    posY: 0,
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onPlayClick?.();
    setIsDragging(true);

    dragStart.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStart.current.clientX;
    const dy = e.clientY - dragStart.current.clientY;

    let newX = dragStart.current.posX + dx;
    let newY = dragStart.current.posY + dy;

    // Boundary constraints relative to My Works container
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const popupWidth = isMinimized ? 220 : 380;
      const popupHeight = isMinimized ? 30 : 250;

      const maxX = Math.max(10, container.width - popupWidth - 10);
      const maxY = Math.max(10, container.height - popupHeight - 10);

      newX = Math.min(Math.max(5, newX), maxX);
      newY = Math.min(Math.max(5, newY), maxY);
    }

    onPositionChange({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 50,
        touchAction: "none",
      }}
      className={`win-frame shadow-2xl select-none transition-shadow ${
        isMinimized ? "w-56" : "w-[340px] sm:w-[420px]"
      } ${isDragging ? "shadow-2xl opacity-95" : ""}`}
    >
      {/* Draggable Title Bar matching Figma Image 1 */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="win-titlebar-active px-2.5 py-1 flex items-center justify-between cursor-move"
      >
        <span className="font-bold text-xs truncate font-sans">
          Project Information {isMinimized ? `(${project.folderName})` : ""}
        </span>

        <div className="flex items-center space-x-1 shrink-0" onPointerDown={(e) => e.stopPropagation()}>
          {/* Minimize / Restore button */}
          <button
            onClick={() => setIsMinimized((prev) => !prev)}
            className="w-4 h-3.5 win-btn flex items-center justify-center p-0 text-black hover:bg-neutral-200 cursor-pointer"
            title={isMinimized ? "Restore" : "Minimize"}
          >
            {isMinimized ? (
              <Square className="w-2.5 h-2.5 stroke-[2.5]" />
            ) : (
              <Minus className="w-2.5 h-2.5 stroke-[3]" />
            )}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-4 h-3.5 win-btn flex items-center justify-center p-0 text-black hover:bg-red-500 hover:text-white cursor-pointer"
            title="Close"
          >
            <X className="w-2.5 h-2.5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Dialog Body (Hidden when minimized) */}
      {!isMinimized && (
        <div className="bg-[#ece9d8] p-4 space-y-3 font-sans text-xs">
          <div className="flex items-start space-x-3.5">
            {/* Blue Question Mark Icon matching Figma reference */}
            <div className="w-10 h-10 rounded-full bg-[#1e40af] border border-blue-400 flex items-center justify-center text-white shrink-0 shadow-md">
              <span className="text-xl font-bold font-serif italic select-none">?</span>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="text-neutral-900 leading-snug">
                <span className="font-semibold text-neutral-700">Project name: </span>
                <span className="font-bold">"{project.folderName}"</span>
                <br />
                <span className="font-semibold text-neutral-700">Project title: </span>
                <span className="font-bold text-blue-900">
                  "{project.title} – {project.subtitle}"
                </span>
              </div>

              <p className="text-neutral-700 text-[11px] leading-relaxed pt-1 font-normal">
                {project.shortDescription}
              </p>

              <div className="font-semibold text-neutral-800 pt-1 text-[11px]">
                Would you like to open this project?
              </div>
            </div>
          </div>

          {/* Action Buttons matching Figma reference */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#706f65]/40">
            <button
              onClick={() => onOpenProject(project)}
              className="win-btn px-4 py-1.5 font-bold text-xs uppercase shadow tracking-wider cursor-pointer hover:bg-neutral-100 border-2"
            >
              YES, OPEN PROJECT
            </button>
            <button
              onClick={onClose}
              className="win-btn px-4 py-1.5 font-semibold text-xs uppercase shadow tracking-wider cursor-pointer hover:bg-neutral-100"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
