import React from "react";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

interface ChatWrapperProps {
  pdfInfo: {
    _id: string;
    name: string;
    userId: string;
    uploadStatus: string;
    url: string;
    key: string;
    createdAt: string;
    updatedAt: string;
  };
}

const ChatWrapper = ({ pdfInfo }: ChatWrapperProps) => {
  const id = pdfInfo._id;
  const userId = pdfInfo.userId;

  return (
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-28">
        <Messages fileId={id} />
      </div>
      <ChatInput fileId={id} userId={userId} />
    </div>
  );
};

export default ChatWrapper;
