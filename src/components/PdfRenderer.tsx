"use client";
import { ChevronDownIcon, ChevronUpIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

// For react-pdf to work
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url: string;
}

interface FormData {
  page: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Initialize react-hook-form
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const handlePageSubmit = ({ page }: FormData) => {
    const pageNumber = Number(page);
    if (pageNumber > 0 && pageNumber <= numPages!) {
      setCurrentPage(pageNumber);
    } else {
      toast({
        title: "Invalid page number",
        description: `Please enter a number between 1 and ${numPages}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <Button
            disabled={currentPage <= 1}
            variant="ghost"
            aria-label="previous page"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
            <ChevronDownIcon className="h-4 w-4" />
          </Button>

          <form
            onSubmit={handleSubmit(handlePageSubmit)}
            className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              defaultValue={currentPage}
              onBlur={(e) => setValue("page", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
              className="w-12 h-8"
            />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? "..."}</span>
            </p>
          </form>

          <Button
            disabled={currentPage === numPages || numPages === undefined}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, numPages!))
            }
            variant="ghost"
            aria-label="next page">
            <ChevronUpIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        {/* PDF fit to page */}
        <div ref={ref}>
          <Document
            loading={
              <div className="flex justify-center">
                <Loader2 className="animate-spin my-24 h-6 w-6" />
              </div>
            }
            onLoadError={() => {
              toast({
                title: "Error loading PDF",
                description: "Try again later",
                variant: "destructive",
              });
            }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="max-h-full"
            file={url}>
            <Page width={width || 1} pageNumber={currentPage} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfRenderer;
