import { useState, useCallback } from "react";

export type WindowType =
  | "paint"
  | "notepad"
  | "contact"
  | "explorer"
  | "projectDetail"
  | "control-panel"
  | "about-computer"
  | "code-editor"
  | "kicad-eda"
  | "browser-chrome"
  | "browser-edge";

export interface WindowInstance {
  id: string;
  type: WindowType;
  title: string;
  icon?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevGeometry?: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
  projectId?: string;
}

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<string, WindowInstance>>({
    paint: {
      id: "paint",
      type: "paint",
      title: "untitled - Paint",
      isOpen: false, // Opened automatically after 800ms
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 30, y: 48 },
      size: { width: 350, height: 530 },
    },
    notepad: {
      id: "notepad",
      type: "notepad",
      title: "About Harish – Notepad",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      position: { x: 380, y: 180 },
      size: { width: 560, height: 440 },
    },
    explorer: {
      id: "explorer",
      type: "explorer",
      title: "Projects - [C:]",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 12,
      position: { x: 80, y: 45 },
      size: { width: 760, height: 560 },
    },
    contact: {
      id: "contact",
      type: "contact",
      title: "Contact – Harish Maduraimani",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 13,
      position: { x: 150, y: 65 },
      size: { width: 660, height: 510 },
    },
    "control-panel": {
      id: "control-panel",
      type: "control-panel",
      title: "Control Panel",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 14,
      position: { x: 180, y: 80 },
      size: { width: 620, height: 450 },
    },
    "about-computer": {
      id: "about-computer",
      type: "about-computer",
      title: "About This Computer",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 15,
      position: { x: 220, y: 90 },
      size: { width: 500, height: 380 },
    },
    "code-editor": {
      id: "code-editor",
      type: "code-editor",
      title: "Visual Studio Code — Firmware & ML Models",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 16,
      position: { x: 110, y: 60 },
      size: { width: 740, height: 520 },
    },
    "kicad-eda": {
      id: "kicad-eda",
      type: "kicad-eda",
      title: "KiCad 8.0 — Hardware & PCB Design",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 17,
      position: { x: 130, y: 70 },
      size: { width: 720, height: 500 },
    },
    "browser-chrome": {
      id: "browser-chrome",
      type: "browser-chrome",
      title: "Google Chrome",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 18,
      position: { x: 140, y: 65 },
      size: { width: 700, height: 510 },
    },
  });

  const [activeWindowId, setActiveWindowId] = useState<string>("");
  const [maxZIndex, setMaxZIndex] = useState<number>(20);

  const bringToFront = useCallback(
    (id: string) => {
      setMaxZIndex((prev) => {
        const nextZ = prev + 1;
        setWindows((wins) => {
          if (!wins[id]) return wins;
          return {
            ...wins,
            [id]: {
              ...wins[id],
              zIndex: nextZ,
              isMinimized: false,
            },
          };
        });
        setActiveWindowId(id);
        return nextZ;
      });
    },
    []
  );

  const openWindow = useCallback(
    (
      type: WindowType,
      options?: {
        id?: string;
        title?: string;
        projectId?: string;
        defaultPos?: { x: number; y: number };
        defaultSize?: { width: number; height: number };
      }
    ) => {
      const winId = options?.id || type;

      setWindows((prev) => {
        const existing = prev[winId];
        if (existing) {
          return {
            ...prev,
            [winId]: {
              ...existing,
              isOpen: true,
              isMinimized: false,
              title: options?.title || existing.title,
              projectId: options?.projectId || existing.projectId,
            },
          };
        }

        const defaultWidth = options?.defaultSize?.width || 720;
        const defaultHeight = options?.defaultSize?.height || 520;
        const defaultX = options?.defaultPos?.x || Math.max(30, 80 + Math.random() * 80);
        const defaultY = options?.defaultPos?.y || Math.max(45, 60 + Math.random() * 60);

        return {
          ...prev,
          [winId]: {
            id: winId,
            type,
            title: options?.title || winId,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: maxZIndex + 1,
            position: { x: defaultX, y: defaultY },
            size: { width: defaultWidth, height: defaultHeight },
            projectId: options?.projectId,
          },
        };
      });

      bringToFront(winId);
    },
    [bringToFront, maxZIndex]
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: false,
          isMinimized: false,
        },
      };
    });

    setWindows((current) => {
      const openWins = Object.values(current).filter((w) => w.isOpen && !w.isMinimized && w.id !== id);
      if (openWins.length > 0) {
        const topWin = openWins.reduce((max, w) => (w.zIndex > max.zIndex ? w : max), openWins[0]);
        setActiveWindowId(topWin.id);
      } else {
        setActiveWindowId("");
      }
      return current;
    });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: true,
        },
      };
    });
    setActiveWindowId("");
  }, []);

  const toggleMaximizeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;

      if (win.isMaximized) {
        return {
          ...prev,
          [id]: {
            ...win,
            isMaximized: false,
            position: win.prevGeometry?.position || { x: 80, y: 60 },
            size: win.prevGeometry?.size || { width: 700, height: 500 },
          },
        };
      } else {
        return {
          ...prev,
          [id]: {
            ...win,
            isMaximized: true,
            prevGeometry: {
              position: { ...win.position },
              size: { ...win.size },
            },
          },
        };
      }
    });
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          position: { x, y },
        },
      };
    });
  }, []);

  return {
    windows,
    activeWindowId,
    bringToFront,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    moveWindow,
  };
}
