import React from "react";
import { AppLogo } from "../desktop/AppLogos";
import { PROFILE_DATA } from "../../data/profile";

export const AboutComputerWindow: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#f6f5ee] select-none text-xs text-neutral-800 p-6 space-y-5 win-scrollbar overflow-y-auto">
      {/* Top Banner with Apple Logo */}
      <div className="flex items-center space-x-5 border-b border-neutral-300 pb-5">
        <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-white shadow-lg shrink-0">
          <AppLogo type="apple" className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-neutral-900">
            Harish OS
          </h2>
          <div className="text-xs font-mono text-neutral-600 font-semibold">
            Version 2026.1 Nostalgic Computing Edition
          </div>
          <div className="text-[11px] text-neutral-500">
            Interactive Retro Desktop Operating System
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="space-y-3">
        <div className="font-bold text-xs uppercase tracking-wider text-neutral-700 font-mono">
          System Overview
        </div>

        <div className="win-frame bg-white p-3 space-y-2 text-xs">
          <div className="flex justify-between border-b pb-1 border-neutral-100">
            <span className="font-semibold text-neutral-600">Chief Architect:</span>
            <span className="font-bold text-neutral-900">{PROFILE_DATA.name}</span>
          </div>
          <div className="flex justify-between border-b pb-1 border-neutral-100">
            <span className="font-semibold text-neutral-600">Specializations:</span>
            <span className="font-medium text-neutral-800 text-right">
              Embedded Systems, AI, Robotics, Hardware, Startups
            </span>
          </div>
          <div className="flex justify-between border-b pb-1 border-neutral-100">
            <span className="font-semibold text-neutral-600">Base Location:</span>
            <span className="font-medium text-neutral-800">{PROFILE_DATA.location}</span>
          </div>
          <div className="flex justify-between border-b pb-1 border-neutral-100">
            <span className="font-semibold text-neutral-600">Catalog Capacity:</span>
            <span className="font-mono text-blue-700 font-bold">30 Documented Engineering Projects</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-neutral-600">Runtime:</span>
            <span className="font-mono text-emerald-700 font-bold">React 19 &bull; Web Audio API &bull; Vite 8</span>
          </div>
        </div>
      </div>

      {/* Narrative Footer */}
      <div className="bg-[#edeae0] p-3 rounded-xs border border-neutral-300 text-[11px] leading-relaxed text-neutral-700">
        "Built to demonstrate the convergence of hardware engineering fundamentals, creative software architecture, and nostalgic tactile computer design."
      </div>
    </div>
  );
};
