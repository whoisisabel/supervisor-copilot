export default function Hero() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-8 py-24 text-center">
      <span className="mb-4 inline-block rounded-full bg-[var(--brand--color--lime-light)] px-4 py-1 text-sm font-medium text-[var(--brand--neutrals--navy-blue)]">
        AI-assisted supervision
      </span>

      <h1 className="mt-6 text-4xl font-semibold leading-tight text-[var(--brand--neutrals--navy-blue)] md:text-5xl">
        Review therapy sessions faster,
        <br />
        without losing human judgment
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text--default--black-medium)]">
        Supervisor Copilot helps Shamiri Supervisors summarize sessions, assess
        facilitation quality and flag safety risks — while keeping humans fully
        in control.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <a
          href="/login"
          className="rounded-xl bg-[var(--brand--neutrals--navy-blue)] px-6 py-3 text-white font-medium hover:opacity-90"
        >
          Get started
        </a>
        <a
          href="#features"
          className="rounded-xl border border-[var(--brand--color--lilac-purple)] px-6 py-3 font-medium text-[var(--brand--neutrals--navy-blue)] hover:bg-[var( --brand--color--lilac-purple)]"
        >
          Learn more
        </a>
      </div>
    </section>
  );
}