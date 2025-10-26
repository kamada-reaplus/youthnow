import dynamic from "next/dynamic";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FloatingCTAButton } from "./components/layout/FloatingCTAButton";
import { Hero } from "./components/sections/Hero";
import { ProblemSection } from "./components/sections/ProblemSection";

// Below-the-foldは動的インポート
const SolutionSection = dynamic(
  () =>
    import("./components/sections/SolutionSection").then((mod) => ({
      default: mod.SolutionSection,
    })),
  {
    loading: () => <div className="h-screen" />,
  }
);
const ServicesSection = dynamic(() =>
  import("./components/sections/ServicesSection").then((mod) => ({
    default: mod.ServicesSection,
  }))
);
const StorySection = dynamic(() =>
  import("./components/sections/StorySection").then((mod) => ({
    default: mod.StorySection,
  }))
);
const FlowSection = dynamic(() =>
  import("./components/sections/FlowSection").then((mod) => ({
    default: mod.FlowSection,
  }))
);
const FAQSection = dynamic(() =>
  import("./components/sections/FAQSection").then((mod) => ({
    default: mod.FAQSection,
  }))
);
const ContactForm = dynamic(() =>
  import("./components/sections/ContactForm").then((mod) => ({
    default: mod.ContactForm,
  }))
);

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
          <section id="services" aria-label="サービスセクション">
            <ServicesSection />
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
