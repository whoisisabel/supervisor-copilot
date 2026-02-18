"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Footer from "../../components/main/footer";
import Navbar from "../../components/main/navbar";
import SessionInsightCard from "../../components/main/sessionInsightCard";
import ReviewForm from "../../components/main/reviewForm";
import { api } from "@/lib/api/client";
import { useParams } from "next/navigation";
import { ChevronRight, FileText, Clock, CheckCircle } from "lucide-react";

interface RiskDetection {
  flag: "RISK" | "SAFE";
  quote?: string;
}

interface Analysis {
  summary: string;
  riskDetection: RiskDetection;
}

type Review = {
  sessionId: number;
  status: "SAFE" | "RISK" | "FLAGGED";
  note?: string;
};

type Session = {
  id: number;
  fellow_name: string;
  group_id: string;
  date: string;
  status: "SAFE" | "RISK" | "UNPROCESSED" | "FLAGGED";
  transcript: string;
};

export default function SessionPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | undefined>();
  const [review, setReview] = useState<Review | undefined>();
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const sessionId = params?.id;

  const handleAnalysisComplete = (newAnalysis: Analysis) => {
    setAnalysis(newAnalysis);

    if (session) {
      setSession({
        ...session,
        status: newAnalysis.riskDetection.flag,
      });
    }
  };

  useEffect(() => {
    async function fetchSessionData() {
      if (!sessionId) return;
      try {
        setLoading(true);
        const [sessionRes, analysisRes, reviewRes] = await Promise.all([
          api.get(`/api/sessions/${sessionId}`),
          api
            .get(`/api/analysis?sessionId=${sessionId}`)
            .catch(() => ({ data: null })),
          api
            .get(`/api/reviews?sessionId=${sessionId}`)
            .catch(() => ({ data: null })),
        ]);

        setSession(sessionRes.data);
        setAnalysis(analysisRes.data?.analysis);

        if (reviewRes.data) {
          setReview({
            sessionId: Number(sessionId),
            status: reviewRes.data.final_status,
            note: reviewRes.data.note,
          });
        } else {
          setReview(undefined);
        }
      } catch (err: unknown) {
        console.error("Fetch error:", err);
        toast.error("Failed to load session data");
      } finally {
        setLoading(false);
      }
    }
    fetchSessionData();
  }, [sessionId]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <Navbar session={session?.fellow_name} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            <p className="text-slate-500 animate-pulse">
              Loading secure session data...
            </p>
          </div>
        ) : !session ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">
              Session not found or has been removed.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
                <a
                  href="/dashboard"
                  className="cursor-pointer hover:text-slate-900"
                >
                  Dashboard
                </a>
                <ChevronRight className="w-4 h-4" />
                <span>Sessions</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900 font-medium">
                  {session.fellow_name}
                </span>
              </nav>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-3xl font-bold text-slate-900">
                  {session.fellow_name}&apos;s Session
                </h2>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(session.date).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm
                        ${
                          session.status === "SAFE"
                            ? "bg-emerald-100 text-emerald-700"
                            : session.status === "RISK" ||
                                session.status === "FLAGGED"
                              ? "bg-red-100 text-red-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                    >
                      {session.status}
                    </span>

                    {review && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                        <CheckCircle className="w-3 h-3" />
                        SUPERVISOR VERIFIED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-8">
                <SessionInsightCard
                  analysis={analysis}
                  sessionId={sessionId?.toString()}
                  onAnalysisComplete={handleAnalysisComplete}
                />
                {analysis ? (
                  <ReviewForm
                    review={review}
                    sessionId={sessionId?.toString()}
                  />
                ) : (
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <p className="text-sm text-slate-500">
                      Waiting for AI analysis to enable supervisor review.
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-7">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <h3 className="font-semibold text-slate-700">
                      Raw Transcript
                    </h3>
                  </div>
                  <div className="relative bg-[#fffef0] min-h-[70vh]">
                    <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-red-200/60 pointer-events-none" />
                    <div
                      className="h-[70vh] overflow-y-auto px-12 py-8 text-gray-800 leading-8 scrollbar-thin scrollbar-thumb-slate-200"
                      style={{
                        backgroundImage:
                          "linear-gradient(transparent 31px, #e5eaf5 32px)",
                        backgroundSize: "100% 32px",
                      }}
                    >
                      <pre className="whitespace-pre-wrap font-serif text-lg italic selection:bg-yellow-200/50">
                        {session.transcript}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
