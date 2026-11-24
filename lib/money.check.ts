// Run: node --experimental-strip-types lib/money.check.ts
import assert from "node:assert/strict";
import { emi, balloonPmt, lease } from "./money.ts";
import { MODELS, pickFor } from "./data.ts";

assert.equal(Math.round(emi(100000, 12, 12)), 8885);
assert.equal(Math.round(balloonPmt(100000, 0, 15, 12)), Math.round(emi(100000, 15, 12)));
assert.equal(Math.round(lease(144990, 24).total), 5886); // Bheem Q7, matches the plan page
assert.equal(pickFor(MODELS[0], 30).mrp, 51500);
assert.equal(pickFor(MODELS[0], 40).mrp, 55000);
assert.equal(pickFor(MODELS[4], 150).km, 140); // no variant covers it: longest one
console.log("money + pickFor checks passed");
import { onRoadTN } from "./onroad.ts";
assert.equal(onRoadTN(MODELS[0].variants[0]).total, 51500); // graphene: no RTO, on-road = MRP
assert.equal(onRoadTN(MODELS[4].variants[0]).total, 144990 + 1000 + Math.round(2466 + 144990 * 0.012)); // Bheem Q7
console.log("on-road checks passed");
