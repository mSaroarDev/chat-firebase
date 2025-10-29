import { equalTo, get, getDatabase, onChildAdded, orderByChild, query, ref, set } from "firebase/database";
import { useAuth } from "../useAuth";
import { useMessages } from "../useGetMessages";
import { useUpdateChat } from "./chats";

const db = getDatabase();

export const useCreateMessage = () => {
  const messageId = Date.now().toString();
  const { currUser } = useAuth();
  const {messages, setMessages} = useMessages();
  const {updateChat} = useUpdateChat();

  const createMessage = async (chatId, content) => {
    const newMessage = {
      id: messageId,
      chatId,
      senderId: currUser.uid,
      content,
      createdAt: Date.now(),
    };

    await set(ref(db, `messages/${messageId}`), newMessage);
    setMessages([...messages, newMessage]);
    await updateChat(chatId, content);
  };

  return {
    createMessage,
  };
};

export const useGetMessages = (chatId) => {
  const {messages, setMessages} = useMessages();

  const messageRef = ref(db, "messages");
  const q = query(messageRef, orderByChild("chatId"), equalTo(chatId));

  const getMessages = async () => {
    const snapshot = await get(q);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } else {
      return [];
    }
  };

  getMessages();

  // listener for new messages
  const unsubscribe = onChildAdded(q, (snapshot)=> {
    const recievedMessage = snapshot.val();
    setMessages((prev)=> {
      const isExist = prev.some((msg)=> msg.id === recievedMessage.id);
      if(!isExist){
        return [...prev, recievedMessage];
      }
      return prev;
    });

    return () => unsubscribe();
  });

  return {
    messages,
  };
}