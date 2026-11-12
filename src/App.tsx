import React, { useState } from "react";
import { LoadingScreen } from "./components/startup/LoadingScreen";
import { TerminalWindow } from "./components/terminal/TerminalWindow";
import { DesktopEnvironment } from "./components/desktop/DesktopEnvironment";
import { useSessionTimer } from "./hooks/useSessionTimer";
import { useAudioEffects } from "./hooks/useAudioEffects";

export type ExperienceStage = "loading" | "terminal" | "desktop";

export const App: React.FC = () => {
  const [stage, setStage] = useState<ExperienceStage>("loading");
  const [hasCrtOverlay, setHasCrtOverlay] = useState<boolean>(true);
  const audioEffects = useAudioEffects();
  const sessionTimer = useSessionTimer(stage === "desktop");

  const handleLoadingComplete = () => {
    setStage("terminal");
  };

  const handleEnterWorld = () => {
    audioEffects.playStartupSound();
    setStage("desktop");
  };

  const handleRestartBoot = () => {
    sessionTimer.resetTimer();
    setStage("loading");
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-black ${
        hasCrtOverlay ? "crt-overlay" : ""
      }`}
    >
      {/* Stage 1: Computer Startup / Loading Screen */}
      {stage === "loading" && (
        <LoadingScreen
          onComplete={handleLoadingComplete}
          onPlaySound={audioEffects.playStartupSound}
        />
      )}

      {/* Stage 2: Terminal Introduction ("who is harish maduraimani?") */}
      {stage === "terminal" && (
        <TerminalWindow
          onEnterWorld={handleEnterWorld}
          onPlaySound={audioEffects.playButtonClick}
        />
      )}

      {/* Stage 3: Windows XP Desktop Environment */}
      {stage === "desktop" && (
        <DesktopEnvironment
          sessionTimer={sessionTimer.formattedTimer}
          isMuted={audioEffects.isMuted}
          onToggleMute={audioEffects.toggleMute}
          onRestartBoot={handleRestartBoot}
          audioEffects={{
            playIconSelect: audioEffects.playIconSelect,
            playIconDrag: audioEffects.playIconDrag,
            playContextMenu: audioEffects.playContextMenu,
            playWindowOpen: audioEffects.playWindowOpen,
            playWindowClose: audioEffects.playWindowClose,
            playWindowMinimize: audioEffects.playWindowMinimize,
            playWindowMaximize: audioEffects.playWindowMaximize,
            playWindowFocus: audioEffects.playWindowFocus,
            playFolderSelect: audioEffects.playFolderSelect,
            playFolderOpen: audioEffects.playFolderOpen,
            playPopupAppear: audioEffects.playPopupAppear,
            playButtonClick: audioEffects.playButtonClick,
            playPaintTool: audioEffects.playPaintTool,
            playPaintDraw: audioEffects.playPaintDraw,
            playPaintClear: audioEffects.playPaintClear,
          }}
          hasCrtOverlay={hasCrtOverlay}
          onToggleCrtScanlines={() => setHasCrtOverlay((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default App;
