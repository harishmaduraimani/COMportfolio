import React from "react";
import { Monitor, Volume2, VolumeX, RotateCcw, Palette, Cpu, Sparkles } from "lucide-react";

interface ControlPanelWindowProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onResetIcons: () => void;
  onToggleCrtScanlines: () => void;
  hasCrtOverlay: boolean;
  activeWallpaper: string;
  onSelectWallpaper: (wp: string) => void;
  onPlayClick?: () => void;
}

export const ControlPanelWindow: React.FC<ControlPanelWindowProps> = ({
  isMuted,
  onToggleMute,
  onResetIcons,
  onToggleCrtScanlines,
  hasCrtOverlay,
  activeWallpaper,
  onSelectWallpaper,
  onPlayClick,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none text-xs text-neutral-800 p-4 space-y-4 win-scrollbar overflow-y-auto">
      {/* Header */}
      <div className="border-b border-neutral-400 pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold font-sans text-neutral-900">Control Panel</h2>
          <p className="text-[11px] text-neutral-600">
            Configure desktop appearance, audio synthesis, and display parameters.
          </p>
        </div>
      </div>

      {/* Grid of Settings Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Wallpaper Selection */}
        <div className="win-frame bg-white p-3 space-y-2.5">
          <div className="font-bold text-xs flex items-center space-x-1.5 text-blue-900 border-b pb-1">
            <Palette className="w-4 h-4 text-blue-600" />
            <span>DESKTOP WALLPAPER</span>
          </div>
          <div className="space-y-1.5">
            {[
              { id: "/assets/bliss_wallpaper.png", label: "Windows XP Bliss (Default)" },
              { id: "teal", label: "Windows 95 Classic Teal (#008080)" },
              { id: "charcoal", label: "Modern Dark Lab (#0f172a)" },
            ].map((wp) => (
              <label
                key={wp.id}
                onClick={onPlayClick}
                className="flex items-center space-x-2 p-1.5 rounded hover:bg-blue-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="wallpaper"
                  checked={activeWallpaper === wp.id}
                  onChange={() => onSelectWallpaper(wp.id)}
                  className="cursor-pointer"
                />
                <span className="font-medium text-[11px]">{wp.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 2. Audio Effects */}
        <div className="win-frame bg-white p-3 space-y-2.5">
          <div className="font-bold text-xs flex items-center space-x-1.5 text-blue-900 border-b pb-1">
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-green-600" />}
            <span>AUDIO SYNTHESIS</span>
          </div>
          <p className="text-[11px] text-neutral-600 leading-snug">
            Real-time procedural Web Audio API retro OS sound generator.
          </p>
          <button
            onClick={() => {
              onPlayClick?.();
              onToggleMute();
            }}
            className="win-btn w-full py-1.5 font-bold text-xs flex items-center justify-center space-x-2"
          >
            {isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-green-600" />
                <span>ENABLE AUDIO EFFECTS</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-500" />
                <span>MUTE ALL SOUNDS</span>
              </>
            )}
          </button>
        </div>

        {/* 3. CRT Display Shader */}
        <div className="win-frame bg-white p-3 space-y-2.5">
          <div className="font-bold text-xs flex items-center space-x-1.5 text-blue-900 border-b pb-1">
            <Monitor className="w-4 h-4 text-purple-600" />
            <span>CRT SCANLINES DISPLAY</span>
          </div>
          <p className="text-[11px] text-neutral-600 leading-snug">
            Toggle nostalgic CRT monitor scanline raster effect across the viewport.
          </p>
          <button
            onClick={() => {
              onPlayClick?.();
              onToggleCrtScanlines();
            }}
            className="win-btn w-full py-1.5 font-bold text-xs flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{hasCrtOverlay ? "DISABLE CRT SCANLINES" : "ENABLE CRT SCANLINES"}</span>
          </button>
        </div>

        {/* 4. Desktop Icon Layout */}
        <div className="win-frame bg-white p-3 space-y-2.5">
          <div className="font-bold text-xs flex items-center space-x-1.5 text-blue-900 border-b pb-1">
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>ICON POSITION RESET</span>
          </div>
          <p className="text-[11px] text-neutral-600 leading-snug">
            Reset all freely moved desktop shortcuts and folders back to default grid positions.
          </p>
          <button
            onClick={() => {
              onPlayClick?.();
              onResetIcons();
            }}
            className="win-btn w-full py-1.5 font-bold text-xs flex items-center justify-center space-x-2"
          >
            <span>RESET ICONS TO DEFAULT</span>
          </button>
        </div>
      </div>

      {/* System Status info */}
      <div className="win-sunken-bar p-2.5 flex items-center justify-between text-[11px] text-neutral-700">
        <span className="flex items-center space-x-1">
          <Cpu className="w-3.5 h-3.5" />
          <span>Harish OS Kernel v2026.1 &bull; 64-Bit Production Environment</span>
        </span>
        <span className="font-mono text-emerald-700 font-bold">ALL SUBSYSTEMS NOMINAL</span>
      </div>
    </div>
  );
};
