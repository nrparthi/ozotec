import { T } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Droplets, Factory, PlugZap } from "lucide-react";
import Showcase from "@/components/Showcase";
import RangeFinder from "@/components/RangeFinder";
import Savings from "@/components/Savings";
import AmbientVideo from "@/components/AmbientVideo";
import ModelCard from "@/components/ModelCard";
import RiderStories from "@/components/RiderStories";
import { Reveal, CountUp } from "@/components/Reveal";
import { MODELS } from "@/lib/data";
import { DOWN, emi, inr, lease } from "@/lib/money";

const TICKER = ["LiFePO4 cells", "IP67 rated", "6S safety tech", "40 to 240 km", "Made in Coimbatore", "ISO 9001 · 14001", "ARAI certified", "Charge at home", "Lease from one monthly rent"];

// Stills from Ozotec's own Flio film: real riders on Tamil Nadu roads.
const LIFE = [
  { src: "/ozotec/life/mother-daughter.jpg", alt: "A mother rides a Flio with her daughter in town", cls: "col-span-2 row-span-2", pos: "object-[60%_15%]" },
  { src: "/ozotec/life/convoy.jpg", alt: "A fleet of riders on Flio scooters", cls: "col-span-2", pos: "object-[50%_35%]" },
  { src: "/ozotec/life/commuter.jpg", alt: "A commuter rides a Flio on the highway", cls: "", pos: "object-[50%_30%]" },
  { src: "/ozotec/life/woman-rider.jpg", alt: "A woman rides a blue Flio", cls: "", pos: "object-[40%_50%]" },
];

export default function Home() {
  const entry = 51500;
  const ways = [
    { n: "01", t: "Buy", big: inr(entry), small: "starting MRP", d: "Pick any of 21 battery options and pay at the showroom.", href: "/book" },
    { n: "02", t: "EMI", big: `${inr(emi(entry * (1 - DOWN), 14, 24))}/mo`, small: "from, 10% down", d: "One application. Local finance partners compete to approve you.", href: "/finance" },
    { n: "03", t: "Lease", big: `${inr(lease(entry, 36).total)}/mo`, small: "from, all-inclusive", d: "Insurance and service included. Buy, upgrade or return at the end.", href: "/lease" },
  ];

  return (
    <>
      <Showcase />

      {/* ticker */}
      <div className="overflow-hidden border-y border-line bg-card py-4" aria-hidden>
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-lg font-semibold text-muted"><T>{t}</T><span className="size-1.5 rounded-full bg-signal" /></span>
          ))}
        </div>
      </div>

      {/* models */}
      <section className="wrap grid gap-8 py-20 sm:py-28" aria-labelledby="models-h">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="grid gap-3">
            <p className="eyebrow !text-signal"><T>{"The line-up"}</T></p>
            <h2 id="models-h" className="text-4xl font-extrabold sm:text-6xl"><T>{"Five rides. One for every road."}</T></h2>
          </div>
          <Link href="/compare" className="group inline-flex items-center gap-2 font-semibold"><T>{"Compare all"}</T> <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></Link>
        </Reveal>
        {/* phones: swipe row with snap; desktop: five across */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {MODELS.map((m, i) => <Reveal key={m.id} delay={i * 0.06} className="w-[62vw] shrink-0 snap-start sm:w-auto"><ModelCard m={m} /></Reveal>)}
        </div>
      </section>

      <RangeFinder />

      {/* bento */}
      <section className="cv-auto wrap grid gap-8 py-20 sm:py-28" aria-labelledby="why-h">
        <Reveal className="grid gap-3">
          <p className="eyebrow !text-signal"><T>{"Why Ozotec"}</T></p>
          <h2 id="why-h" className="max-w-[18ch] text-4xl font-extrabold sm:text-6xl"><T>{"Built safe. Built here. Built to last."}</T></h2>
        </Reveal>
        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Reveal className="relative col-span-2 row-span-2 overflow-hidden rounded-[2rem] bg-ink text-white">
            <AmbientVideo src="/ozotec/media/bheem-loop.mp4" poster="/ozotec/bheem-hero-poster.webp" className="opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="relative grid h-full min-h-[380px] content-end gap-2 p-6 sm:p-8">
              <p className="eyebrow">Bheem Q7 · MUV</p>
              <h3 className="max-w-[16ch] text-3xl font-extrabold sm:text-4xl"><T>{"India's toughest all-terrain EV."}</T></h3>
              <p className="max-w-[44ch] text-white/70"><T>{"295 kg payload. 140 km a charge. Ready for deliveries, vendors and farms."}</T></p>
              <Link href="/models/bheem-q7" className="mt-2 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-white px-5 font-semibold text-ink"><T>{"Explore Bheem"}</T> <ArrowRight className="size-4" aria-hidden /></Link>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="grid content-between gap-4 rounded-[2rem] bg-signal p-6 text-white">
            <Factory className="size-8" aria-hidden />
            <div><p className="font-display text-4xl font-extrabold"><CountUp to={10000} />+</p><p className="text-white/80"><T>{"vehicles a year capacity"}</T></p></div>
          </Reveal>
          <Reveal delay={0.1} className="grid content-between gap-4 rounded-[2rem] bg-card p-6 ring-1 ring-line">
            <ShieldCheck className="size-8 text-signal" aria-hidden />
            <div><p className="font-display text-2xl font-bold"><T>{"World's safest battery"}</T></p><p className="text-sm text-muted"><T>{"LiFePO4 cells, durable BMS, 6S safety tech."}</T></p></div>
          </Reveal>
          <Reveal delay={0.15} className="grid content-between gap-4 rounded-[2rem] bg-card p-6 ring-1 ring-line">
            <Droplets className="size-8 text-signal" aria-hidden />
            <div><p className="font-display text-4xl font-extrabold">IP67</p><p className="text-sm text-muted"><T>{"Dust-tight and water-resistant pack."}</T></p></div>
          </Reveal>
          <Reveal delay={0.2} className="grid content-between gap-4 rounded-[2rem] bg-navy p-6 text-white">
            <PlugZap className="size-8 text-volt" aria-hidden />
            <div><p className="font-display text-4xl font-extrabold"><CountUp to={70} />%</p><p className="text-white/70"><T>{"automated plant, ISO & ARAI certified"}</T></p></div>
          </Reveal>
        </div>
      </section>

      {/* ways to own */}
      <section className="cv-auto bg-card py-20 sm:py-28" aria-labelledby="ways-h">
        <div className="wrap grid gap-10">
          <Reveal className="grid gap-3">
            <p className="eyebrow !text-signal"><T>{"Own it your way"}</T></p>
            <h2 id="ways-h" className="text-4xl font-extrabold sm:text-6xl"><T>{"Buy, EMI or lease."}</T></h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {ways.map((w, i) => (
              <Reveal key={w.t} delay={i * 0.08}>
                <Link href={w.href} className="group grid h-full gap-6 rounded-[2rem] bg-bg p-7 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:ring-signal/50">
                  <div className="flex items-center justify-between"><span className="num font-display text-sm font-bold text-muted">{w.n}</span><ArrowRight className="size-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-signal" aria-hidden /></div>
                  <div><h3 className="text-3xl font-extrabold"><T>{w.t}</T></h3><p className="mt-2 text-muted"><T>{w.d}</T></p></div>
                  <div><p className="num font-display text-3xl font-extrabold">{w.big}</p><p className="text-xs text-muted"><T>{w.small}</T></p></div>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="text-muted"><T>{"Have a petrol bike?"}</T> <Link href="/book" className="font-semibold text-fg underline underline-offset-4"><T>{"Exchange it when you book"}</T></Link><T>{", and its value comes off your Ozotec price. On-road prices in Tamil Nadu include"}</T> <b className="text-fg"><T>{"zero road tax"}</T></b> <T>{"on EVs until Dec 2027."}</T></p>
        </div>
      </section>

      {/* savings */}
      <section className="cv-auto wrap grid gap-8 py-20 sm:py-28" aria-labelledby="save-h">
        <Reveal className="grid gap-3">
          <p className="eyebrow !text-signal"><T>{"Savings calculator"}</T></p>
          <h2 id="save-h" className="max-w-[18ch] text-4xl font-extrabold sm:text-6xl"><T>{"See what you stop spending on petrol."}</T></h2>
        </Reveal>
        <Reveal><Savings /></Reveal>
      </section>

      {/* real riders */}
      <section className="cv-auto py-20 sm:py-28" aria-labelledby="life-h">
        <div className="wrap grid gap-10">
          <Reveal className="grid gap-3">
            <p className="eyebrow !text-signal"><T>{"Real riders, real roads"}</T></p>
            <h2 id="life-h" className="max-w-[18ch] text-4xl font-extrabold sm:text-6xl"><T>{"Built for the way Tamil Nadu rides."}</T></h2>
          </Reveal>
          <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:grid-cols-4">
            {LIFE.map((p, i) => (
              <Reveal key={p.src} delay={i * 0.06} className={`relative overflow-hidden rounded-[2rem] ${p.cls}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className={`object-cover transition-transform duration-700 hover:scale-105 ${p.pos}`} />
              </Reveal>
            ))}
          </div>
          <Reveal className="grid gap-3"><h3 className="text-2xl font-extrabold sm:text-3xl"><T>{"Hear it from our riders"}</T></h3></Reveal>
          <RiderStories />
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 rounded-[2rem] bg-white px-6 py-6">
            <span className="text-sm font-medium text-[#4a5874]"><T>{"As featured in"}</T></span>
            {["vikatan", "dailythanthi", "behindwoods"].map((p) => <Image key={p} src={`/ozotec/${p}.webp`} alt={p} width={130} height={34} className="h-8 w-auto" />)}
            <Image src="/ozotec/iso-9001.webp" alt="ISO 9001 certified" width={52} height={52} />
            <Image src="/ozotec/iso-14001.webp" alt="ISO 14001 certified" width={52} height={52} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src="/ozotec/life/farmer-sack.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover object-[70%_40%] opacity-80" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="wrap relative grid min-h-[480px] items-center gap-8 py-20 lg:grid-cols-2">
          <Reveal className="grid gap-5">
            <h2 className="text-4xl font-extrabold sm:text-6xl"><T>{"Ride it before you decide."}</T></h2>
            <p className="max-w-[44ch] text-white/70"><T>{"Book a free test ride at your nearest showroom. Or open one: we're growing across Tamil Nadu and India."}</T></p>
            <div className="flex flex-wrap gap-2">
              <Link href="/book?mode=test" className="inline-flex h-12 items-center rounded-full bg-signal px-6 font-semibold hover:bg-signal-2"><T>{"Book a test ride"}</T></Link>
              <Link href="/dealers" className="inline-flex h-12 items-center rounded-full px-6 ring-1 ring-white/25 hover:bg-white/10"><T>{"Become a dealer"}</T></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
