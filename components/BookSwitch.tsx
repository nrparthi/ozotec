"use client";

import { T } from "@/lib/i18n";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BookingFlow from "@/components/BookingFlow";
import TestRide from "@/components/TestRide";

// Reads ?mode / ?model in the browser so /book can be a static page.
export default function BookSwitch() {
  const q = useSearchParams();
  const test = q.get("mode") === "test";
  const model = q.get("model");
  const keep = model ? `model=${encodeURIComponent(model)}` : "";
  return (
    <>
      <div className="grid gap-2">
        <h1 className="text-4xl font-extrabold sm:text-5xl"><T>{test ? "Book a test ride" : "Book your Ozotec"}</T></h1>
        <p className="text-muted"><T>{test ? "Free, at your nearest showroom. Takes 30 seconds." : "Three steps. About two minutes."}</T></p>
      </div>
      <nav aria-label="Booking type" className="grid grid-cols-2 gap-1 rounded-full bg-card p-1 ring-1 ring-line">
        <Link href={`/book${keep ? `?${keep}` : ""}`} aria-current={!test ? "page" : undefined} className={`grid h-11 place-items-center rounded-full text-sm font-semibold ${!test ? "bg-fg text-bg" : "text-muted"}`}><T>{"Reserve a vehicle"}</T></Link>
        <Link href={`/book?mode=test${keep ? `&${keep}` : ""}`} aria-current={test ? "page" : undefined} className={`grid h-11 place-items-center rounded-full text-sm font-semibold ${test ? "bg-fg text-bg" : "text-muted"}`}><T>{"Test ride"}</T></Link>
      </nav>
      {test ? <TestRide /> : <BookingFlow />}
    </>
  );
}
