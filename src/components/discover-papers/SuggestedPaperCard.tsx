import { SuggestionsResponse } from "../../semantic-scholar-papers-graph";
import { ReactNode } from "react";

export const HIGHLIGHT_CLASS = "bg-purple-100";

export function SuggestedPaperCard({
  suggestion,
  query,
  onClick,
}: {
  suggestion: SuggestionsResponse["matches"][0];
  query: string;
  onClick: () => void;
}) {
  const highlightMatch = (title: string, query: string): ReactNode => {
    if (!query.trim()) return title;

    const regex = new RegExp(`(${query.trim()})`, "gi");
    const parts = title.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className={HIGHLIGHT_CLASS}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <button
      className="flex items-start p-4 gap-4 hover:bg-zinc-50 rounded-lg text-left"
      onClick={onClick}
    >
      <div>
        <div className="text-sm text-black">
          {highlightMatch(suggestion.title, query)}
        </div>
        <div className="text-sm text-zinc-500">{suggestion.authorsYear}</div>
      </div>
    </button>
  );
}
