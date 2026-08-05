import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// The "mode" is the experience the visitor is in. It works like the
// light/dark toggle: persisted, app-wide, and it swaps the whole renderer.
export type Mode = "professional" | "minecraft";

const STORAGE_KEY = "portfolio:mode";
const DEFAULT_MODE: Mode = "professional";

interface ModeContextValue {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

function readStoredMode(): Mode {
  if (typeof window === "undefined") return DEFAULT_MODE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "minecraft" || stored === "professional"
    ? stored
    : DEFAULT_MODE;
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(readStoredMode);

  // Persist and reflect on <html> so CSS can react to the active world.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const setMode = (next: Mode) => setModeState(next);
  const toggleMode = () =>
    setModeState((prev) =>
      prev === "professional" ? "minecraft" : "professional",
    );

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within a ModeProvider");
  return ctx;
}
