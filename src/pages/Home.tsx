import { useGetResearchPapers } from "../hooks/research-papers/useGetResearchPapers";
import { UploadResearchPaper } from "../components/research-papers/UploadResearchPaper";

export function Home() {
  const { data, isLoading } = useGetResearchPapers();

  if (isLoading) {
    return null;
  }

  return (
    <div className="h-screen w-screen p-20">
      <div className="flex justify-between items-center">
        <p className="text-xl">Research papers</p>
        <UploadResearchPaper />
      </div>
      <div className="mt-10">
        {data?.data.map((researchPaper) => (
          <div key={researchPaper.id}>
            <p>{researchPaper.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
