"use client";
import { T } from "@/lib/i18n";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { MODELS, LENDERS, CONTACT, getModel } from "@/lib/data";
import { DOWN, emi, inr, lease } from "@/lib/money";

type Plan = "buy" | "emi" | "lease";
const STEPS = ["Vehicle", "Payment", "Your details"];

export default function BookingFlow() {
  const q = useSearchParams();
  const startModel = getModel(q.get("model") ?? "") ?? MODELS[0];
  const startVariant = startModel.variants.findIndex((x) => x.label === q.get("variant"));
  const [modelId, setModelId] = useState(startModel.id);
  const [vi, setVi] = useState(Math.max(0, startVariant));
  const [step, setStep] = useState(startVariant >= 0 ? 1 : 0); // arrived with a choice: skip step 1
  const [plan, setPlan] = useState<Plan>("emi");
  const [lender, setLender] = useState(1);
  const [term, setTerm] = useState(36);
  const [form, setForm] = useState({ name: "", phone: "", pin: "", consent: false });
  // Petrol bike exchange: details only; the showroom quotes the value after inspection.
  const [ex, setEx] = useState({ on: false, make: "Honda", year: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  const m = getModel(modelId)!;
  const v = m.variants[Math.min(vi, m.variants.length - 1)];
  const monthly = plan === "emi" ? emi(v.mrp * (1 - DOWN), LENDERS[lender].rate, 24) : plan === "lease" ? lease(v.mrp, term).total : null;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (form.name.trim().length < 2) err.name = "Enter your name as on Aadhaar.";
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone = "Enter a 10-digit Indian mobile number.";
    if (!/^\d{6}$/.test(form.pin)) err.pin = "Enter your 6-digit pincode.";
    const yr = +ex.year, now = new Date().getFullYear();
    if (ex.on && !(yr >= 1995 && yr <= now)) err.exYear = "Enter the year your bike was bought (1995 or later).";
    if (plan !== "buy" && !form.consent) err.consent = "We need your consent to send the application to finance partners.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setDone("OZR-" + Math.floor(10000 + Math.random() * 89999));
  }

  if (done) {
    const msg = `Hi Ozotec, I reserved ${m.name} (${v.label}, ${v.km} km) on ${plan.toUpperCase()}. Ref ${done}. Pincode ${form.pin}.${ex.on ? ` I want to exchange my ${ex.year} ${ex.make} petrol bike.` : ""}`;
    return (
      <div className="grid justify-items-center gap-4 rounded-[2rem] bg-card p-8 text-center ring-1 ring-line">
        <CheckCircle2 className="size-14 text-volt" aria-hidden />
        <h2 className="text-3xl font-bold"><T v={{ ref: done }}>{"Reserved: {ref}"}</T></h2>
        <p className="max-w-[44ch] text-muted">{m.name} · {v.label} · {plan === "buy" ? inr(v.mrp) : `${inr(monthly!)}/month`}. <T>Your nearest showroom will call you within a day.</T></p>
        <a href={`https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(msg)}`} className="grid h-12 place-items-center rounded-full bg-[#1f9d55] px-6 font-semibold text-white"><T>{"Get updates on WhatsApp"}</T></a>
        <p className="text-xs text-muted"><T>{"Preview build: no payment is taken and nothing is stored yet. Token payment, DigiLocker KYC and partner approval come with the backend."}</T></p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <ol className="grid grid-cols-3 gap-2" aria-label="Booking steps">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined} className={`rounded-full px-3 py-2 text-center text-xs font-semibold sm:text-sm ${i === step ? "bg-fg text-bg" : i < step ? "bg-card-2 text-fg" : "bg-card text-muted ring-1 ring-line"}`}>
            {i + 1}. <T>{s}</T>
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-4 rounded-3xl bg-card p-4 ring-1 ring-line">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-studio"><Image src={m.img} alt={m.name} fill sizes="80px" className="object-cover" /></div>
        <div className="min-w-0">
          <p className="font-display text-lg font-bold">{m.name}</p>
          <p className="num text-sm text-muted">{v.label} · {v.km} km · {inr(v.mrp)}</p>
        </div>
      </div>

      {step === 0 && (
        <section className="grid gap-4" aria-label="Choose vehicle">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {MODELS.map((x) => (
              <button key={x.id} type="button" aria-pressed={x.id === modelId} onClick={() => { setModelId(x.id); setVi(0); }}
                className={`min-h-12 cursor-pointer rounded-2xl px-3 py-2 text-sm font-semibold ring-1 ${x.id === modelId ? "bg-fg text-bg ring-fg" : "bg-card ring-line"}`}>{x.name}</button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {m.variants.map((x, j) => (
              <button key={x.label} type="button" aria-pressed={j === vi} onClick={() => setVi(j)}
                className={`num grid min-h-14 cursor-pointer rounded-2xl p-2 ring-1 ${j === vi ? "bg-fg text-bg ring-fg" : "bg-card ring-line"}`}>
                <b className="font-display">{x.km} km</b><span className="text-xs opacity-75">{inr(x.mrp)}</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setStep(1)} className="h-14 cursor-pointer rounded-full bg-signal text-lg font-semibold text-white hover:bg-signal-2"><T>{"Continue"}</T></button>
        </section>
      )}

      {step === 1 && (
        <section className="grid gap-4" aria-label="Choose payment">
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Payment plan">
            {([["buy", "Buy", inr(v.mrp)], ["emi", "EMI", "24 months"], ["lease", "Lease", "keep or return"]] as const).map(([k, t, s]) => (
              <button key={k} type="button" aria-pressed={plan === k} onClick={() => setPlan(k)}
                className={`grid min-h-16 cursor-pointer rounded-2xl p-2 ring-1 ${plan === k ? "bg-fg text-bg ring-fg" : "bg-card ring-line"}`}>
                <b className="font-display text-lg"><T>{t}</T></b><span className="num text-xs opacity-75"><T>{s}</T></span>
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-card p-5 ring-1 ring-line">
            <p className="text-sm text-muted"><T>{plan === "buy" ? "Pay at the showroom" : "Per month"}</T></p>
            <p className="num font-display text-4xl font-extrabold">{inr(monthly ?? v.mrp)}</p>
            {plan === "emi" && <p className="num mt-1 text-sm text-muted"><T v={{ amt: inr(v.mrp * DOWN) }}>{"{amt} down payment"}</T></p>}
            {plan === "lease" && <p className="num mt-1 text-sm text-muted"><T v={{ d: inr(lease(v.mrp, term).deposit), r: inr(lease(v.mrp, term).residual) }}>{"Insurance, service and GST included · deposit {d} · buy at the end for {r}"}</T></p>}
          </div>

          {plan === "emi" && (
            <fieldset className="grid gap-2">
              <legend className="mb-1 text-sm font-semibold"><T>{"Finance partners near you"}</T></legend>
              {LENDERS.map((l, i) => (
                <label key={l.name} className={`flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-2xl p-3 ring-1 ${i === lender ? "bg-card-2 ring-fg" : "bg-card ring-line"}`}>
                  <span className="flex items-center gap-3">
                    <input type="radio" name="lender" checked={i === lender} onChange={() => setLender(i)} className="size-5 accent-signal" />
                    <span><span className="block text-sm font-medium">{l.name}</span><span className="text-xs text-muted"><T v={{ r: l.rate }}>{"{r}% a year"}</T></span></span>
                  </span>
                  <b className="num">{inr(emi(v.mrp * (1 - DOWN), l.rate, 24))}</b>
                </label>
              ))}
            </fieldset>
          )}
          {plan === "lease" && (
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Lease term">
              {[12, 24, 36].map((t) => (
                <button key={t} type="button" aria-pressed={term === t} onClick={() => setTerm(t)}
                  className={`num min-h-12 cursor-pointer rounded-2xl ring-1 ${term === t ? "bg-fg text-bg ring-fg" : "bg-card ring-line"}`}><T v={{ t }}>{"{t} months"}</T></button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <button type="button" onClick={() => setStep(0)} className="grid size-14 cursor-pointer place-items-center rounded-full ring-1 ring-line" aria-label="Back to vehicle"><ChevronLeft /></button>
            <button type="button" onClick={() => setStep(2)} className="h-14 cursor-pointer rounded-full bg-signal text-lg font-semibold text-white hover:bg-signal-2"><T>{"Continue"}</T></button>
          </div>
        </section>
      )}

      {step === 2 && (
        <form className="grid gap-4" onSubmit={submit} noValidate aria-label="Your details">
          {([["name", "Full name", "text", "name"], ["phone", "Mobile number", "tel", "tel-national"], ["pin", "Pincode", "text", "postal-code"]] as const).map(([k, label, type, ac]) => (
            <div key={k} className="grid gap-1">
              <label htmlFor={`f-${k}`} className="text-sm font-semibold"><T>{label}</T></label>
              <input id={`f-${k}`} type={type} autoComplete={ac} inputMode={k === "name" ? "text" : "numeric"} value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined}
                className="h-14 rounded-2xl bg-card px-4 text-base ring-1 ring-line focus:ring-2 focus:ring-fg" />
              {errors[k] && <p id={`e-${k}`} className="text-sm text-signal"><T>{errors[k]}</T></p>}
            </div>
          ))}
          <fieldset className="grid gap-3 rounded-2xl bg-card p-4 ring-1 ring-line">
            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
              <input type="checkbox" checked={ex.on} onChange={(e) => setEx({ ...ex, on: e.target.checked })} className="size-5 shrink-0 accent-signal" />
              <T>{"Exchange my petrol bike"}</T>
            </label>
            {ex.on && (
              <div className="grid grid-cols-2 gap-2">
                <label className="grid gap-1 text-xs font-semibold text-muted"><T>{"Brand"}</T>
                  <select value={ex.make} onChange={(e) => setEx({ ...ex, make: e.target.value })} className="h-12 rounded-xl bg-bg px-3 text-base text-fg ring-1 ring-line">
                    {["Honda", "Hero", "TVS", "Bajaj", "Yamaha", "Suzuki", "Royal Enfield", "Other"].map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
                <label className="grid gap-1 text-xs font-semibold text-muted"><T>{"Year bought"}</T>
                  <input inputMode="numeric" maxLength={4} value={ex.year} onChange={(e) => setEx({ ...ex, year: e.target.value.replace(/\D/g, "") })} aria-invalid={!!errors.exYear} aria-describedby={errors.exYear ? "e-exYear" : undefined} placeholder="2018" className="num h-12 rounded-xl bg-bg px-3 text-base text-fg ring-1 ring-line" />
                </label>
                {errors.exYear && <p id="e-exYear" className="col-span-2 text-sm text-signal"><T>{errors.exYear}</T></p>}
                <p className="col-span-2 text-xs text-muted"><T>{"The showroom inspects your bike and quotes its value. It comes off your Ozotec price."}</T></p>
              </div>
            )}
          </fieldset>
          {plan !== "buy" && (
            <label className="flex gap-3 text-sm">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-0.5 size-5 shrink-0 accent-signal" aria-describedby={errors.consent ? "e-consent" : undefined} />
              <span><T>{"I agree to share this application with the finance partners shown, for this purchase only. I can withdraw consent anytime."}</T></span>
            </label>
          )}
          {errors.consent && <p id="e-consent" className="text-sm text-signal"><T>{errors.consent}</T></p>}
          <p className="text-xs text-muted"><T>{v.cls === "graphene" ? "Next, you'll verify Aadhaar through DigiLocker in one tap. No uploads." : "Next, you'll verify Aadhaar and driving licence through DigiLocker in one tap. No uploads."}</T></p>
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <button type="button" onClick={() => setStep(1)} className="grid size-14 cursor-pointer place-items-center rounded-full ring-1 ring-line" aria-label="Back to payment"><ChevronLeft /></button>
            <button type="submit" className="h-14 cursor-pointer rounded-full bg-signal text-lg font-semibold text-white hover:bg-signal-2"><T>{"Reserve · ₹999 refundable"}</T></button>
          </div>
        </form>
      )}
    </div>
  );
}
