import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCw, ExternalLink, Globe, Search } from "lucide-react";
import { PROFILE_DATA } from "../../data/profile";

interface BrowserWindowProps {
  browserName?: "Chrome" | "Edge";
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({ browserName = "Chrome" }) => {
  const [url, setUrl] = useState<string>("https://harish-maduraimani.engineering/portfolio");

  return (
    <div className="flex flex-col h-full bg-[#f1f3f4] text-neutral-800 text-xs select-none overflow-hidden">
      {/* Browser Tab Bar */}
      <div className="bg-[#dee1e6] px-3 pt-2 flex items-center space-x-2 border-b border-neutral-300">
        <div className="bg-white px-3 py-1.5 rounded-t-lg flex items-center space-x-2 shadow-xs border-t border-x border-neutral-300 max-w-xs">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-medium text-xs truncate">Harish Maduraimani — Engineering</span>
        </div>
      </div>

      {/* Address Bar Toolbar */}
      <div className="bg-white px-3 py-2 border-b border-neutral-200 flex items-center space-x-2 shadow-2xs">
        <button className="p-1 hover:bg-neutral-100 rounded text-neutral-600 cursor-pointer" title="Back">
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
        <button className="p-1 hover:bg-neutral-100 rounded text-neutral-600 cursor-pointer" title="Forward">
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button className="p-1 hover:bg-neutral-100 rounded text-neutral-600 cursor-pointer" title="Reload">
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        {/* URL Pill Input */}
        <div className="flex-1 bg-[#f1f3f4] hover:bg-[#e8eaed] rounded-full px-3 py-1 flex items-center space-x-2 text-neutral-700 transition-colors">
          <Search className="w-3 h-3 text-neutral-500 shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-transparent outline-none font-sans text-xs"
          />
        </div>
      </div>

      {/* Browser Body / Hub */}
      <div className="flex-1 bg-white p-6 overflow-y-auto win-scrollbar select-text space-y-6">
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
            <Globe className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-neutral-900">
            {browserName} Web Gateway &mdash; Harish Labs
          </h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Welcome to the official web navigation hub for Harish Maduraimani's online engineering platforms, open-source repositories, and professional networks.
          </p>

          {/* Quick Access Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-left">
            <a
              href={PROFILE_DATA.contact.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 border border-neutral-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all flex items-center justify-between group"
            >
              <div>
                <div className="font-bold text-xs text-neutral-900 group-hover:text-blue-600">
                  GitHub Profile
                </div>
                <div className="text-[11px] text-neutral-500">
                  github.com/harishmaduraimani
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-blue-600" />
            </a>

            <a
              href={PROFILE_DATA.contact.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 border border-neutral-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all flex items-center justify-between group"
            >
              <div>
                <div className="font-bold text-xs text-neutral-900 group-hover:text-blue-600">
                  LinkedIn Network
                </div>
                <div className="text-[11px] text-neutral-500">
                  linkedin.com/in/harish-maduraimani/
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-blue-600" />
            </a>

            <a
              href={PROFILE_DATA.contact.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 border border-neutral-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all flex items-center justify-between group"
            >
              <div>
                <div className="font-bold text-xs text-neutral-900 group-hover:text-blue-600">
                  Official Resume PDF
                </div>
                <div className="text-[11px] text-neutral-500">
                  resume.pdf
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-blue-600" />
            </a>

            <a
              href={`mailto:${PROFILE_DATA.contact.email}`}
              className="p-3 border border-neutral-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all flex items-center justify-between group"
            >
              <div>
                <div className="font-bold text-xs text-neutral-900 group-hover:text-blue-600">
                  Direct Email Contact
                </div>
                <div className="text-[11px] text-neutral-500">
                  {PROFILE_DATA.contact.email}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-blue-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
