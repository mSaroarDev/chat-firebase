import { useState } from "react";
import { ChatContext } from "../contexts/ChatsContext";

const ChatsProviders = ({ children }) => {
  const [chats, setChats] = useState([]);

  const value = {
    setChats,
    chats
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
};

export default ChatsProviders;