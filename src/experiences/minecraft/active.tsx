import { createContext, useContext, useRef } from "react";
import { useInView } from "motion/react";

// Whether the current section is on screen. Animations read this and settle to a
// resting state when false, so off-screen sections don't burn CPU/GPU.
export const ActiveContext = createContext(true);
export const useActive = () => useContext(ActiveContext);

// Returns a ref to attach to a section and whether it's currently in view.
export function useActiveRef(amount = 0.04) {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { amount });
  return [ref, active] as const;
}
