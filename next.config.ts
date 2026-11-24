import type { NextConfig } from "next";

const dev = process.env.NODE_ENV !== "production";

// shortcut: script-src keeps 'unsafe-inline' for Next's inline bootstrap scripts; move to per-request nonces when a backend/middleware exists.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  `connect-src 'self'${dev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(dev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Static export for GitHub Pages at nrparthi.github.io/ozotec. Assets sit in public/ (not public/ozotec)
  // so the "/ozotec/..." paths in code resolve under the basePath. Drop basePath when a custom domain is set.
  output: "export",
  basePath: "/ozotec",
  trailingSlash: true, // without it the home prefetch requests /ozotec.txt, which 404s under a basePath
  images: { unoptimized: true },
  // shortcut: GitHub Pages can't send response headers, so these only apply in dev; move to a host with header support (or a CDN) to enforce them live.
  ...(dev ? { async headers() { return [{ source: "/:path*", headers: securityHeaders }]; } } : {}),
};

export default nextConfig;
