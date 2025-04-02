"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function useTheme() {
  // Using a try-catch to handle potential undefined context issues
  try {
    const context = React.useContext(NextThemesProvider.Context);
    if (context === undefined) {
      return {
        theme: "light",
        setTheme: (theme: string) =>
          console.log(`Theme would change to ${theme}`),
      };
    }
    return context;
  } catch (error) {
    console.warn("Theme context error:", error);
    return {
      theme: "light",
      setTheme: (theme: string) =>
        console.log(`Theme would change to ${theme}`),
    };
  }
}
