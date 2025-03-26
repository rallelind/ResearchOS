import { useParams } from "react-router-dom";
import { useGetResearchObjective } from "../hooks/focused-research/research-objectives/useGetResearchObjective";
import { ResearchObjectiveEditor } from "../components/focused-research/research-objectives/ResearchObjectiveEditor";
import { Button } from "@headlessui/react";
import { CircleCheck, CircleFadingArrowUp } from "lucide-react";
import { Spinner } from "../components/ui/Spinner";
import { useState } from "react";
import { useGetNewResearchObjectives } from "../hooks/focused-research/research-objectives/useGetNewResearchObjectives";
import { useDebounce } from "../hooks/useDebounce";

export function ResearchObjectivePage() {
  const [content, setContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { researchObjectiveId } = useParams();
  const debouncedContent = useDebounce(content, 500);

  const { researchObjective } = useGetResearchObjective(
    researchObjectiveId ?? ""
  );

  const { newResearchObjectives, isLoadingNewResearchObjectives } =
    useGetNewResearchObjectives(debouncedContent, researchObjective);

  if (!researchObjective) return null;

  const handleChangeNewContent = (content: string) => {
    setContent(content);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  const isLoading = isTyping || isLoadingNewResearchObjectives;

  return (
    <div className="px-20 py-10 flex gap-20">
      <div className="basis-2/3">
        <p className="text-xl font-medium mb-2">{researchObjective.researchObjectiveTitle}</p>
        <ResearchObjectiveEditor
          content={researchObjective.researchObjective ?? ""}
          onChange={handleChangeNewContent}
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
            {isLoading && <Spinner size="sm" />}
          </div>
          {(!newResearchObjectives || newResearchObjectives.length === 0) && (
            <p className="text-xs text-zinc-500 italic">
              Start writing your research objective and what you want researched
              to see the results.
            </p>
          )}
          {newResearchObjectives &&
            newResearchObjectives.map((researchObjective) => (
              <div
                key={researchObjective.task}
                className="text-xs flex items-center gap-2"
              >
                <CircleCheck className="w-4 h-4" />
                <p>{researchObjective.task}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
