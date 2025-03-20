import { useQuery } from "@tanstack/react-query";
import { SemanticScholarPapersGraph } from "../../semantic-scholar-papers-graph";

async function queryFn(paperIds: string[]) {
  const semanticScholarPapersGraph = new SemanticScholarPapersGraph();
  return semanticScholarPapersGraph.getAllPapersWithIds(paperIds);
}

export function useGetPaperReferences(paperIds: string[]) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["paper-references", paperIds],
    queryFn: () => queryFn(paperIds),
  });

  return {
    references: data,
    isLoadingReferences: isLoading,
    errorReferences: error,
  };
}
