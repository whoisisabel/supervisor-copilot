"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
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
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleForgotPassword = () => {
    toast.error("Oops! Password reset flow is not part of the assignment");
  };

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

    const parsed = LoginSchema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/login", parsed.data);

      toast.success("Login successful");
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Login failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email && password && Object.keys(errors).length === 0;

  return (
    <main className="flex h-screen items-center justify-center bg-[var(--brand--neutrals--off-white-background)]">
      <div className="relative w-[50%] h-full hidden lg:block overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 20,
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          <Image
            src={background}
            alt="Login background"
            fill
            priority
            className="object-cover opacity-80"
          />
        </motion.div>

        <div className="relative z-10">
          <Image
            src={logo}
            alt="Supervisor Copilot Logo"
            width={100}
            height={20}
            className="m-10 cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
      <div className="flex w-full lg:w-[50%] items-center justify-center">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="w-full max-w-md py-14 px-5"
        >
          <Image
            src={logo}
            alt="Supervisor Copilot Logo"
            width={150}
            height={20}
            className="m-auto mb-10 block lg:hidden cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="text-center lg:text-left mb-6">
            <h1 className="text-4xl font-semibold text-[var(--brand--neutrals--navy-blue)]">
              Welcome back
            </h1>
            <h2 className="text-md font-medium text-[var(--text--default--black-medium)]">
              Enter your credentials to access your dashboard
            </h2>
          </div>

          <label className="mb-4 block">
            <span className="text-sm font-medium text-[var(--text--default--black-medium)]">
              Email
            </span>
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                validate({ email: value, password });
              }}
              className="mt-1 w-full rounded-lg border border-[var(--brand--neutrals--stroke-grey)] px-4 py-3 focus:ring-2 focus:ring-[var(--brand--color--lime)]"
            />

            {email && errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </label>

          <label className="mb-6 block relative">
            <span className="text-sm font-medium text-[var(--text--default--black-medium)]">
              Password
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="your password"
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                validate({ email, password: value });
              }}
              className="mt-1 w-full rounded-lg border border-[var(--brand--neutrals--stroke-grey)] px-4 py-3 pr-10 focus:ring-2 focus:ring-[var(--brand--color--lime)]"
            />

            {password && errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
            <button
              type="button"
              className="absolute right-3 top-10.5 text-[var(--text--default--black-light)]"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </label>

          <button
            disabled={loading || !isFormValid}
            className="w-full rounded-lg bg-[var(--brand--neutrals--navy-blue)] py-3 font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          <button
            type="button"
            onClick={() => handleForgotPassword()}
            className="mt-2 w-full font-semibold text-right text-[var(--brand--neutrals--navy-blue)] hover:text-[var(--text--default--black-light)] cursor-pointer py-3"
          >
            Forgot Password
          </button>
        </form>
      </div>
    </main>
  );
}
