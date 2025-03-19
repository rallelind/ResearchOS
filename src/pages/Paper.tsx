import { useParams } from "react-router-dom";
import { useGetPaper } from "../hooks/discover-papers/useGetPaper";
import {
  BookmarkPlusIcon,
  ExternalLinkIcon,
  LibraryBigIcon,
  ZapIcon,
} from "lucide-react";
import { useState } from "react";
import { ReferenceGraph } from "../components/papers-visualtion/reference-graph/ReferenceGraph";

function getPdfUrl(paper: any) {
  if (paper.externalIds.ArXiv) {
    return `https://arxiv.org/pdf/${paper.externalIds.ArXiv}`;
  }

  return paper.openAccessPdf;
}

export function PaperPage() {
  const { paperId } = useParams();
  const { paper } = useGetPaper(paperId || "");
  const [abstractExpanded, setAbstractExpanded] = useState(false);

  if (!paper || !paperId) {
    return null;
  }

  const toggleAbstract = () => {
    setAbstractExpanded(!abstractExpanded);
  };

  const abstractLines = paper.abstract.split("\n").length;
  const isLongAbstract = paper.abstract.length > 400 || abstractLines > 4;

  const displayedAbstract =
    isLongAbstract && !abstractExpanded
      ? `${paper.abstract.slice(0, 300)}${paper.abstract.length > 300 ? "..." : ""}`
      : paper.abstract;

  return (
    <div className="px-30 py-10">
      <div className="flex gap-20 justify-between">
        <div className="max-w-prose basis-2/3 flex flex-col gap-4">
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
                <LibraryBigIcon className="w-4 h-4 text-orange-500" />
                <p className="text-sm bg-orange-50 text-orange-500 px-1 rounded-md w-fit">
                  Abstract
                </p>
              </div>
              <p className="text-sm text-zinc-500">
                {displayedAbstract}
                {isLongAbstract && (
                  <button
                    onClick={toggleAbstract}
                    className="text-xs text-purple-500 hover:text-purple-700 transition-colors ml-1 inline-block"
                  >
                    {abstractExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="basis-1/3">
          <div className="bg-zinc-50 rounded-lg p-4 h-fit">
            <div className="flex flex-col gap-4 border-b pb-4 border-zinc-100">
              <p className="text-xs text-zinc-500 font-medium">References</p>
              <div className="flex items-center gap-2 justify-between text-xs">
                <p>Amount of references</p>
                <p className="bg-purple-50 text-purple-500 px-1 py-1 rounded-md w-fit">
                  {paper.referenceCount}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4 border-b pb-4 border-zinc-100">
              <p className="text-xs text-zinc-500 font-medium">Authors</p>
              <div className="flex flex-wrap gap-2">
                {paper.authors.map((author: { name: string }) => (
                  <p
                    key={author.name}
                    className="text-xs text-black bg-zinc-100 px-1 py-1 rounded-md"
                  >
                    {author.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <p className="text-xs text-zinc-500 font-medium">Source</p>
              <div className="flex flex-col gap-2">
                <a
                  href={getPdfUrl(paper)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs flex gap-2 items-center bg-white px-2 py-1 rounded-full shadow-xs w-fit"
                >
                  <ExternalLinkIcon className="w-3 h-3" />
                  <p>Go to original paper</p>
                </a>
              </div>
            </div>
          </div>
          <button className="bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-xs flex items-center mt-4 flex gap-2">
            <BookmarkPlusIcon className="w-4 h-4" />
            <p>Add to library</p>
          </button>
        </div>
      </div>
    </div>
  );
}
