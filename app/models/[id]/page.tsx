import { T } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, FileDown, Box } from "lucide-react";
import VariantPicker from "@/components/VariantPicker";
import CompareWith from "@/components/CompareWith";
import { Reveal } from "@/components/Reveal";
import { MODELS, getModel, maxKm, minPrice } from "@/lib/data";
import { inr } from "@/lib/money";

export const generateStaticParams = () => MODELS.map((m) => ({ id: m.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const m = getModel((await params).id);
  return { title: m?.name ?? "Model", description: m?.tagline, openGraph: m ? { images: [{ url: m.cut }] } : undefined };
}

export default async function ModelPage({ params }: { params: Promise<{ id: string }> }) {
  const m = getModel((await params).id);
  if (!m) notFound();
  const word = m.name.split(" ")[0].toUpperCase();
  const product = {
    "@context": "https://schema.org", "@type": "Product", name: `Ozotec ${m.name}`, brand: { "@type": "Brand", name: "Ozotec" }, description: m.tagline,
    offers: { "@type": "AggregateOffer", priceCurrency: "INR", lowPrice: minPrice(m), highPrice: Math.max(...m.variants.map((v) => v.mrp)), offerCount: m.variants.length },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />
      <section className="studio-night relative isolate overflow-hidden text-white">
        <p className="outline-text pointer-events-none absolute inset-x-0 top-24 -z-10 select-none text-center font-display text-[24vw] font-black leading-none tracking-tighter" aria-hidden>{word}</p>
        <div className="wrap grid gap-6 pb-10 pt-28 sm:pt-32">
          <nav aria-label="Models" className="flex gap-1 overflow-x-auto">
            {MODELS.map((x) => (
              <Link key={x.id} href={`/models/${x.id}`} aria-current={x.id === m.id ? "page" : undefined}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${x.id === m.id ? "bg-white text-ink" : "text-white/70 ring-1 ring-white/15 hover:bg-white/10"}`}>{x.name}</Link>
            ))}
          </nav>
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_1.3fr]">
            <Reveal className="grid gap-4">
              <p className="eyebrow"><T>{m.kind}</T> · <T>Made in Coimbatore</T></p>
              <h1 className="text-5xl font-extrabold leading-[0.95] sm:text-7xl">{m.name}</h1>
              <p className="max-w-[40ch] text-lg text-white/70"><T>{m.tagline}</T></p>
              <dl className="grid max-w-md grid-cols-3 gap-3">
                {[["From", inr(minPrice(m))], ["Range up to", `${maxKm(m)} km`], ["Batteries", `${m.variants.length}`]].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10"><dt className="text-[11px] uppercase tracking-wider text-white/55"><T>{k}</T></dt><dd className="num font-display text-lg font-bold">{v}</dd></div>
                ))}
              </dl>
            </Reveal>
            <div className="relative aspect-[4/3.3]">
              <Image src={m.cut} alt={`${m.name} electric ${m.kind.toLowerCase()}`} fill priority sizes="(max-width:1024px) 92vw, 55vw" className="float object-contain" />
              <div className="absolute bottom-[3%] left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] bg-black/60 blur-xl" aria-hidden />
            </div>
          </div>
          <p className="flex items-center justify-center gap-2 text-xs text-white/50"><Box className="size-4" aria-hidden /><T>{"360° 3D view arrives when Ozotec shares the CAD model."}</T></p>
        </div>
      </section>

      <section className="wrap grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr]">
        <Reveal><VariantPicker m={m} /></Reveal>
        <Reveal delay={0.1} className="grid content-start gap-5">
          <h2 className="text-3xl font-extrabold"><T>{"What you get"}</T></h2>
          <ul className="grid gap-3">
            {m.features.map((f) => <li key={f} className="flex gap-3 rounded-2xl bg-card p-4 ring-1 ring-line"><Check className="size-5 shrink-0 text-volt" aria-hidden /><T>{f}</T></li>)}
          </ul>
          {m.extra && <p className="rounded-2xl bg-card-2 p-4 text-sm"><T>{m.extra}</T></p>}
          <div className="flex flex-wrap gap-2">
            {m.brochure && (
              <a href={m.brochure} className="inline-flex h-12 items-center gap-2 rounded-full px-5 font-medium ring-1 ring-line hover:bg-card-2"><FileDown className="size-5" aria-hidden /> <T>{"Brochure (PDF)"}</T></a>
            )}
            <Link href={`/book?mode=test&model=${m.id}`} className="inline-flex h-12 items-center rounded-full px-5 font-medium ring-1 ring-line hover:bg-card-2"><T>{"Book a test ride"}</T></Link>
          </div>
        </Reveal>
      </section>

      <section className="wrap pb-20" aria-label="Compare">
        <CompareWith id={m.id} />
      </section>
    </>
  );
}
