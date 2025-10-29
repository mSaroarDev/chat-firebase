import { useState } from "react";
import { MessagesContext } from "../contexts/MessagesContext";

const MessageProviders = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const value = {
    setMessages,
    messages
  }

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  )
};

export default MessageProviders;