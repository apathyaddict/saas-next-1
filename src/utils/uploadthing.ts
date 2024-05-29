import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButtonT = generateUploadButton<OurFileRouter>();
export const UploadDropzoneT = generateUploadDropzone<OurFileRouter>();
