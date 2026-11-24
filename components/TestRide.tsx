"use client";
import { T } from "@/lib/i18n";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CalendarCheck2 } from "lucide-react";
import { MODELS, CONTACT, getModel } from "@/lib/data";

const field = "h-14 w-full rounded-2xl bg-card px-4 text-base ring-1 ring-line focus:ring-2 focus:ring-fg";

export default function TestRide() {
  const q = useSearchParams();
  const [model, setModel] = useState(getModel(q.get("model") ?? "")?.id ?? MODELS[0].id);
  const [f, setF] = useState({ name: "", phone: "", pin: "", date: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const m = getModel(model)!;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (f.name.trim().length < 2) x.name = "Enter your name.";
    if (!/^[6-9]\d{9}$/.test(f.phone)) x.phone = "Enter a 10-digit Indian mobile number.";
    if (!/^\d{6}$/.test(f.pin)) x.pin = "Enter your 6-digit pincode.";
    if (!f.date || f.date < today) x.date = "Pick today or a later date.";
    setErr(x);
    if (!Object.keys(x).length) setDone(true);
  }

  if (done) {
    const msg = `Hi Ozotec, I'd like a test ride of the ${m.name} on ${f.date}, near pincode ${f.pin}.`;
    return (
      <div className="grid justify-items-center gap-4 rounded-[2rem] bg-card p-8 text-center ring-1 ring-line">
        <CalendarCheck2 className="size-14 text-volt" aria-hidden />
        <h2 className="text-3xl font-extrabold"><T>{"Test ride requested"}</T></h2>
        <p className="max-w-[42ch] text-muted"><T v={{ model: m.name, date: new Date(f.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }) }}>{"{model} on {date}. Your nearest showroom will call to confirm the time."}</T></p>
        <a href={`https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(msg)}`} className="grid h-12 place-items-center rounded-full bg-[#1f9d55] px-6 font-semibold text-white"><T>{"Confirm on WhatsApp"}</T></a>
        <p className="text-xs text-muted"><T>{"Preview build: requests aren't stored yet."}</T></p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4" aria-label="Book a test ride">
      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-semibold"><T>{"Which model?"}</T></legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {MODELS.map((x) => (
            <button key={x.id} type="button" aria-pressed={x.id === model} onClick={() => setModel(x.id)}
              className={`grid cursor-pointer justify-items-center gap-1 rounded-2xl p-2 text-xs font-semibold ring-1 transition-colors ${x.id === model ? "bg-fg text-bg ring-fg" : "bg-card ring-line hover:ring-fg/40"}`}>
              <span className="relative h-12 w-full"><Image src={x.cut} alt="" fill sizes="100px" className="object-contain" /></span>{x.name}
            </button>
          ))}
        </div>
      </fieldset>
      {([["name", "Full name", "text", "name", "text"], ["phone", "Mobile number", "tel", "tel-national", "numeric"], ["pin", "Pincode", "text", "postal-code", "numeric"]] as const).map(([k, label, type, ac, im]) => (
        <div key={k} className="grid gap-1">
          <label htmlFor={`t-${k}`} className="text-sm font-semibold"><T>{label}</T></label>
          <input id={`t-${k}`} type={type} autoComplete={ac} inputMode={im} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={err[k] ? `te-${k}` : undefined} className={field} />
          {err[k] && <p id={`te-${k}`} className="text-sm text-signal"><T>{err[k]}</T></p>}
        </div>
      ))}
      <div className="grid gap-1">
        <label htmlFor="t-date" className="text-sm font-semibold"><T>{"Preferred date"}</T></label>
        <input id="t-date" type="date" min={today} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} aria-invalid={!!err.date} aria-describedby={err.date ? "te-date" : undefined} className={field} />
        {err.date && <p id="te-date" className="text-sm text-signal"><T>{err.date}</T></p>}
      </div>
      <button type="submit" className="h-14 cursor-pointer rounded-full bg-signal text-lg font-semibold text-white hover:bg-signal-2"><T>{"Request test ride · free"}</T></button>
    </form>
  );
}
