import { FilePlus2Icon } from "lucide-react";
import { useRef } from "react";

export function NoResearchPapersUploaded() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center w-1/3 h-1/3 border border-orange-200 rounded-sm border-dashed gap-4">
        <div className="h-fit w-fit bg-orange-100 rounded-sm p-2">
          <FilePlus2Icon className="w-6 h-6 text-orange-500" />
        </div>
        <div className="text-center">
          <div className="text-sm">No research papers uploaded</div>
          <div className="text-gray-500 text-xs">
            Upload a research paper to get started
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleFileUpload}
        />
        <button
          className="text-xs mt-4"
          onClick={() => inputRef.current?.click()}
        >
          Browse files
        </button>
      </div>
    </div>
  );
}
