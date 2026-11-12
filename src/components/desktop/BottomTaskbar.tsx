import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { WindowInstance } from "../../hooks/useWindowManager";
import { useSystemClock } from "../../hooks/useSystemClock";

interface BottomTaskbarProps {
  windows: Record<string, WindowInstance>;
  activeWindowId: string;
  onSelectWindow: (id: string) => void;
  onOpenWindow: (type: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  sessionTimer: string;
  onRestartBoot: () => void;
  onPlayClick?: () => void;
}

export const BottomTaskbar: React.FC<BottomTaskbarProps> = ({
  windows,
  activeWindowId,
  onSelectWindow,
  onOpenWindow,
  isMuted,
  onToggleMute,
  sessionTimer,
  onRestartBoot,
  onPlayClick,
}) => {
  const { formattedTimeOnly } = useSystemClock();
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);

  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  const handleStartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayClick?.();
    setStartMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Start Menu Popup */}
      {startMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setStartMenuOpen(false)}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed left-0 bottom-8 z-50 w-64 win-frame bg-[#ece9d8] shadow-2xl flex flex-col font-sans text-xs select-none"
          >
            {/* Start Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-3 text-white flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                HM
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm">Harish Maduraimani</div>
                <div className="text-[10px] text-blue-100">Engineer / Product Builder</div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-1 space-y-0.5">
              {[
                { id: "explorer", label: "My Works (Projects)", icon: "📁" },
                { id: "notepad", label: "About Me (Notepad)", icon: "📝" },
                { id: "contact", label: "Contact Terminal", icon: "✉️" },
                { id: "paint", label: "MS Paint Creative Studio", icon: "🎨" },
                { id: "control-panel", label: "Control Panel", icon: "⚙️" },
                { id: "about-computer", label: "About This Computer", icon: "" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPlayClick?.();
                    onOpenWindow(item.id);
                    setStartMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded flex items-center space-x-2.5 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-medium text-xs">{item.label}</span>
                </button>
              ))}

              <div className="h-px bg-neutral-300 my-1 mx-2" />

              <button
                onClick={() => {
                  onPlayClick?.();
                  onRestartBoot();
                  setStartMenuOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 rounded flex items-center space-x-2.5 hover:bg-red-600 hover:text-white transition-colors cursor-pointer text-neutral-800"
              >
                <span>🔄</span>
                <span className="font-semibold text-xs">Restart Computer Bootloader</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Bottom Taskbar */}
      <div className="relative z-30 w-full h-8 bg-[#245edb] border-t border-[#4682f4] shadow-md flex items-center justify-between px-1 select-none">
        {/* Left: Classic Green Start Button */}
        <div className="flex items-center space-x-1 h-full py-0.5">
          <button
            onClick={handleStartClick}
            className={`h-full px-3 rounded-r-lg font-bold text-white text-xs italic tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-md transition-all ${
              startMenuOpen
                ? "bg-gradient-to-r from-[#2e7d32] to-[#388e3c] brightness-90 shadow-inner"
                : "bg-gradient-to-r from-[#388e3c] via-[#43a047] to-[#2e7d32] hover:brightness-110"
            }`}
          >
            <span className="text-sm">⊞</span>
            <span className="not-italic font-extrabold tracking-wide uppercase font-sans">start</span>
          </button>

          {/* Running Applications Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto h-full pl-1 max-w-[calc(100vw-280px)]">
            {openWindows.map((win) => {
              const isActive = activeWindowId === win.id && !win.isMinimized;
              return (
                <button
                  key={win.id}
                  onClick={() => {
                    onPlayClick?.();
                    onSelectWindow(win.id);
                  }}
                  className={`h-full px-2.5 max-w-[150px] sm:max-w-[190px] rounded flex items-center space-x-1.5 cursor-pointer text-xs truncate transition-all ${
                    isActive
                      ? "bg-[#1941a5] text-white border-t border-l border-[#0e2a6d] shadow-inner font-bold"
                      : "bg-[#3c80f6] text-white/95 hover:bg-[#5292fa] border border-[#2b6ada]/80"
                  }`}
                  title={win.title}
                >
                  <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
                  <span className="truncate text-[11px] font-sans">{win.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Retro System Tray */}
        <div className="h-full bg-[#0c59cc] border-l border-[#1941a5] px-2 flex items-center space-x-2.5 text-white text-[11px] font-mono shrink-0 shadow-inner">
          {/* Mute Toggle */}
          <button
            onClick={() => {
              onPlayClick?.();
              onToggleMute();
            }}
            className="hover:opacity-80 p-0.5 rounded cursor-pointer"
            title={isMuted ? "Unmute Retro Sounds" : "Mute Retro Sounds"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-neutral-300" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
            )}
          </button>

          {/* Exploration timer */}
          <span className="text-blue-100 hidden sm:inline" title="Session duration">
            ⏱ {sessionTimer}
          </span>

          {/* Real-time Clock */}
          <span className="font-semibold text-white tracking-wide">
            {formattedTimeOnly}
          </span>
        </div>
      </div>
    </>
  );
};
