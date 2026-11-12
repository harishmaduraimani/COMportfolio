import React, { useState } from "react";

import {
  FileText,
  Code2,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Maximize2,
} from "lucide-react";

import { ProjectData, PROJECTS } from "../../data/projects";
import { ImageLightbox } from "./ImageLightbox";

interface ProjectDetailWindowProps {
  project: ProjectData;
  onNavigateProject: (project: ProjectData) => void;
  onReturnToIndex: () => void;
  onPlayClickSound?: () => void;
}

// Check whether content actually exists
const hasContent = (value: unknown): boolean => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== null && value !== undefined;
};

export const ProjectDetailWindow: React.FC<
  ProjectDetailWindowProps
> = ({
  project,
  onNavigateProject,
  onReturnToIndex,
  onPlayClickSound,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const currentIndex = PROJECTS.findIndex(
    (p) => p.id === project.id
  );

  const prevProject =
    PROJECTS[
      (currentIndex - 1 + PROJECTS.length) % PROJECTS.length
    ];

  const nextProject =
    PROJECTS[(currentIndex + 1) % PROJECTS.length];

  // Safe arrays
  const images = project.images ?? [];
  const specifications = project.specifications ?? [];
  const technologies = project.technologies ?? [];

  const handleOpenLightbox = (index: number) => {
    setActiveImageIdx(index);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f7f2] select-text text-neutral-800 text-xs win-scrollbar overflow-y-auto">

      {/* MENU BAR */}

      <div className="bg-[#ece9d8] px-2 py-0.5 border-b border-[#706f65] flex space-x-4 text-xs select-none sticky top-0 z-20 text-neutral-800">

        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">
          File
        </span>

        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">
          Edit
        </span>

        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">
          View
        </span>

        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">
          Project
        </span>

        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">
          Help
        </span>

      </div>


      {/* HERO SECTION */}

      <div className="bg-[#f0ede4] border-b-2 border-neutral-300 p-6 sm:p-8 space-y-4">

        <div className="text-[11px] font-mono text-neutral-500 font-semibold tracking-wider">
          PROJECT HERO SECTION:
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-300 pb-2">

          <div className="font-mono text-xs sm:text-sm font-bold text-neutral-800 tracking-wider">
            PROJ // {project.numberStr} &bull; {project.category}
          </div>

          <div className="font-mono text-xs font-semibold text-neutral-600 bg-neutral-200/80 px-2 py-0.5 rounded">
            YEAR: {project.year}
          </div>

        </div>

        <div className="space-y-1">

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-neutral-900 uppercase">
            {project.title}
          </h1>

          <p className="text-sm sm:text-lg font-medium text-neutral-700">
            {project.subtitle}
          </p>

          {hasContent(project.lab) && (
            <div className="text-xs font-mono text-neutral-500 tracking-wider">
              {project.lab}
            </div>
          )}

        </div>


        {/* ACTION BUTTONS */}

        {(hasContent(project.pdfUrl) ||
          hasContent(project.sourceCodeUrl)) && (

          <div className="flex flex-wrap items-center gap-3 pt-2">

            {hasContent(project.pdfUrl) && (
              <a
                href={project.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="win-btn px-3 py-1.5 font-bold text-xs flex items-center space-x-1.5 shadow tracking-wider uppercase hover:bg-neutral-100"
              >
                <FileText className="w-3.5 h-3.5 text-red-600" />
                <span>OPEN PDF</span>
              </a>
            )}

            {hasContent(project.sourceCodeUrl) && (
              <a
                href={project.sourceCodeUrl}
                target="_blank"
                rel="noreferrer"
                className="win-btn px-3 py-1.5 font-bold text-xs flex items-center space-x-1.5 shadow tracking-wider uppercase hover:bg-neutral-100"
              >
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                <span>SOURCE CODE</span>
              </a>
            )}

          </div>
        )}

      </div>


      {/* MAIN DOCUMENTATION */}

      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">


        {/* LEFT COLUMN: IMAGE GALLERY */}

        {/* PROJECT IMAGE */}

{images.length > 0 && (
  <div className="md:col-span-5 space-y-3">

    <div className="font-bold text-xs font-mono tracking-wider text-neutral-700 border-b pb-1 border-neutral-300 uppercase">
      PROJECT PREVIEW
    </div>

    <div
      onClick={() => handleOpenLightbox(0)}
      className="border border-neutral-300 bg-white p-2.5 shadow-sm cursor-pointer group"
    >

      <div className="relative bg-neutral-100 overflow-hidden border border-neutral-200">

        <img
          src={images[0].src}
          alt={project.title}
          className="w-full h-auto max-h-[420px] object-contain group-hover:scale-[1.02] transition-transform duration-200"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">

          <span className="bg-neutral-900/80 text-white text-[10px] px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            CLICK TO ENLARGE
          </span>

        </div>

      </div>

      <div className="pt-2 flex items-center justify-between gap-2">

        <span className="font-mono text-xs font-bold text-neutral-800">
          {project.title}
        </span>

        <Maximize2 className="w-3.5 h-3.5 text-neutral-500" />

      </div>

      {hasContent(images[0].caption) && (
        <p className="text-[11px] text-neutral-600 pt-1 leading-snug">
          {images[0].caption}
        </p>
      )}

    </div>

  </div>
)}

        {/* RIGHT COLUMN: ENGINEERING DOCUMENTATION */}

        <div
          className={`${
            images.length > 0
              ? "md:col-span-7"
              : "md:col-span-12"
          } space-y-6 text-neutral-800`}
        >


          {/* SHORT DESCRIPTION */}

          {hasContent(project.shortDescription) && (
            <section className="space-y-2">

              <h3 className="font-bold text-sm tracking-wide text-neutral-900 font-mono uppercase">
                PROJECT DESCRIPTION
              </h3>

              <p className="leading-relaxed text-xs sm:text-sm text-neutral-700">
                {project.shortDescription}
              </p>

            </section>
          )}


          {/* SYSTEM OVERVIEW */}

          {hasContent(project.systemOverview) && (
            <section className="space-y-2">

              <h3 className="font-bold text-sm tracking-wide text-neutral-900 font-mono uppercase">
                SYSTEM OVERVIEW
              </h3>

              <p className="leading-relaxed text-xs sm:text-sm text-neutral-700">
                {project.systemOverview}
              </p>

            </section>
          )}


          {/* ENGINEERING CHALLENGE */}

          {hasContent(project.engineeringChallenge) && (
            <section className="space-y-2">

              <h3 className="font-bold text-sm tracking-wide text-[#c2410c] font-mono">
                // THE ENGINEERING CHALLENGE & PROBLEM
              </h3>

              <p className="leading-relaxed text-xs sm:text-sm text-neutral-700">
                {project.engineeringChallenge}
              </p>

            </section>
          )}


          {/* ARCHITECTURAL SOLUTION */}

          {hasContent(project.architecturalSolution) && (
            <section className="space-y-2">

              <h3 className="font-bold text-sm tracking-wide text-neutral-900 font-mono uppercase">
                ARCHITECTURAL SOLUTION
              </h3>

              <p className="leading-relaxed text-xs sm:text-sm text-neutral-700">
                {project.architecturalSolution}
              </p>

            </section>
          )}


          {/* HARDWARE DESIGN */}

          {hasContent(project.hardwareDesign) && (
            <section className="space-y-2">

              <h3 className="font-bold text-sm tracking-wide text-neutral-900 font-mono uppercase">
                HARDWARE & CIRCUIT DESIGN
              </h3>

              <p className="leading-relaxed text-xs sm:text-sm text-neutral-700">
                {project.hardwareDesign}
              </p>

            </section>
          )}


          {/* FIRMWARE AND SOFTWARE */}

          {hasContent(project.firmwareSoftware) && (
            <section className="space-y-2">

              <h3 className="font-bold text-sm tracking-wide text-neutral-900 font-mono uppercase">
                FIRMWARE, ALGORITHMS & SOFTWARE
              </h3>

              <p className="leading-relaxed text-xs sm:text-sm text-neutral-700">
                {project.firmwareSoftware}
              </p>

            </section>
          )}


          {/* TECHNICAL SPECIFICATIONS */}

          {specifications.length > 0 && (

            <section className="space-y-2">

              <h3 className="font-bold text-sm tracking-wide text-neutral-900 font-mono uppercase">
                TECHNICAL SPECIFICATIONS
              </h3>

              <div className="border border-neutral-300 rounded-xs overflow-hidden bg-white shadow-2xs">

                <table className="w-full text-left text-xs border-collapse">

                  <tbody>

                    {specifications
                      .filter(
                        (spec) =>
                          hasContent(spec.label) &&
                          hasContent(spec.value)
                      )
                      .map((spec, sIdx) => (

                        <tr
                          key={sIdx}
                          className={
                            sIdx % 2 === 0
                              ? "bg-neutral-50"
                              : "bg-white"
                          }
                        >

                          <td className="p-2 font-mono font-semibold text-neutral-700 border-r border-neutral-200 w-1/3">
                            {spec.label}
                          </td>

                          <td className="p-2 text-neutral-800 font-medium">
                            {spec.value}
                          </td>

                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>

            </section>

          )}


          {/* ENGINEERING ROLE */}

          {hasContent(project.myRole) && (
            <section className="space-y-2">

              <h3 className="font-bold text-sm tracking-wide text-neutral-900 font-mono uppercase">
                MY ENGINEERING ROLE
              </h3>

              <p className="leading-relaxed text-xs sm:text-sm text-neutral-700 bg-neutral-100 p-3 border-l-2 border-blue-600">
                {project.myRole}
              </p>

            </section>
          )}


          {/* TECHNOLOGIES */}

          {technologies.length > 0 && (

            <section className="space-y-2">

              <h3 className="font-bold text-sm tracking-wide text-neutral-900 font-mono uppercase">
                TECHNOLOGIES & TOOLS
              </h3>

              <div className="flex flex-wrap gap-1.5 pt-1">

                {technologies
                  .filter((tech) => hasContent(tech))
                  .map((tech, tIdx) => (

                    <span
                      key={tIdx}
                      className="win-btn px-2 py-0.5 text-[11px] font-mono text-neutral-800"
                    >
                      {tech}
                    </span>

                  ))}

              </div>

            </section>

          )}

        </div>

      </div>


      {/* FOOTER NAVIGATION */}

      <div className="sticky bottom-0 mt-auto bg-[#ece9d8] border-t border-[#706f65] p-3 flex flex-wrap items-center justify-between gap-2 z-10 select-none">

        <button
          onClick={() => {
            onPlayClickSound?.();
            onNavigateProject(prevProject);
          }}
          className="win-btn px-3 py-1 font-semibold text-xs flex items-center space-x-1 hover:bg-neutral-100"
          title={`Previous: ${prevProject.title}`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>PREVIOUS ({prevProject.folderName})</span>
        </button>


        <button
          onClick={() => {
            onPlayClickSound?.();
            onReturnToIndex();
          }}
          className="win-btn px-4 py-1 font-bold text-xs flex items-center space-x-1.5 bg-[#dfdfdf] hover:bg-neutral-100"
          title="Return to Project Explorer"
        >
          <FolderOpen className="w-3.5 h-3.5 text-yellow-600" />
          <span>PROJECT INDEX (C:)</span>
        </button>


        <button
          onClick={() => {
            onPlayClickSound?.();
            onNavigateProject(nextProject);
          }}
          className="win-btn px-3 py-1 font-semibold text-xs flex items-center space-x-1 hover:bg-neutral-100"
          title={`Next: ${nextProject.title}`}
        >
          <span>NEXT ({nextProject.folderName})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

      </div>


      {/* IMAGE LIGHTBOX */}

      {images.length > 0 && (
        <ImageLightbox
          images={images}
          currentIndex={activeImageIdx}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNext={() =>
            setActiveImageIdx(
              (prev) => (prev + 1) % images.length
            )
          }
          onPrev={() =>
            setActiveImageIdx(
              (prev) =>
                (prev - 1 + images.length) % images.length
            )
          }
        />
      )}

    </div>
  );
};