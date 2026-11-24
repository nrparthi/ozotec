"use client";
import { T } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { MODELS, getModel, type Model } from "@/lib/data";
import { specs, winner, defaultPartner } from "@/lib/specs";

function Head({ m, side }: { m: Model; side: "a" | "b" }) {
  return (
    <div className="studio-night relative grid justify-items-center gap-1 overflow-hidden rounded-3xl px-3 pb-4 pt-3 text-center text-white">
      <div className="relative aspect-[4/3] w-full">
        <Image src={m.cut} alt={m.name} fill sizes="(max-width:768px) 45vw, 30vw" className="object-contain" />
      </div>
      <p className="font-display text-lg font-bold leading-tight sm:text-2xl">{m.name}</p>
      <p className="text-xs text-white/60"><T>{side === "a" ? "You're viewing" : m.kind}</T></p>
    </div>
  );
}

export default function CompareWith({ id }: { id: string }) {
  const a = getModel(id)!;
  const [bid, setBid] = useState(defaultPartner(MODELS, a).id);
  const b = getModel(bid)!;
  const sa = specs(a), sb = specs(b);
  const wins = sa.map((x, i) => winner(x, sb[i]));
  const aWins = wins.filter((w) => w === "a").length, bWins = wins.filter((w) => w === "b").length;
  const twins = a.variants === b.variants;

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl font-extrabold sm:text-4xl"><T v={{ name: a.name }}>{"Compare {name} with"}</T></h2>
        <Link href="/compare" className="group inline-flex items-center gap-2 text-sm font-semibold"><T>{"All models side by side"}</T> <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></Link>
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="radiogroup" aria-label="Vehicle to compare with">
        {MODELS.filter((x) => x.id !== a.id).map((x) => (
          <button key={x.id} type="button" role="radio" aria-checked={x.id === bid} onClick={() => setBid(x.id)}
            className={`flex h-12 shrink-0 cursor-pointer items-center gap-2 rounded-full pl-2 pr-4 text-sm font-semibold ring-1 transition-colors ${x.id === bid ? "bg-fg text-bg ring-fg" : "bg-card ring-line hover:ring-fg/40"}`}>
            <span className="studio-night relative size-9 overflow-hidden rounded-full"><Image src={x.cut} alt="" fill sizes="36px" className="object-contain p-0.5" /></span>
            {x.name}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[2rem] bg-card ring-1 ring-line">
        {/* heads */}
        <div className="relative grid grid-cols-2 gap-2 p-2 sm:gap-3 sm:p-3">
          <Head m={a} side="a" />
          {/* swap instantly with a quick fade-in, so the header never shows a different bike than the rows */}
          <motion.div key={b.id} initial={{ opacity: 0.3, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
            <Head m={b} side="b" />
          </motion.div>
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-signal font-display text-sm font-extrabold text-white ring-4 ring-card" aria-hidden>VS</span>
        </div>

        {/* rows */}
        <dl className="divide-y divide-line">
          {sa.map((row, i) => {
            const w = wins[i];
            const cell = (text: string, win: boolean) => (
              <dd className={`num flex min-w-0 items-start gap-1.5 rounded-2xl px-3 py-2 text-sm sm:text-base ${win ? "bg-volt/15 font-semibold ring-1 ring-volt/40" : ""}`}>
                {win && <Check className="mt-0.5 size-4 shrink-0 text-volt" aria-label="Better" />}
                <span className="min-w-0"><T>{text}</T></span>
              </dd>
            );
            return (
              <div key={row.key} className="grid gap-1 px-2 py-3 sm:px-3">
                <dt className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted"><T>{row.label}</T></dt>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {cell(row.text, w === "a")}
                  {cell(sb[i].text, w === "b")}
                </div>
              </div>
            );
          })}
        </dl>

        {/* verdict */}
        <div className="grid gap-3 border-t border-line p-4 sm:p-5">
          <p className="text-sm text-muted" aria-live="polite">
            {twins
              ? <T v={{ a: a.name, b: b.name }}>{"{a} and {b} share the same battery options and prices; they differ in styling. Pick the one you like the look of."}</T>
              : <T v={{ a: a.name, b: b.name, x: aWins, y: bWins }}>{aWins === 1 ? "{a} is better on {x} point, {b} on {y}. Choose by what matters most to you: price, range or load." : "{a} is better on {x} points, {b} on {y}. Choose by what matters most to you: price, range or load."}</T>}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Link href={`/book?model=${a.id}`} className="grid h-12 place-items-center rounded-full bg-signal px-3 text-center text-sm font-semibold text-white hover:bg-signal-2 sm:text-base"><T v={{ name: a.name }}>{"Book {name}"}</T></Link>
            <Link href={`/models/${b.id}`} className="grid h-12 place-items-center rounded-full px-3 text-center text-sm font-semibold ring-1 ring-line hover:bg-card-2 sm:text-base"><T v={{ name: b.name }}>{"See {name}"}</T></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
