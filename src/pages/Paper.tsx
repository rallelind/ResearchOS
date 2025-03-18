import { useParams } from "react-router-dom";
import { useGetPaper } from "../hooks/discover-papers/useGetPaper";

export function PaperPage() {
  const { paperId } = useParams();

  const { paper } = useGetPaper(paperId || "");

  if (!paper) {
    return null
  }

  console.log(paper);

  return <div>{paper.title}</div>;
}
