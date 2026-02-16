import Navbar from "./components/landing/navbar";
import Hero from "./components/landing/hero";
import Features from "./components/landing/features";
import CTA from "./components/landing/cta";
import Footer from "./components/landing/footer";
import BackgroundDecor from "./components/landing/backgroundDecor";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--brand--neutrals--off-white-background)]">
      <BackgroundDecor />
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
