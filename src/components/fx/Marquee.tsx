type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
  separator?: string;
};

export function Marquee({
  items,
  className = "",
  reverse = false,
  separator = "✦",
}: MarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {sequence.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 pr-8 text-[clamp(1.6rem,4.5vw,3.6rem)] font-medium tracking-[-0.04em]"
          >
            {item}
            <span className="text-[0.4em] opacity-40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
