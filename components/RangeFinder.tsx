"use client";
import { T } from "@/lib/i18n";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MODELS, pickFor } from "@/lib/data";
import { inr, lease } from "@/lib/money";

const loadScene = () => import("./BatteryScene");
const BatteryScene = dynamic(loadScene, { ssr: false, loading: () => <div className="h-full w-full animate-pulse rounded-[2rem] bg-white/5" /> });

export default function RangeFinder() {
  const [km, setKm] = useState(35);
  // Fetch three.js (~600 KB) only when the section is about a screen away, not on page load.
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    // Parse three.js while the browser is idle after load, so it never runs in the middle of a scroll.
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(() => { loadScene(); }, { timeout: 4000 }); else window.setTimeout(() => { loadScene(); }, 2500);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "100% 0px" });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);
  const best = useMemo(() => {
    const opts = MODELS.filter((m) => m.kind === "Scooter").map((m) => ({ m, v: pickFor(m, km) }));
    const covers = (o: (typeof opts)[0]) => o.v.km >= km * 1.25;
    return opts.sort((a, b) => Number(covers(b)) - Number(covers(a)) || a.v.mrp - b.v.mrp)[0];
  }, [km]);
  const covers = best.v.km >= km * 1.25;

  return (
    <section className="relative overflow-hidden bg-ink text-white" aria-labelledby="range-h">
      <div className="pointer-events-none absolute left-1/4 top-0 size-[40rem] rounded-full bg-navy-2/50 blur-3xl" />
      <div className="wrap relative grid items-center gap-8 py-20 lg:grid-cols-2 lg:py-28">
        <div ref={box} className="relative order-2 h-[320px] sm:h-[460px] lg:order-1 lg:h-[560px]">
          {near ? <BatteryScene level={Math.min(1, best.v.km / 240)} /> : <div className="h-full w-full rounded-[2rem] bg-white/5" />}
          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/50 px-4 py-2 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur">
            LiFePO4 · IP67 · <T>6S safety</T> · <span className="num text-volt">{best.v.km} km</span>
          </p>
        </div>

        <div className="order-1 grid gap-6 lg:order-2">
          <p className="eyebrow"><T>{"Find your battery"}</T></p>
          <h2 id="range-h" className="text-4xl font-extrabold leading-[1] sm:text-6xl"><T>{"How far do you ride every day?"}</T></h2>
          <p className="max-w-[46ch] text-white/65"><T>{"21 battery options, from 40 to 240 km. Move the slider and we'll pick the cheapest one that covers your day with room to spare."}</T></p>

          <div className="grid gap-4 rounded-[2rem] bg-white/[.06] p-5 ring-1 ring-white/10 backdrop-blur sm:p-6">
            <label htmlFor="km" className="flex items-baseline justify-between">
              <span className="text-sm text-white/70"><T>{"I ride about"}</T></span>
              <span className="num font-display text-5xl font-extrabold">{km}<span className="ml-1 text-lg font-medium text-white/60"><T>{"km a day"}</T></span></span>
            </label>
            <input id="km" type="range" min={10} max={190} step={5} value={km} onChange={(e) => setKm(+e.target.value)} className="h-11 w-full cursor-pointer" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={best.m.id + best.v.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                className="flex items-center gap-4">
                <div className="relative h-20 w-24 shrink-0"><Image src={best.m.cut} alt={best.m.name} fill sizes="96px" className="object-contain" /></div>
                <div className="min-w-0">
                  <p className="font-display text-xl font-bold">{best.m.name}</p>
                  <p className="text-sm text-white/65">{best.v.label} · {covers ? <T v={{ km: best.v.km }}>{"{km} km covers your day"}</T> : <T v={{ km: best.v.km }}>{"max {km} km, charge midway"}</T>}</p>
                  <p className="num mt-1 text-sm"><b>{inr(best.v.mrp)}</b> <span className="text-white/55"><T>{"or"}</T></span> <b>{inr(lease(best.v.mrp, 36).total)}/mo</b> <span className="text-white/55"><T>{"lease"}</T></span></p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="grid grid-cols-2 gap-2">
              <Link href={`/book?model=${best.m.id}&variant=${encodeURIComponent(best.v.label)}`} className="grid h-12 place-items-center rounded-full bg-signal font-semibold transition-colors hover:bg-signal-2"><T>{"Book this"}</T></Link>
              <Link href={`/models/${best.m.id}`} className="grid h-12 place-items-center rounded-full ring-1 ring-white/25 transition-colors hover:bg-white/10"><T>{"All options"}</T></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
