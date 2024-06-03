"use client";
import ChatWrapper from "@/components/chat/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { useEffect, useState } from "react";

interface PageProps {
  params: {
    fileid: string;
  };
}

const page = ({ params }: PageProps) => {
  const { fileid } = params;

  const [pdfInfo, setPdfInfo] = useState<
    {
      _id: string;
      name: string;
      userId: string;
      uploadStatus: string;
      url: string;
      key: string;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);

  useEffect(() => {
    const getOneFile = async () => {
      try {
        const response = await fetch(`/api/pdfFiles/${fileid}`);
        const data = await response.json();

        setPdfInfo(data);
      } catch (error) {
        console.error("Error fetching specific file:", error);
      }
    };
    getOneFile();
  }, []);

  // @ts-ignore
  const url = pdfInfo.url;

  if (!pdfInfo) {
    return <div>File not found</div>;
  }

  return (
    <>
      <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              {/* Main area */}

              <PdfRenderer url={url} />
            </div>
          </div>

          <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
            {/* consider if bug pdfInfo={pdfInfo[0]} fileid={fileid} */}
            <ChatWrapper fileid={fileid} pdfInfo={pdfInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
