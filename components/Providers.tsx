"use client";
import { ThemeProvider } from "next-themes";

// Native scrolling on purpose: a smooth-scroll library made the page trail the finger/wheel and felt slow.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
