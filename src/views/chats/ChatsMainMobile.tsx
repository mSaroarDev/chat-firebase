import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ContactList from "./ContactList";
import FriendProfile from "./FriendProfile";
import MessagesWrapper from "./MessagesWrapper";

const ChatsMainMobile = () => {

  const [isOpen, setIsOpen] = useState();
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const [activeChatUserData, setActiveChatUserData] = useState(null);

  return (
    <>
      <div className="grid grid-cols-12">
        {!chatId && (
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <ContactList
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setActiveChatUserData={setActiveChatUserData}
            />
          </div>
        )}


        {chatId && (
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
        )}
      </div>
    </>
  );
};

export default ChatsMainMobile;
