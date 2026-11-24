import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[70vh] content-center justify-items-start gap-4 pb-16 pt-32">
      <p className="num font-display text-7xl font-extrabold text-signal">404</p>
      <h1 className="text-3xl font-bold">This road doesn&apos;t go anywhere.</h1>
      <p className="text-muted">The page you asked for doesn&apos;t exist. Try a model or head home.</p>
      <div className="flex flex-wrap gap-2">
        <Link href="/" className="grid h-12 place-items-center rounded-full bg-navy px-6 font-semibold text-white">Home</Link>
        <Link href="/models/flio-pro" className="grid h-12 place-items-center rounded-full px-6 ring-1 ring-line">See models</Link>
      </div>
    </section>
  );
}
