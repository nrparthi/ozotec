import { T } from "@/lib/i18n";
import { PlugZap, Home, Route, RefreshCcw, ChevronDown, MessageCircle, Phone, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import { CONTACT, FAQ } from "@/lib/data";

export const metadata = { title: "Charging & FAQ", description: "How to charge your Ozotec, real-world range, and answers to common questions." };

const CHARGING = [
  { icon: Home, t: "Charge at home", d: "Plug into a standard socket. No special setup needed." },
  { icon: PlugZap, t: "Fast charging", d: "Lithium packs go from 20% to 80% in about an hour. Graphene takes 8 to 10 hours." },
  { icon: Route, t: "40 to 240 km", d: "Range depends on the battery you choose, plus load, road and riding style." },
  { icon: RefreshCcw, t: "Regenerative braking", d: "Braking energy goes back into the battery to stretch your range." },
];

export default function SupportPage() {
  const groups = ["Buying", "Riding", "Charging"] as const;
  return (
    <>
      <PageHero eyebrow="Charging & support" title="Go farther. Charge smarter." />

      <section className="wrap grid gap-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {CHARGING.map(({ icon: Icon, t, d }) => (
          <div key={t} className="grid content-start gap-2 rounded-3xl bg-card p-6 ring-1 ring-line">
            <Icon className="size-8 text-signal" aria-hidden />
            <h2 className="text-lg font-bold"><T>{t}</T></h2>
            <p className="text-sm text-muted"><T>{d}</T></p>
          </div>
        ))}
      </section>

      <section className="wrap grid gap-8 pb-14 lg:grid-cols-[1fr_320px]" aria-labelledby="faq-h">
        <div className="grid content-start gap-6">
          <h2 id="faq-h" className="text-3xl font-bold"><T>{"Frequently asked questions"}</T></h2>
          {groups.map((g) => (
            <div key={g} className="grid gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted"><T>{g}</T></h3>
              {FAQ.filter((f) => f.group === g).map((f) => (
                <details key={f.q} className="group rounded-2xl bg-card ring-1 ring-line open:ring-fg/30">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-medium">
                    <span><T>{f.q}</T></span><ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="px-5 pb-5 text-muted"><T>{f.a}</T></p>
                </details>
              ))}
            </div>
          ))}
        </div>
        <aside className="grid content-start gap-3 rounded-3xl bg-card p-6 ring-1 ring-line lg:sticky lg:top-24" aria-label="Contact support">
          <h2 className="text-xl font-bold"><T>{"Still need help?"}</T></h2>
          <a href={`https://wa.me/${CONTACT.phoneRaw}`} className="flex h-12 items-center gap-2 rounded-full bg-[#1f9d55] px-5 font-semibold text-white"><MessageCircle className="size-5" aria-hidden /><T>{"WhatsApp us"}</T></a>
          <a href={`tel:+${CONTACT.phoneRaw}`} className="flex h-12 items-center gap-2 rounded-full px-5 ring-1 ring-line"><Phone className="size-5" aria-hidden />{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} className="flex h-12 items-center gap-2 rounded-full px-5 ring-1 ring-line"><Mail className="size-5" aria-hidden />{CONTACT.email}</a>
          <p className="text-sm text-muted"><T>{"Service every 3 months or 3,000 km. Charger warranty: 6 months, extendable to 1 year."}</T></p>
        </aside>
      </section>
    </>
  );
}
