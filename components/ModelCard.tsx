import { T } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Model, minPrice, maxKm } from "@/lib/data";
import { inr } from "@/lib/money";

export default function ModelCard({ m }: { m: Model }) {
  return (
    <Link href={`/models/${m.id}`} className="group relative grid overflow-hidden rounded-[2rem] bg-card ring-1 ring-line transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/20">
      <div className="studio-night relative aspect-[4/3.6]">
        <Image src={m.cut} alt={m.name} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
          className="object-contain p-4 transition-transform duration-500 ease-out-expo group-hover:scale-[1.06]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/15 backdrop-blur"><T>{m.kind}</T></span>
        <ArrowUpRight className="absolute right-3 top-3 size-5 text-white/60 transition-all group-hover:rotate-45 group-hover:text-white" aria-hidden />
      </div>
      <div className="grid gap-0.5 p-4">
        <h3 className="text-lg font-bold">{m.name}</h3>
        <p className="num text-sm text-muted"><T>{"From"}</T> <b className="text-fg">{inr(minPrice(m))}</b></p>
        <p className="num text-xs text-muted"><T v={{ km: maxKm(m) }}>{"Up to {km} km"}</T> · <T v={{ n: m.variants.length }}>{m.variants.length > 1 ? "{n} battery options" : "{n} battery option"}</T></p>
      </div>
    </Link>
  );
}
