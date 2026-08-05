import { Pickaxe, Briefcase } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { Button } from "@/components/ui/button";

// Swaps between the professional portfolio and the Minecraft journey.
// Same role as a dark/light switch, but it changes the entire experience.
export default function ModeToggle() {
  const { mode, toggleMode } = useMode();
  const inMinecraft = mode === "minecraft";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleMode}
      aria-label={
        inMinecraft ? "Cambiar a modo profesional" : "Cambiar a modo Minecraft"
      }
      title={inMinecraft ? "Modo profesional" : "Modo Minecraft"}
    >
      {inMinecraft ? (
        <Briefcase className="size-4" />
      ) : (
        <Pickaxe className="size-4" />
      )}
      <span className="hidden sm:inline">
        {inMinecraft ? "Profesional" : "Minecraft"}
      </span>
    </Button>
  );
}
