import ModeToggle from "@/components/ModeToggle";
import Overworld from "./sections/Overworld";
import Caves from "./sections/Caves";
import Nether from "./sections/Nether";

// The immersive journey. A single vertical scroll that descends from the
// Overworld, through the caves, down into the Nether. Same data as the
// professional experience — different world.
export default function MinecraftExperience() {
  return (
    <div className="relative text-white">
      {/* Persistent escape hatch back to the professional world. */}
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <Overworld />
      <Caves />
      <Nether />
    </div>
  );
}
