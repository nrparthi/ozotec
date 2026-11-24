import { T } from "@/lib/i18n";
import Image from "next/image";
import { Leaf, Lightbulb, Users } from "lucide-react";
import { TEAM } from "@/lib/data";

export const metadata = { title: "About", description: "Ozotec: innovation to serve society. Electric two-wheelers designed and built in Coimbatore." };

const STATS = [["70%", "automated plant"], ["10,000+", "vehicles a year"], ["ISO & ARAI", "certified"], ["100%", "designed in India"]];
const VALUES = [
  { icon: Leaf, t: "Sustainability first", d: "Eco-friendly EVs that cut carbon footprints." },
  { icon: Lightbulb, t: "Innovation-driven", d: "We push battery and motor technology forward." },
  { icon: Users, t: "People-centric", d: "Riders inspire every decision, with safety first." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <video className="absolute inset-0 h-full w-full object-cover opacity-45" src="/ozotec/media/dream-to-reality.mp4" autoPlay muted loop playsInline aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="wrap relative grid min-h-[600px] content-end gap-4 pb-16 pt-32">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-signal-2"><T>{"Our story"}</T></p>
          <h1 className="text-4xl font-extrabold sm:text-6xl"><T>{"Innovation to serve society."}</T></h1>
          <p className="max-w-[58ch] text-lg text-white/80"><T>{"What started as an ambitious dream is now electric mobility built in Coimbatore: high-performance, sustainable and intelligent EVs for everyday commuters and adventurers alike."}</T></p>
        </div>
      </section>

      <section className="wrap grid grid-cols-2 gap-3 py-12 md:grid-cols-4">
        {STATS.map(([n, l]) => (
          <div key={l} className="grid gap-1 rounded-3xl bg-card p-5 ring-1 ring-line">
            <p className="num font-display text-3xl font-extrabold text-signal">{n}</p>
            <p className="text-sm text-muted"><T>{l}</T></p>
          </div>
        ))}
      </section>

      <section className="wrap grid gap-4 pb-14 md:grid-cols-3">
        {VALUES.map(({ icon: Icon, t, d }) => (
          <div key={t} className="grid content-start gap-2 rounded-3xl bg-card p-6 ring-1 ring-line">
            <Icon className="size-8 text-signal" aria-hidden />
            <h2 className="text-xl font-bold"><T>{t}</T></h2>
            <p className="text-muted"><T>{d}</T></p>
          </div>
        ))}
      </section>

      <section className="bg-card py-14" aria-labelledby="team-h">
        <div className="wrap grid gap-6">
          <h2 id="team-h" className="text-3xl font-bold"><T>{"The team behind the wheels"}</T></h2>
          <div className="grid gap-4 md:grid-cols-3">
            {TEAM.map((p) => (
              <figure key={p.name} className="grid content-start gap-3 rounded-3xl bg-bg p-6">
                <div className="grid size-14 place-items-center rounded-full bg-navy font-display text-lg font-bold text-white" aria-hidden>{p.name.split(" ").map((w) => w[0]).join("")}</div>
                <blockquote className="text-lg">“<T>{p.quote}</T>”</blockquote>
                <figcaption><b>{p.name}</b><br /><span className="text-sm text-muted"><T>{p.role}</T></span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap grid gap-6 py-14" aria-labelledby="press-h">
        <h2 id="press-h" className="text-3xl font-bold"><T>{"Press & recognition"}</T></h2>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          {["vikatan", "dailythanthi", "behindwoods"].map((p) => <Image key={p} src={`/ozotec/${p}.webp`} alt={p} width={150} height={40} className="h-10 w-auto" />)}
          <Image src="/ozotec/iso-9001.webp" alt="ISO 9001 certified" width={64} height={64} />
          <Image src="/ozotec/iso-14001.webp" alt="ISO 14001 certified" width={64} height={64} />
          <Image src="/ozotec/eco-friendly.webp" alt="Eco friendly" width={64} height={64} />
        </div>
      </section>
    </>
  );
}
