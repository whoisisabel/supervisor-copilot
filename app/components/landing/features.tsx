export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-8 py-24 z-10 relative">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-[var(--brand--neutrals--navy-blue)]">
          Built for supervisors at scale
        </h2>
        <p className="mt-4 text-[var(--text--default--black-medium)]">
          Designed to support quality, safety, and speed — without replacing
          human expertise.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <FeatureCard
          title="AI session summaries"
          description="Quickly understand what happened in a 60-minute session with clear, structured summaries."
        />
        <FeatureCard
          title="Quality & protocol scoring"
          description="Evaluate growth mindset teaching, facilitation quality, and protocol adherence."
        />
        <FeatureCard
          title="Safety risk detection"
          description="Automatically flag potential safety concerns while allowing supervisors to override AI decisions."
        />
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-[var(--brand--neutrals--card-grey)] p-6">
      <h3 className="text-lg font-semibold text-[var(--brand--neutrals--navy-blue)]">
        {title}
      </h3>
      <p className="mt-3 text-sm text-[var(--text--default--black-medium)]">
        {description}
      </p>
    </div>
  );
}
