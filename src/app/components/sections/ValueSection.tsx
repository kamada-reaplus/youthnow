"use client";

import { SectionShell } from "../ui/SectionShell";
import { Section } from "../ui/composite";
import { ContactButton } from "../ui/ContactButton";
import { ValueCard } from "../ui/ValueCard";
import { Container } from "../ui/Container";
import { VALUES } from "../../content/values";
import { parseTextWithMarker } from "../../lib/utils";

export function ValueSection() {
  return (
    <SectionShell
      id="value"
      bgColor="bg-brand-primary"
      diagonalBgColor="bg-neutral-light-cyan"
      className="section-spacing px-xl md:px-lg relative overflow-x-hidden -mb-px"
    >
      <Container
        size="7xl"
        padding="none"
        className="relative z-10 px-xl lg:px-2xl"
      >
        {/* Section Header */}
        <Section id="value" centered>
          <Section.Header spacing="lg" className="mb-2xl lg:mb-3xl">
            <Section.Label size="lg" color="white">
              VALUE
            </Section.Label>
            <Section.Title color="white" size="responsive">
              Youth Now!が提供する価値
            </Section.Title>
            <Section.Subtitle
              size="md"
              color="white"
              className="max-w-2xl mx-auto mt-sm"
            >
              以下の3つの価値を提供し、あなたの課題を解決します。
            </Section.Subtitle>
          </Section.Header>
        </Section>

        {/* Values - Before/After Cards */}
        <div className="space-y-2xl lg:space-y-3xl">
          {VALUES.map((s, i) => (
            <ValueCard key={i}>
              <ValueCard.TwoColumn>
                {/* Left: Number, Category, Before */}
                <ValueCard.Left>
                  <ValueCard.LeftHeader>
                    <ValueCard.Number>{s.ValueNumber}</ValueCard.Number>
                    <ValueCard.Category>{s.problemCategory}</ValueCard.Category>
                  </ValueCard.LeftHeader>

                  <ValueCard.LeftBefore>
                    <ValueCard.BeforeBadge />
                    <div className="flex items-start gap-3 md:gap-4">
                      <ValueCard.BeforeBubble>
                        {s.problemText}
                      </ValueCard.BeforeBubble>
                      <ValueCard.Image
                        src={s.problemImage}
                        alt={s.problemText}
                      />
                    </div>
                  </ValueCard.LeftBefore>
                </ValueCard.Left>

                {/* Arrow: Before → After */}
                <ValueCard.Arrow />

                {/* Right: After, Title, Description, Features */}
                <ValueCard.Right>
                  <ValueCard.AfterBadge />
                  <ValueCard.Title>
                    {s.ValueTitle.split("<br />").map((line, idx, arr) => (
                      <span key={idx}>
                        {parseTextWithMarker(line)}
                        {idx < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </ValueCard.Title>
                  <ValueCard.FeatureList>
                    {s.features.map((f, fi) => (
                      <ValueCard.FeatureItem key={fi}>
                        {f}
                      </ValueCard.FeatureItem>
                    ))}
                  </ValueCard.FeatureList>
                  <ValueCard.Description>
                    {s.ValueDescription.split("||").join("\n")}
                  </ValueCard.Description>
                </ValueCard.Right>
              </ValueCard.TwoColumn>
            </ValueCard>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-3xl lg:mt-4xl flex justify-center">
          <ContactButton
            variant="yellow"
            size="medium"
            text="Youth Now!で解決"
          />
        </div>
      </Container>
    </SectionShell>
  );
}
