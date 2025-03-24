import { GoalIcon } from "lucide-react";
import { CreateResearchObjective } from "./CreateResearchObjective";
import { useGetResearchObjectives } from "../../../hooks/focused-research/research-objectives/useGetResearchObjectives";
import { Spinner } from "../../ui/Spinner";
import { ResearchObjective } from "@researchos/sdk";
import { Osdk } from "@osdk/client";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/cn";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-30 gap-2">
      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
        <GoalIcon className="w-6 h-6 text-purple-500" />
      </div>
      <div className="text-center">
        <p className="text-sm">No research objectives defined</p>
        <p className="text-xs text-zinc-500">
          Define your research objectives to automatically build a feed of your
          interests in one place.
        </p>
      </div>
    </div>
  );
}

function ResearchObjectiveCard({
  researchObjective,
}: {
  researchObjective: Osdk.Instance<ResearchObjective>;
}) {
  return (
    <Link
      to={`/focus/research-objectives/${researchObjective.id}`}
      className="flex gap-4 p-4 hover:bg-zinc-50 rounded-lg items-start"
    >
      <div>
        <p className="text-sm">{researchObjective.researchObjectiveTitle}</p>
        <p
          className={cn("text-xs text-zinc-500", {
            italic: !researchObjective.researchObjective,
          })}
        >
          {researchObjective.researchObjective || "No objective defined yet"}
        </p>
      </div>
    </Link>
  );
}

export function ResearchObjectives() {
  const { researchObjectives, researchObjectivesLoading } =
    useGetResearchObjectives();

  return (
    <aside className="border-l border-zinc-200 w-1/4">
      <div className="flex items-center justify-between p-4">
        <p className="text-xs text-zinc-500 font-medium">Research Objectives</p>
        <CreateResearchObjective />
      </div>
      <div className="px-4">
        {researchObjectivesLoading && <Spinner size="lg" />}
        {researchObjectives?.length === 0 && <EmptyState />}
        <div className="flex flex-col gap-4">
          {researchObjectives?.map((researchObjective) => (
            <ResearchObjectiveCard
              key={researchObjective.id}
              researchObjective={researchObjective}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
