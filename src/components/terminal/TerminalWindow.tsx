import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface TerminalWindowProps {
  onEnterWorld: () => void;
  onPlaySound?: () => void;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ onEnterWorld, onPlaySound }) => {
  const [typedChars, setTypedChars] = useState<number>(0);
  const [isTypingDone, setIsTypingDone] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const fullPromptText = "> who is harish maduraimani?";

  useEffect(() => {
    // Typewriter effect for the first command line
    if (typedChars < fullPromptText.length) {
      const timer = setTimeout(() => {
        setTypedChars((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsTypingDone(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [typedChars, fullPromptText.length]);

  const handleEnterWorld = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    onPlaySound?.();
    setTimeout(() => {
      onEnterWorld();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-40 bg-black flex items-center justify-center p-4 transition-all duration-1000 ${
        isTransitioning
          ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Outer ambient red glow container */}
      <div className="relative w-full max-w-2xl">
        {/* Diffuse red/crimson outer glow matching Figma Image 2 */}
        <div className="absolute -inset-6 sm:-inset-10 bg-red-600/35 rounded-3xl filter blur-3xl -z-10 pointer-events-none animate-pulse" />

        {/* Terminal Window Frame */}
        <div className="bg-[#121214] border border-[#2e2e34] rounded-xl overflow-hidden shadow-2xl font-mono text-sm sm:text-base leading-relaxed">
          {/* Top chrome with macOS-style control dots */}
          <div className="bg-[#1a1a1f] px-4 py-3 border-b border-[#282830] flex items-center justify-between select-none">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-[#e0443e]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-[#dea123]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-[#1aab29]" />
            </div>
            <div className="text-xs text-neutral-500 font-mono tracking-wider">
              bash - harish@maduraimani: ~
            </div>
            <div className="w-12" /> {/* Balancing spacer */}
          </div>

          {/* Terminal Content Body */}
          <div className="p-6 sm:p-8 space-y-5 text-neutral-300">
            {/* Command Prompt */}
            <div className="text-[#e56847] font-semibold flex items-center tracking-wide">
              <span>{fullPromptText.slice(0, typedChars)}</span>
              {typedChars < fullPromptText.length && (
                <span className="inline-block w-2.5 h-4 bg-[#e56847] ml-1 blink-cursor" />
              )}
            </div>

            {/* Revealed Output Content */}
            {isTypingDone && (
              <div className="space-y-4 animate-fade-in transition-opacity duration-500">
                {/* Header Identity */}
                <div>
                  <h1 className="text-white text-lg sm:text-xl font-bold tracking-wider">
                    HARISH MADURAIMANI
                  </h1>
                  <div className="text-neutral-400 text-xs sm:text-sm font-medium">
                    Engineer / Product Builder / Entrepreneur
                  </div>
                  <div className="text-neutral-500 text-xs sm:text-sm">
                    Chennai / Global
                  </div>
                </div>

                {/* Narrative Statement */}
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Multidisciplinary engineer and product builder exploring AI, embedded systems, robotics, software and design to turn ideas into real products.
                </p>

                {/* Capability Badges */}
                <div className="text-neutral-200 text-[11px] sm:text-xs font-semibold tracking-wider pt-1">
                  AI • EMBEDDED SYSTEMS • ROBOTICS • STARTUPS • PRODUCT DESIGN • BRANDING
                </div>

                {/* Subtag / Mission */}
                <div className="text-[#e56847] text-xs sm:text-sm font-medium tracking-wide">
                  // FROM CIRCUITS AND CODE TO AI PRODUCTS, STARTUPS, AND BRAND EXPERIENCES.
                </div>

                {/* Interactive CTA */}
                <div className="pt-4 flex items-center">
                  <button
                    onClick={handleEnterWorld}
                    className="group inline-flex items-center space-x-2 text-[#e56847] hover:text-[#ff8264] transition-all cursor-pointer font-bold tracking-wider text-sm sm:text-base border border-[#e56847]/40 hover:border-[#e56847] px-4 py-2 rounded bg-[#e56847]/10 hover:bg-[#e56847]/20 shadow-lg hover:shadow-[#e56847]/30"
                  >
                    <span>&gt; enter my world</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    <span className="inline-block w-2 h-4 bg-[#e56847] ml-1 blink-cursor" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
