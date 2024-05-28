"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";

const UploadDropZone = () => {
  const [isUploading, setIsUploading] = useState<boolean>(true);

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { toast } = useToast();

  const { startUpload } = useUploadThing("pdfUploader");

  // slowly increases the progress of the bar. This is fake, but assumes a certain progress
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

        //upload to uploadthign
        const res = await startUpload(acceptedFiles);
        //toast error
        if (!res) {
          return toast({
            title: "Something went wrong",
            description: "try again later",
            variant: "destructive",
          });
        }

        const [fileResponse] = res;
        const key = fileResponse?.key;
        if (!key) {
          return toast({
            title: "Something went wrong",
            description: "try again later",
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);
      }}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border border-dashed h-64 m-4  border-gray-300 rounded-lg">
          <div className="flex items-center  justify-center h-full w-full ">
            <label className="flex flex-col items-center w-full h-full justify-center rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="mb-2 h-6 w-6 text-zinc-500" />
                <p className="text-zinc-700 mb-2 text-sm">
                  Click to upload or drag and drop
                </p>
                <p className="text-zinc-500 text-xs"> PDF (up to 4mb)</p>
              </div>

              {/* little box showing uploaded file */}
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
              {/* progress baar during upload */}
              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    // color={uploadProgress === 100 ? "bg-green-500" : ""}
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {/* {uploadProgress === 100 ? (
                    <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Redirecting...
                    </div>
                  ) : null} */}
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
    <Dialog
      open={isOpen}
      onOpenChange={(visible) => {
        if (!visible) {
          setIsOpen(visible);
        }
      }}>
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
