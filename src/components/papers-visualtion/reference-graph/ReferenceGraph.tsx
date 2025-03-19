import { useGetPaperReferences } from "../../../hooks/discover-papers/useGetPaperReferences";


export function ReferenceGraph({ paperId }: { paperId: string }) {
  const { references } =
    useGetPaperReferences(paperId);

  console.log(references)

  return <div>References</div>;
}
