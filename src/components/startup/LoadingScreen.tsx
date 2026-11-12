import React, { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  onPlaySound?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, onPlaySound }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Realistic retro computer startup interval pacing
    const intervals = [
      { target: 12, delay: 100 },
      { target: 23, delay: 250 }, // matches 23% in design
      { target: 45, delay: 180 },
      { target: 68, delay: 300 },
      { target: 89, delay: 220 },
      { target: 97, delay: 350 },
      { target: 100, delay: 150 },
    ];

    let currentIdx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (currentIdx >= intervals.length) {
        // Complete
        setTimeout(() => {
          setIsFadingOut(true);
          onPlaySound?.();
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 400);
        return;
      }

      const { target, delay } = intervals[currentIdx];
      setProgress(target);
      currentIdx++;
      timer = setTimeout(step, delay);
    };

    timer = setTimeout(step, 200);

    return () => clearTimeout(timer);
  }, [onComplete, onPlaySound]);

  const handleSkip = () => {
    setIsFadingOut(true);
    onPlaySound?.();
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-700 select-none ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Centered Avatar and Progress */}
      <div className="flex flex-col items-center max-w-sm w-full px-6">
        {/* Cyan Portrait Illustration (No square effect / clean transparency) */}
        <div className="mb-6 flex items-center justify-center">
          <img
            src="/assets/avatar_loading.png"
            alt="Harish Maduraimani"
            className="w-44 h-auto object-contain pointer-events-none select-none"
          />
        </div>

        {/* Loading Text */}
        <div className="text-[#00ff66] font-tech text-xl sm:text-2xl font-bold tracking-wider mb-4 drop-shadow-[0_0_10px_rgba(0,255,102,0.8)]">
          Loading... {progress}%
        </div>

        {/* Glowing Pill Progress Bar */}
        <div className="w-full h-8 bg-black/90 rounded-full border-2 border-[#00ff66] p-1 shadow-[0_0_20px_rgba(0,255,102,0.5)] overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out animate-stripes relative overflow-hidden"
            style={{
              width: `${progress}%`,
              background: `repeating-linear-gradient(
                -45deg,
                #00ff66,
                #00ff66 12px,
                #007a33 12px,
                #007a33 24px
              )`,
              boxShadow: "0 0 12px rgba(0, 255, 102, 0.8)",
            }}
          />
        </div>

        {/* Skip button for user convenience */}
        <button
          onClick={handleSkip}
          className="mt-8 text-xs text-neutral-500 hover:text-neutral-300 tracking-widest font-mono-retro transition-colors cursor-pointer uppercase"
        >
          [ Click or Space to Skip ]
        </button>
      </div>
    </div>
  );
};
