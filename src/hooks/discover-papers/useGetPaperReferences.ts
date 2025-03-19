import { useQuery } from "@tanstack/react-query";
import { SemanticScholarPapersGraph } from "../../semantic-scholar-papers-graph";

async function queryFn(paperId: string) {
  const semanticScholarPapersGraph = new SemanticScholarPapersGraph();
  return semanticScholarPapersGraph.getPaperReferences(paperId);
}

export function useGetPaperReferences(paperId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["paper-references", paperId],
    queryFn: () => queryFn(paperId),
  });

  return {
    references: data,
    isLoadingReferences: isLoading,
    errorReferences: error,
  };
}
