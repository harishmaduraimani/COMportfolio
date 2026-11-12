import React, { useState } from "react";
import { Layers, Eye, Cpu, CheckCircle } from "lucide-react";

export const KiCadWindow: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>("all");

  const layers = [
    { id: "all", name: "All Copper Layers (Composite)", color: "#10b981" },
    { id: "top", name: "F.Cu (Top Signal & RF Microstrip)", color: "#ef4444" },
    { id: "gnd", name: "In1.Cu (Continuous Ground Plane)", color: "#3b82f6" },
    { id: "pwr", name: "In2.Cu (Split Power Rails 3.3V/VBAT)", color: "#f59e0b" },
    { id: "bot", name: "B.Cu (Bottom Signal & Thermal Pad)", color: "#8b5cf6" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1c2128] text-neutral-200 select-none text-xs win-scrollbar overflow-hidden">
      {/* KiCad Toolbar */}
      <div className="bg-[#2d333b] p-2 border-b border-[#444c56] flex items-center justify-between text-neutral-300">
        <div className="flex items-center space-x-2 font-mono">
          <span className="font-bold text-white text-xs">KiCad 8.0 PCB Editor</span>
          <span className="text-neutral-500">&bull;</span>
          <span className="text-neutral-400">SafeNest_RevB_4Layer.kicad_pcb</span>
        </div>
        <div className="flex items-center space-x-1 font-mono text-[11px] text-emerald-400">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>DRC: 0 Errors / 0 Warnings</span>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Layer Selector Side Panel */}
        <div className="w-56 bg-[#22272e] border-r border-[#444c56] p-3 space-y-3 shrink-0">
          <div className="font-bold text-xs uppercase tracking-wider text-neutral-400 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>PCB Layer Stackup</span>
          </div>

          <div className="space-y-1">
            {layers.map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveLayer(l.id)}
                className={`w-full text-left p-2 rounded flex items-center space-x-2 cursor-pointer transition-colors text-[11px] ${
                  activeLayer === l.id
                    ? "bg-[#373e47] text-white font-bold border-l-2 border-l-blue-400"
                    : "text-neutral-400 hover:bg-[#2d333b]"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: l.color }}
                />
                <span className="truncate">{l.name}</span>
              </button>
            ))}
          </div>

          {/* Design Specs Box */}
          <div className="pt-3 border-t border-[#444c56] space-y-1.5 text-[11px] text-neutral-400">
            <div className="font-bold text-neutral-300 uppercase">Board Geometry</div>
            <div>Dimensions: 48.0 x 36.5 mm</div>
            <div>Trace/Space: 0.127 mm (5 mil)</div>
            <div>Min Drill: 0.3 mm Via</div>
            <div>RF Impedance: 50 Ω Coplanar Waveguide</div>
          </div>
        </div>

        {/* Center PCB Schematic Visualizer */}
        <div className="flex-1 bg-[#0d1117] p-4 flex flex-col items-center justify-center relative overflow-auto">
          {/* Visual Board Inspection Image */}
          <div className="relative border border-[#30363d] rounded shadow-2xl overflow-hidden max-w-md w-full bg-black/60">
            <img
              src="/assets/safenest_pcb.png"
              alt="SafeNest PCB"
              className="w-full h-auto object-contain"
            />
            <div className="absolute bottom-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>Layer Filter: {activeLayer.toUpperCase()} Active</span>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-neutral-400 font-mono text-center max-w-sm">
            4-layer impedance-controlled FR4 PCB engineered for ESP32-S3 + Semtech SX1262 LoRa with MPPT solar charger.
          </p>
        </div>
      </div>
    </div>
  );
};
