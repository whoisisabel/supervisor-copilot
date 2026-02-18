"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  Users,
  Calendar,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
} from "lucide-react";

type Session = {
  id: number;
  fellow_name: string;
  group_id: string;
  date: string;
  status: "SAFE" | "RISK" | "UNPROCESSED" | "FLAGGED";
};

interface Props {
  initialSessions?: Session[];
}

const statusStyles = {
  SAFE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  RISK: "bg-red-50 text-red-700 border-red-200 animate-pulse",
  FLAGGED: "bg-amber-50 text-amber-700 border-amber-200",
  UNPROCESSED: "bg-slate-50 text-slate-600 border-slate-200",
};

export default function SessionTable({ initialSessions = [] }: Props) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const filteredSessions = useMemo(() => {
    return initialSessions.filter((s) => {
      const matchesSearch = s.fellow_name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesTab = activeTab === "ALL" || s.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [search, activeTab, initialSessions]);

  const tabs = ["ALL", "RISK", "FLAGGED", "SAFE", "UNPROCESSED"];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search fellow name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredSessions.length > 0 ? (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredSessions.map((session) => (
              <motion.div
                key={session.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -4 }}
                className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
              >
                <div className="absolute top-5 right-5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusStyles[session.status]}`}
                  >
                    {session.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {session.fellow_name}
                      </h3>
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Users size={14} />
                          <span>Group {session.group_id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Calendar size={14} />
                          <span>
                            {new Date(session.date).toLocaleDateString(
                              undefined,
                              { dateStyle: "medium" },
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link
                      href={`/sessions/${session.id}`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-white text-sm font-semibold hover:bg-indigo-600 transition-all active:scale-95"
                    >
                      Details
                      <ArrowRight size={16} />
                    </Link>

                    <Link
                      href={`/sessions/${session.id}`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 text-slate-600 px-4 py-2.5 text-sm font-semibold hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-95"
                    >
                      <ShieldAlert size={16} />
                      Review
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="text-slate-400 w-6 h-6" />
          </div>
          <h3 className="text-slate-900 font-semibold">No sessions found</h3>
          <p className="text-slate-500 text-sm">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
