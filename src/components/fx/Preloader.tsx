"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["Hola", "Bonjour", "Hello", "Ciao", "Olá", "Laura Mateo"];

export function Preloader() {
  const [done, setDone] = useState(true);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("lm-preloaded")) return;

    setDone(false);
    document.body.style.overflow = "hidden";

    const startedAt = performance.now();
    const duration = 2100;
    let raf = 0;

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      setWordIndex(Math.min(Math.floor(eased * WORDS.length), WORDS.length - 1));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("lm-preloaded", "1");
        setTimeout(() => {
          document.body.style.overflow = "";
          setDone(true);
        }, 380);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-ink px-6 py-6 text-paper md:px-10 md:py-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mono flex items-center justify-between text-paper/40">
            <span>Portfolio 2026</span>
            <span>Loading assets</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[wordIndex]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="display-xl block text-[clamp(2.5rem,9vw,7rem)]"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="case-number shrink-0 text-[clamp(3rem,12vw,9rem)] tabular-nums">
              {String(count).padStart(3, "0")}
            </span>
          </div>

          <div className="h-px w-full bg-paper/15">
            <motion.div
              className="h-full bg-paper"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
