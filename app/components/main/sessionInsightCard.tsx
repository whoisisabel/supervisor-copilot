"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle,
  BrainCircuit,
} from "lucide-react";

interface RiskDetection {
  flag: "RISK" | "SAFE";
  quote?: string;
}

interface Analysis {
  summary: string;
  riskDetection: RiskDetection;
}

interface SessionInsightCardProps {
  analysis?: Analysis;
  sessionId?: string;
  onAnalysisComplete: (data: Analysis) => void;
}

export default function SessionInsightCard({
  analysis,
  sessionId,
  onAnalysisComplete,
}: SessionInsightCardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      if (!res.ok) throw new Error();

      const newAnalysis = await res.json();

      toast.success("Analysis complete!");
      onAnalysisComplete(newAnalysis);
      router.refresh();
    } catch (err) {
      toast.error(`AI analysis failed to run, ${err}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!analysis) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
        <BrainCircuit className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h3 className="text-slate-900 font-medium">No Analysis Available</h3>
        <p className="text-slate-500 text-sm mb-6">
          Run the AI to detect risks and summarize the transcript.
        </p>
        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50"
        >
          {isAnalyzing ? "Processing..." : "Run AI Analysis"}
        </button>
      </div>
    );
  }

  const isRisk = analysis.riskDetection.flag === "RISK";

  return (
    <div
      className={`rounded-xl border shadow-sm overflow-hidden transition-all ${
        isRisk
          ? "border-red-200 bg-red-50/30"
          : "border-emerald-200 bg-emerald-50/30"
      }`}
    >
      <div
        className={`px-6 py-4 flex items-center justify-between border-b ${
          isRisk
            ? "border-red-100 bg-red-50"
            : "border-emerald-100 bg-emerald-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <Sparkles
            className={`w-4 h-4 ${isRisk ? "text-red-600" : "text-emerald-600"}`}
          />
          <h2
            className={`font-bold text-sm uppercase tracking-wider ${
              isRisk ? "text-red-800" : "text-emerald-800"
            }`}
          >
            AI Session Insights
          </h2>
        </div>

        <span
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            isRisk
              ? "bg-red-100 text-red-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {isRisk ? (
            <AlertTriangle className="w-3.5 h-3.5" />
          ) : (
            <CheckCircle className="w-3.5 h-3.5" />
          )}
          {analysis.riskDetection.flag}
        </span>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
            Summary
          </h4>
          <p className="text-slate-700 leading-relaxed italic">
            {analysis.summary}
          </p>
        </div>

        {analysis.riskDetection.quote && (
          <div className="relative pl-4 border-l-4 border-red-400">
            <h4 className="text-xs font-semibold text-red-600 uppercase mb-1">
              Risk Indicator Quote
            </h4>
            <p className="text-red-900 text-sm italic font-medium">
              &quot;{analysis.riskDetection.quote}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
