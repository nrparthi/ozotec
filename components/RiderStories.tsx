"use client";
import { T } from "@/lib/i18n";
import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

// Real Ozotec customers, from Ozotec's own testimonial videos. Videos load only when tapped.
const STORIES = [
  { video: "/ozotec/life/rider-story-1.mp4", poster: "/ozotec/life/milkman.jpg", who: "Dairy farmer", model: "Bheem", line: "Carries his milk cans on the Bheem every morning.", mins: "0:57" },
  { video: "/ozotec/life/rider-story-2.mp4", poster: "/ozotec/life/farmer-bheem.jpg", who: "Farmer", model: "Bheem", line: "Moves produce sacks from field to market.", mins: "2:19" },
  { video: "/ozotec/life/rider-story-3.mp4", poster: "/ozotec/life/farmer-sack.jpg", who: "Riders across Tamil Nadu", model: "Flio", line: "Families, commuters and farmers on the Flio.", mins: "0:56" },
];

export default function RiderStories() {
  const [playing, setPlaying] = useState<number | null>(null);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {STORIES.map((s, i) => (
        <figure key={s.video} className="grid overflow-hidden rounded-[2rem] bg-card ring-1 ring-line">
          <div className="relative aspect-video bg-ink">
            {playing === i ? (
              <video className="absolute inset-0 h-full w-full object-contain" src={s.video} poster={s.poster} controls autoPlay playsInline preload="none" />
            ) : (
              <button type="button" onClick={() => setPlaying(i)} aria-label={`Play ${s.who} story, ${s.mins}`} className="group absolute inset-0 cursor-pointer">
                <Image src={s.poster} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-xl transition-transform group-hover:scale-110"><Play className="ml-1 size-7 fill-current" aria-hidden /></span>
                <span className="num absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">{s.mins}</span>
              </button>
            )}
          </div>
          <figcaption className="grid gap-1 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-signal">{s.model} · <T>{s.who}</T></p>
            <p className="font-display text-lg font-semibold leading-snug"><T>{s.line}</T></p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
