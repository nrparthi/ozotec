"use client";
import { T } from "@/lib/i18n";
import { useState } from "react";
import { useLang, tr } from "@/lib/useLang";
import { MODELS } from "@/lib/data";
import { DOWN, emi, inr, lease } from "@/lib/money";

const sel = "h-12 w-full rounded-xl bg-card px-3 text-base ring-1 ring-line";

export default function LeaseCalculator() {
  const lang = useLang();
  const [id, setId] = useState("bheem-q7");
  const [vi, setVi] = useState(0);
  const [term, setTerm] = useState(24);
  const [kind, setKind] = useState<"retail" | "fleet">("retail");
  const m = MODELS.find((x) => x.id === id)!;
  const v = m.variants[Math.min(vi, m.variants.length - 1)];
  const L = lease(v.mrp, term, kind);
  const rows: [string, number][] = [["Vehicle cost + partner interest", L.finance], ["Insurance", L.insurance], ["Service pack", L.service], ["GST 5%", L.gst]];

  return (
    <div className="grid gap-6 rounded-[2rem] bg-card p-5 ring-1 ring-line sm:p-8 md:grid-cols-2">
      <div className="grid content-start gap-3">
        <label className="grid gap-1 text-sm font-semibold"><T>{"Model"}</T>
          <select className={sel} value={id} onChange={(e) => { setId(e.target.value); setVi(0); }}>
            {MODELS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold"><T>{"Battery"}</T>
          <select className={sel} value={vi} onChange={(e) => setVi(+e.target.value)}>
            {m.variants.map((x, i) => <option key={x.label} value={i}>{x.label} · {x.km} km · {inr(x.mrp)}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="grid gap-1 text-sm font-semibold"><T>{"Term"}</T>
            <select className={sel} value={term} onChange={(e) => setTerm(+e.target.value)}>
              {[12, 24, 36].map((t) => <option key={t} value={t}>{tr(lang, "{t} months", { t })}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-semibold"><T>{"Plan"}</T>
            <select className={sel} value={kind} onChange={(e) => setKind(e.target.value as "retail" | "fleet")}>
              <option value="retail">{tr(lang, "Ride Lease")}</option>
              <option value="fleet">{tr(lang, "Fleet (10+)")}</option>
            </select>
          </label>
        </div>
      </div>
      <div className="grid content-start gap-2" aria-live="polite">
        <p className="text-sm text-muted"><T>{"Monthly rent"}</T></p>
        <p className="num font-display text-5xl font-extrabold">{inr(L.total)}</p>
        {kind === "fleet" && <p className="num text-sm text-muted"><T v={{ w: inr((L.total * 12) / 52) }}>{"{w} a week per bike"}</T></p>}
        <dl className="num mt-3 grid gap-1.5 text-sm">
          {rows.map(([k, n]) => <div key={k} className="flex justify-between gap-3"><dt className="text-muted"><T>{k}</T></dt><dd>{inr(n)}</dd></div>)}
          <div className="mt-2 flex justify-between gap-3 border-t border-line pt-2"><dt><T>{"Refundable deposit"}</T></dt><dd>{inr(L.deposit)}</dd></div>
          <div className="flex justify-between gap-3"><dt><T>{"Buy at the end for"}</T></dt><dd>{inr(L.residual)}</dd></div>
          <div className="flex justify-between gap-3 text-muted"><dt><T>{"Compare: EMI, 10% down, no insurance"}</T></dt><dd>{inr(emi(v.mrp * (1 - DOWN), 15, term))}/mo</dd></div>
        </dl>
      </div>
    </div>
  );
}
