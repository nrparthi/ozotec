"use client";
import { useSyncExternalStore } from "react";
import { TA } from "./ta";

// For places that can only hold plain text (<option>, aria-label): read <html lang> and translate.
// Server and first client render use English, then it switches, so hydration always matches.
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  return () => mo.disconnect();
}
export function useLang() {
  return useSyncExternalStore(subscribe, () => document.documentElement.lang, () => "en");
}
export function tr(lang: string, s: string, v?: Record<string, string | number>) {
  const t = lang === "ta" ? TA[s] ?? s : s;
  return v ? t.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? "")) : t;
}
