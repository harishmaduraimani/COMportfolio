import React, { useState } from "react";
import { Mail, Check, ExternalLink, FileText } from "lucide-react";
import { PROFILE_DATA } from "../../data/profile";

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const ContactWindow: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.contact.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const handleGetInTouch = () => {
    window.location.href = `mailto:${PROFILE_DATA.contact.email}?subject=Collaboration%20with%20Harish%20Maduraimani`;
  };

  return (
    <div className="flex flex-col h-full bg-[#f7f6f0] select-text text-neutral-800 text-xs">
      {/* Scrollable content container */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto win-scrollbar space-y-6">
        {/* Main Heading & Subtitle */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-wide text-neutral-900 uppercase">
            {PROFILE_DATA.contact.heading}
          </h2>
          <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
            {PROFILE_DATA.contact.description}
          </p>
        </div>

        {/* Primary Direct Inbox Card */}
        <div className="bg-[#f0ede2] border border-neutral-300 p-5 rounded max-w-md mx-auto w-full text-center space-y-3 shadow-xs">
          <div className="flex items-center justify-center space-x-1.5 text-neutral-600 text-xs font-semibold tracking-wider uppercase">
            <Mail className="w-4 h-4 text-neutral-500" />
            <span>PRIMARY DIRECT INBOX</span>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="font-mono text-sm sm:text-base font-bold text-neutral-900 selection:bg-blue-200">
              {PROFILE_DATA.contact.email}
            </span>
            <button
              onClick={handleCopyEmail}
              className="win-btn px-2.5 py-1 text-[11px] font-semibold flex items-center space-x-1 transition-all"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-600 stroke-[3]" />
                  <span className="text-green-700 font-bold">COPIED!</span>
                </>
              ) : (
                <span>COPY</span>
              )}
            </button>
          </div>

          {/* Large GET IN TOUCH Button */}
          <div className="pt-2">
            <button
              onClick={handleGetInTouch}
              className="win-btn px-6 py-2 text-xs sm:text-sm font-bold tracking-wider uppercase border-2 shadow-md hover:bg-neutral-100 transition-all cursor-pointer outline-dashed outline-1 outline-neutral-500"
            >
              GET IN TOUCH
            </button>
          </div>
        </div>

        {/* Social and External Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto w-full pt-2">
          {/* GitHub */}
          <div className="border border-neutral-300 p-3 bg-white/70 rounded flex items-start space-x-3 shadow-2xs">
            <GithubIcon className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
            <div className="space-y-0.5 overflow-hidden">
              <div className="font-bold text-xs uppercase tracking-wide">GITHUB</div>
              <div className="font-mono text-[11px] text-neutral-700">
                {PROFILE_DATA.contact.githubUsername}
              </div>
              <a
                href={PROFILE_DATA.contact.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline flex items-center space-x-1 text-[11px] truncate"
              >
                <span className="truncate">{PROFILE_DATA.contact.githubUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="border border-neutral-300 p-3 bg-white/70 rounded flex items-start space-x-3 shadow-2xs">
            <LinkedinIcon className="w-5 h-5 text-[#0a66c2] shrink-0 mt-0.5" />
            <div className="space-y-0.5 overflow-hidden">
              <div className="font-bold text-xs uppercase tracking-wide">LINKEDIN</div>
              <div className="font-mono text-[11px] text-neutral-700">
                {PROFILE_DATA.contact.linkedinUsername}
              </div>
              <a
                href={PROFILE_DATA.contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline flex items-center space-x-1 text-[11px] truncate"
              >
                <span className="truncate">{PROFILE_DATA.contact.linkedinUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* Resume PDF */}
          <div className="border border-neutral-300 p-3 bg-white/70 rounded flex items-start space-x-3 sm:col-span-2 shadow-2xs">
            <FileText className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5 overflow-hidden flex-1">
              <div className="font-bold text-xs uppercase tracking-wide">RESUME</div>
              <div className="flex items-center justify-between">
                <a
                  href={PROFILE_DATA.contact.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-semibold flex items-center space-x-1 text-xs"
                >
                  <span>View Resume (PDF)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-neutral-500 text-[10px] hidden sm:inline">
                  resume.pdf
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Panel matching Figma reference */}
      <div className="win-sunken-bar p-2.5 text-center text-xs space-y-1 select-none">
        <div className="font-semibold text-neutral-700 tracking-wide text-[11px]">
          {PROFILE_DATA.contact.location}
        </div>
        <div className="flex items-center justify-center space-x-2 text-[11px] font-bold text-neutral-900 tracking-wider">
          <span>{PROFILE_DATA.contact.availability}</span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)] animate-pulse" />
        </div>
      </div>
    </div>
  );
};
