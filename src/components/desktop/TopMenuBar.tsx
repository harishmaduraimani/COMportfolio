import React, { useState } from "react";
import { Volume2, VolumeX, Battery, HelpCircle } from "lucide-react";
import { useSystemClock } from "../../hooks/useSystemClock";

interface TopMenuBarProps {
  sessionTimer: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenWindow: (type: "paint" | "notepad" | "contact" | "explorer") => void;
  onRestartBoot: () => void;
}

export const TopMenuBar: React.FC<TopMenuBarProps> = ({
  sessionTimer,
  isMuted,
  onToggleMute,
  onOpenWindow,
  onRestartBoot,
}) => {
  const { formattedDateTime } = useSystemClock();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems: Record<string, { label: string; action: () => void }[]> = {
    apple: [
      { label: "About Harish's Computer", action: () => onOpenWindow("notepad") },
      { label: "Restart System Bootloader", action: onRestartBoot },
    ],
    Finder: [
      { label: "Explore Projects Drive [C:]", action: () => onOpenWindow("explorer") },
      { label: "Open Contact Terminal", action: () => onOpenWindow("contact") },
    ],
    File: [
      { label: "Open Projects (My Works)", action: () => onOpenWindow("explorer") },
      { label: "Open Biography (About Me)", action: () => onOpenWindow("notepad") },
      { label: "Open Direct Contact", action: () => onOpenWindow("contact") },
      { label: "Open Creative Paint Studio", action: () => onOpenWindow("paint") },
    ],
    View: [
      { label: "Mute / Unmute Audio Synthesizer", action: onToggleMute },
      { label: "Reset Window Layouts", action: () => onOpenWindow("notepad") },
    ],
    Help: [
      { label: "System Documentation", action: () => onOpenWindow("notepad") },
      { label: "Send Feedback / Contact", action: () => onOpenWindow("contact") },
    ],
  };

  const handleMenuClick = (name: string) => {
    setActiveMenu((prev) => (prev === name ? null : name));
  };

  return (
    <div className="relative z-30 w-full bg-white/90 backdrop-blur-md border-b border-neutral-300 text-neutral-800 text-xs select-none shadow-sm flex items-center justify-between px-3 h-7">
      {/* Left Menu Items */}
      <div className="flex items-center space-x-4">
        {/* Apple icon */}
        <div className="relative">
          <button
            onClick={() => handleMenuClick("apple")}
            className="hover:bg-neutral-200/80 px-1.5 py-0.5 rounded cursor-pointer transition-colors text-black font-semibold text-sm leading-none flex items-center"
            title="System Menu"
          >
            
          </button>
          {activeMenu === "apple" && (
            <div className="absolute left-0 top-6 w-52 bg-white/95 backdrop-blur-lg border border-neutral-300 rounded shadow-xl py-1 z-50">
              {menuItems.apple.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setActiveMenu(null);
                  }}
                  className="w-full text-left px-3 py-1 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-xs"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text Menus */}
        {(["Finder", "File", "Edit", "View", "Go", "Window", "Help"] as const).map((menuName) => (
          <div key={menuName} className="relative">
            <button
              onClick={() => handleMenuClick(menuName)}
              className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                activeMenu === menuName ? "bg-neutral-300 font-semibold" : "hover:bg-neutral-200/70"
              }`}
            >
              {menuName}
            </button>
            {activeMenu === menuName && menuItems[menuName] && (
              <div className="absolute left-0 top-6 w-56 bg-white/95 backdrop-blur-lg border border-neutral-300 rounded shadow-xl py-1 z-50">
                {menuItems[menuName].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      item.action();
                      setActiveMenu(null);
                    }}
                    className="w-full text-left px-3 py-1 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right System Indicators */}
      <div className="flex items-center space-x-3 text-neutral-700">
        {/* Audio Mute Toggle */}
        <button
          onClick={onToggleMute}
          className="p-1 hover:bg-neutral-200 rounded cursor-pointer transition-colors"
          title={isMuted ? "Unmute Retro Audio" : "Mute Retro Audio"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
          )}
        </button>

        {/* Battery Indicator (matches Figma 46%) */}
        <div className="hidden sm:flex items-center space-x-1" title="Battery Status: 46% charged">
          <span className="text-[11px] font-mono">46%</span>
          <Battery className="w-4 h-4 text-neutral-700" />
        </div>

        {/* Live Session Exploration Duration Timer with badge */}
        <div className="relative group">
          <div className="bg-neutral-200/80 px-2 py-0.5 rounded border border-neutral-300 font-mono text-[11px] tracking-wider cursor-default flex items-center space-x-1">
            <span className="text-neutral-500 text-[10px]">⏱</span>
            <span>{sessionTimer}</span>
          </div>
          {/* Tooltip badge matching Figma reference */}
          <div className="absolute right-0 top-7 hidden group-hover:flex bg-neutral-900/90 text-white text-[10px] px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-50">
            Time spent exploring
          </div>
        </div>

        {/* Real-time Clock */}
        <div className="font-mono text-[11px] font-medium tracking-wide">
          {formattedDateTime}
        </div>
      </div>

      {/* Backdrop overlay to close menu on click outside */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </div>
  );
};
