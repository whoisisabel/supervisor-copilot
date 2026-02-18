"use client";

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 px-8 py-20 text-center shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
        <h2 className="relative text-4xl font-bold text-white md:text-5xl">
          Scale care, not paperwork
        </h2>
        <p className="relative mx-auto mt-6 max-w-xl text-lg text-slate-400">
          Join the supervisors at Shamiri using AI to protect both fellows and
          staff.
        </p>

        <a
          href="/login"
          className="relative mt-10 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-slate-900 hover:bg-indigo-50 transition-all active:scale-95"
        >
          Get Started Now
        </a>
      </div>
    </section>
  );
}
