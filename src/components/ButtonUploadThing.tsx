"use client";

import { UploadButton } from "@/utils/uploadthing";

export default function ButtonUploadThing() {
  return (
    <UploadButton
      endpoint="pdfUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
