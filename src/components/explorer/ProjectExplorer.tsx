import React, { useState, useRef } from "react";
import {
  ArrowUp,
  Scissors,
  Copy,
  Clipboard,
  RotateCcw,
  Trash2,
  HardDrive,
  Grid,
  List,
} from "lucide-react";
import { PROJECTS, ProjectData } from "../../data/projects";
import { FloatingProjectPopup } from "./FloatingProjectPopup";

interface ProjectExplorerProps {
  onOpenProjectDetail: (project: ProjectData) => void;
  onPlayFolderSound?: () => void;
  onPlayFolderSelect?: () => void;
  onPlayPopupSound?: () => void;
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({
  onOpenProjectDetail,
  onPlayFolderSound,
  onPlayFolderSelect,
  onPlayPopupSound,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("proj01");
  const [activePopupProject, setActivePopupProject] = useState<ProjectData | null>(PROJECTS[0]);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number }>({ x: 280, y: 160 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lastClickTime, setLastClickTime] = useState<{ id: string; time: number }>({
    id: "",
    time: 0,
  });

  const handleFolderClick = (project: ProjectData) => {
    setSelectedProjectId(project.id);
    setActivePopupProject(project);
    onPlayFolderSelect?.();

    const now = Date.now();
    if (lastClickTime.id === project.id && now - lastClickTime.time < 450) {
      // Double click
      onPlayFolderSound?.();
      onOpenProjectDetail(project);
    } else {
      setLastClickTime({ id: project.id, time: now });
      onPlayPopupSound?.();
    }
  };

  const handleFolderDoubleClick = (project: ProjectData) => {
    onPlayFolderSound?.();
    onOpenProjectDetail(project);
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none text-xs relative">
      {/* Menu Bar */}
      <div className="bg-[#ece9d8] px-2 py-0.5 border-b border-[#706f65] flex space-x-4 text-neutral-800">
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">File</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">Edit</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">View</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">Help</span>
      </div>

      {/* Address & Action Toolbar matching Image 4 and new Image 1 */}
      <div className="bg-[#ece9d8] p-1 border-b border-[#706f65] flex flex-wrap items-center gap-1.5 text-neutral-800">
        {/* Drive Selector Dropdown */}
        <div className="flex items-center space-x-1 win-inset bg-white px-2 py-0.5 text-xs w-48 shadow-inner">
          <HardDrive className="w-3.5 h-3.5 text-neutral-700" />
          <span className="font-semibold text-neutral-800 flex-1 truncate">(C:)</span>
          <span className="text-[10px] text-neutral-500">▼</span>
        </div>

        {/* Retro Toolbar Action Buttons */}
        <div className="flex items-center space-x-1 pl-1 border-l border-neutral-300">
          <button className="win-btn p-1 flex items-center justify-center cursor-pointer" title="Up One Level">
            <ArrowUp className="w-3.5 h-3.5 text-neutral-700" />
          </button>
          <button className="win-btn p-1 flex items-center justify-center cursor-pointer" title="Cut">
            <Scissors className="w-3.5 h-3.5 text-neutral-700" />
          </button>
          <button className="win-btn p-1 flex items-center justify-center cursor-pointer" title="Copy">
            <Copy className="w-3.5 h-3.5 text-neutral-700" />
          </button>
          <button className="win-btn p-1 flex items-center justify-center cursor-pointer" title="Paste">
            <Clipboard className="w-3.5 h-3.5 text-neutral-700" />
          </button>
          <button className="win-btn p-1 flex items-center justify-center cursor-pointer" title="Undo">
            <RotateCcw className="w-3.5 h-3.5 text-neutral-700" />
          </button>
          <button className="win-btn p-1 flex items-center justify-center cursor-pointer" title="Delete">
            <Trash2 className="w-3.5 h-3.5 text-neutral-700" />
          </button>
          <div className="w-px h-4 bg-neutral-400 mx-1" />
          <button className="win-btn p-1 flex items-center justify-center cursor-pointer" title="Grid View">
            <Grid className="w-3.5 h-3.5 text-neutral-700" />
          </button>
          <button className="win-btn p-1 flex items-center justify-center cursor-pointer" title="List View">
            <List className="w-3.5 h-3.5 text-neutral-700" />
          </button>
        </div>
      </div>

      {/* Main Folder Grid Area with subtle pinstripes */}
      <div
        ref={containerRef}
        className="flex-1 bg-white win-inset p-4 overflow-y-auto win-scrollbar relative"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ffffff, #ffffff 2px, #fafafa 2px, #fafafa 4px)",
        }}
      >
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-2 content-start pb-20">
          {PROJECTS.map((proj) => {
            const isSelected = selectedProjectId === proj.id;
            return (
              <div
                key={proj.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFolderClick(proj);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleFolderDoubleClick(proj);
                }}
                className={`flex flex-col items-center p-2 rounded cursor-pointer group transition-all select-none ${
                  isSelected
                    ? "bg-blue-100/90 border border-dotted border-blue-600 shadow-2xs"
                    : "hover:bg-neutral-100/70"
                }`}
                title={`Click for info, double-click to open ${proj.title}`}
              >
                {/* Vintage Yellow Folder Icon */}
                <div className="relative w-12 h-10 mb-1 flex items-center justify-center transition-transform group-hover:scale-105">
                  <svg
                    viewBox="0 0 48 38"
                    className="w-full h-full drop-shadow-sm filter"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4C2 2.89543 2.89543 2 4 2H18L23 8H44C45.1046 8 46 8.89543 46 10V34C46 35.1046 45.1046 36 44 36H4C2.89543 36 2 35.1046 2 34V4Z"
                      fill="#eab308"
                      stroke="#a16207"
                      strokeWidth="1.5"
                    />
                    <rect x="7" y="7" width="34" height="25" rx="1" fill="#fef9c3" />
                    <path
                      d="M2 13L5.5 35.5C5.7 36.8 6.8 37.8 8.1 37.8H43.9C45.2 37.8 46.3 36.8 46.5 35.5L49 13H2Z"
                      fill="#facc15"
                      stroke="#ca8a04"
                      strokeWidth="1.2"
                    />
                  </svg>
                </div>

                {/* Folder Name label */}
                <span
                  className={`text-xs text-center font-mono px-1.5 py-0.5 rounded leading-tight tracking-wide ${
                    isSelected ? "bg-blue-700 text-white font-bold" : "text-neutral-900 font-medium"
                  }`}
                >
                  {proj.folderName}
                </span>
              </div>
            );
          })}
        </div>

        {/* Freely Movable Floating Project Information Dialog */}
        {activePopupProject && (
          <FloatingProjectPopup
            project={activePopupProject}
            position={popupPos}
            onPositionChange={setPopupPos}
            containerRef={containerRef}
            onOpenProject={(p) => {
              onPlayFolderSound?.();
              onOpenProjectDetail(p);
            }}
            onClose={() => setActivePopupProject(null)}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="win-sunken-bar px-3 py-1 text-[11px] text-neutral-700 flex items-center justify-between select-none">
        <span className="font-medium">30 object(s)</span>
        <span className="font-mono text-neutral-600">4.10MB (Drive C:)</span>
      </div>
    </div>
  );
};
