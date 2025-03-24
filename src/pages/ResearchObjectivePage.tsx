import { useParams } from "react-router-dom";
import { useGetResearchObjective } from "../hooks/focused-research/research-objectives/useGetResearchObjective";
import { ResearchObjectiveEditor } from "../components/focused-research/research-objectives/ResearchObjectiveEditor";
import { Button } from "@headlessui/react";
import { CircleFadingArrowUp } from "lucide-react";
import { Spinner } from "../components/ui/Spinner";
import { useState } from "react";

export function ResearchObjectivePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
      <div className="basis-1/3">
        <Button
          disabled
          className="flex items-center gap-2 bg-black text-white p-2 px-4 rounded-full ml-auto mb-4 text-xs disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <CircleFadingArrowUp className="w-4 h-4" />
          <p>Publish changes</p>
        </Button>
        <div className="bg-zinc-50 rounded-lg p-4 h-fit flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Research Objectives</p>
            {isAnalyzing && <Spinner size="sm" />}
          </div>
          <p className="text-xs text-zinc-500 italic">
            Start writing your research objective and what you want researched
            to see the results.
          </p>
        </div>
      </div>
    </div>
  );
}
