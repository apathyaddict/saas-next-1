"use client";
import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

interface ChatWrapperProps {
  pdfInfo: {
    [key: string]: any;
  };
  fileid: string;
}

interface Message {
  _id: string;
  message: string;
  isUserMessage: boolean;

  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
const ChatWrapper = ({ pdfInfo, fileid }: ChatWrapperProps) => {
  const id = pdfInfo._id;

  const userId = pdfInfo.userId;
  const [allmessages, setAllmessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      console.log("fileid", fileid);
      try {
        const response = await fetch(`/api/pdfFiles/${fileid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 10 },
        });

        if (!response.ok) {
          console.log("failed", response);
          throw new Error("Error fetching messages");
        }

        const data = await response.json();

        setAllmessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    if (fileid === undefined) {
    } else {
      getMessages();
    }
  }, [fileid]);

  const addMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/pdfFiles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, id, userId }),
        next: { revalidate: 10 },
      });
      if (response.ok) {
        const res = await response.json();
        console.log(res.messages);
        const now = new Date();
        const newMessage: Message = {
          message: message,
          isUserMessage: true,
          createdAt: now,
          updatedAt: now,
          userId: userId,
          _id: Math.random().toString(),
        };

        setAllmessages((prevMessages: Message[]) => [
          ...prevMessages,
          newMessage,
        ]);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-28">
        <Messages fileId={id} allMessages={allmessages} />
      </div>
      <ChatInput fileId={id} userId={userId} addMessage={addMessage} />
    </div>
  );
};

export default ChatWrapper;
