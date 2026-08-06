declare module "react-simple-maps" {
  import type { ComponentType, ReactNode } from "react";

  export const ComposableMap: ComponentType<Record<string, unknown> & { children?: ReactNode }>;
  export const Geographies: ComponentType<Record<string, unknown> & { children?: ReactNode | ((args: { geographies: Array<{ rsmKey: string }> }) => ReactNode) }>;
  export const Geography: ComponentType<Record<string, unknown>>;
  export const Marker: ComponentType<Record<string, unknown> & { children?: ReactNode }>;
}