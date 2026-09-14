"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LocalTime } from "./fx/LocalTime";
import { Magnetic } from "./fx/Magnetic";
import { useCursor } from "./fx/CursorProvider";
import { site } from "@/content/site";

export function SiteNav() {
  const pathname = usePathname();
  const { set, reset } = useCursor();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 160);
  });

  return (
    <motion.header
      className="fixed top-0 left-0 z-[60] w-full mix-blend-difference"
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between px-6 py-6 text-white md:px-10 md:py-8">
        <Magnetic strength={0.25}>
          <Link
            href="/"
            onMouseEnter={() => set({ variant: "hover", label: "Home" })}
            onMouseLeave={reset}
            className="flex items-baseline gap-3"
          >
            <span className="text-base font-medium tracking-[-0.03em] md:text-lg">
              Laura Mateo
            </span>
            <span className="mono hidden opacity-50 md:inline">
              Product Designer
            </span>
          </Link>
        </Magnetic>

        <div className="flex items-center gap-6 md:gap-10">
          <LocalTime className="mono hidden opacity-50 lg:inline" />
          <nav className="flex items-center gap-5 md:gap-8">
            {site.nav.map((item) => {
              const active =
                item.href === "/work"
                  ? pathname.startsWith("/work")
                  : pathname === item.href;
              return (
                <Magnetic key={item.href} strength={0.3}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => set({ variant: "hover", label: item.label })}
                    onMouseLeave={reset}
                    className="mono link-underline relative py-1"
                  >
                    {active && (
                      <span className="mr-1.5 inline-block h-1 w-1 -translate-y-[3px] rounded-full bg-current align-middle" />
                    )}
                    {item.label}
                  </Link>
                </Magnetic>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
