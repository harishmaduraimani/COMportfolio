import { useState, useCallback, useEffect } from "react";
import { DEFAULT_DESKTOP_ICONS } from "../data/desktopIcons";

export interface CustomFolderItem {
  id: string;
  label: string;
  isRenaming: boolean;
  position: { x: number; y: number };
}

// Helper to compute initial layout coordinates dynamically from the right side of the screen
function getInitialPositions(): Record<string, { x: number; y: number }> {
  const winWidth = typeof window !== "undefined" ? window.innerWidth : 1280;
  const colWidth = 92;
  const rowHeight = 88;
  const topMargin = 38;
  const rightMargin = 20;

  const positions: Record<string, { x: number; y: number }> = {};

  DEFAULT_DESKTOP_ICONS.forEach((icon) => {
    // Column 0 is rightmost, Column 1 is next to it, etc.
    const x = Math.max(20, winWidth - rightMargin - (icon.column + 1) * colWidth);
    const y = topMargin + icon.row * rowHeight;
    positions[icon.id] = { x, y };
  });

  return positions;
}

export function useDesktopIcons() {
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("harish_os_icon_positions_v2");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return getInitialPositions();
  });

  const [customFolders, setCustomFolders] = useState<CustomFolderItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("harish_os_custom_folders");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [selectedIconId, setSelectedIconId] = useState<string>("");

  // Recalculate if window resizes and user hasn't customized positions
  useEffect(() => {
    const handleResize = () => {
      const saved = localStorage.getItem("harish_os_icon_positions_v2");
      if (!saved) {
        setIconPositions(getInitialPositions());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("harish_os_icon_positions_v2", JSON.stringify(iconPositions));
      } catch {}
    }
  }, [iconPositions]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("harish_os_custom_folders", JSON.stringify(customFolders));
      } catch {}
    }
  }, [customFolders]);

  const updateIconPosition = useCallback((id: string, x: number, y: number) => {
    const maxX = Math.max(20, window.innerWidth - 85);
    const maxY = Math.max(30, window.innerHeight - 110);
    const clampedX = Math.min(Math.max(5, x), maxX);
    const clampedY = Math.min(Math.max(30, y), maxY);

    setIconPositions((prev) => ({
      ...prev,
      [id]: { x: clampedX, y: clampedY },
    }));

    setCustomFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, position: { x: clampedX, y: clampedY } } : f))
    );
  }, []);

  const arrangeIcons = useCallback(() => {
    const freshPositions = getInitialPositions();
    setIconPositions(freshPositions);
    if (typeof window !== "undefined") {
      localStorage.setItem("harish_os_icon_positions_v2", JSON.stringify(freshPositions));
    }
  }, []);

  const createNewFolder = useCallback(() => {
    const folderNum = customFolders.length + 1;
    const winWidth = typeof window !== "undefined" ? window.innerWidth : 1280;
    const newFolder: CustomFolderItem = {
      id: `new-folder-${Date.now()}`,
      label: `New Folder ${folderNum > 1 ? `(${folderNum})` : ""}`,
      isRenaming: false,
      position: {
        x: Math.max(30, winWidth - 480),
        y: Math.max(60, 38 + (customFolders.length % 5) * 88),
      },
    };
    setCustomFolders((prev) => [...prev, newFolder]);
    setSelectedIconId(newFolder.id);
  }, [customFolders.length]);

  const renameCustomFolder = useCallback((id: string, newName: string) => {
    setCustomFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, label: newName, isRenaming: false } : f))
    );
  }, []);

  const resetAllPositions = useCallback(() => {
    const initial = getInitialPositions();
    setIconPositions(initial);
    setCustomFolders([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("harish_os_icon_positions_v2");
      localStorage.removeItem("harish_os_custom_folders");
    }
  }, []);

  return {
    iconPositions,
    customFolders,
    selectedIconId,
    setSelectedIconId,
    updateIconPosition,
    arrangeIcons,
    createNewFolder,
    renameCustomFolder,
    resetAllPositions,
  };
}
