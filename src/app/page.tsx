import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FloatingCTAButton } from "./components/layout/FloatingCTAButton";
import { Hero } from "./components/sections/Hero";
import { ProblemSection } from "./components/sections/ProblemSection";
import { SolutionSection } from "./components/sections/SolutionSection";
import { PricingSection } from "./components/sections/PricingSection";
import { StorySection } from "./components/sections/StorySection";
import { FlowSection } from "./components/sections/FlowSection";
import { FAQSection } from "./components/sections/FAQSection";
import { ContactForm } from "./components/sections/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative">
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <ProblemSection />
          <SolutionSection />
          <PricingSection />
          <StorySection />
          <FlowSection />
          <FAQSection />
          <ContactForm />
        </main>
        <Footer />
        <FloatingCTAButton />
      </div>
    </div>
  );
}
