"use client";
import { T } from "@/lib/i18n";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { CONTACT } from "@/lib/data";

// shortcut: no showroom list published yet, so the finder hands the pincode to Ozotec on WhatsApp; swap for a real list when Ozotec shares it.
export default function ShowroomFinder() {
  const [pin, setPin] = useState("");
  const [sent, setSent] = useState(false);
  const ok = /^\d{6}$/.test(pin);
  return (
    <form className="grid gap-3 rounded-3xl bg-card p-6 ring-1 ring-line sm:max-w-xl" onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true); }}>
      <label htmlFor="pin" className="text-sm font-semibold"><T>{"Your pincode"}</T></label>
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <input id="pin" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setSent(false); }}
          className="num h-14 rounded-2xl bg-bg px-4 text-lg ring-1 ring-line" placeholder="641 659" />
        <button type="submit" disabled={!ok} className="h-14 cursor-pointer rounded-2xl bg-navy px-5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"><T>{"Find"}</T></button>
      </div>
      {sent && (
        <div className="grid gap-3 rounded-2xl bg-card-2 p-4" role="status">
          <p className="flex gap-2"><MapPin className="size-5 shrink-0 text-signal" aria-hidden /><span><T v={{ pin }}>{"We'll connect you with the nearest showroom to {pin}. If there isn't one yet, we'll tell you when it opens."}</T></span></p>
          <a href={`https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(`Hi Ozotec, which showroom is nearest to pincode ${pin}?`)}`} className="grid h-12 place-items-center rounded-full bg-[#1f9d55] font-semibold text-white"><T>{"Ask on WhatsApp"}</T></a>
        </div>
      )}
    </form>
  );
}
