import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Square,
  Circle,
  Pencil,
  Paintbrush,
  Eraser,
  RotateCcw,
  Crop,
  Pipette,
  ZoomIn,
  Type,
  Maximize2,
  Trash2,
  Download,
} from "lucide-react";

interface PaintWindowProps {
  onPlayToolSelect?: () => void;
  onPlayDraw?: () => void;
  onPlayClear?: () => void;
}

export const PaintWindow: React.FC<PaintWindowProps> = ({
  onPlayToolSelect,
  onPlayDraw,
  onPlayClear,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>("pencil");
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const strokeCounter = useRef<number>(0);

  // 28 Classic MS Paint colors
  const palette = [
    "#000000", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080",
    "#808040", "#004040", "#0080ff", "#004080", "#8000ff", "#804000",
    "#ffffff", "#c0c0c0", "#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff",
    "#ffff80", "#00ff80", "#80ffff", "#7f7fff", "#ff0080", "#ff8040",
  ];

  // Draw initial image on canvas with proper aspect ratio cover
  const loadInitialImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/assets/harish_hmm_portrait.jpg";
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Fit with aspect cover so HMM Dez! N is visible at the top and photo fills the canvas cleanly
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    };
  }, []);

  useEffect(() => {
    loadInitialImage();
  }, [loadInitialImage]);

  const handleToolChange = (toolId: string) => {
    setSelectedTool(toolId);
    onPlayToolSelect?.();
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    onPlayClear?.();

    // Reset to pure white or reload Harish's image
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleResetImage = () => {
    onPlayClear?.();
    loadInitialImage();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "harish-paint-art.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    strokeCounter.current = 0;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = selectedTool === "eraser" ? "#ffffff" : selectedColor;
    ctx.lineWidth = selectedTool === "eraser" ? brushSize * 4 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    onPlayDraw?.();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    strokeCounter.current++;
    if (strokeCounter.current % 12 === 0) {
      onPlayDraw?.();
    }
  };

  const stopDraw = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#ece9d8] select-none text-xs">
      {/* Menu Bar */}
      <div className="bg-[#ece9d8] px-2 py-0.5 border-b border-[#706f65] flex space-x-3 text-neutral-800">
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">File</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">Edit</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">View</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">Image</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">Options</span>
        <span className="cursor-pointer hover:bg-neutral-200 px-1 rounded">Help</span>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden p-1.5 space-x-1.5">
        {/* Left Toolbar */}
        <div className="w-16 bg-[#ece9d8] win-sunken-bar p-1 flex flex-col justify-between shrink-0">
          {/* Tools Grid (2 columns) */}
          <div className="grid grid-cols-2 gap-1 content-start">
            {[
              { id: "free-select", icon: Crop, label: "Select" },
              { id: "select", icon: Square, label: "Rect" },
              { id: "eraser", icon: Eraser, label: "Eraser" },
              { id: "fill", icon: Paintbrush, label: "Fill" },
              { id: "dropper", icon: Pipette, label: "Dropper" },
              { id: "zoom", icon: ZoomIn, label: "Zoom" },
              { id: "pencil", icon: Pencil, label: "Pencil" },
              { id: "brush", icon: Paintbrush, label: "Brush" },
              { id: "airbrush", icon: Maximize2, label: "Spray" },
              { id: "text", icon: Type, label: "Text" },
              { id: "line", icon: Square, label: "Line" },
              { id: "ellipse", icon: Circle, label: "Oval" },
            ].map((tool) => {
              const IconComp = tool.icon;
              const isSelected = selectedTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolChange(tool.id)}
                  className={`w-6 h-6 flex items-center justify-center p-1 rounded-sm cursor-pointer ${
                    isSelected
                      ? "win-inset bg-[#dfdbcf] shadow-inner"
                      : "win-btn hover:bg-neutral-100"
                  }`}
                  title={tool.label}
                >
                  <IconComp className="w-3.5 h-3.5 text-neutral-800 stroke-[2.2]" />
                </button>
              );
            })}
          </div>

          {/* Brush Thickness Selector */}
          <div className="pt-2 border-t border-neutral-400 space-y-1">
            <div className="text-[10px] text-neutral-600 font-semibold text-center">SIZE</div>
            <div className="flex flex-col space-y-1 items-center">
              {[2, 4, 8, 14].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setBrushSize(size);
                    onPlayToolSelect?.();
                  }}
                  className={`w-full py-0.5 flex items-center justify-center rounded cursor-pointer ${
                    brushSize === size ? "bg-blue-600 text-white" : "hover:bg-neutral-200"
                  }`}
                >
                  <span
                    className="block rounded-full bg-current"
                    style={{ width: `${size + 2}px`, height: `${size + 2}px` }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Actions */}
          <div className="pt-2 border-t border-neutral-400 space-y-1">
            <button
              onClick={handleResetImage}
              className="win-btn w-full py-1 text-[10px] font-semibold flex items-center justify-center space-x-1"
              title="Reset to Harish Portrait"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleClearCanvas}
              className="win-btn w-full py-1 text-[10px] font-semibold flex items-center justify-center space-x-1 text-red-700"
              title="Clear Canvas to White"
            >
              <Trash2 className="w-2.5 h-2.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Center Drawing Canvas Container */}
        <div className="flex-1 overflow-auto bg-[#808080] win-inset p-2 flex items-center justify-center">
          <div className="relative shadow-xl border-2 border-neutral-600 bg-white">
            <canvas
              ref={canvasRef}
              width={260}
              height={390}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              className="cursor-crosshair block"
              style={{ width: "260px", height: "390px" }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Color Palette */}
      <div className="bg-[#ece9d8] border-t border-[#706f65] p-1.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Active color swatch */}
          <div className="relative w-8 h-8 win-sunken-bar p-0.5 shrink-0">
            <div className="absolute right-1 bottom-1 w-4 h-4 bg-white border border-neutral-600" />
            <div
              className="absolute left-1 top-1 w-4 h-4 border border-black shadow"
              style={{ backgroundColor: selectedTool === "eraser" ? "#ffffff" : selectedColor }}
            />
          </div>

          {/* 28 Swatches in 2 Rows */}
          <div className="grid grid-rows-2 grid-flow-col gap-0.5 win-sunken-bar p-0.5">
            {palette.map((color, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedColor(color);
                  onPlayToolSelect?.();
                }}
                className="w-3.5 h-3.5 border border-neutral-400 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Export / Save Button */}
        <button
          onClick={handleDownload}
          className="win-btn px-2.5 py-1 text-[11px] font-semibold flex items-center space-x-1 cursor-pointer"
          title="Save Artwork"
        >
          <Download className="w-3 h-3" />
          <span>Save Art</span>
        </button>
      </div>

      {/* Status Bar */}
      <div className="win-sunken-bar px-2 py-0.5 text-[11px] text-neutral-700 flex justify-between select-none">
        <span>For Help, click Help Topics on the Help Menu.</span>
        <span className="font-mono text-[10px]">260 x 390px</span>
      </div>
    </div>
  );
};
