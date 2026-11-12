import React from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { ProjectImage } from "../../data/projects";

interface ImageLightboxProps {
  images: ProjectImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in"
    >
      {/* Lightbox dialog container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="win-frame max-w-4xl w-full bg-[#ece9d8] shadow-2xl flex flex-col overflow-hidden max-h-[92vh]"
      >
        {/* Title Bar */}
        <div className="win-titlebar-active px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ZoomIn className="w-4 h-4" />
            <span className="font-bold text-xs sm:text-sm">
              Image Preview — {currentImg.title} : {currentImg.subtitle} ({currentIndex + 1} of{" "}
              {images.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="win-btn w-5 h-4 flex items-center justify-center p-0 text-black hover:bg-red-500 hover:text-white"
          >
            <X className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Image Display Area */}
        <div className="bg-[#18181b] p-4 flex items-center justify-center relative overflow-hidden flex-1 min-h-[350px]">
          <img
            src={currentImg.src}
            alt={currentImg.subtitle}
            className="max-h-[65vh] max-w-full object-contain shadow-2xl rounded-xs border border-neutral-700"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 win-btn w-9 h-9 rounded-full flex items-center justify-center p-0 shadow-lg hover:bg-white"
                title="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 text-neutral-800" />
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 win-btn w-9 h-9 rounded-full flex items-center justify-center p-0 shadow-lg hover:bg-white"
                title="Next Image"
              >
                <ChevronRight className="w-5 h-5 text-neutral-800" />
              </button>
            </>
          )}
        </div>

        {/* Caption bar */}
        <div className="bg-[#ece9d8] p-3 border-t border-[#706f65] flex items-center justify-between text-xs text-neutral-800">
          <p className="font-medium max-w-2xl text-[11px] sm:text-xs">
            <strong className="text-neutral-900">{currentImg.subtitle}:</strong> {currentImg.caption}
          </p>
          <button
            onClick={onClose}
            className="win-btn px-4 py-1 text-xs font-semibold uppercase shrink-0 ml-4"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
