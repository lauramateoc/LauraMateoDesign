"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type CursorVariant = "default" | "hover" | "media" | "hidden";

type CursorState = {
  variant: CursorVariant;
  label: string;
  preview: string | null;
};

type CursorApi = CursorState & {
  set: (next: Partial<CursorState>) => void;
  reset: () => void;
};

const initial: CursorState = {
  variant: "default",
  label: "",
  preview: null,
};

const CursorContext = createContext<CursorApi>({
  ...initial,
  set: () => {},
  reset: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>(initial);
  const pathname = usePathname();

  const set = useCallback((next: Partial<CursorState>) => {
    setState((prev) => ({ ...prev, ...next }));
  }, []);

  const reset = useCallback(() => setState(initial), []);

  useEffect(() => {
    reset();
  }, [pathname, reset]);

  const value = useMemo(
    () => ({ ...state, set, reset }),
    [state, set, reset],
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
