import { T } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export default function PageHero({ eyebrow, title, sub, children }: { eyebrow: string; title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <section className="studio-night relative overflow-hidden text-white">
      <div className="pointer-events-none absolute -right-24 top-10 size-[28rem] rounded-full bg-signal/20 blur-3xl" />
      <div className="wrap relative grid gap-5 pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Reveal className="grid gap-5">
          <p className="eyebrow"><T>{eyebrow}</T></p>
          <h1 className="max-w-[16ch] text-5xl font-extrabold leading-[0.95] sm:text-7xl"><T>{title}</T></h1>
          {sub && <p className="max-w-[56ch] text-lg text-white/70"><T>{sub}</T></p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
