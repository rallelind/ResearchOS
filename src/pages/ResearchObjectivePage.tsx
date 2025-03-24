import { useParams } from "react-router-dom";
import { useGetResearchObjective } from "../hooks/focused-research/research-objectives/useGetResearchObjective";
import { ResearchObjectiveEditor } from "../components/focused-research/research-objectives/ResearchObjectiveEditor";

export function ResearchObjectivePage() {
  const { researchObjectiveId } = useParams();

  const { researchObjective } = useGetResearchObjective(
    researchObjectiveId ?? ""
  );

  if (!researchObjective) return null;

  return (
    <div className="px-20 py-10 flex gap-10">
      <div className="basis-2/3">
        <p className="text-lg">{researchObjective.researchObjectiveTitle}</p>
        <ResearchObjectiveEditor
          content={researchObjective.researchObjective ?? ""}
        />
      </div>
      <div className="basis-1/3 bg-zinc-50 rounded-lg p-4 h-fit flex flex-col gap-4">
        <p className="text-xs font-medium">Research Objectives</p>
        <p className="text-xs text-zinc-500 italic">
          Start writing your research objective and what you want researched to
          see the results.
        </p>
      </div>
    </div>
  );
}
