"use client";

import { Accordion } from "../ui/Accordion";
import { SectionShell } from "../ui/SectionShell";
import { Section } from "../ui/composite";
import { Container } from "../ui/Container";
import { faqs } from "../../content/faqs";

// デザインシステム使用コンポーネント
// - カラー: neutral-white, brand-primary, neutral-black など
// - スペーシング: section-spacing, px-lg, gap-md など
// - タイポグラフィ: text-h6, text-body, text-body-sm など

export function FAQSection() {
  return (
    <SectionShell
      id="faq"
      bgColor="bg-brand-primary"
      diagonalBgColor="bg-neutral-light-cyan"
    >
      <Section id="faq" centered>
        <Section.Header spacing="lg" className="px-lg">
          <Section.Label size="lg" color="white">
            FAQ
          </Section.Label>
          <Section.Title size="responsive" color="white">
            よくあるご質問
          </Section.Title>
        </Section.Header>
      </Section>

      {/* Background blur effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-4xl -left-2xl w-[641px] h-[530px] bg-brand-primary rounded-full blur-3xl" />
        <div className="absolute top-[90px] -left-52 w-[709px] h-[629px] bg-brand-secondary rounded-full blur-3xl" />
      </div>

      <Container size="4xl" padding="none" className="relative z-10">

        {/* FAQ Items */}
        <Accordion
          className="space-y-md mb-3xl"
          items={faqs.map((f, i) => ({
            id: i,
            title: f.question,
            content: f.answer,
          }))}
          allowMultiple={false}
        />
      </Container>
    </SectionShell>
  );
}
