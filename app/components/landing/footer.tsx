"use client";

import { ExternalLink, Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white/50 backdrop-blur-sm px-8 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image src={logo} alt="Logo" width={28} height={28} />
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Supervisor <span className="text-indigo-600">Copilot</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Empowering Shamiri supervisors with AI-assisted insights to ensure quality care and safety in every session.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Product</h4>
              <ul className="space-y-2 text-sm font-medium text-slate-600">
                <li><a href="#features" className="hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="/login" className="hover:text-indigo-600 transition-colors">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm font-medium text-slate-600">
                <li className="cursor-not-allowed opacity-50">Privacy Policy</li>
                <li className="cursor-not-allowed opacity-50">Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500 font-medium">
            © {currentYear} Supervisor Copilot · Built with 💜 for Shamiri
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.isabelmgendi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-indigo-600 transition-all"
            >
              <span>Developed by Lebasi</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}