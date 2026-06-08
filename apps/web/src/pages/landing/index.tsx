import Navbar from "@/sections/landing/navbar";
import Hero from "@/sections/landing/hero";
import FeaturesSection from "@/sections/landing/features";
import StatsSection from "@/sections/landing/stats";
import ProblemSection from "@/sections/landing/problem";
import HowItWorksSection from "@/sections/landing/how-it-works";
import ComparisonSection from "@/sections/landing/comparison";
import Footer from "@/sections/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ComparisonSection />
      <Footer />
    </>
  );
}
