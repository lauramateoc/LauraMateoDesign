"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

type SplitTextProps = {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export function SplitText({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
  stagger = 0.028,
  once = true,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  let charIndex = -1;

  return (
    <Tag className={className}>
      <span className="split-line">
        {words.map((word, wi) => (
          <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => {
              charIndex += 1;
              return (
                <motion.span
                  key={`${char}-${ci}`}
                  className="split-char"
                  initial={{ y: "110%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once, margin: "-10%" }}
                  transition={{
                    duration: 0.9,
                    delay: delay + charIndex * stagger,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
            {wi < words.length - 1 && (
              <span className="split-char">&nbsp;</span>
            )}
          </span>
        ))}
      </span>
    </Tag>
  );
}
