import { ResearchObjectives } from "../components/focused-research/research-objectives/ResearchObjectives";

export function FocusedResearch() {
  return (
    <div className="h-full w-full flex">
      <div className="p-20 flex-1">
        <p className="">Focused Research</p>
        <p className="text-sm text-zinc-500 max-w-prose">
          Focused research is a place for you to define your research interests
          and automatically build a feed of your interests in one place. Shut
          out the noise and focus on what matters.
        </p>
      </div>
      <ResearchObjectives />
    </div>
  );
}
