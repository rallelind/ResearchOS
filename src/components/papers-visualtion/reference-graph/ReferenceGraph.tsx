import { useGetPaperReferences } from "../../../hooks/discover-papers/useGetPaperReferences";


export function ReferenceGraph({ paperIds }: { paperIds: string[] }) {
  const { references } =
    useGetPaperReferences(paperIds);

  console.log(references)

  return <div>References</div>;
}
