import { useMutation } from "@tanstack/react-query";
import { uploadMedia } from "../../foundry/uploadMedia";
import { MediaReference } from "@osdk/api";
import { createResearchPaper, ResearchPaper } from "@researchos/sdk";
import { foundryClient } from "../../main";
import { useCallback } from "react";

export async function mutationFn(file: File) {
  const mediaReference: MediaReference = await uploadMedia(file, ResearchPaper);

  const result = await foundryClient(createResearchPaper).applyAction({
    id: mediaReference.reference.mediaSetViewItem.mediaItemRid,
    title: file.name,
    media_reference: mediaReference,
    analysis_finished: false,
  });

  return result;
}

export const useCreateResearchPaper = () => {
  const { isPending, mutateAsync, isSuccess} = useMutation({
    mutationFn: mutationFn,
  });

  const handleCreateResearchPaper = useCallback(
    async (file: File) => {
      const result = await mutateAsync(file);
      return result;
    },
    [mutateAsync]
  );

  return {
    handleCreateResearchPaper,
    isPending,
    isSuccess,
  };
};
