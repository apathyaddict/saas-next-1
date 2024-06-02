import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Icons } from "../icons";
import Markdown from "react-markdown";
import { format } from "date-fns";

interface Props {
  fileId: string;
}

const Messages: React.FC<Props> = ({ fileId }) => {
  const [messages, setMessages] = useState<
    { message: string; id: string; createdAt: Date }[]
  >([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`/api/pdfFiles/${fileId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching messages");
        }
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    getMessages();
  }, [fileId]);

  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] border-zinc-200 flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {messages.map((msg, index) => (
        <div className={cn("flex items-end justify-end")}>
          <div
            className={cn(
              "relative flex h-6 w-6 aspect-square items-center justify-center order-1 bg-zinc-800 rounded-sm "
            )}>
            <Icons.user className="'fill-zinc-200 text-zinc-200 h-3/4 w-3/4" />
          </div>

          <div
            className={cn(
              "flex flex-col space-y-2 text-base max-w-md mx-2 bg-slate-400 order-1 items-end"
            )}>
            <div
              className={cn(
                "px-4 py-2  inline-block bg-gray-200 text-gray-900 "
              )}>
              {typeof msg.message === "string" ? (
                <Markdown className={cn("prose", "text-slate-700")}>
                  {msg.message}
                </Markdown>
              ) : (
                msg.message
              )}
              {msg.id !== "loading-message" ? (
                <div
                  className={cn(
                    "text-xs select-none mt-1 w-full text-right text-zinc-500"
                  )}>
                  {format(new Date(msg.createdAt), "HH:mm")}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
