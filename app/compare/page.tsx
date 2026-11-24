import { T } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { MODELS } from "@/lib/data";
import { specs } from "@/lib/specs";

export const metadata = { title: "Compare models", description: "Compare every Ozotec scooter and MUV: price, range, batteries, speed, load and charging." };

export default function ComparePage() {
  const all = MODELS.map(specs);
  const rows: [string, (m: (typeof MODELS)[0]) => React.ReactNode][] = all[0].map((s, i) => [
    s.label,
    (m) => <span className="num"><T>{all[MODELS.indexOf(m)][i].text}</T></span>,
  ]);
  return (
    <>
      <PageHero eyebrow="Compare" title="Every Ozotec, side by side." sub="Swipe the table on your phone. Tap a model to see every battery option." />
      <section className="wrap py-14">
        <div className="overflow-x-auto rounded-[2rem] bg-card ring-1 ring-line">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-40 bg-card p-4 align-bottom text-xs uppercase tracking-wider text-muted"><T>{"Model"}</T></th>
                {MODELS.map((m) => (
                  <th key={m.id} className="p-4 align-bottom">
                    <Link href={`/models/${m.id}`} className="group grid gap-2">
                      <span className="studio-night relative block aspect-[4/3] overflow-hidden rounded-2xl">
                        <Image src={m.cut} alt="" fill sizes="180px" className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
                      </span>
                      <span className="font-display text-lg font-bold group-hover:text-signal">{m.name}</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, cell]) => (
                <tr key={label} className="border-t border-line">
                  <th scope="row" className="sticky left-0 z-10 bg-card p-4 font-medium text-muted"><T>{label}</T></th>
                  {MODELS.map((m) => <td key={m.id} className="p-4 align-top">{cell(m)}</td>)}
                </tr>
              ))}
              <tr className="border-t border-line">
                <th scope="row" className="sticky left-0 z-10 bg-card p-4" />
                {MODELS.map((m) => (
                  <td key={m.id} className="p-4"><Link href={`/book?model=${m.id}`} className="grid h-11 place-items-center rounded-full bg-signal font-semibold text-white hover:bg-signal-2"><T>{"Book"}</T></Link></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
