"use client";
import React, { useEffect, useState } from "react";
import UploadButton from "./UploadButton";
import {
  FileText,
  Ghost,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface User {
  id: string;
  email: string | null;
}

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);
  const [currentlyLoadingDoc, setCurrentlyLoadingDoc] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await fetch(`/api/pdfFiles`);
        const data = await response.json();

        const userFiles = data.filter(
          (file: { userId: string }) => file.userId === user.id,
        );
        setFiles(userFiles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
        setIsLoading(false);
      }
    };

    getFiles();
  }, [user.id]);

  const deleteFile = async (fileId: string, fileKey: string) => {
    try {
      const response = await fetch("/api/uploadthing", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ files: [fileKey] }),
      });

      setCurrentlyDeletingFile(fileId);
      await fetch(`/api/pdfFiles/${fileId}`, { method: "DELETE" });
      const filteredPdfs = files.filter((item) => item._id !== fileId);
      setFiles(filteredPdfs);
      setCurrentlyDeletingFile(null);
    } catch (error) {
      console.log(error);
      setCurrentlyDeletingFile(null);
    }
  };

  //because the file takes a long time to load, let the user see a loading spinner
  const handleDocClick = async (fileId: string) => {
    setCurrentlyLoadingDoc(fileId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error loading document:", error);
    } finally {
      setCurrentlyLoadingDoc(null);
    }
  };

  return (
    <main className="mx-auto max-w-7xl md:p-10 px-2">
      <div className="mt-8 flex flex-col justify-between gap-4 items-start border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-gray-900 text-5xl">Library</h1>
        <UploadButton />
      </div>

      {isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : files && files.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((file) => (
              <li
                key={file._id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link href={`/dashboard/${file._id}`} passHref>
                  <div
                    className="flex flex-col gap-2"
                    onClick={() => handleDocClick(file._id)}
                  >
                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-300 to-primary">
                        {currentlyLoadingDoc === file._id ? (
                          <Loader2 className="text-white h-4 w-4 items-center m-3 animate-spin" />
                        ) : (
                          <FileText className="text-white h-4 w-4 items-center m-3" />
                        )}
                      </div>
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-lg font-medium text-zinc-900">
                            {file.filename}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(file.createdAt), "MMM yyyy")}
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {file.messages.length}
                  </div>
                  <Button
                    onClick={() => deleteFile(file._id, file.key)}
                    size="sm"
                    className="w-full"
                    variant="destructive"
                  >
                    {currentlyDeletingFile === file._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex mt-16 flex-col items-center gap-2">
          <Ghost className="h8 w-8 text-zinc-800" />
          <h3 className="font font-semibold text-xl">It's quiet here.</h3>
          <p>Upload your first file to begin</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
