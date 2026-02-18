"use client";

import { ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-200 px-8 py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <span className="text-slate-900 font-bold tracking-tight">Supervisor Copilot</span>
          <span className="hidden md:inline text-slate-300">|</span>
          <span>© {currentYear} · Built for Shamiri</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span className="text-slate-400">Developed by</span>
          <a
            href="https://www.isabelmgendi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 font-bold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            Lebasi
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

      </div>
    </footer>
  );
}