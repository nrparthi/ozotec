// Content from ozotecev.com (pricing, home, about, charging, FAQ), captured 24 Nov 2026.

export type Cls = "graphene" | "lithium" | "muv";
export type Variant = { label: string; mrp: number; km: number; charge: string; cls: Cls };
export type Model = {
  id: string; name: string; kind: "Scooter" | "MUV"; tagline: string; img: string; cut: string;
  brochure?: string; features: string[]; variants: Variant[]; extra?: string;
};

const G = "8–10 hours", L = "20–80% in 1 hour";
const v = (label: string, mrp: number, km: number, charge: string, cls: Cls): Variant => ({ label, mrp, km, charge, cls });
const flioBig = [
  v("Graphene 60V", 75000, 50, G, "graphene"), v("Lithium 2 kWh", 95000, 80, L, "lithium"),
  v("Lithium 3 kWh", 110000, 120, L, "lithium"), v("Dual 4 kWh", 127000, 160, L, "lithium"),
  v("Dual 5 kWh", 144000, 200, L, "lithium"), v("Dual 6 kWh", 158000, 240, L, "lithium"),
];

export const MODELS: Model[] = [
  {
    id: "flio-pro", name: "Flio Pro V2", kind: "Scooter", img: "/ozotec/flio-pro-v2.webp", cut: "/ozotec/cut/flio-pro-v2.png", brochure: "/ozotec/brochures/flio-pro.pdf",
    tagline: "Built for everyone. Powered by safety. Priced for India.",
    features: ["ECO mode", "Multi ride modes", "LED speedometer", "Safest graphene or lithium ferrous battery"],
    variants: [
      v("Graphene 48V", 51500, 40, G, "graphene"), v("Graphene 60V", 55000, 50, G, "graphene"),
      v("Lithium 1.6 kWh", 73250, 60, L, "lithium"), v("Lithium 2 kWh", 77000, 80, L, "lithium"),
      v("Lithium 3 kWh", 90000, 120, L, "lithium"), v("Lithium 4 kWh (Al 5S)", 115000, 160, L, "lithium"),
      v("Lithium 5 kWh (Al 5S)", 127000, 200, L, "lithium"),
    ],
  },
  {
    id: "flio-neo", name: "Flio Neo", kind: "Scooter", img: "/ozotec/flio-neo.webp", cut: "/ozotec/cut/flio-neo.png",
    tagline: "Smart. Stylish. Accessible. The EV built for everyday India.",
    features: ["ECO mode", "Multi ride modes", "Smart display on lithium", "Power bank option"], variants: flioBig,
  },
  {
    id: "flio-max", name: "Flio Max", kind: "Scooter", img: "/ozotec/flio-max-v2.webp", cut: "/ozotec/cut/flio-max-v2.png", brochure: "/ozotec/brochures/flio-max.pdf",
    tagline: "Maximum range, maximum power. The smartest Flio yet.",
    features: ["Up to 240 km on Dual 6 kWh", "Fast charge 20–80% in 1 hour", "Smart display", "Power bank option"], variants: flioBig,
  },
  {
    id: "bheem-lite", name: "Bheem Lite", kind: "MUV", img: "/ozotec/bheem-lite.webp", cut: "/ozotec/cut/bheem-lite.png", brochure: "/ozotec/brochures/bheem-lite.pdf",
    tagline: "Smartly built for everyday comfort, performance and urban freedom.",
    features: ["195 kg load capacity", "3 kW motor", "7S safest lithium battery", "Smart matrix display & I-Cool battery", "Built with ConZo platform"],
    variants: [v("Lithium 2 kWh Smart Fixed", 105490, 80, "2 hours", "muv")],
  },
  {
    id: "bheem-q7", name: "Bheem Q7", kind: "MUV", img: "/ozotec/bheem.webp", cut: "/ozotec/cut/bheem.png", brochure: "/ozotec/brochures/bheem.pdf",
    tagline: "Unleash power and precision with India's toughest all-terrain EV.",
    features: ["295 kg payload", "3 kW motor, up to 65 km/h", "5S safest lithium battery", "Smart matrix display"],
    variants: [v("Lithium 4 kWh Smart Fixed", 144990, 140, "7–8 hours", "muv")],
    extra: "Four trims: Zdi (double seat, digital meter), Zai (double seat, analog), Sdi (single seat, digital), Sai (single seat, analog).",
  },
];

export const MOTOR: Record<Cls, string> = {
  graphene: "250 W · 25 km/h · no registration or licence",
  lithium: "250 W or 800 W · up to 65 km/h with 800 W (RTO + licence)",
  muv: "3 kW · up to 65 km/h · RTO + licence",
};

export const getModel = (id: string) => MODELS.find((m) => m.id === id);
export const minPrice = (m: Model) => Math.min(...m.variants.map((x) => x.mrp));
export const maxKm = (m: Model) => Math.max(...m.variants.map((x) => x.km));

/** Cheapest variant whose range covers the daily ride with 25% margin, else the longest-range one. */
export function pickFor(m: Model, dailyKm: number): Variant {
  const fit = [...m.variants].sort((a, b) => a.mrp - b.mrp).find((x) => x.km >= dailyKm * 1.25);
  return fit ?? m.variants.reduce((a, b) => (a.km > b.km ? a : b));
}

// Example partners for the prototype only. Replace with signed lenders.
export const LENDERS = [
  { name: "Partner A · local NBFC (example)", rate: 14 },
  { name: "Partner B · co-op bank (example)", rate: 12.5 },
  { name: "Partner C · auto finance (example)", rate: 16 },
];

export const CONTACT = {
  phone: "+91 99437 55556", phoneRaw: "919943755556", email: "support@ozotecev.com",
  address: "99G, Ozotec Street, Karumathampatti, Tamil Nadu 641 659",
  dealerForm: "https://erp.ozotecev.com/public/dealership/8ac668b2-15bb-4b23-9adb-9fb7e0eed0f2",
  social: { instagram: "https://www.instagram.com/ozotecev", facebook: "https://www.facebook.com/ozotecevtn", linkedin: "https://www.linkedin.com/company/ozotec-ev" },
};

export const FEATURES = [
  { title: "World's safest battery", text: "6S safety tech: LiFePO4 cells, IP67, durable BMS." },
  { title: "Motor performance", text: "Strong torque and efficiency for every ride." },
  { title: "Smart charging", text: "Charge from a normal home socket. Lithium packs go 20–80% in about an hour." },
  { title: "Aluminium chassis", text: "High-grade aluminium for long life on Indian roads." },
  { title: "Advanced technology", text: "LED displays, regenerative braking and intelligent control." },
  { title: "Made in Coimbatore", text: "Designed and engineered in Tamil Nadu for Indian roads." },
];

export const FAQ: { q: string; a: string; group: "Buying" | "Riding" | "Charging" }[] = [
  { group: "Buying", q: "What do I need to book?", a: "Your name, mobile number and a verified ID. In this new booking flow, Aadhaar (and a driving licence when your variant needs one) come through DigiLocker in one tap, so there's nothing to upload." },
  { group: "Buying", q: "Do I need a licence and registration?", a: "Graphene variants use a 250 W motor capped at 25 km/h, which is the low-speed class: no registration or licence. Lithium variants with the 800 W motor, and all Bheem models, reach 65 km/h and need RTO registration, a licence and insurance." },
  { group: "Buying", q: "What if my city has no Ozotec showroom?", a: "Book anyway. We'll register your interest and contact you as soon as a showroom opens near you." },
  { group: "Buying", q: "Can I use an Ozotec for business?", a: "Yes. There are generally no restrictions on commercial use, though insurance and warranty terms can differ. Bheem carries up to 295 kg and suits deliveries and vendors." },
  { group: "Buying", q: "Can I return a vehicle?", a: "Vehicles are sold and delivered by authorised dealers. Returns after delivery aren't accepted by Ozotec; any refund is at the dealer's discretion, so check the dealer's policy first." },
  { group: "Riding", q: "What is the top speed?", a: "Low-speed Flio variants reach 25 km/h. Flio+ variants and Bheem reach 65 km/h. Road, load and riding style affect actual speed." },
  { group: "Riding", q: "How far can I ride on one charge?", a: "It depends on the battery: from 40 km (Flio Pro Graphene 48V) to 240 km (Flio Neo/Max Dual 6 kWh). Battery age, road, load and riding style change real range." },
  { group: "Riding", q: "How often does it need service?", a: "Every 3 months or 3,000 km, whichever comes first." },
  { group: "Riding", q: "Is a drop in mileage covered by warranty?", a: "No. Range drops with battery ageing, load, roads and riding habits, so it isn't a warranty claim." },
  { group: "Charging", q: "Can I charge at home?", a: "Yes. Every Ozotec charges from a standard home socket. No special setup is needed, but a pure and stable power supply protects the charger and battery." },
  { group: "Charging", q: "Can I charge in the rain?", a: "Ozotec batteries are IP67 rated, but keep the charger and socket dry and sheltered." },
  { group: "Charging", q: "What is the charger warranty?", a: "6 months, extendable to 1 year. With care a charger lasts up to 3 years; replacing it every 2 to 2.5 years is recommended." },
  { group: "Charging", q: "Is there cover for damage from power cuts or line faults?", a: "Packages like the Battery Protect Plan by Green Life Alliance cover damage from power supply problems." },
];

export const TEAM = [
  { name: "Barathan K", role: "Founder & CEO", quote: "At Ozotec, we don't just build scooters. We craft experiences for a sustainable tomorrow." },
  { name: "Padmavathi B", role: "Joint Director", quote: "Every team member is an architect of our success. My role is to ensure they flourish." },
  { name: "Monish Kumar J", role: "Joint Director", quote: "In R&D, impossible is simply a challenge we love to solve." },
];
