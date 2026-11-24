import { Suspense } from "react";
import BookSwitch from "@/components/BookSwitch";

export const metadata = { title: "Book", description: "Reserve your Ozotec in three steps, or book a free test ride." };

export default function BookPage() {
  return (
    <section className="wrap grid max-w-2xl gap-6 pb-16 pt-28 sm:pt-32">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-card" />}>
        <BookSwitch />
      </Suspense>
    </section>
  );
}
