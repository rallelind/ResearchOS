import {
  Dialog,
  DialogPanel,
  Input,
  Button,
  DialogBackdrop,
} from "@headlessui/react";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useCreateResearchObjective } from "../../../hooks/focused-research/research-objectives/useCreateResearchObjectives";   
import { useNavigate } from "react-router-dom";

export function CreateResearchObjective() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const { handleCreateResearchObjective } = useCreateResearchObjective();
  const navigate = useNavigate();

  const handleCreateResearchObjectiveClick = async () => {
    const createdResearchObjectiveId = await handleCreateResearchObjective(title);
    setOpen(false);
    setTitle("");
    navigate(`/focus/research-objectives/${createdResearchObjectiveId}`);
  };

  return (
    <>
      <Button
        className="flex items-center gap-2 p-2 hover:bg-zinc-100 rounded-sm"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="w-4 h-4 text-zinc-500" />
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/10" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-sm border border-purple-200 bg-white p-4 shadow-xs flex flex-col gap-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your research objective"
              className="placeholder:text-zinc-400 focus:outline-none focus:ring-0 font-medium"
              autoFocus
            />
            <Button
              className="ml-auto text-xs bg-purple-100 px-4 py-2 rounded-sm text-white bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600"
              disabled={title.length === 0}
              onClick={handleCreateResearchObjectiveClick}
            >
              Create
            </Button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
