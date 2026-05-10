import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import NetworkConvergence from "@/components/landing/NetworkConvergence";
import HowItWorks from "@/components/landing/HowItWorks";
import PODemoSection from "@/components/landing/PODemoSection";
import Pillars from "@/components/landing/Pillars";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen paper">
      <Navbar />
      <Hero />
      <Problem />
      <NetworkConvergence />
      <HowItWorks />
      <PODemoSection />
      <Pillars />
      <CTA />
      <Footer />
    </main>
  );
}
