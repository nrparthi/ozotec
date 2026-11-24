"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { T } from "@/lib/i18n";

const LINKS = [
  ["/models/flio-pro", "Models"],
  ["/compare", "Compare"],
  ["/lease", "Lease"],
  ["/finance", "Finance"],
  ["/dealers", "Showrooms"],
  ["/support", "Support"],
] as const;

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const dark = ready && resolvedTheme === "dark";
  return (
    <button type="button" onClick={() => setTheme(dark ? "light" : "dark")} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-11 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
      {ready ? (dark ? <Sun className="size-5" /> : <Moon className="size-5" />) : <span className="size-5" />}
    </button>
  );
}

function LangToggle() {
  const [ta, setTa] = useState(false);
  // Re-apply the saved choice: React may restore <html lang="en"> after hydration or a refresh.
  useEffect(() => {
    let saved = false;
    try { saved = localStorage.getItem("lang") === "ta"; } catch {}
    if (saved) document.documentElement.lang = "ta";
    setTa(saved || document.documentElement.lang === "ta");
  }, []);
  const flip = () => {
    const next = !ta;
    document.documentElement.lang = next ? "ta" : "en";
    try { localStorage.setItem("lang", next ? "ta" : "en"); } catch {}
    setTa(next);
  };
  return (
    <button type="button" onClick={flip} lang={ta ? "en" : "ta"} aria-label={ta ? "Switch to English" : "தமிழில் பார்க்க"}
      className="grid h-10 min-w-11 cursor-pointer place-items-center rounded-full px-2.5 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white">
      {ta ? "EN" : "தமிழ்"}
    </button>
  );
}

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="wrap pt-3 sm:pt-4">
        <div className={`flex h-14 items-center justify-between gap-3 rounded-full pl-5 pr-2 ring-1 ring-white/10 transition-colors duration-300 ${scrolled || open ? "bg-ink/95" : "bg-white/5 backdrop-blur-sm"}`}>
          <Link href="/" aria-label="Ozotec home" className="shrink-0">
            <Image src="/ozotec/logo-light.svg" alt="Ozotec" width={112} height={28} priority />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            {LINKS.map(([href, label]) => {
              const active = href.startsWith("/models") ? path.startsWith("/models") : path === href;
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${active ? "text-white" : "text-white/70 hover:text-white"}`}>
                  {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/12" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  <span className="relative"><T>{label}</T></span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            <LangToggle />
            <ThemeToggle />
            <Link href="/book?mode=test" className="hidden h-10 place-items-center rounded-full px-4 text-sm font-medium text-white ring-1 ring-white/25 transition-colors hover:bg-white/10 sm:grid"><T>Test ride</T></Link>
            <Link href="/book" className="grid h-10 place-items-center rounded-full bg-signal px-5 text-sm font-semibold text-white transition-colors hover:bg-signal-2"><T>Book</T></Link>
            <button className="grid size-11 cursor-pointer place-items-center rounded-full text-white lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav aria-label="Mobile" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
              className="mt-2 grid gap-1 rounded-3xl bg-ink p-3 ring-1 ring-white/10 lg:hidden">
              {LINKS.map(([href, label]) => (
                <Link key={href} href={href} className="rounded-2xl px-4 py-3.5 text-lg text-white/85 hover:bg-white/10"><T>{label}</T></Link>
              ))}
              <Link href="/book?mode=test" className="rounded-2xl px-4 py-3.5 text-lg text-white/85 hover:bg-white/10"><T>Book a test ride</T></Link>
              <Link href="/about" className="rounded-2xl px-4 py-3.5 text-lg text-white/85 hover:bg-white/10"><T>About</T></Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
