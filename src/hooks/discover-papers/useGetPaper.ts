import { useQuery } from "@tanstack/react-query";
import { SemanticScholarPapersGraph } from "../../semantic-scholar-papers-graph";

export function useGetPaper(paperId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["paper", paperId],
    queryFn: () => {
      const semanticScholarPapersGraph = new SemanticScholarPapersGraph();
      return semanticScholarPapersGraph.getPaperDetails(paperId);
    },
    refetchInterval: (query) => query.state.error ? 1000 : 0,
});

  return {
    paper: data,
    isLoadingPaper: isLoading,
    errorPaper: error,
  };
}
