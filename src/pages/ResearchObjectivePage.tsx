import { useParams } from "react-router-dom";
import { useGetResearchObjective } from "../hooks/focused-research/research-objectives/useGetResearchObjective";

export function ResearchObjectivePage() {
  const { researchObjectiveId } = useParams();

  const { researchObjective } =
    useGetResearchObjective(researchObjectiveId ?? "");

  if (!researchObjective) return null;

  return (
    <div>
      <p>{researchObjective.researchObjectiveTitle}</p>
    </div>
  );
}
