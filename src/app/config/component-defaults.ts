export const COMPONENT_DEFAULTS = {
  container: {
    size: "5xl" as const,
    padding: "px-lg" as const,
  },
  card: {
    padding: "p-lg" as const,
    rounded: "rounded-2xl" as const,
    variant: "default" as const,
  },
  button: {
    variant: "primary" as const,
    size: "md" as const,
  },
  spacing: {
    section: "section-spacing" as const,
    sectionLg: "section-spacing-lg" as const,
  },
  animation: {
    duration: "duration-300" as const,
    timing: "ease-in-out" as const,
  },
} as const;
