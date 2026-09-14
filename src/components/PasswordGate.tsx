"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LocalTime } from "./fx/LocalTime";
import { Magnetic } from "./fx/Magnetic";
import { ShaderField } from "./fx/ShaderField";
import { SplitText } from "./fx/SplitText";
import { useCursor } from "./fx/CursorProvider";
import { site } from "@/content/site";

type Status = "idle" | "checking" | "error" | "ok";

export function PasswordGate({
  initialUnlocked,
  children,
}: {
  initialUnlocked: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const { set, reset } = useCursor();
  const inputRef = useRef<HTMLInputElement>(null);
  const [unlocked, setUnlocked] = useState(initialUnlocked);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (unlocked) return;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 420);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(id);
    };
  }, [unlocked]);

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (status === "checking" || status === "ok") return;

    setStatus("checking");
    try {
      const response = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: value }),
      });

      if (!response.ok) {
        setStatus("error");
        setValue("");
        inputRef.current?.focus();
        window.setTimeout(() => setStatus("idle"), 900);
        return;
      }

      setStatus("ok");
      sessionStorage.setItem("lm-preloaded", "1");
      router.refresh();
      window.setTimeout(() => setUnlocked(true), 800);
    } catch {
      setStatus("error");
      inputRef.current?.focus();
      window.setTimeout(() => setStatus("idle"), 900);
    }
  };

  return (
    <>
      <AnimatePresence>
      {!unlocked && (
        <motion.div
          className="fixed inset-0 z-[10001] flex flex-col justify-between overflow-hidden bg-ink px-6 py-6 text-paper md:px-10 md:py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <ShaderField colors={["#050508", "#131a36", "#5b4bff"]} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/90" />

          <div className="relative mono flex items-start justify-between text-paper/50">
            <span>{site.name}</span>
            <span className="hidden md:inline">Private studio</span>
            <LocalTime />
          </div>

          <div className="relative my-auto w-full max-w-[1600px] self-center">
            <p className="mono mb-6 opacity-40">00 — Access</p>
            <div id="gate-title">
              <SplitText
                as="h1"
                text="Private"
                className="display-xl block text-[clamp(3.2rem,14vw,12rem)]"
                stagger={0.04}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-md font-serif text-xl italic leading-[1.35] text-paper/70 md:text-2xl"
            >
              This work is shown by invitation. Type the word to enter.
            </motion.p>

            <motion.form
              action="/api/unlock"
              method="POST"
              onSubmit={submit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 max-w-3xl md:mt-20"
            >
              <label htmlFor="gate-password" className="sr-only">
                Password
              </label>

              <motion.div
                animate={status === "error" ? { x: [0, -14, 12, -8, 8, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="mono mb-4 flex items-center justify-between opacity-40">
                  <span>Password</span>
                  <span
                    aria-live="polite"
                    className={status === "error" ? "text-recrem opacity-100" : ""}
                  >
                    {status === "checking" && "Checking"}
                    {status === "error" && "Not quite"}
                    {status === "ok" && "Welcome"}
                    {status === "idle" && (focused ? "Listening" : "Awaiting")}
                  </span>
                </div>

                <div className="relative flex min-h-[4.5rem] items-center md:min-h-[6.5rem]">
                  <div className="pointer-events-none flex flex-wrap items-center gap-2.5 md:gap-3.5">
                    {value.length === 0 ? (
                      <span className="font-serif text-[clamp(1.8rem,6vw,4.2rem)] italic leading-none text-paper/20">
                        the word
                      </span>
                    ) : (
                      value.split("").map((_, index) => (
                        <motion.span
                          key={`${index}-${status}`}
                          initial={{ scale: 0, opacity: 0, y: 10 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            backgroundColor:
                              status === "error"
                                ? "var(--recrem)"
                                : status === "ok"
                                  ? "#34d399"
                                  : "var(--paper)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 520,
                            damping: 28,
                          }}
                          className="inline-block h-3 w-3 rounded-full md:h-3.5 md:w-3.5"
                        />
                      ))
                    )}
                    <span
                      className={`ml-1 inline-block h-8 w-px bg-paper md:h-12 ${
                        focused && status === "idle" ? "blink" : "opacity-0"
                      }`}
                    />
                  </div>

                  <input
                    ref={inputRef}
                    id="gate-password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-invalid={status === "error"}
                    value={value}
                    disabled={status === "ok"}
                    onChange={(e) => {
                      setValue(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="absolute inset-0 cursor-none text-base opacity-0"
                  />
                </div>

                <div
                  className={`mt-2 h-px w-full origin-left overflow-hidden transition-colors duration-300 ${
                    status === "error"
                      ? "bg-recrem"
                      : status === "ok"
                        ? "bg-emerald-400"
                        : "bg-paper/20"
                  }`}
                >
                  <motion.span
                    className="block h-full bg-paper"
                    animate={{
                      scaleX: status === "checking" || status === "ok" ? 1 : focused ? 1 : 0,
                    }}
                    style={{ originX: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>

              <div className="mt-10 flex items-center justify-between">
                <p className="mono max-w-[18ch] text-paper/35">
                  Press enter to unlock the studio
                </p>
                <Magnetic strength={0.3}>
                  <button
                    type="submit"
                    disabled={status === "checking" || status === "ok"}
                    onMouseEnter={() => set({ variant: "hover", label: "Enter" })}
                    onMouseLeave={reset}
                    className="mono link-underline py-1 text-paper"
                  >
                    {status === "ok" ? "Opening" : "Enter →"}
                  </button>
                </Magnetic>
              </div>
            </motion.form>
          </div>

          <div className="relative mono flex items-end justify-between text-paper/40">
            <span className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-paper/50" />
              Locked
            </span>
            <span>Portfolio 2026</span>
          </div>

          <div className="grain" aria-hidden />
        </motion.div>
      )}
      </AnimatePresence>
      <div inert={!unlocked ? true : undefined} aria-hidden={!unlocked}>
        {children}
      </div>
    </>
  );
}
