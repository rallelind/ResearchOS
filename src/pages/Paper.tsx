import { useParams } from "react-router-dom";
import { useGetPaper } from "../hooks/discover-papers/useGetPaper";
import { LibraryBigIcon, ZapIcon } from "lucide-react";

export function PaperPage() {
  const { paperId } = useParams();

  const { paper } = useGetPaper(paperId || "");

  if (!paper) {
    return null;
  }

  return (
    <div className="max-w-prose flex flex-col gap-4">
      <h1 className="text-2xl">{paper.title}</h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <ZapIcon className="w-4 h-4 text-purple-500" />
            <p className="text-sm bg-purple-50 text-purple-500 px-1 rounded-md w-fit">
              TL;DR
            </p>
          </div>
          <p className="text-sm text-zinc-500">{paper.tldr.text}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <LibraryBigIcon className="w-4 h-4 text-purple-500" />
            <p className="text-sm bg-blue-50 text-blue-500 px-1 rounded-md w-fit">
              Abstract
            </p>
          </div>
          <p className="text-sm text-zinc-500">{paper.abstract}</p>
        </div>
      </div>
    </div>
  );
}
