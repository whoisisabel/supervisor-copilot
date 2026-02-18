"use client";

import { motion } from "framer-motion";
import { Sparkles, BarChart3, ShieldAlert } from "lucide-react";

export default function Features() {
  const featureData = [
    {
      title: "AI session summaries",
      description:
        "Quickly understand what happened in a 60-minute session with clear, structured summaries.",
      icon: Sparkles,
    },
    {
      title: "Quality & protocol scoring",
      description:
        "Evaluate growth mindset teaching, facilitation quality, and protocol adherence.",
      icon: BarChart3,
    },
    {
      title: "Safety risk detection",
      description:
        "Automatically flag potential safety concerns while allowing supervisors to override AI decisions.",
      icon: ShieldAlert,
    },
  ];

  return (
    <motion.section
      id="features"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="mx-auto max-w-6xl px-8 py-24 z-10 relative my-20"
    >
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
          Built for supervisors at scale
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Designed to support quality, safety, and speed — without replacing
          human expertise.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {featureData.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </motion.section>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
}) {
  return (
    <div className="group relative rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-3">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-4 text-slate-600 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
