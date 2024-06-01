import Messages from "./Messages";
import ChatInput from "./ChatInput";

interface ChatWrapperProps {
  pdfInfo: {
    id: number;
    name: string;
    userId: string;
    uploadStatus: string;
    url: string;
    key: string;
    createdAt: string;
    upadatedAt: string;
  };
}

const ChatWrapper = ({ pdfInfo }: ChatWrapperProps) => {
  console.log(pdfInfo);

  return (
    <div className="relative min-h-full  bg-zinc-50 divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="flex-1 justify-between flex flex-col mb-28">
        <Messages />
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatWrapper;
