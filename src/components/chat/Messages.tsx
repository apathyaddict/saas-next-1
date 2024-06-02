import React, { useEffect, useState } from "react";

interface MessagesProps {
  fileId: string;
}

const Messages = ({ fileId }: MessagesProps) => {
  const [messages, setMessages] = useState([]);

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
    <div>
      {messages.map((msg: any, index: number) => (
        <div key={index}>{msg.message}</div>
      ))}
    </div>
  );
};

export default Messages;
