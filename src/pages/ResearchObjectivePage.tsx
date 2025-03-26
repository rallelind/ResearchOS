import { useParams } from "react-router-dom";
import { useGetResearchObjective } from "../hooks/focused-research/research-objectives/useGetResearchObjective";
import { ResearchObjectiveEditor } from "../components/focused-research/research-objectives/ResearchObjectiveEditor";
import { Button } from "@headlessui/react";
import { Spinner } from "../components/ui/Spinner";
import { useState } from "react";
import { useGetNewResearchObjectives } from "../hooks/focused-research/research-objectives/useGetNewResearchObjectives";
import { useDebounce } from "../hooks/useDebounce";
import * as Icons from "lucide-react";

type DynamicLucideIconProps = {
  icon: keyof typeof Icons;
  className?: string;
};

export function DynamicLucideIcon({ icon, className }: DynamicLucideIconProps) {
  const Icon = (Icons[icon] || Icons.HelpCircle) as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  return <Icon className={className} />;
}

const dummyTasks = [
  {
    topic: "Applied AI",
    tasks: [
      {
        task: "Find Latest Papers",
        icon: "ScanText",
      },
      {
        topic: "AI Interfaces",
        tasks: [
          {
            task: "Find Latest Papers",
            icon: "ScanText",
          },
          {
            task: "Find Github Repos",
            icon: "Github",
          },
        ],
      },
    ],
  },
];

function RenderTask({ node, depth = 0 }) {
  if (node.topic) {
    return (
      <div className={`ml-${depth * 4} mt-2`}>
        <h3 className="font-medium">{node.topic}</h3>
        {node.tasks &&
          node.tasks.map((child, index) => (
            <RenderTask key={index} node={child} depth={depth + 1} />
          ))}
      </div>
    );
  }

  return (
    <div className="ml-4 mt-2 flex items-center gap-2 bg-white border border-zinc-200 shadow-xs rounded-md p-1 pr-2 w-fit">
      <DynamicLucideIcon icon={node.icon} className="w-4 h-4" />
      <p>{node.task}</p>
    </div>
  );
}

function TasksTree({ tasks }) {
  return (
    <div className="text-xs">
      {tasks.map((node, index) => (
        <RenderTask key={index} node={node} />
      ))}
    </div>
  );
}

export function ResearchObjectivePage() {
  const [content, setContent] = useState("");
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
  };

  const isLoading = isLoadingNewResearchObjectives;

  return (
    <div className="px-20 py-10 flex gap-20">
      <div className="basis-2/3">
        <p className="text-xl font-medium mb-2">
          {researchObjective.researchObjectiveTitle}
        </p>
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
          <Icons.CircleFadingArrowUp className="w-4 h-4" />
          <p>Publish changes</p>
        </Button>
        <div className="bg-zinc-50 rounded-lg p-4 h-fit flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Tasks</p>
            {isLoading && <Spinner size="sm" />}
          </div>
          <p className="text-xs text-zinc-500">
            Write your research objective in natural language and the system
            will extract the required actions.
          </p>
          <TasksTree tasks={dummyTasks || []} />
        </div>
      </div>
    </div>
  );
}
