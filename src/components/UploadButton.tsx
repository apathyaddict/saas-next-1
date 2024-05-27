"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";

const UploadDropZone = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  return (
    <Dropzone multiple={false}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border border-dashed h-64 m-4  border-gray-300 rounded-lg">
          <div className="flex items-center  justify-center h-full w-full ">
            <label className="flex flex-col items-center w-full h-full justify-center rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {" "}
                exemple
              </div>
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
