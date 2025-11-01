export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { id: "hero", label: "TOP", href: "#hero" },
  { id: "problem", label: "あなたのお悩み", href: "#problem" },
  { id: "value", label: "私たちの価値", href: "#value" },
  { id: "services", label: "サービス", href: "#services" },
  { id: "story", label: "創業の想い", href: "#story" },
  { id: "flow", label: "フロー", href: "#flow" },
  { id: "faq", label: "よくある質問", href: "#faq" },
  { id: "contact", label: "お問い合わせ", href: "#contact" },
];
