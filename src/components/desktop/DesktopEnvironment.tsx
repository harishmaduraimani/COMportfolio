import React, { useState, useEffect } from "react";
import { TopMenuBar } from "./TopMenuBar";
import { BottomTaskbar } from "./BottomTaskbar";
import { DesktopIcon } from "./DesktopIcon";
import { DesktopContextMenu } from "./DesktopContextMenu";
import { WindowFrame } from "../window-manager/WindowFrame";
import { PaintWindow } from "../paint/PaintWindow";
import { NotepadWindow } from "../about/NotepadWindow";
import { ContactWindow } from "../contact/ContactWindow";
import { ProjectExplorer } from "../explorer/ProjectExplorer";
import { ProjectDetailWindow } from "../projects/ProjectDetailWindow";
import { ControlPanelWindow } from "../control-panel/ControlPanelWindow";
import { AboutComputerWindow } from "../system/AboutComputerWindow";
import { useWindowManager } from "../../hooks/useWindowManager";
import { PROJECTS, ProjectData } from "../../data/projects";

interface DesktopEnvironmentProps {
  sessionTimer: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestartBoot: () => void;
  audioEffects: {
    playIconSelect: () => void;
    playIconDrag: () => void;
    playContextMenu: () => void;
    playWindowOpen: () => void;
    playWindowClose: () => void;
    playWindowMinimize: () => void;
    playWindowMaximize: () => void;
    playWindowFocus: () => void;
    playFolderSelect: () => void;
    playFolderOpen: () => void;
    playPopupAppear: () => void;
    playButtonClick: () => void;
    playPaintTool: () => void;
    playPaintDraw: () => void;
    playPaintClear: () => void;
  };
  hasCrtOverlay: boolean;
  onToggleCrtScanlines: () => void;
}

export const DesktopEnvironment: React.FC<DesktopEnvironmentProps> = ({
  sessionTimer,
  isMuted,
  onToggleMute,
  onRestartBoot,
  audioEffects,
  hasCrtOverlay,
  onToggleCrtScanlines,
}) => {
  const {
    windows,
    activeWindowId,
    bringToFront,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    moveWindow,
  } = useWindowManager();

  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectData>(PROJECTS[0]);
  const [wallpaper, setWallpaper] = useState<string>("/assets/bliss_wallpaper.png");

  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
  }>({
    isOpen: false,
    x: 0,
    y: 0,
  });

  // Clear any legacy custom icons from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("harish_os_icon_positions");
        localStorage.removeItem("harish_os_icon_positions_v2");
        localStorage.removeItem("harish_os_custom_folders");
      } catch {}
    }
  }, []);

  // Automatically open MS Paint after 850ms upon entering desktop matching Figma Image 3
  useEffect(() => {
    const timer = setTimeout(() => {
      openWindow("paint", {
        id: "paint",
        title: "untitled - Paint",
        defaultPos: { x: 30, y: 48 },
        defaultSize: { width: 350, height: 530 },
      });
      audioEffects.playWindowOpen();
    }, 850);

    return () => clearTimeout(timer);
  }, []);

  // Handle opening application from icons / menus
  const handleOpenApp = (appId: string) => {
    setSelectedDesktopIcon(appId);
    audioEffects.playWindowOpen();

    switch (appId) {
      case "my-works":
      case "explorer":
        openWindow("explorer", {
          id: "explorer",
          title: "Projects - [C:]",
          defaultPos: { x: 80, y: 45 },
          defaultSize: { width: 760, height: 560 },
        });
        break;

      case "about-me":
      case "notepad":
        openWindow("notepad", {
          id: "notepad",
          title: "About Harish – Notepad",
          defaultPos: { x: 390, y: 180 },
          defaultSize: { width: 560, height: 440 },
        });
        break;

      case "contact":
        openWindow("contact", {
          id: "contact",
          title: "Contact – Harish Maduraimani",
          defaultPos: { x: 150, y: 65 },
          defaultSize: { width: 660, height: 510 },
        });
        break;

      case "paint":
        openWindow("paint", {
          id: "paint",
          title: "untitled - Paint",
          defaultPos: { x: 30, y: 48 },
          defaultSize: { width: 350, height: 530 },
        });
        break;

      case "apple":
      case "about-computer":
        openWindow("about-computer", {
          id: "about-computer",
          title: "About This Computer",
          defaultPos: { x: 220, y: 90 },
          defaultSize: { width: 520, height: 390 },
        });
        break;

      case "control-panel":
        openWindow("control-panel", {
          id: "control-panel",
          title: "Control Panel",
          defaultPos: { x: 180, y: 80 },
          defaultSize: { width: 620, height: 450 },
        });
        break;

      default:
        openWindow("explorer", {
          id: "explorer",
          title: "Projects - [C:]",
        });
        break;
    }
  };

  const handleOpenProjectDetail = (project: ProjectData) => {
    setActiveProject(project);
    audioEffects.playFolderOpen();
    openWindow("projectDetail", {
      id: "project-detail",
      title: `${project.folderName} – ${project.title} | Harish Labs`,
      projectId: project.id,
      defaultPos: { x: 140, y: 45 },
      defaultSize: { width: 840, height: 600 },
    });
  };

  const handleNavigateProject = (project: ProjectData) => {
    setActiveProject(project);
    audioEffects.playFolderOpen();
    openWindow("projectDetail", {
      id: "project-detail",
      title: `${project.folderName} – ${project.title} | Harish Labs`,
      projectId: project.id,
    });
  };

  // Right-Click Context Menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    audioEffects.playContextMenu();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const wallpaperBackgroundStyle =
    wallpaper === "teal"
      ? { backgroundColor: "#008080" }
      : wallpaper === "charcoal"
      ? { backgroundColor: "#0f172a" }
      : {
          backgroundImage: "url(/assets/bliss_wallpaper.png)",
          backgroundColor: "#2c5f94",
        };

  return (
    <div
      onClick={() => {
        setSelectedDesktopIcon("");
        setContextMenu((prev) => ({ ...prev, isOpen: false }));
      }}
      onContextMenu={handleContextMenu}
      className="relative w-screen h-screen overflow-hidden select-none bg-cover bg-center flex flex-col"
      style={wallpaperBackgroundStyle}
    >
      {/* Top Menu Bar */}
      <TopMenuBar
        sessionTimer={sessionTimer}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        onOpenWindow={handleOpenApp}
        onRestartBoot={onRestartBoot}
      />

      {/* Main Desktop Workspace Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* EXACT 3 PORTFOLIO DESKTOP ICONS (Fixed Position on Right Side matching Figma Image 3 & 4) */}
        <div className="absolute right-4 top-4 flex flex-col space-y-7 z-10 pointer-events-auto">
          <DesktopIcon
            id="my-works"
            label="My Works"
            iconSrc="/assets/icon_my_works.png"
            isSelected={selectedDesktopIcon === "my-works"}
            onSelect={setSelectedDesktopIcon}
            onOpen={handleOpenApp}
            onPlayClick={audioEffects.playIconSelect}
          />

          <DesktopIcon
            id="about-me"
            label="About Me"
            iconSrc="/assets/icon_about_me.png"
            isSelected={selectedDesktopIcon === "about-me"}
            onSelect={setSelectedDesktopIcon}
            onOpen={handleOpenApp}
            onPlayClick={audioEffects.playIconSelect}
          />

          <DesktopIcon
            id="contact"
            label="Contact"
            iconSrc="/assets/icon_contact.png"
            isSelected={selectedDesktopIcon === "contact"}
            onSelect={setSelectedDesktopIcon}
            onOpen={handleOpenApp}
            onPlayClick={audioEffects.playIconSelect}
          />
        </div>

        {/* WINDOW INSTANCES */}

        {/* 1. Creative Studio: MS Paint */}
        {windows.paint && (
          <WindowFrame
            id="paint"
            title={windows.paint.title}
            icon="/assets/harish_hmm_portrait.jpg"
            isActive={activeWindowId === "paint"}
            isOpen={windows.paint.isOpen}
            isMinimized={windows.paint.isMinimized}
            isMaximized={windows.paint.isMaximized}
            zIndex={windows.paint.zIndex}
            initialPosition={windows.paint.position}
            initialSize={windows.paint.size}
            onFocus={() => {
              bringToFront("paint");
              audioEffects.playWindowFocus();
            }}
            onClose={() => {
              audioEffects.playWindowClose();
              closeWindow("paint");
            }}
            onMinimize={() => {
              audioEffects.playWindowMinimize();
              minimizeWindow("paint");
            }}
            onToggleMaximize={() => {
              audioEffects.playWindowMaximize();
              toggleMaximizeWindow("paint");
            }}
            onMove={(x, y) => moveWindow("paint", x, y)}
          >
            <PaintWindow
              onPlayToolSelect={audioEffects.playPaintTool}
              onPlayDraw={audioEffects.playPaintDraw}
              onPlayClear={audioEffects.playPaintClear}
            />
          </WindowFrame>
        )}

        {/* 2. Biography: Notepad */}
        {windows.notepad && (
          <WindowFrame
            id="notepad"
            title={windows.notepad.title}
            icon="/assets/icon_about_me.png"
            isActive={activeWindowId === "notepad"}
            isOpen={windows.notepad.isOpen}
            isMinimized={windows.notepad.isMinimized}
            isMaximized={windows.notepad.isMaximized}
            zIndex={windows.notepad.zIndex}
            initialPosition={windows.notepad.position}
            initialSize={windows.notepad.size}
            onFocus={() => {
              bringToFront("notepad");
              audioEffects.playWindowFocus();
            }}
            onClose={() => {
              audioEffects.playWindowClose();
              closeWindow("notepad");
            }}
            onMinimize={() => {
              audioEffects.playWindowMinimize();
              minimizeWindow("notepad");
            }}
            onToggleMaximize={() => {
              audioEffects.playWindowMaximize();
              toggleMaximizeWindow("notepad");
            }}
            onMove={(x, y) => moveWindow("notepad", x, y)}
          >
            <NotepadWindow />
          </WindowFrame>
        )}

        {/* 3. My Works: Projects Explorer */}
        {windows.explorer && (
          <WindowFrame
            id="explorer"
            title={windows.explorer.title}
            icon="/assets/icon_my_works.png"
            isActive={activeWindowId === "explorer"}
            isOpen={windows.explorer.isOpen}
            isMinimized={windows.explorer.isMinimized}
            isMaximized={windows.explorer.isMaximized}
            zIndex={windows.explorer.zIndex}
            initialPosition={windows.explorer.position}
            initialSize={windows.explorer.size}
            onFocus={() => {
              bringToFront("explorer");
              audioEffects.playWindowFocus();
            }}
            onClose={() => {
              audioEffects.playWindowClose();
              closeWindow("explorer");
            }}
            onMinimize={() => {
              audioEffects.playWindowMinimize();
              minimizeWindow("explorer");
            }}
            onToggleMaximize={() => {
              audioEffects.playWindowMaximize();
              toggleMaximizeWindow("explorer");
            }}
            onMove={(x, y) => moveWindow("explorer", x, y)}
          >
            <ProjectExplorer
              onOpenProjectDetail={handleOpenProjectDetail}
              onPlayFolderSound={audioEffects.playFolderOpen}
              onPlayFolderSelect={audioEffects.playFolderSelect}
              onPlayPopupSound={audioEffects.playPopupAppear}
            />
          </WindowFrame>
        )}

        {/* 4. Contact Terminal */}
        {windows.contact && (
          <WindowFrame
            id="contact"
            title={windows.contact.title}
            icon="/assets/icon_contact.png"
            isActive={activeWindowId === "contact"}
            isOpen={windows.contact.isOpen}
            isMinimized={windows.contact.isMinimized}
            isMaximized={windows.contact.isMaximized}
            zIndex={windows.contact.zIndex}
            initialPosition={windows.contact.position}
            initialSize={windows.contact.size}
            onFocus={() => {
              bringToFront("contact");
              audioEffects.playWindowFocus();
            }}
            onClose={() => {
              audioEffects.playWindowClose();
              closeWindow("contact");
            }}
            onMinimize={() => {
              audioEffects.playWindowMinimize();
              minimizeWindow("contact");
            }}
            onToggleMaximize={() => {
              audioEffects.playWindowMaximize();
              toggleMaximizeWindow("contact");
            }}
            onMove={(x, y) => moveWindow("contact", x, y)}
          >
            <ContactWindow />
          </WindowFrame>
        )}

        {/* 5. Project Detail Window */}
        {windows["project-detail"] && (
          <WindowFrame
            id="project-detail"
            title={`${activeProject.folderName} – ${activeProject.title} | Harish Labs`}
            icon="/assets/icon_my_works.png"
            isActive={activeWindowId === "project-detail"}
            isOpen={windows["project-detail"].isOpen}
            isMinimized={windows["project-detail"].isMinimized}
            isMaximized={windows["project-detail"].isMaximized}
            zIndex={windows["project-detail"].zIndex}
            initialPosition={windows["project-detail"].position}
            initialSize={windows["project-detail"].size}
            onFocus={() => {
              bringToFront("project-detail");
              audioEffects.playWindowFocus();
            }}
            onClose={() => {
              audioEffects.playWindowClose();
              closeWindow("project-detail");
            }}
            onMinimize={() => {
              audioEffects.playWindowMinimize();
              minimizeWindow("project-detail");
            }}
            onToggleMaximize={() => {
              audioEffects.playWindowMaximize();
              toggleMaximizeWindow("project-detail");
            }}
            onMove={(x, y) => moveWindow("project-detail", x, y)}
          >
            <ProjectDetailWindow
              project={activeProject}
              onNavigateProject={handleNavigateProject}
              onReturnToIndex={() => handleOpenApp("explorer")}
              onPlayClickSound={audioEffects.playButtonClick}
            />
          </WindowFrame>
        )}

        {/* 6. Control Panel Window */}
        {windows["control-panel"] && (
          <WindowFrame
            id="control-panel"
            title="Control Panel"
            isActive={activeWindowId === "control-panel"}
            isOpen={windows["control-panel"].isOpen}
            isMinimized={windows["control-panel"].isMinimized}
            isMaximized={windows["control-panel"].isMaximized}
            zIndex={windows["control-panel"].zIndex}
            initialPosition={windows["control-panel"].position}
            initialSize={windows["control-panel"].size}
            onFocus={() => {
              bringToFront("control-panel");
              audioEffects.playWindowFocus();
            }}
            onClose={() => {
              audioEffects.playWindowClose();
              closeWindow("control-panel");
            }}
            onMinimize={() => {
              audioEffects.playWindowMinimize();
              minimizeWindow("control-panel");
            }}
            onToggleMaximize={() => {
              audioEffects.playWindowMaximize();
              toggleMaximizeWindow("control-panel");
            }}
            onMove={(x, y) => moveWindow("control-panel", x, y)}
          >
            <ControlPanelWindow
              isMuted={isMuted}
              onToggleMute={onToggleMute}
              onResetIcons={() => {}}
              onToggleCrtScanlines={onToggleCrtScanlines}
              hasCrtOverlay={hasCrtOverlay}
              activeWallpaper={wallpaper}
              onSelectWallpaper={setWallpaper}
              onPlayClick={audioEffects.playButtonClick}
            />
          </WindowFrame>
        )}

        {/* 7. About This Computer (Apple) Window */}
        {windows["about-computer"] && (
          <WindowFrame
            id="about-computer"
            title="About This Computer"
            isActive={activeWindowId === "about-computer"}
            isOpen={windows["about-computer"].isOpen}
            isMinimized={windows["about-computer"].isMinimized}
            isMaximized={windows["about-computer"].isMaximized}
            zIndex={windows["about-computer"].zIndex}
            initialPosition={windows["about-computer"].position}
            initialSize={windows["about-computer"].size}
            onFocus={() => {
              bringToFront("about-computer");
              audioEffects.playWindowFocus();
            }}
            onClose={() => {
              audioEffects.playWindowClose();
              closeWindow("about-computer");
            }}
            onMinimize={() => {
              audioEffects.playWindowMinimize();
              minimizeWindow("about-computer");
            }}
            onToggleMaximize={() => {
              audioEffects.playWindowMaximize();
              toggleMaximizeWindow("about-computer");
            }}
            onMove={(x, y) => moveWindow("about-computer", x, y)}
          >
            <AboutComputerWindow />
          </WindowFrame>
        )}

        {/* Desktop Right-Click Context Menu */}
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          isOpen={contextMenu.isOpen}
          onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
          onRefresh={() => {
            audioEffects.playButtonClick();
          }}
          onArrangeIcons={() => {
            audioEffects.playButtonClick();
          }}
          onNewFolder={() => {
            audioEffects.playFolderOpen();
            handleOpenApp("explorer");
          }}
          onOpenPersonalize={() => handleOpenApp("control-panel")}
          onOpenDisplaySettings={() => handleOpenApp("control-panel")}
          onOpenAboutComputer={() => handleOpenApp("about-computer")}
        />
      </div>

      {/* Extended Bottom Taskbar with Running Applications & Start Menu */}
      <BottomTaskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onSelectWindow={(id) => {
          const win = windows[id];
          if (!win) return;
          if (win.isMinimized) {
            audioEffects.playWindowOpen();
            bringToFront(id);
          } else if (activeWindowId === id) {
            audioEffects.playWindowMinimize();
            minimizeWindow(id);
          } else {
            audioEffects.playWindowFocus();
            bringToFront(id);
          }
        }}
        onOpenWindow={handleOpenApp}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
        sessionTimer={sessionTimer}
        onRestartBoot={onRestartBoot}
        onPlayClick={audioEffects.playButtonClick}
      />
    </div>
  );
};
