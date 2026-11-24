"use client";
import { T } from "@/lib/i18n";
import { useState } from "react";
import { inr } from "@/lib/money";

// Assumptions shown under the result: TN petrol ≈ ₹101/L, home power ₹8/kWh, ~40 km per kWh (Ozotec lithium packs).
const PETROL = 101, POWER = 8, KM_PER_KWH = 40;

export default function Savings() {
  const [daily, setDaily] = useState(40);
  const [mileage, setMileage] = useState(45);
  const monthKm = daily * 30;
  const petrol = (monthKm / mileage) * PETROL;
  const ev = (monthKm / KM_PER_KWH) * POWER;
  const save = petrol - ev;
  return (
    <div className="grid gap-6 rounded-[2rem] bg-card p-6 ring-1 ring-line sm:p-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="grid content-start gap-5">
        <label className="grid gap-1">
          <span className="flex justify-between text-sm"><b><T>{"Daily distance"}</T></b><span className="num text-muted">{daily} km</span></span>
          <input type="range" min={10} max={150} step={5} value={daily} onChange={(e) => setDaily(+e.target.value)} className="h-10 cursor-pointer" />
        </label>
        <label className="grid gap-1">
          <span className="flex justify-between text-sm"><b><T>{"Your petrol bike mileage"}</T></b><span className="num text-muted">{mileage} km/L</span></span>
          <input type="range" min={25} max={70} step={1} value={mileage} onChange={(e) => setMileage(+e.target.value)} className="h-10 cursor-pointer" />
        </label>
        <p className="text-xs text-muted"><T v={{ p: PETROL, e: POWER, k: KM_PER_KWH }}>{"Petrol at ₹{p}/L, home electricity at ₹{e}/unit, about {k} km per unit. Your bill may differ."}</T></p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" aria-live="polite">
        <div className="rounded-3xl bg-card-2 p-5"><p className="text-sm text-muted"><T>{"Petrol / month"}</T></p><p className="num font-display text-3xl font-bold">{inr(petrol)}</p></div>
        <div className="rounded-3xl bg-card-2 p-5"><p className="text-sm text-muted"><T>{"Ozotec / month"}</T></p><p className="num font-display text-3xl font-bold">{inr(ev)}</p></div>
        <div className="rounded-3xl bg-volt/15 p-5 ring-1 ring-volt/40"><p className="text-sm text-muted"><T>{"You save a year"}</T></p><p className="num font-display text-3xl font-extrabold">{inr(save * 12)}</p></div>
      </div>
    </div>
  );
}
