import { useGetResearchPapers } from "../hooks/research-papers/useGetResearchPapers";
import { NoResearchPapersUploaded } from "../components/research-papers/NoResearchPapersUploaded";

export function Home() {
  const { data, isLoading } = useGetResearchPapers();

  if (isLoading) {
    return null
  }

  return <div className="h-screen w-screen">
    {data?.data.length === 0 ? (
      <NoResearchPapersUploaded />
    ) : (
      <div>Research papers</div>
    )}
  </div>;
}
