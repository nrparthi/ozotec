"use client";
import { T } from "@/lib/i18n";
import Link from "next/link";
import { useState } from "react";
import { BatteryCharging, Gauge, Route, Zap } from "lucide-react";
import { type Model, MOTOR } from "@/lib/data";
import { emi, inr, lease, DOWN } from "@/lib/money";
import { onRoadTN } from "@/lib/onroad";

export default function VariantPicker({ m }: { m: Model }) {
  const [i, setI] = useState(0);
  const v = m.variants[i];
  return (
    <div className="grid gap-5">
      {m.variants.length > 1 && (
        <fieldset className="grid gap-2">
          <legend className="mb-2 text-sm font-semibold text-muted"><T>{"Battery · pick your range"}</T></legend>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {m.variants.map((x, j) => (
              <button key={x.label} type="button" onClick={() => setI(j)} aria-pressed={j === i}
                className={`num grid min-h-14 cursor-pointer rounded-2xl px-2 py-2 text-center ring-1 transition-colors duration-200 ${j === i ? "bg-fg text-bg ring-fg" : "bg-card ring-line hover:ring-fg/40"}`}>
                <span className="font-display text-lg font-bold leading-tight">{x.km} km</span>
                <span className={`text-xs ${j === i ? "text-bg/70" : "text-muted"}`}>{inr(x.mrp)}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <dl className="grid grid-cols-2 gap-3 rounded-3xl bg-card p-5 ring-1 ring-line">
        {[
          [BatteryCharging, "Battery", v.label],
          [Route, "Range", `Up to ${v.km} km`],
          [Zap, "Charging", v.charge],
          [Gauge, "Motor", MOTOR[v.cls]],
        ].map(([Icon, k, val]) => {
          const I = Icon as typeof Zap;
          return (
            <div key={k as string} className="grid gap-1">
              <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted"><I className="size-4" aria-hidden /><T>{k as string}</T></dt>
              <dd className="text-sm font-medium">{k === "Range" ? <T v={{ km: v.km }}>{"Up to {km} km"}</T> : <T>{val as string}</T>}</dd>
            </div>
          );
        })}
      </dl>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl bg-card-2 p-3"><p className="text-xs text-muted"><T>{"Buy (MRP)"}</T></p><p className="num font-display text-lg font-bold">{inr(v.mrp)}</p></div>
        <div className="rounded-2xl bg-card-2 p-3"><p className="text-xs text-muted"><T>{"EMI · 24 m"}</T></p><p className="num font-display text-lg font-bold">{inr(emi(v.mrp * (1 - DOWN), 14, 24))}</p></div>
        <div className="rounded-2xl bg-card-2 p-3"><p className="text-xs text-muted"><T>{"Lease · 36 m"}</T></p><p className="num font-display text-lg font-bold">{inr(lease(v.mrp, 36).total)}</p></div>
      </div>
      {(() => {
        const o = onRoadTN(v);
        return (
          <details className="group rounded-2xl bg-card p-4 ring-1 ring-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <span className="text-sm"><b><T>{"On-road in Tamil Nadu"}</T></b> <span className="text-muted"><T>{"(approx.)"}</T></span></span>
              <span className="num font-display text-xl font-bold">{inr(o.total)}</span>
            </summary>
            <dl className="num mt-3 grid gap-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted"><T>{"Ex-showroom (MRP)"}</T></dt><dd>{inr(o.mrp)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted"><T>{"Road tax"}</T></dt><dd className="font-semibold text-volt"><T>{"₹0 · EV exemption till Dec 2027"}</T></dd></div>
              {o.needsRto ? (
                <>
                  <div className="flex justify-between"><dt className="text-muted"><T>{"Registration & number plate"}</T></dt><dd>{inr(o.registration)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted"><T>{"Insurance (5-yr third party + 1-yr own damage)"}</T></dt><dd>{inr(o.insurance)}</dd></div>
                </>
              ) : (
                <div className="flex justify-between"><dt className="text-muted"><T>{"Registration & licence"}</T></dt><dd><T>{"Not needed (25 km/h)"}</T></dd></div>
              )}
            </dl>
            <p className="mt-3 text-xs text-muted">{v.cls === "lithium" && <><T>Shown for the 800 W motor, which needs registration.</T>{" "}</>}<T>Approximate. Your showroom confirms the final price. Outside Tamil Nadu, road tax differs.</T></p>
          </details>
        );
      })()}
      <p className="text-xs text-muted"><T>{"EMI at an example 14% with 10% down. Lease includes insurance, service and GST."}</T></p>

      <Link href={`/book?model=${m.id}&variant=${encodeURIComponent(v.label)}`} className="grid h-14 place-items-center rounded-full bg-signal text-lg font-semibold text-white transition-colors hover:bg-signal-2">
        <T v={{ name: m.name, km: v.km }}>{"Book {name} · {km} km"}</T>
      </Link>
    </div>
  );
}
