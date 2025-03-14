import { __EXPERIMENTAL__NOT_SUPPORTED_YET__createMediaReference } from "@osdk/api/unstable";

import { foundryClient } from "../main";
import { ResearchPaper } from "@researchos/sdk";

type ObjectTypeWithMediaReference = ResearchPaper;

export async function uploadMedia(
  file: File,
  objectType: ObjectTypeWithMediaReference
) {
  const data = file;

  return await foundryClient(
    __EXPERIMENTAL__NOT_SUPPORTED_YET__createMediaReference
  ).createMediaReference({
    data,
    fileName: file.name,
    objectType,
    propertyType: "mediaReference",
  });
}
