import { useParams } from "react-router-dom";
import { useGetPaper } from "../hooks/discover-papers/useGetPaper";
import { ExternalLinkIcon, LibraryBigIcon, ZapIcon } from "lucide-react";

function getPdfUrl(paper: any) {
  if (paper.externalIds.ArXiv) {
    return `https://arxiv.org/pdf/${paper.externalIds.ArXiv}`;
  }

  return paper.openAccessPdf;
}

export function PaperPage() {
  const { paperId } = useParams();

  const { paper } = useGetPaper(paperId || "");

  if (!paper) {
    return null;
  }

  return (
    <div className="flex gap-20 px-30 py-10 justify-between">
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
            <p className="text-sm text-zinc-500">{paper.abstract}</p>
          </div>
        </div>
      </div>
      <div className="basis-1/3 bg-zinc-50 rounded-lg p-4 h-fit">
        <div className="flex flex-col gap-4 border-b pb-4 border-zinc-200">
          <p className="text-sm text-zinc-500 font-medium">References</p>
          <div className="flex items-center gap-2 justify-between text-sm">
            <p>Amount of references</p>
            <p className="bg-purple-50 text-purple-500 px-1 py-1 rounded-md w-fit">
              {paper.referenceCount}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4 border-b pb-4 border-zinc-200">
          <p className="text-sm text-zinc-500 font-medium">Authors</p>
          <div className="flex flex-wrap gap-2">
            {paper.authors.map((author: { name: string }) => (
              <p
                key={author.name}
                className="text-sm text-purple-500 bg-purple-50 px-1 py-1 rounded-md"
              >
                {author.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-sm text-zinc-500 font-medium">Source</p>
          <div className="flex items-center gap-2">
            <a
              href={getPdfUrl(paper)}
              target="_blank"
              rel="noreferrer"
              className="text-sm flex gap-2 items-center bg-white px-2 py-1 rounded-full shadow-xs"
            >
              <ExternalLinkIcon className="w-4 h-4" />
              <p>Go to original paper</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
