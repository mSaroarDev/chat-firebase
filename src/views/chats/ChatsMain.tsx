import { useState } from "react";
import { LuInbox } from "react-icons/lu";
import { RiChatNewLine } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import ContactList from "./ContactList";
import FriendProfile from "./FriendProfile";
import MessagesWrapper from "./MessagesWrapper";

const ChatsMain = () => {

  const [isOpen, setIsOpen] = useState();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const [activeChatUserData, setActiveChatUserData] = useState(null);

  return (
    <>
      <div className="grid grid-cols-12">
       <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <ContactList
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setActiveChatUserData={setActiveChatUserData}
          />
        </div>

        {chatId ? (
          <>
            <div className="col-span-12 md:col-span-8 lg:col-span-6">
              <MessagesWrapper
                activeChatUserData={activeChatUserData}
              />
            </div>

            <div className="hidden md:flex col-span-12 md:col-span-4 lg:col-span-3">
              <FriendProfile 
                activeChatUserData={activeChatUserData}              
              />
            </div>
          </>
        ) : (
          <div className="bg-white col-span-12 lg:col-span-9 h-screen w-full flex flex-col gap-3 items-center justify-center">
            <LuInbox size={30} />
            <h3>No Messages</h3>
            <Button onClick={() => setIsOpen(true)} className="mt-5" color="light" startContent={<RiChatNewLine size={20} />}>
              Start a new conversation
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatsMain;
