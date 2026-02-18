"use client";

import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api/client";
import Footer from "../components/main/footer";
import Navbar from "../components/main/navbar";
import SessionTable from "../components/main/sessionTable";
import StatCard from "../components/main/statCard";

import {
  LayoutDashboard,
  AlertCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";

type Session = {
  id: number;
  fellow_name: string;
  group_id: string;
  date: string;
  status: "SAFE" | "RISK" | "UNPROCESSED" | "FLAGGED";
};

export default function DashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => {
    return {
      total: sessions.length,
      risk: sessions.filter(
        (s) => s.status === "RISK" || s.status === "FLAGGED",
      ).length,
      pending: sessions.filter((s) => s.status === "UNPROCESSED").length,
      safe: sessions.filter((s) => s.status === "SAFE").length,
    };
  }, [sessions]);

  async function fetchSessions() {
    try {
      setLoading(true);
      const res = await api.get("/api/sessions");
      setSessions(res.data);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "error" in err.response.data
      ) {
        // @ts-expect-error: error shape from axios
        toast.error(err.response.data.error || "Failed to load sessions");
      } else {
        toast.error("Failed to load sessions");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 md:py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Session Oversight
            </h2>
            <p className="text-slate-500 text-sm">
              Monitor and review recent fellow interactions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Total Sessions"
            value={stats.total}
            icon={<LayoutDashboard size={18} />}
            color="blue"
          />
          <StatCard
            label="Critical Risks"
            value={stats.risk}
            icon={<AlertCircle size={18} />}
            color="red"
          />
          <StatCard
            label="Unprocessed"
            value={stats.pending}
            icon={<Clock3 size={18} />}
            color="amber"
          />
          <StatCard
            label="Safe Sessions"
            value={stats.safe}
            icon={<CheckCircle2 size={18} />}
            color="emerald"
          />
        </div>

        <div className="bg-white rounded-3xl p-1 shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="p-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-48 w-full bg-slate-100 animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : sessions.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-slate-400 font-medium">
                  No sessions found in the database.
                </p>
              </div>
            ) : (
              <SessionTable initialSessions={sessions} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


