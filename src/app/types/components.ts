export interface BaseComponentProps {
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type ContainerSize = "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
export type ColorVariant = "primary" | "secondary" | "black" | "white";

export interface SpacingProps {
  padding?: SpacingSize;
  margin?: SpacingSize;
}
