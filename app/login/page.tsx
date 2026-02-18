"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { LoginSchema } from "@/lib/validation/loginSchema";
import { api } from "@/lib/api/client";
import axios from "axios";
import { motion } from "framer-motion";
import logo from "../assets/app-logo.png";
import background from "../assets/login-background.jpg";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validate = (values: { email: string; password: string }) => {
    const result = LoginSchema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: { email?: string; password?: string } = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as "email" | "password";
      fieldErrors[field] = issue.message;
    });
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate({ email, password })) return;

    try {
      setLoading(true);
      await api.post("/api/login", { email, password });
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.error
        : "Login failed";
      toast.error(msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-full bg-[#F8F9FB] overflow-hidden">
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden bg-slate-900">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={background}
            alt="Login Background"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="eager"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        <div className="relative z-10 text-center p-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Image
              src={logo}
              alt="Logo"
              width={180}
              height={40}
              className="mx-auto mb-8 invert brightness-0 cursor-pointer h-auto hidden lg:block"
              onClick={() => router.push("/")}
              priority
            />
            <h2 className="text-3xl font-bold text-white mb-4 italic">
              Transforming oversight into insight.
            </h2>
            <p className="text-slate-300 max-w-sm mx-auto">
              Access the Supervisor Copilot dashboard to manage fellow sessions
              and AI analysis.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <Image
              src={logo}
              alt="Supervisor Copilot Logo"
              width={120}
              height={40}
              priority
              className="h-auto w-auto mx-auto mb-10 block lg:hidden cursor-pointer"
              onClick={() => router.push("/")}
            />
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validate({ email: e.target.value, password });
                  }}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all outline-none text-sm
                    ${email && errors.email ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900"}`}
                  placeholder="name@company.com"
                />
              </div>
              {email && errors.email && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    toast.error("Password reset disabled for this demo")
                  }
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validate({ email, password: e.target.value });
                  }}
                  className={`w-full pl-11 pr-11 py-3 rounded-xl border transition-all outline-none text-sm
                    ${password && errors.password ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900"}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {password && errors.password && (
                <p className="mt-1.5 text-xs text-red-500 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              disabled={loading || !email || !password}
              className="group relative w-full bg-slate-900 hover:bg-black text-white py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Sign In"
              )}
              {!loading && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <span className="text-slate-900 font-bold cursor-pointer hover:underline">
              Contact Admin
            </span>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
