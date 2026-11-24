// Lease and EMI maths. Assumptions are shown on the Lease page; confirm with Ozotec, lenders and a CA.
export const DOWN = 0.1;
export const RESIDUAL: Record<number, number> = { 12: 0.6, 24: 0.4, 36: 0.25 };
export const RATE = { retail: 15, fleet: 14 } as const;
export const INS_PA = 0.03, SERVICE = 300, GST = 0.05;

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export function emi(principal: number, ratePct: number, months: number) {
  const r = ratePct / 1200;
  return r ? (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1) : principal / months;
}

/** Monthly payment that recovers price minus the present value of a balloon (fixed end price). */
export function balloonPmt(price: number, balloon: number, ratePct: number, months: number) {
  const r = ratePct / 1200;
  return ((price - balloon / (1 + r) ** months) * r) / (1 - (1 + r) ** -months);
}

export function lease(price: number, months = 24, kind: keyof typeof RATE = "retail") {
  const residual = price * RESIDUAL[months];
  const finance = balloonPmt(price, residual, RATE[kind], months);
  const insurance = (price * INS_PA) / 12;
  const pre = finance + insurance + SERVICE;
  const gst = pre * GST;
  const total = pre + gst;
  return { residual, finance, insurance, service: SERVICE, gst, total, deposit: total };
}
