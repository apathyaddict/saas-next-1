"use client";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2,
  RotateCw,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SimpleBar from "simplebar-react";
import PdfFullScreen from "./PdfFullScreen";
import { cn } from "@/lib/utils";

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
  const [scale, setscale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  //to avoid lag when switching scales
  const isLoading = renderedScale !== scale;

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
        <div className="space-x-2">
          <DropdownMenu>
            {/* pass as child to use the button for styling */}
            <DropdownMenuTrigger asChild>
              <Button className="gap.15" aria-label="zoom" variant="ghost">
                <Search className="w-4 h-4" />
                {scale * 100} %{" "}
                <ChevronDownIcon className=" h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setscale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setscale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setscale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setscale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            aria-label="rotate 90degrees"
            variant="ghost"
            onClick={() => {
              setRotation((prev) => prev + 90);
            }}>
            <RotateCw className="h-4 w-4" />
          </Button>

          <PdfFullScreen fileUrl={url} />
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        {/* to contain the pdf */}
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
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
              {isLoading && renderedScale ? (
                <Page
                  scale={scale}
                  width={width || 1}
                  pageNumber={currentPage}
                  rotate={rotation}
                  key={"@" + renderedScale}
                />
              ) : null}
              {/* extra tweek for smooth usage but works without it */}
              <Page
                className={cn(isLoading ? "hidden" : "")}
                scale={scale}
                width={width || 1}
                pageNumber={currentPage}
                rotate={rotation}
                key={"@" + scale}
                loading={
                  <div className="flex justify-center ">
                    <Loader2 className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;
