import { Route, Routes } from "react-router";
import ProfessionalExperience from "@/experiences/professional/ProfessionalExperience";
import NotFound from "@/experiences/professional/NotFound";

// One page, one scroll. The only other route is the 404: the Minecraft world
// lives on the `minecraft-backup` branch — it was pulled out because it was
// unfinished, and an unfinished second mode costs a visitor more than it gives.
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProfessionalExperience />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
