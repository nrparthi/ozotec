// Approximate on-road price in Tamil Nadu. Shown with "approx." and "confirm at showroom".
// Road tax: 100% exempt for EVs in TN until 31 Dec 2027 (G.O. of 29 Dec 2025).
// shortcut: insurance and registration are typical figures, not quotes; replace with dealer/insurer rates when Ozotec shares them.
import type { Variant } from "./data.ts";

const TP_5YR = 2466; // IRDAI long-term third-party premium, e-two-wheeler up to 3 kW
const OD_RATE = 0.012; // own-damage, first year, approx. share of MRP
const REGN = 1000; // registration, smart card and high-security number plate, approx.

export type OnRoad = { needsRto: boolean; mrp: number; roadTax: number; registration: number; insurance: number; total: number };

export function onRoadTN(v: Variant): OnRoad {
  if (v.cls === "graphene") return { needsRto: false, mrp: v.mrp, roadTax: 0, registration: 0, insurance: 0, total: v.mrp };
  const insurance = Math.round(TP_5YR + v.mrp * OD_RATE);
  return { needsRto: true, mrp: v.mrp, roadTax: 0, registration: REGN, insurance, total: v.mrp + REGN + insurance };
}
