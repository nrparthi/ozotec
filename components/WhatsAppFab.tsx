import { CONTACT } from "@/lib/data";

export default function WhatsAppFab() {
  return (
    <a href={`https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent("Hi Ozotec, I'd like to know more.")}`} aria-label="Chat with Ozotec on WhatsApp"
      className="fixed z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-xl shadow-black/25 transition-transform duration-200 hover:scale-105"
      style={{ right: "max(16px, env(safe-area-inset-right, 0px))", bottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}>
      <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 1 1 7.99 4.42zm8.02-17.46A11.27 11.27 0 0 0 12.05.72 11.33 11.33 0 0 0 2.24 17.7L.64 23.5l5.94-1.56a11.3 11.3 0 0 0 5.47 1.4h.01a11.33 11.33 0 0 0 8.01-19.3z" />
      </svg>
    </a>
  );
}
