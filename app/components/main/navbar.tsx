"use client";

import { useEffect, useState, memo } from "react";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { LogOut, User, LayoutDashboard, ChevronRight } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api/client";
import toast from "react-hot-toast";

interface NavbarProps {
  session?: string | null;
}

const NavbarComponent = ({ session }: NavbarProps) => {
  const [name, setName] = useState<string>("Supervisor");

  const handleLogout = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      await api.post("/api/logout");
      toast.success("Logged out successfully");
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/current");
        if (res.ok) {
          const data = await res.json();
          setName((prev) => (prev !== data.name ? data.name : prev));
        }
      } catch (e) {
        console.error("Failed to fetch user", e);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="bg-slate-900 p-1.5 rounded-lg group-hover:bg-indigo-600 transition-colors">
              <Image
                src={logo}
                alt="Logo"
                width={22}
                height={22}
                className="brightness-0 invert"
              />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight hidden sm:block">
              Supervisor <span className="text-indigo-600">Copilot</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600 flex items-center gap-2">
              {session ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Session: {session}
                </>
              ) : (
                <>
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r border-slate-200 pr-6 mr-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <User className="text-slate-600 w-4 h-4" />
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-bold text-slate-900 leading-none">
                {name}
              </p>
              <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">
                Admin Level
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors group"
            title="Logout"
          >
            <span className="text-sm font-semibold hidden sm:block">
              Logout
            </span>
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Navbar = memo(NavbarComponent);
export default Navbar;
