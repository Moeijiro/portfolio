/** Three connected nodes: input → service → output. Also the favicon (app/icon.svg). */
export function LogoMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="#0e1013" stroke="rgb(255 255 255 / 0.14)" />
      <path d="M9 11 C 14 11, 13 16, 16 16 M9 21 C 14 21, 13 16, 16 16 L 23 16" fill="none" stroke="oklch(0.84 0.12 190)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9" cy="11" r="2.4" fill="#eceef1" />
      <circle cx="9" cy="21" r="2.4" fill="#eceef1" />
      <circle cx="16" cy="16" r="2.8" fill="oklch(0.84 0.12 190)" />
      <circle cx="23.5" cy="16" r="2.4" fill="#eceef1" />
    </svg>
  );
}
