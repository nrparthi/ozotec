import { T } from "@/lib/i18n";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { BatteryCharging, Bike, Truck, ArrowRight } from "lucide-react";
import LeaseCalculator from "@/components/LeaseCalculator";
import { MODELS } from "@/lib/data";
import { DOWN, emi, inr, lease } from "@/lib/money";

export const metadata = { title: "Lease", description: "Lease an Ozotec from one monthly rent with insurance and service included. Buy, upgrade or return at the end." };

const PRODUCTS = [
  { id: "ride", icon: Bike, title: "Ride Lease", for: "Salaried riders, students and homemakers who don't want a loan.", points: ["12, 24 or 36 months", "Insurance and service included", "Deposit of one month's rent", "Buy, upgrade or return at the end"] },
  { id: "fleet", icon: Truck, title: "Fleet Lease", for: "Delivery firms, vendors and farmer groups, mostly Bheem.", points: ["10 or more bikes", "Weekly or monthly rent", "Replacement bike within 48 hours", "Renew with new bikes, or buy the fleet"] },
  { id: "battery", icon: BatteryCharging, title: "Battery Lease", for: "Riders who want the long-range pack without paying for it upfront.", points: ["Buy the bike with the smaller lithium pack", "Lease the bigger battery monthly", "Keep the pack or swap at the end"] },
];

const STAGES = ["Apply", "KYC via DigiLocker", "Partner approves", "Deposit + autopay", "Ride", "Buy · upgrade · return"];

export default function LeasePage() {
  const pro = MODELS[0];
  const base = pro.variants.find((x) => x.label === "Lithium 2 kWh")!;
  const big = pro.variants.find((x) => x.label.startsWith("Lithium 5"))!;
  const batteryRent = lease(big.mrp - base.mrp, 36).total - 300 * 1.05;

  return (
    <>
      <PageHero eyebrow="Lease" title="One monthly rent. Everything included." sub="Insurance, service and GST in one payment. At the end, buy it for a fixed price, upgrade to a new model, or hand it back. Ozotec promises to buy back returned bikes, so our finance partners can charge less." />

      <section className="wrap grid gap-4 py-14 md:grid-cols-3">
        {PRODUCTS.map(({ id, icon: Icon, title, for: who, points }) => (
          <article key={id} id={id} className="grid content-start gap-3 rounded-3xl bg-card p-6 ring-1 ring-line scroll-mt-24">
            <Icon className="size-8 text-signal" aria-hidden />
            <h2 className="text-2xl font-bold"><T>{title}</T></h2>
            <p className="text-muted"><T>{who}</T></p>
            <ul className="grid gap-1.5 text-sm">{points.map((p) => <li key={p} className="flex gap-2"><ArrowRight className="mt-0.5 size-4 shrink-0 text-signal" aria-hidden /><T>{p}</T></li>)}</ul>
            {id === "battery" && <p className="num rounded-2xl bg-card-2 p-3 text-sm"><T v={{ a: inr(base.mrp), b: base.km, c: big.km, d: inr(batteryRent) }}>{"Example: Flio Pro with 2 kWh for {a} ({b} km). Lease the 5 kWh upgrade ({c} km) for about {d}/month over 36 months."}</T></p>}
          </article>
        ))}
      </section>

      <section className="wrap grid gap-4 pb-14" aria-labelledby="calc-h">
        <h2 id="calc-h" className="text-3xl font-bold"><T>{"Lease calculator"}</T></h2>
        <LeaseCalculator />
      </section>

      <section className="bg-card py-14" aria-labelledby="glance-h">
        <div className="wrap grid gap-4">
          <h2 id="glance-h" className="text-3xl font-bold"><T>{"Monthly rent at a glance"}</T></h2>
          <p className="text-muted"><T>{"Ride Lease on each model's entry battery. Insurance, service and GST included."}</T></p>
          <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
            <table className="num w-full min-w-[640px] text-left text-sm">
              <thead className="bg-bg text-xs uppercase tracking-wider text-muted">
                <tr><th className="p-3"><T>{"Model"}</T></th><th className="p-3">MRP</th><th className="p-3"><T v={{ n: 12 }}>{"{n} m"}</T></th><th className="p-3"><T v={{ n: 24 }}>{"{n} m"}</T></th><th className="p-3"><T v={{ n: 36 }}>{"{n} m"}</T></th><th className="p-3"><T>{"EMI 24 m"}</T></th></tr>
              </thead>
              <tbody>
                {MODELS.map((m) => {
                  const v = [...m.variants].sort((a, b) => a.mrp - b.mrp)[0];
                  return (
                    <tr key={m.id} className="border-t border-line">
                      <td className="p-3"><Link href={`/models/${m.id}`} className="font-semibold underline-offset-2 hover:underline">{m.name}</Link><br /><span className="text-xs text-muted">{v.label}</span></td>
                      <td className="p-3">{inr(v.mrp)}</td>
                      {[12, 24, 36].map((t) => <td key={t} className="p-3 font-semibold">{inr(lease(v.mrp, t).total)}</td>)}
                      <td className="p-3 text-muted">{inr(emi(v.mrp * (1 - DOWN), 15, 24))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-4 py-14" aria-labelledby="how-h">
        <h2 id="how-h" className="text-3xl font-bold"><T>{"How a lease works"}</T></h2>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {STAGES.map((s, i) => (
            <li key={s} className="grid gap-1 rounded-2xl bg-card p-4 ring-1 ring-line">
              <span className="font-display text-sm font-bold text-signal">{i + 1}</span><span className="font-medium"><T>{s}</T></span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted"><T>{"Figures use planning assumptions: partner rate 15% (fleet 14%), fixed end price 60% / 40% / 25% of MRP after 12 / 24 / 36 months, insurance 3% of MRP a year, service ₹300 a month, GST 5% on rent. Final terms come from the finance partner and are shown in a Key Fact Statement before you sign."}</T></p>
        <Link href="/book" className="grid h-14 place-items-center justify-self-start rounded-full bg-signal px-8 text-lg font-semibold text-white hover:bg-signal-2"><T>{"Start a lease"}</T></Link>
      </section>
    </>
  );
}
