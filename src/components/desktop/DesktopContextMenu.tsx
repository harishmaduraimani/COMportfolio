import React from "react";
import { RefreshCw, Grid, FolderPlus, Monitor, Palette, Info } from "lucide-react";

interface DesktopContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  onArrangeIcons: () => void;
  onNewFolder: () => void;
  onOpenPersonalize: () => void;
  onOpenDisplaySettings: () => void;
  onOpenAboutComputer: () => void;
}

export const DesktopContextMenu: React.FC<DesktopContextMenuProps> = ({
  x,
  y,
  isOpen,
  onClose,
  onRefresh,
  onArrangeIcons,
  onNewFolder,
  onOpenPersonalize,
  onOpenDisplaySettings,
  onOpenAboutComputer,
}) => {
  if (!isOpen) return null;

  // Clamping coordinates so menu stays inside viewport
  const menuWidth = 180;
  const menuHeight = 220;
  const clampedX = Math.min(x, window.innerWidth - menuWidth - 10);
  const clampedY = Math.min(y, window.innerHeight - menuHeight - 10);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }}
      />

      {/* Retro Windows Context Menu */}
      <div
        style={{ left: clampedX, top: clampedY }}
        className="fixed z-50 w-48 win-frame bg-[#ece9d8] py-1 text-xs select-none shadow-2xl font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            onRefresh();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 flex items-center space-x-2.5 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>

        <button
          onClick={() => {
            onArrangeIcons();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 flex items-center space-x-2.5 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Arrange Icons</span>
        </button>

        <div className="h-px bg-[#706f65] my-1 mx-1 border-b border-white" />

        <button
          onClick={() => {
            onNewFolder();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 flex items-center space-x-2.5 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          <FolderPlus className="w-3.5 h-3.5 text-yellow-600" />
          <span>New Folder</span>
        </button>

        <div className="h-px bg-[#706f65] my-1 mx-1 border-b border-white" />

        <button
          onClick={() => {
            onOpenPersonalize();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 flex items-center space-x-2.5 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Personalize</span>
        </button>

        <button
          onClick={() => {
            onOpenDisplaySettings();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 flex items-center space-x-2.5 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Display Settings</span>
        </button>

        <button
          onClick={() => {
            onOpenAboutComputer();
            onClose();
          }}
          className="w-full text-left px-3 py-1.5 flex items-center space-x-2.5 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
        >
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>About This Computer</span>
        </button>
      </div>
    </>
  );
};
