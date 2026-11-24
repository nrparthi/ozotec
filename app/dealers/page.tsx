import { T } from "@/lib/i18n";
import { Store, TrendingUp, Wrench, QrCode } from "lucide-react";
import PageHero from "@/components/PageHero";
import ShowroomFinder from "@/components/ShowroomFinder";
import { CONTACT } from "@/lib/data";

export const metadata = { title: "Showrooms & dealership", description: "Find an Ozotec showroom near you, or apply to open one." };

const WHY = [
  { icon: TrendingUp, t: "Online bookings sent to you", d: "Every booking in your area lands at your counter, and you earn on it." },
  { icon: QrCode, t: "Counter mode", d: "Scan the rider's QR and the booking, KYC and finance offer open on your screen. Nothing re-typed." },
  { icon: Store, t: "Lease and EMI built in", d: "Sell to riders who can't pay upfront, with local finance partners already on board." },
  { icon: Wrench, t: "Service income", d: "Service every 3 months or 3,000 km, plus start and end-of-lease inspections." },
];

export default function DealersPage() {
  return (
    <>
      <PageHero eyebrow="Showrooms" title="Find a showroom, or open one." />

      <section className="wrap grid gap-4 py-14" aria-labelledby="find-h">
        <h2 id="find-h" className="text-3xl font-bold"><T>{"Find your nearest showroom"}</T></h2>
        <ShowroomFinder />
      </section>

      <section className="bg-card py-14" aria-labelledby="dealer-h">
        <div className="wrap grid gap-8">
          <div className="grid gap-2">
            <h2 id="dealer-h" className="text-3xl font-bold"><T>{"Why become an Ozotec dealer"}</T></h2>
            <p className="max-w-[60ch] text-muted"><T>{"Ozotec vehicles are sold through authorised dealers. The new platform sends you buyers instead of competing with you."}</T></p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, t, d }) => (
              <div key={t} className="grid content-start gap-2 rounded-3xl bg-bg p-6">
                <Icon className="size-8 text-signal" aria-hidden />
                <h3 className="text-lg font-bold"><T>{t}</T></h3>
                <p className="text-sm text-muted"><T>{d}</T></p>
              </div>
            ))}
          </div>
          <a href={CONTACT.dealerForm} className="grid h-14 place-items-center justify-self-start rounded-full bg-signal px-8 text-lg font-semibold text-white hover:bg-signal-2"><T>{"Apply for a dealership"}</T></a>
          <p className="text-xs text-muted"><T>{"Ozotec never asks for payments, OTPs, bank details or identity documents through the application form."}</T></p>
        </div>
      </section>
    </>
  );
}
