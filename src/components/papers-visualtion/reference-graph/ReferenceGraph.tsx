import { BookMarkedIcon, BookmarkPlusIcon } from "lucide-react";

export function ReferenceOntology() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-xs text-zinc-500 font-medium">
        <p>Paper Ontology</p>
      </div>
      <div className="p-10 bg-zinc-50 rounded-lg flex flex-col gap-4 items-center">
        <div className="w-1/3">
          <div className="bg-white border border-zinc-100 w-full p-6 rounded-sm shadow-xs flex flex-col gap-4 items-center text-center">
            <div>
              <p className="text-sm font-medium">
                No ontology created for this paper yet
              </p>
              <p className="text-xs text-zinc-500">
                Create an ontology to better understand the relationships
                between this paper and other papers
              </p>
            </div>
            <button className="flex items-center gap-2 text-xs bg-black text-white px-4 py-2 rounded-full w-fit">
              <BookmarkPlusIcon className="w-4 h-4" />
              <p>Create Ontology</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
