"use client";
import ChatWrapper from "@/components/ChatWrapper";
import PdfRenderer from "@/components/PdfRenderer";
import { useEffect, useState } from "react";

interface FileInfo {
  id: number;
  name: string;
  userId: string;
  uploadStatus: string;
  url: string;
  key: string;
  createdAt: string;
  upadatedAt: string;
}

interface PageProps {
  params: {
    key: string;
  };
}

const page = ({ params }: PageProps) => {
  // Retrieve info
  const { key } = params;

  const [pdfInfo, setPdfInfo] = useState([]);

  useEffect(() => {
    const getOneFile = async () => {
      try {
        const response = await fetch(`/api/pdfFiles/${key}`);
        const data = await response.json();
        setPdfInfo(data);
      } catch (error) {
        console.error("Error fetching specific file:", error);
      }
    };
    getOneFile();
  }, []);

  // Empty dependency array means this effect will run only once when the component mounts

  // const fileIdNumber = parseInt(fileid);

  // // Find the object in the data array with the matching id
  // const fileInfo = data.find((item: FileInfo) => item.id === fileIdNumber);

  if (!pdfInfo) {
    return <div>File not found</div>;
  }

  console.log(pdfInfo);

  return (
    <>
      <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 xl:flex">
            <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              {/* Main area */}
              <PdfRenderer />
            </div>
          </div>

          <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
            <ChatWrapper />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
