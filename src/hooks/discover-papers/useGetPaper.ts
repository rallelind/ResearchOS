import { useQuery } from "@tanstack/react-query";
import { SemanticScholarPapersGraph } from "../../semantic-scholar-papers-graph";

export function useGetPaper(paperId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["paper", paperId],
    queryFn: () => {
      const semanticScholarPapersGraph = new SemanticScholarPapersGraph();
      return semanticScholarPapersGraph.getPaperDetails(paperId);
    },
  });

  return {
    paper: data,
    isLoadingPaper: isLoading,
    errorPaper: error,
  };
}
