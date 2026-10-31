export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="TELES ADS mark" fill="none">
      <path d="M6 8h52v13L38 27v30H24V27L6 21V8Z" fill="currentColor" />
      <path d="m6 8 18 19v30L6 21V8Z" fill="currentColor" opacity=".65" />
      <path d="M58 8 38 27v30l20-36V8Z" fill="currentColor" opacity=".8" />
      <path d="M24 27h14L58 8H6l18 19Z" fill="currentColor" opacity=".92" />
      <path d="m24 27 7-5 7 5v30H24V27Z" fill="currentColor" />
    </svg>
  );
}

/** Yellow "ADVERTISEMENT ///" caution-tape strip. Repeats its lettering to fill. */
export function Tape({
  className = "",
  text = "ADVERTISEMENT",
  repeat = 6,
}: {
  className?: string;
  text?: string;
  repeat?: number;
}) {
  return (
    <div className={`tape ${className}`} aria-hidden="true">
      <div className="tape-inner">
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i}>{text} <b>///</b> </span>
        ))}
      </div>
    </div>
  );
}
