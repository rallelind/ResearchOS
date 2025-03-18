import { useParams } from "react-router-dom";
import { useGetPaper } from "../hooks/discover-papers/useGetPaper";

export function PaperPage() {
  const { paperId } = useParams();

  const { paper } = useGetPaper(paperId || "");

  if (!paper) {
    return null;
  }

  return (
    <div className="max-w-prose flex flex-col gap-4">
      <h1 className="text-2xl">{paper.title}</h1>
      <div>
        <p className="text-sm text-zinc-500">
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs">
            TL;DR
          </span>{" "}
          {paper.tldr.text}
        </p>
      </div>
      <div>
        <p className="text-sm text-zinc-500">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs">
            Abstract
          </span>{" "}
          {paper.abstract}
        </p>
      </div>
    </div>
  );
}
