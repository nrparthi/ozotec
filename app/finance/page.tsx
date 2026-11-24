import { T } from "@/lib/i18n";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { FileCheck2, Handshake, BadgeIndianRupee, ShieldCheck } from "lucide-react";
import EmiCalculator from "@/components/EmiCalculator";
import { CONTACT } from "@/lib/data";

export const metadata = { title: "Finance & EMI", description: "One application, several local finance partners competing to approve your Ozotec loan." };

const RIDER_STEPS = [
  { icon: FileCheck2, t: "Apply once", d: "Fill one short application. KYC comes through DigiLocker, so nothing is uploaded." },
  { icon: Handshake, t: "Partners compete", d: "Local NBFCs and banks near you see it, with your consent, and send offers." },
  { icon: BadgeIndianRupee, t: "Pick the best", d: "Compare EMI and rate side by side. The partner pays the showroom directly." },
];

export default function FinancePage() {
  return (
    <>
      <PageHero eyebrow="Finance" title="One application. Several lenders." sub="Local finance partners compete for your loan, so you get a better rate without visiting three offices." />

      <section className="wrap grid gap-4 py-14 md:grid-cols-3">
        {RIDER_STEPS.map(({ icon: Icon, t, d }, i) => (
          <div key={t} className="grid content-start gap-2 rounded-3xl bg-card p-6 ring-1 ring-line">
            <span className="font-display text-sm font-bold text-signal"><T v={{ n: i + 1 }}>{"Step {n}"}</T></span>
            <Icon className="size-8 text-signal" aria-hidden />
            <h2 className="text-xl font-bold"><T>{t}</T></h2>
            <p className="text-muted"><T>{d}</T></p>
          </div>
        ))}
      </section>

      <section className="wrap grid gap-4 pb-14" aria-labelledby="emi-h">
        <h2 id="emi-h" className="text-3xl font-bold"><T>{"EMI calculator"}</T></h2>
        <EmiCalculator />
        <p className="text-xs text-muted"><T>{"Indicative only. Your final rate, fees and EMI come from the finance partner in a Key Fact Statement before you accept."}</T></p>
      </section>

      <section className="bg-card py-14" aria-labelledby="partner-h">
        <div className="wrap grid gap-6 md:grid-cols-2 md:items-center">
          <div className="grid gap-3">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-signal"><T>{"For lenders"}</T></p>
            <h2 id="partner-h" className="text-3xl font-bold"><T>{"Become an Ozotec finance partner"}</T></h2>
            <p className="text-muted"><T>{"Get verified two-wheeler applications from your area, with KYC already done. Send an offer in one tap. Ozotec's buy-back on leased bikes limits your resale risk."}</T></p>
            <ul className="grid gap-2 text-sm">
              {["Applications only from your pincodes", "DigiLocker-verified KYC and consent on record", "You disburse directly to the showroom", "Lease and EMI both supported"].map((x) => (
                <li key={x} className="flex gap-2"><ShieldCheck className="size-5 shrink-0 text-volt" aria-hidden /><T>{x}</T></li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 rounded-3xl bg-bg p-6">
            <p className="font-display text-xl font-bold"><T>{"Talk to our partnerships team"}</T></p>
            <a href={`https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent("Hi Ozotec, we are a finance company and would like to become a lending partner.")}`} className="grid h-12 place-items-center rounded-full bg-signal font-semibold text-white hover:bg-signal-2"><T>{"Message on WhatsApp"}</T></a>
            <a href={`mailto:${CONTACT.email}?subject=Finance%20partnership`} className="grid h-12 place-items-center rounded-full ring-1 ring-line hover:bg-card-2"><T v={{ e: CONTACT.email }}>{"Email {e}"}</T></a>
          </div>
        </div>
      </section>

      <section className="wrap flex flex-wrap items-center justify-between gap-4 py-12">
        <h2 className="text-2xl font-bold"><T>{"Prefer no loan at all?"}</T></h2>
        <Link href="/lease" className="grid h-12 place-items-center rounded-full bg-navy px-6 font-semibold text-white"><T>{"See lease plans"}</T></Link>
      </section>
    </>
  );
}
