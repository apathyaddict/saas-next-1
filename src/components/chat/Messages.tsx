"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Icons } from "../icons";
import Markdown from "react-markdown";
import { format } from "date-fns";
import { Ghost, Loader2 } from "lucide-react";

interface Message {
  createdAt: Date;
  isUserMessage: boolean;
  message: string;
  updatedAt: Date;
  userId: string;
  _id: string;
}

interface MessagesProps {
  allMessages: Message[];
  fileId: string;
}

const Messages = ({ fileId, allMessages }: MessagesProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return allMessages && allMessages.length > 0 ? (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {allMessages
        .slice()
        .reverse()
        .map((msg) => (
          <div key={msg._id} className={cn("flex items-end justify-end")}>
            <div
              className={cn(
                "relative flex h-6 w-6 aspect-square items-center justify-center order-1 bg-zinc-800 rounded-sm ",
              )}
            >
              <Icons.user className="'fill-zinc-200 text-zinc-200 h-3/4 w-3/4" />
            </div>

            <div
              className={cn(
                "flex flex-col space-y-2 text-base max-w-md mx-2 order-1 items-end",
              )}
            >
              <div
                className={cn(
                  "px-4 py-2 inline-block bg-gray-200 text-gray-900 rounded-lg",
                )}
              >
                {typeof msg.message === "string" ? (
                  <Markdown className={cn("prose", "text-zinc-700")}>
                    {msg.message}
                  </Markdown>
                ) : (
                  msg.message
                )}
                {msg._id !== "loading-message" ? (
                  <>
                    <div
                      className={cn(
                        "text-xs select-none w-full text-right text-zinc-500",
                      )}
                    >
                      {format(new Date(msg.createdAt), `HH:mm  `)}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ))}
    </div>
  ) : (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <div className="relative min-h-full bg-zinc-50 flex items-center justify-center divide-y divide-zinc-200 flex-col gap-2  py-5 ">
        <div className="flex-1 flex justify-center items-center flex-col ">
          <div className="flex flex-col items-center gap-2 opacity-50">
            <Ghost className="w-8 h-8 " />
            {/* <h3 className="font-semibold text-xl">Nothing Here</h3> */}
            <p className="text-zinc-500 text-sm">
              Write some notes or comments for yourself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
