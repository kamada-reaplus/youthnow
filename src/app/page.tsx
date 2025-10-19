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
          <section id="hero" aria-label="メインビジュアル">
            <Hero />
          </section>
          <section id="problem" aria-label="課題セクション">
            <ProblemSection />
          </section>
          <section id="solution" aria-label="ソリューションセクション">
            <SolutionSection />
          </section>
          <section id="pricing" aria-label="料金プランセクション">
            <PricingSection />
          </section>
          <section id="strength" aria-label="強みセクション">
            <StorySection />
          </section>
          <section id="flow" aria-label="利用フローセクション">
            <FlowSection />
          </section>
          <section id="faq" aria-label="よくある質問セクション">
            <FAQSection />
          </section>
          <section id="contact" aria-label="お問い合わせフォーム">
            <ContactForm />
          </section>
        </main>
        <Footer />
        <FloatingCTAButton />
      </div>
    </div>
  );
}
