import React, { useEffect, useState } from "react";

interface MessagesProps {
  fileId: string;
}

const Messages = ({ fileId }: MessagesProps) => {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const getMessages = async () => {
  //     try {
  //       const response = await fetch(`/api/message?fileId=${fileId}`);
  //       if (!response.ok) {
  //         throw new Error("Error fetching messages");
  //       }
  //       const data = await response.json();
  //       setMessages(data);
  //     } catch (error) {
  //       console.error("Error fetching messages", error);
  //     }
  //   };
  //   getMessages();
  // }, [fileId]);

  return (
    <div>
      {/* {messages.map((msg: any, index: number) => (
        <div key={index}>{msg.text}</div>
      ))} */}
    </div>
  );
};

export default Messages;
