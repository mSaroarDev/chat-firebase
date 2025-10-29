import { get, getDatabase, ref, set, update } from "firebase/database";
import "../../configs/firebase";
import { useAuth } from "../useAuth";
import { useChats } from "../useGetChats";
import { useNavigate } from "react-router-dom";

// firebase init
const db = getDatabase();

export const useCreateChat = () => {
  const navigate = useNavigate();

  const { currUser } = useAuth();
  const { chats, setChats } = useChats();

  const chatId = Date.now().toString();

  const { getChats } = useGetChats();

  const createChat = async (recipientIds) => {

    const participantIds = [currUser.uid, ...recipientIds].sort();

    // find chat
    const myChats = await getChats();

    const existChat = myChats.find((chat) => {
      return JSON.stringify(chat.participantIds) === JSON.stringify(participantIds);
    });

    console.log("existChat", existChat);

    if (existChat) {
      navigate(`/dashboard/chats?chatId=${existChat.id}`);
      return;
    }

    const newChat = {
      id: chatId,
      createdBy: currUser.uid,
      participantIds,
      lastMessage: null,
      updatedAt: Date.now(),
    };

    await set(ref(db, `chats/${chatId}`), newChat);
    setChats([...chats, newChat]);

  }

  return {
    createChat
  }
};

export const useGetChats = () => {
  const { currUser } = useAuth();

  const getChats = async () => {
    const snapshot = await get(ref(db, "chats"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const allChatsArray = Object.values(data);
      const myChats = allChatsArray.filter((chat) => {
        const { participantIds } = chat;
        return participantIds.includes(currUser.uid);
      });
      return myChats;
    } else {
      return [];
    }
  };

  return {
    getChats
  }
};

export const useUpdateChat = () => {
  const { chats, setChats } = useChats();
  console.log("chats in useUpdateChat", chats);

  const updateChat = async (chatId, message) => {
    const chatRef = ref(db, `chats/${chatId}`);
    await update(chatRef, {
      lastMessage: message || "",
      updatedAt: Date.now(),
    });

    // update the local state
    const updatedChats = chats.map((chat) => {
      if (chat.id === chatId) {
        return {
          ...chat,
          lastMessage: message || "",
          updatedAt: Date.now(),
        };
      }
      return chat;
    });
    setChats(updatedChats);
  }

  return {
    updateChat
  }
};

