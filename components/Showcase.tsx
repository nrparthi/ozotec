"use client";
import { T } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { MODELS, maxKm, minPrice } from "@/lib/data";
import { inr, lease } from "@/lib/money";
import { speedText } from "@/lib/specs";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Showcase() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const m = MODELS[i];
  const go = useCallback((n: number) => { setDir(n > i || (i === MODELS.length - 1 && n === 0) ? 1 : -1); setI((n + MODELS.length) % MODELS.length); }, [i]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(i + 1), 6000);
    return () => clearTimeout(t);
  }, [i, paused, go]);

  const word = m.name.split(" ")[0].toUpperCase();

  return (
    <section className="studio-night relative isolate overflow-hidden text-white" aria-roledescription="carousel" aria-label="Ozotec models"
      onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)}>
      {/* giant model word */}
      <div className="pointer-events-none absolute inset-x-0 top-[18%] -z-10 select-none text-center sm:top-[14%]" aria-hidden>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p key={word} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.8, ease }}
            className="outline-text font-display text-[26vw] font-black leading-none tracking-tighter lg:text-[20vw]">{word}</motion.p>
        </AnimatePresence>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-40 w-[80%] -translate-x-1/2 rounded-[50%] bg-navy-2/60 blur-3xl" />

      <div className="wrap grid min-h-[100svh] grid-cols-1 grid-rows-[1fr_auto] pb-6 pt-24 sm:pt-28">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_1.4fr_1fr]">
          {/* left copy */}
          <div className="order-2 grid min-w-0 gap-4 lg:order-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={m.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.5, ease }} className="grid gap-3">
                <p className="eyebrow"><T>{m.kind}</T> · <T>Made in Coimbatore</T></p>
                <h1 className="text-5xl font-extrabold leading-[0.95] sm:text-6xl">{m.name}</h1>
                <p className="max-w-[34ch] text-white/70"><T>{m.tagline}</T></p>
                <p className="num text-sm text-white/60"><T>{"From"}</T> <b className="text-lg text-white">{inr(minPrice(m))}</b> · <T v={{ price: inr(lease(minPrice(m), 36).total) }}>{"or lease from {price}/mo"}</T></p>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-wrap gap-2">
              <Link href={`/models/${m.id}`} className="group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 font-semibold transition-colors hover:bg-signal-2">
                <T>{"Explore"}</T> <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link href={`/book?mode=test&model=${m.id}`} className="inline-flex h-12 items-center rounded-full px-6 ring-1 ring-white/25 transition-colors hover:bg-white/10"><T>{"Book a test ride"}</T></Link>
            </div>
          </div>

          {/* bike */}
          <div className="relative order-1 aspect-[4/3.4] w-full touch-pan-y lg:order-2">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.div key={m.id} custom={dir}
                initial={{ opacity: 0, x: dir * 120, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: dir * -120, scale: 0.92 }}
                transition={{ duration: 0.8, ease }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
                onDragEnd={(_, info) => { if (info.offset.x < -60) go(i + 1); else if (info.offset.x > 60) go(i - 1); }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing">
                <div className="float relative h-full w-full">
                  <Image src={m.cut} alt={`${m.name}, ${m.kind.toLowerCase()}`} fill priority={i === 0} sizes="(max-width:1024px) 92vw, 46vw"
                    className="object-contain" draggable={false} />
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-[2%] left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl" aria-hidden />
          </div>

          {/* right specs */}
          <dl className="order-3 grid min-w-0 grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1 lg:justify-items-end lg:text-right">
            {[["Range up to", `${maxKm(m)}`, "km"], ["Top speed", speedText(m), "km/h"], ["Batteries", `${m.variants.length}`, ""]].map(([k, v, u]) => (
              <div key={k} className="grid min-w-0 gap-0.5 rounded-2xl bg-white/5 p-2.5 ring-1 ring-white/10 backdrop-blur lg:bg-transparent lg:p-0 lg:ring-0">
                <dt className="truncate text-[10px] uppercase tracking-wider text-white/55 sm:text-[11px]"><T>{k}</T></dt>
                <dd className="num whitespace-nowrap font-display text-xl font-bold sm:text-4xl">{v}<span className="ml-1 text-sm font-medium text-white/60">{u}</span></dd>
              </div>
            ))}
          </dl>
        </div>

        {/* model rail */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <div className="flex gap-1.5 overflow-x-auto" role="tablist" aria-label="Choose a model">
            {MODELS.map((x, j) => (
              <button key={x.id} role="tab" aria-selected={j === i} onClick={() => go(j)}
                className={`group relative grid h-14 w-20 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-2xl transition-colors sm:w-28 ${j === i ? "bg-white/15 ring-1 ring-white/30" : "bg-white/5 hover:bg-white/10"}`}>
                <Image src={x.cut} alt="" width={90} height={56} className="h-11 w-auto object-contain" />
                <span className="sr-only">{x.name}</span>
                {j === i && !paused && <motion.span key={i} className="absolute bottom-0 left-0 h-0.5 bg-signal" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} />}
              </button>
            ))}
          </div>
          <div className="hidden gap-2 sm:mr-16 sm:flex">
            <button onClick={() => go(i - 1)} aria-label="Previous model" className="grid size-12 cursor-pointer place-items-center rounded-full ring-1 ring-white/25 hover:bg-white/10"><ChevronLeft /></button>
            <button onClick={() => go(i + 1)} aria-label="Next model" className="grid size-12 cursor-pointer place-items-center rounded-full ring-1 ring-white/25 hover:bg-white/10"><ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
