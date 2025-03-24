import { GoalIcon, PlusIcon } from "lucide-react";

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

export function ResearchObjectives() {
  return (
    <aside className="border-l border-zinc-200 w-1/4">
      <div className="flex items-center justify-between p-4">
        <p className="text-xs text-zinc-500 font-medium">Research Objectives</p>
        <button className="flex items-center gap-2 p-2 hover:bg-zinc-100 rounded-sm">
          <PlusIcon className="w-4 h-4 text-zinc-500" />
        </button>
      </div>
      <div className="p-6">
        <EmptyState />
      </div>
    </aside>
  );
}
