// One list of comparable specs per model, used by the Compare page, the split compare on model pages and the hero.
import { type Model, MOTOR, maxKm, minPrice } from "./data";
import { inr, lease } from "./money";

const LOAD_KG: Record<string, number> = { "bheem-lite": 195, "bheem-q7": 295 };

export const topSpeed = (m: Model) => (m.variants.some((v) => v.cls !== "graphene") ? 65 : 25);
export const speedText = (m: Model) => (m.variants.some((v) => v.cls === "graphene") && topSpeed(m) === 65 ? "25–65" : `${topSpeed(m)}`);

/** `n` + `better` mark which model wins a row; rows without them are informational. */
export type Spec = { key: string; label: string; text: string; n?: number; better?: "high" | "low" };

export function specs(m: Model): Spec[] {
  const minKm = Math.min(...m.variants.map((v) => v.km));
  const leaseFrom = lease(minPrice(m), 36).total;
  return [
    { key: "price", label: "Starting price", text: inr(minPrice(m)), n: minPrice(m), better: "low" },
    // lease follows price, so it is shown but not scored (scoring both would count one advantage twice)
    { key: "lease", label: "Lease from (36 m)", text: `${inr(leaseFrom)}/mo` },
    { key: "range", label: "Range", text: `${minKm === maxKm(m) ? "" : `${minKm}–`}${maxKm(m)} km`, n: maxKm(m), better: "high" },
    { key: "batteries", label: "Battery options", text: `${m.variants.length}`, n: m.variants.length, better: "high" },
    { key: "speed", label: "Top speed", text: `${speedText(m)} km/h`, n: topSpeed(m), better: "high" },
    { key: "load", label: "Load capacity", text: LOAD_KG[m.id] ? `${LOAD_KG[m.id]} kg` : "Rider + pillion", n: LOAD_KG[m.id] ?? 150, better: "high" },
    { key: "charge", label: "Charging", text: [...new Set(m.variants.map((v) => v.charge))].join(" or ") },
    { key: "motor", label: "Motor", text: [...new Set(m.variants.map((v) => MOTOR[v.cls]))].join(" / ") },
    { key: "licence", label: "Licence needed", text: m.variants.some((v) => v.cls === "graphene") ? "Not on graphene variants" : "Yes" },
  ];
}

/** "a", "b" or "tie" for a row that has a winner, else undefined. */
export function winner(a: Spec, b: Spec) {
  if (a.n === undefined || b.n === undefined || !a.better) return undefined;
  if (a.n === b.n) return "tie";
  return (a.better === "high" ? a.n > b.n : a.n < b.n) ? "a" : "b";
}

/** Default partner: the next model of the same kind, else the next model overall. */
export function defaultPartner(all: Model[], m: Model) {
  const i = all.indexOf(m);
  const rest = [...all.slice(i + 1), ...all.slice(0, i)];
  return rest.find((x) => x.kind === m.kind && x.variants !== m.variants) ?? rest.find((x) => x.kind === m.kind) ?? rest[0];
}
