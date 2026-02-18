import Navbar from "./components/landing/navbar";
import Hero from "./components/landing/hero";
import Features from "./components/landing/features";
import CTA from "./components/landing/cta";
import Footer from "./components/landing/footer";
import ScrollToTop from "./components/landing/scrollToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAFAFA] text-slate-900 selection:bg-indigo-100">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-lime-100/40 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <CTA />
        <Footer />
      </div>
      <ScrollToTop />
    </main>
  );
}