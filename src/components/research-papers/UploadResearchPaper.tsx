import { useRef } from "react";
import { useCreateResearchPaper } from "../../hooks/research-papers/useCreateResearchPaper";
import { FilePlus2 } from "lucide-react";

export function UploadResearchPaper() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleCreateResearchPaper } = useCreateResearchPaper();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleCreateResearchPaper(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileUpload}
      />
      <button
        className="text-xs mt-4 flex items-center gap-2"
        onClick={() => inputRef.current?.click()}
      >
        <FilePlus2 className="h-3 w-3" />
        <p>Upload research paper</p>
      </button>
    </div>
  );
}
