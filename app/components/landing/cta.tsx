export default function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-8 py-24 text-center z-10 relative">
      <div className="rounded-3xl bg-[var(--brand--neutrals--navy-blue)] px-8 py-16 text-white">
        <h2 className="text-3xl font-semibold">
          AI that supports care, not replaces it
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Supervisor Copilot is designed with empathy, safety, and human
          accountability at its core.
        </p>

        <a
          href="/login"
          className="mt-8 inline-block rounded-xl bg-[var(--brand--color--lime)] px-6 py-3 font-medium text-[var(--brand--neutrals--navy-blue)] hover:opacity-90"
        >
          Try the dashboard
        </a>
      </div>
    </section>
  );
}
