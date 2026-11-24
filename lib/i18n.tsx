import { TA } from "./ta";

type Vars = Record<string, string | number>;
const fill = (s: string, v?: Vars) => (v ? s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? "")) : s);

/**
 * Renders English and Tamil side by side; CSS shows one based on <html lang>.
 * Works in server and client components, keeps pages static, and switches with no flash.
 * Text with no Tamil entry yet stays English.
 */
export function T({ children, v }: { children: string; v?: Vars }) {
  const ta = TA[children];
  if (!ta) return <>{fill(children, v)}</>;
  return (
    <>
      <span className="i18n-en">{fill(children, v)}</span>
      <span className="i18n-ta" lang="ta">{fill(ta, v)}</span>
    </>
  );
}
