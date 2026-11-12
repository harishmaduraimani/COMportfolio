import React from "react";
import { PROFILE_DATA } from "../../data/profile";
import { SKILL_CATEGORIES } from "../../data/skills";

export const NotepadWindow: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white select-text font-mono text-xs text-neutral-900 win-scrollbar overflow-y-auto">
      {/* Notepad Menu Bar */}
      <div className="bg-[#ece9d8] px-2 py-0.5 border-b border-[#706f65] flex space-x-4 text-xs select-none sticky top-0 z-10 text-neutral-800">
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">File</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">Edit</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">Search</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">Help</span>
      </div>

      {/* Notepad Document Interior */}
      <div className="p-6 space-y-6 max-w-3xl mx-auto">
        {/* Header Block matching Figma design */}
        <div className="text-center border-b pb-4 border-neutral-300 space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-wide text-neutral-900 uppercase">
            {PROFILE_DATA.name}
          </h1>
          <div className="font-semibold text-neutral-800 text-xs sm:text-sm tracking-wide">
            Professional Title: {PROFILE_DATA.roles}
          </div>
          <div className="text-neutral-600 text-xs tracking-wider">
            {PROFILE_DATA.location}
          </div>
          <div className="text-[11px] font-semibold text-neutral-700 tracking-wider pt-1">
            AI • EMBEDDED SYSTEMS • ROBOTICS • STARTUPS • PRODUCT DESIGN • BRANDING
          </div>
        </div>

        {/* [01] ABOUT ME */}
        <div className="space-y-2">
          <div className="font-bold text-sm tracking-wider border-b border-neutral-400 pb-0.5 inline-block">
            [01] ABOUT ME
          </div>
          <p className="leading-relaxed text-neutral-800 whitespace-pre-line text-xs sm:text-sm">
            {PROFILE_DATA.shortBio}
          </p>
          <p className="leading-relaxed text-neutral-700 whitespace-pre-line text-xs sm:text-sm pt-1">
            {PROFILE_DATA.extendedBio}
          </p>
        </div>

        {/* [02] MY DISCIPLINES - 8 Bordered Boxes */}
        <div className="space-y-2">
          <div className="font-bold text-sm tracking-wider border-b border-neutral-400 pb-0.5 inline-block">
            [02] MY DISCIPLINES
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {PROFILE_DATA.disciplines.map((discipline, idx) => (
              <div
                key={idx}
                className="border border-neutral-400 p-2 text-center text-[11px] font-semibold bg-neutral-50/50 hover:bg-neutral-100 transition-colors flex items-center justify-center shadow-xs"
              >
                {discipline}
              </div>
            ))}
          </div>
        </div>

        {/* [03] TECHNICAL SKILLS - Separately Bordered Categories */}
        <div className="space-y-3">
          <div className="font-bold text-sm tracking-wider border-b border-neutral-400 pb-0.5 inline-block">
            [03] TECHNICAL SKILLS
          </div>

          <div className="space-y-2.5 pt-1">
            {SKILL_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="border border-neutral-400 p-2.5 bg-neutral-50/60 rounded-xs hover:border-neutral-700 transition-colors shadow-2xs"
              >
                <div className="font-bold text-neutral-900 text-xs sm:text-sm tracking-wide mb-1.5 uppercase">
                  {cat.categoryNumber} - {cat.categoryName}:
                </div>
                {/* Outlined Skill Labels and Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-block border border-neutral-400/80 bg-white px-2 py-0.5 text-[11px] text-neutral-800 font-mono rounded-xs shadow-2xs hover:bg-blue-50 hover:border-blue-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom signoff note */}
        <div className="pt-4 border-t border-dashed border-neutral-300 text-neutral-500 text-[11px] text-center italic">
          --- End of Notepad Document | Harish Labs Engineering Dossier 2026 ---
        </div>
      </div>
    </div>
  );
};
