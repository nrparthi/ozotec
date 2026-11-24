"use client";
import { T } from "@/lib/i18n";
import { useState } from "react";
import { useLang, tr } from "@/lib/useLang";
import { emi, inr } from "@/lib/money";

export default function EmiCalculator() {
  const lang = useLang();
  const [price, setPrice] = useState(95000);
  const [down, setDown] = useState(10);
  const [rate, setRate] = useState(14);
  const [months, setMonths] = useState(24);
  const loan = price * (1 - down / 100);
  const pay = emi(loan, rate, months);
  const sliders: [string, number, (n: number) => void, number, number, number, (n: number) => string][] = [
    ["Vehicle price", price, setPrice, 50000, 160000, 500, inr],
    ["Down payment", down, setDown, 0, 50, 5, (n) => `${n}% · ${inr((price * n) / 100)}`],
    ["Interest rate", rate, setRate, 9, 24, 0.5, (n) => tr(lang, "{r}% a year", { r: n })],
    ["Tenure", months, setMonths, 6, 36, 6, (n) => tr(lang, "{t} months", { t: n })],
  ];
  return (
    <div className="grid gap-6 rounded-[2rem] bg-card p-5 ring-1 ring-line sm:p-8 md:grid-cols-2">
      <div className="grid gap-4">
        {sliders.map(([label, val, set, min, max, step, fmt]) => (
          <label key={label} className="grid gap-1">
            <span className="flex justify-between text-sm"><span className="font-semibold"><T>{label}</T></span><span className="num text-muted">{fmt(val)}</span></span>
            <input type="range" min={min} max={max} step={step} value={val} onChange={(e) => set(+e.target.value)} className="h-10 cursor-pointer" />
          </label>
        ))}
      </div>
      <div className="grid content-center gap-2 rounded-3xl bg-navy p-6 text-white" aria-live="polite">
        <p className="text-sm text-white/70"><T>{"Your EMI"}</T></p>
        <p className="num font-display text-5xl font-extrabold">{inr(pay)}<span className="text-lg font-medium text-white/60">/mo</span></p>
        <p className="num text-sm text-white/70"><T v={{ l: inr(loan), i: inr(pay * months - loan) }}>{"Loan {l} · total interest {i}"}</T></p>
      </div>
    </div>
  );
}
