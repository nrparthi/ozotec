"use client";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Lifts content into place once when it scrolls into view. Only transform animates, so content is never hidden
    (no blank sections before JS loads, on slow phones, or in screenshots and link previews). */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ y: 32 }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/** Counts up to `to` when visible. `format` renders the number. */
export function CountUp({ to, format = (n) => Math.round(n).toLocaleString("en-IN") }: { to: number; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [text, setText] = useState(format(to)); // server renders the final value
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration: 1.4, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setText(format(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to]);
  return <span ref={ref} className="num">{text}</span>;
}
