import { T } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";
import { CONTACT, MODELS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="grid content-start gap-3">
          <Image src="/ozotec/logo-light.svg" alt="Ozotec" width={140} height={34} />
          <p className="text-sm"><T>{"Innovation to serve society. Electric two-wheelers engineered in Coimbatore, Tamil Nadu."}</T></p>
          <p className="text-sm">{CONTACT.address}</p>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <h2 className="text-base font-semibold text-white"><T>{"Vehicles"}</T></h2>
          {MODELS.map((m) => <Link key={m.id} href={`/models/${m.id}`} className="hover:text-white">{m.name}</Link>)}
        </div>
        <div className="grid content-start gap-2 text-sm">
          <h2 className="text-base font-semibold text-white"><T>{"Own one"}</T></h2>
          <Link href="/book" className="hover:text-white"><T>{"Book a vehicle"}</T></Link>
          <Link href="/lease" className="hover:text-white"><T>{"Lease plans"}</T></Link>
          <Link href="/finance" className="hover:text-white"><T>{"EMI & finance partners"}</T></Link>
          <Link href="/dealers" className="hover:text-white"><T>{"Showrooms & dealership"}</T></Link>
          <Link href="/support" className="hover:text-white"><T>{"Charging & FAQ"}</T></Link>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <h2 className="text-base font-semibold text-white"><T>{"Talk to us"}</T></h2>
          <a href={`https://wa.me/${CONTACT.phoneRaw}`} className="hover:text-white">WhatsApp {CONTACT.phone}</a>
          <a href={`tel:+${CONTACT.phoneRaw}`} className="hover:text-white">Call {CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a>
          <div className="mt-2 flex gap-4">
            <a href={CONTACT.social.instagram} className="hover:text-white">Instagram</a>
            <a href={CONTACT.social.facebook} className="hover:text-white">Facebook</a>
            <a href={CONTACT.social.linkedin} className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </div>
      <p className="wrap border-t border-white/10 py-5 text-xs"><T>{"© 2026 Ozotec Automobile Pvt Ltd. Prices are official MRP; on-road price is set by your showroom."}</T></p>
    </footer>
  );
}
