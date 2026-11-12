import { useState, useCallback, useRef, useEffect } from "react";

export function useAudioEffects() {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("harish_os_muted");
      return saved === "true";
    }
    return false;
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastPlayTime = useRef<Record<string, number>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("harish_os_muted", isMuted ? "true" : "false");
    }
  }, [isMuted]);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Rate limiter helper to prevent audio distortion/explosions during rapid interaction
  const shouldPlay = useCallback((soundKey: string, minIntervalMs = 60) => {
    const now = Date.now();
    const last = lastPlayTime.current[soundKey] || 0;
    if (now - last < minIntervalMs) return false;
    lastPlayTime.current[soundKey] = now;
    return true;
  }, []);

  // 1. Startup Chime
  const playStartupSound = useCallback(() => {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 2.0);
      });
    } catch {}
  }, [isMuted, getAudioContext]);

  // 2. Desktop: Icon Selection
  const playIconSelect = useCallback(() => {
    if (isMuted || !shouldPlay("icon_select", 50)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 3. Desktop: Icon Dragging
  const playIconDrag = useCallback(() => {
    if (isMuted || !shouldPlay("icon_drag", 120)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(340, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.04);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 4. Desktop: Right-Click Context Menu
  const playContextMenu = useCallback(() => {
    if (isMuted || !shouldPlay("context_menu", 100)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.setValueAtTime(620, now + 0.03);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 5. Windows: Window Open
  const playWindowOpen = useCallback(() => {
    if (isMuted || !shouldPlay("win_open", 100)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.09);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 6. Windows: Window Close
  const playWindowClose = useCallback(() => {
    if (isMuted || !shouldPlay("win_close", 100)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.09);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 7. Windows: Window Minimize
  const playWindowMinimize = useCallback(() => {
    if (isMuted || !shouldPlay("win_min", 100)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 8. Windows: Window Maximize / Restore
  const playWindowMaximize = useCallback(() => {
    if (isMuted || !shouldPlay("win_max", 100)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 9. Windows: Window Focus / Switching
  const playWindowFocus = useCallback(() => {
    if (isMuted || !shouldPlay("win_focus", 80)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(500, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 10. Explorer: Folder Select
  const playFolderSelect = useCallback(() => {
    if (isMuted || !shouldPlay("folder_select", 50)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(420, now);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 11. Explorer: Folder Open
  const playFolderOpen = useCallback(() => {
    if (isMuted || !shouldPlay("folder_open", 100)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 12. Explorer / Dialog: Popup Appearing
  const playPopupAppear = useCallback(() => {
    if (isMuted || !shouldPlay("popup_appear", 100)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.setValueAtTime(720, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 13. Buttons: Tactile Click
  const playButtonClick = useCallback(() => {
    if (isMuted || !shouldPlay("btn_click", 40)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.setValueAtTime(800, now + 0.012);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 14. Paint: Tool Select
  const playPaintTool = useCallback(() => {
    if (isMuted || !shouldPlay("paint_tool", 50)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(580, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 15. Paint: Drawing Stroke
  const playPaintDraw = useCallback(() => {
    if (isMuted || !shouldPlay("paint_draw", 70)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(750 + Math.random() * 100, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 16. Paint: Clear Canvas
  const playPaintClear = useCallback(() => {
    if (isMuted || !shouldPlay("paint_clear", 100)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.12);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  // 17. Notification Ding
  const playNotification = useCallback(() => {
    if (isMuted || !shouldPlay("notif", 100)) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now + i * 0.08);
        gain.gain.setValueAtTime(0.04, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.35);
      });
    } catch {}
  }, [isMuted, getAudioContext, shouldPlay]);

  return {
    isMuted,
    toggleMute: () => setIsMuted((prev) => !prev),
    playStartupSound,
    playIconSelect,
    playIconDrag,
    playContextMenu,
    playWindowOpen,
    playWindowClose,
    playWindowMinimize,
    playWindowMaximize,
    playWindowFocus,
    playFolderSelect,
    playFolderOpen,
    playPopupAppear,
    playButtonClick,
    playPaintTool,
    playPaintDraw,
    playPaintClear,
    playNotification,
  };
}
