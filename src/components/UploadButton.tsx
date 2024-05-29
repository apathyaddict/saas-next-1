"use client";
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { Cloud, File } from "lucide-react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { generateClientDropzoneAccept } from "uploadthing/client";

// Define supported MIME types
const supportedMimeTypes = ["application/pdf"];

// Function to filter supported MIME types
const getSupportedFileTypes = (fileTypes: string[]): string[] => {
  return fileTypes.filter((type) => supportedMimeTypes.includes(type));
};

console.log("getSupportedFileTypes", getSupportedFileTypes);
console.log("supportedMimeTypes", supportedMimeTypes);

const UploadDropZone = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { startUpload, permittedFileInfo } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  // Extract and filter fileTypes from permittedFileInfo
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];
  const supportedFileTypes = getSupportedFileTypes(fileTypes);

  console.log("supportedFileTypes", supportedFileTypes);
  console.log("fileTypes", fileTypes);

  const startSimulatedProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);
    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFiles) => {
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();

        try {
          const res = await startUpload(acceptedFiles);
          if (!res) {
            throw new Error("Upload failed");
          }

          const [fileResponse] = res;
          const key = fileResponse?.key;
          if (!key) {
            throw new Error("No file key in response");
          }

          clearInterval(progressInterval);
          setUploadProgress(100);

          // Uncomment the toast and router.push lines if needed
          // toast({
          //   title: "Upload successful",
          //   description: "File uploaded successfully",
          //   variant: "success",
          // });
          // router.push(`/dashboard/${key}`);
        } catch (error) {
          clearInterval(progressInterval);
          setUploadProgress(0);
          setIsUploading(false);
          toast({
            title: "Something went wrong",
            description: "Try again later",
            variant: "destructive",
          });
        }
      }}
      accept={
        supportedFileTypes.length > 0
          ? generateClientDropzoneAccept(supportedFileTypes)
          : undefined
      }>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border border-dashed h-64 m-4 border-gray-300 rounded-lg">
          <div className="flex items-center justify-center h-full w-full">
            <label className="flex flex-col items-center w-full h-full justify-center rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                <p className="text-zinc-700 mb-2 text-sm">
                  Click to upload or drag and drop
                </p>
                <p className="text-zinc-500 text-xs"> PDF (up to 4mb)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                </div>
              ) : null}
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog open={isOpen} onOpenChange={(visible) => setIsOpen(visible)}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropZone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
