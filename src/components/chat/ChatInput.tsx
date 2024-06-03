import React, { useState, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  fileId: string;
  userId: string;
}

const ChatInput = ({ fileId, userId }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const addMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/pdfFiles/${fileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, fileId, userId }),
      });
      if (response.ok) {
        setMessage("");
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
    <div className="absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <div className="relative">
              <Textarea
                className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                rows={1}
                autoFocus
                maxRows={4}
                placeholder="Enter your question..."
                ref={textAreaRef}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addMessage();
                    textAreaRef.current?.focus();
                  }
                }}
              />
              <Button
                disabled={isLoading}
                className="absolute bottom-1.5 right-[8px]"
                aria-label="send message"
                onClick={() => {
                  addMessage();
                  textAreaRef.current?.focus();
                }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
