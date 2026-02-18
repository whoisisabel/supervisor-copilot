import Image from "next/image";
import logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <Image src={logo} alt="Logo" width={32} height={32} className="rounded-lg shadow-sm" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Supervisor <span className="text-indigo-600">Copilot</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
          <a href="/login" className="rounded-full bg-slate-900 px-6 py-2 text-sm font-bold text-white hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-indigo-900/10">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
}
