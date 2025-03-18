import { ScanSearchIcon } from "lucide-react";
import { useState, useDeferredValue } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useGetSuggestions } from "../hooks/discover-papers/useGetSuggestions";
import { SuggestedPaperCard } from "../components/discover-papers/SuggestedPaperCard";
import { Spinner } from "../components/ui/Spinner";
import { useNavigate } from "react-router-dom";

const SEARCH_QUERY_KEY = "researchOS-paperSearchQuery";

export function DiscoverPapersPage() {
  const [query, setQuery] = useState(() => {
    return sessionStorage.getItem(SEARCH_QUERY_KEY) || "";
  });

  const debouncedQuery = useDebounce(query, 500);
  const deferredQuery = useDeferredValue(debouncedQuery);

  const { suggestions, isLoadingSuggestions } =
    useGetSuggestions(deferredQuery);
  const deferredSuggestions = useDeferredValue(suggestions);

  const isLoading = deferredQuery !== query || isLoadingSuggestions;

  const navigate = useNavigate();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery) {
      sessionStorage.setItem(SEARCH_QUERY_KEY, newQuery);
    }
  };

  const handlePaperClick = (paperId: string) => {
    navigate(`/discover/paper/${paperId}`);
  };

  return (
    <div className="p-20 flex flex-col gap-6">
      <div className="text-center w-2/3 mx-auto">
        <p className="text-lg">Explore and discover papers</p>
        <p className="text-zinc-500 text-sm">
          Search and discover papers for your work, you can then save
          interesting papers to your library for further knowledge discovery.
        </p>
      </div>
      <div className="w-2/3 mx-auto">
        <div className="relative flex items-center w-full">
          <input
            value={query}
            onChange={handleQueryChange}
            placeholder="Search for papers"
            className="rounded-full w-full border border-zinc-200 p-2 pl-4 pr-10 focus:outline-2 focus:outline-purple-100"
          />

          <div className="absolute right-1 bg-purple-100 rounded-full h-9 w-9 flex items-center justify-center text-purple-600">
            <ScanSearchIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-2/3 mx-auto relative">
        {isLoading && (
          <div className="absolute top-0 right-0">
            <Spinner />
          </div>
        )}
        {deferredSuggestions?.matches?.map((suggestion) => (
          <SuggestedPaperCard
            key={suggestion.id}
            suggestion={suggestion}
            query={deferredQuery}
            onClick={() => handlePaperClick(suggestion.id)}
          />
        ))}
        {!isLoading && deferredSuggestions?.matches?.length === 0 && (
          <div className="py-4 text-center text-zinc-500">
            <p className="text-xs">No suggestions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
