import React from "react";
import { HelpCircle, X } from "lucide-react";
import { ProjectData } from "../../data/projects";

interface ProjectInfoModalProps {
  project: ProjectData;
  onOpenProject: (project: ProjectData) => void;
  onClose: () => void;
}

export const ProjectInfoModal: React.FC<ProjectInfoModalProps> = ({
  project,
  onOpenProject,
  onClose,
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-4 bottom-4 z-30 w-84 sm:w-96 win-frame shadow-2xl animate-fade-in font-sans text-xs select-none"
    >
      {/* Title bar */}
      <div className="win-titlebar-active px-2 py-1 flex items-center justify-between">
        <span className="font-bold text-xs">Project Information</span>
        <button
          onClick={onClose}
          className="w-4 h-3.5 win-btn flex items-center justify-center p-0 text-black hover:bg-red-500 hover:text-white"
        >
          <X className="w-2.5 h-2.5 stroke-[3]" />
        </button>
      </div>

      {/* Body */}
      <div className="bg-[#ece9d8] p-3.5 space-y-3">
        <div className="flex items-start space-x-3">
          {/* Blue Question Mark Bubble Icon matching Figma Image 4 */}
          <div className="w-10 h-10 rounded-full bg-[#1e40af] flex items-center justify-center text-white shrink-0 shadow-md">
            <span className="text-xl font-bold font-serif italic">?</span>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="text-neutral-800 leading-snug">
              <span className="font-medium">Project name: </span>
              <span className="font-semibold">"{project.folderName}"</span>
              <br />
              <span className="font-medium">Project title: </span>
              <span className="font-semibold">"{project.title} – {project.subtitle}"</span>
            </div>

            <p className="text-neutral-700 text-[11px] leading-relaxed pt-1">
              {project.shortDescription}
            </p>

            <div className="font-medium text-neutral-800 pt-1 text-[11px]">
              Would you like to open this project?
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-neutral-300">
          <button
            onClick={() => onOpenProject(project)}
            className="win-btn px-3 py-1 font-bold text-xs uppercase shadow tracking-wide cursor-pointer hover:bg-neutral-100"
          >
            YES, OPEN PROJECT
          </button>
          <button
            onClick={onClose}
            className="win-btn px-3 py-1 font-semibold text-xs uppercase shadow tracking-wide cursor-pointer hover:bg-neutral-100"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
