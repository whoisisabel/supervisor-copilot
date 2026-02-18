"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-8 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        AI-Assisted Supervision for Shamiri
      </motion.div>

      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl">
        Review therapy sessions <br className="hidden md:block" />
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          without losing empathy
        </span>
      </h1>

      <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-slate-600">
        Summarize 60-minute sessions in seconds, detect safety risks automatically, and maintain clinical quality across your entire organization.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
        <a href="/login" className="group flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]">
          Launch Dashboard
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}