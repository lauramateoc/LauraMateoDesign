"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useCursor } from "./CursorProvider";

export function Cursor() {
  const { variant, label, preview } = useCursor();
  const [enabled, setEnabled] = useState(false);
  const [inWindow, setInWindow] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const dotX = useSpring(x, { stiffness: 1400, damping: 70, mass: 0.25 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 70, mass: 0.25 });
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setInWindow(true);
    };
    const leave = () => setInWindow(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const showMedia = variant === "media" && Boolean(preview);
  const visible = inWindow && variant !== "hidden";

  return (
    <>
      {/* precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[10002] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !showMedia ? 1 : 0, scale: visible ? 1 : 0.4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-white" />
      </motion.div>

      {/* trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[10002] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible && !showMedia ? 1 : 0,
          width: variant === "hover" ? 64 : 34,
          height: variant === "hover" ? 64 : 34,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/70">
          <AnimatePresence>
            {variant === "hover" && label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className="mono text-[8px] text-white"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* image preview */}
      <AnimatePresence>
        {showMedia && inWindow && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed top-0 left-0 z-[10002]"
            style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative h-[220px] w-[320px] overflow-hidden rounded-md shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview ?? ""}
                alt=""
                className="h-full w-full object-cover"
              />
              <span className="mono absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[8px] text-white backdrop-blur">
                {label || "View"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
