import React from "react";
import UploadButton from "./UploadButton";
import data from "@/data/files.json";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";

const Dashboard = () => {
  const mockData = data;

  // const getFiles = async () => {
  //   const response = await fetch(`/api/File/${1}`);
  //   const data = await response.json();
  //   console.log(data, "data");
  // };
  // getFiles();

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div
        className="mt-8 flex flex-col justify-between 
      gap-4 items-start border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0 ">
        <h1 className="mb-3 font-bold text-gray-900  text-5xl">My Files</h1>

        <UploadButton />
      </div>

      {/* display user files */}
      {mockData && mockData.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {mockData
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2">
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(file.created_at), "MMM yyyy")}
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    mocked
                  </div>
                  <Button
                    // onClick={() => deleteFile({ id: file.id })}
                    size="sm"
                    className="w-full"
                    variant="destructive">
                    {/* {currentlyDeletingFile === file.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : ( */}
                    <Trash className="h-4 w-4" />
                    {/* )} */}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <div className=" flex mt-16 flex-col items-center gap-2">
          <Ghost className="h8 q-8 text-zinc-800" />
          <h3 className="font font-semibold text-xl">It's quiet here. </h3>
          <p>Upload your first file to begin</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
