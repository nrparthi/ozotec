import { T } from "@/lib/i18n";
import Link from "next/link";
import { Suspense } from "react";
import BookingFlow from "@/components/BookingFlow";
import TestRide from "@/components/TestRide";

export const metadata = { title: "Book", description: "Reserve your Ozotec in three steps, or book a free test ride." };

export default async function BookPage({ searchParams }: { searchParams: Promise<{ mode?: string; model?: string }> }) {
  const sp = await searchParams;
  const test = sp.mode === "test";
  const keep = sp.model ? `model=${sp.model}` : "";
  return (
    <section className="wrap grid max-w-2xl gap-6 pb-16 pt-28 sm:pt-32">
      <div className="grid gap-2">
        <h1 className="text-4xl font-extrabold sm:text-5xl"><T>{test ? "Book a test ride" : "Book your Ozotec"}</T></h1>
        <p className="text-muted"><T>{test ? "Free, at your nearest showroom. Takes 30 seconds." : "Three steps. About two minutes."}</T></p>
      </div>
      <nav aria-label="Booking type" className="grid grid-cols-2 gap-1 rounded-full bg-card p-1 ring-1 ring-line">
        <Link href={`/book${keep ? `?${keep}` : ""}`} aria-current={!test ? "page" : undefined} className={`grid h-11 place-items-center rounded-full text-sm font-semibold ${!test ? "bg-fg text-bg" : "text-muted"}`}><T>{"Reserve a vehicle"}</T></Link>
        <Link href={`/book?mode=test${keep ? `&${keep}` : ""}`} aria-current={test ? "page" : undefined} className={`grid h-11 place-items-center rounded-full text-sm font-semibold ${test ? "bg-fg text-bg" : "text-muted"}`}><T>{"Test ride"}</T></Link>
      </nav>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-card" />}>
        {test ? <TestRide /> : <BookingFlow />}
      </Suspense>
    </section>
  );
}
