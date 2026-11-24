"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Background video for wide screens only. Phones, data-saver and reduced-motion visitors get the still poster. */
export default function AmbientVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const [play, setPlay] = useState(false);
  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const ok = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches && !conn?.saveData;
    setPlay(ok);
  }, []);
  // Stop decoding while the video is off screen.
  useEffect(() => {
    const v = vid.current; if (!v) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); });
    io.observe(v);
    return () => io.disconnect();
  }, [play]);
  return (
    <>
      <Image src={poster} alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className={`object-cover ${className}`} aria-hidden />
      {play && <video ref={vid} className={`absolute inset-0 h-full w-full object-cover ${className}`} src={src} autoPlay muted loop playsInline preload="none" aria-hidden />}
    </>
  );
}
