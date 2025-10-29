import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { LuInbox, LuPlus } from "react-icons/lu";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import { useCreateChat, useGetChats } from "../../hooks/api/chats";
import { useFetchUsers } from "../../hooks/api/users";
import { useChats } from "../../hooks/useGetChats";
import ContactCard from "./ContactCard";
import Button from "../../components/ui/Button";
import { RiChatNewLine } from "react-icons/ri";

const ContactList = ({
  isOpen,
  setIsOpen,
  setActiveChatUserData
}) => {

  const { usersList } = useFetchUsers();

  const { createChat } = useCreateChat();

  const { chats, setChats } = useChats();
  const { getChats } = useGetChats();

  const handleCreateChat = async (user) => {
    await createChat([user.uid]);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchMyChats = async () => {
      const allChats = await getChats();
      setChats(allChats);
    };

    fetchMyChats();
  }, []);

  return (
    <div className="h-screen flex flex-col border-r border-slate-200">
      <div className="border-b border-slate-200 px-5 py-5 flex items-center justify-between bg-white">
        <h2 className="text-xl font-semibold">Messages</h2>
        <button onClick={() => setIsOpen(true)} className="cursor-pointer h-8 w-8 bg-primary text-white flex items-center justify-center rounded-full hover:bg-primary/80">
          <LuPlus size={20} />
        </button>
      </div>

      <div className="bg-white p-5 pb-0">
        <div className="relative">
          <FiSearch
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700"
          />
          <Input
            className={`w-full pl-12`}
            placeholder="Search contacts"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-2 md:px-5 mt-3">
        <div className="md:hidden">
          {chats?.length === 0 && (
            <div className="bg-white col-span-12 lg:col-span-9 h-screen w-full flex flex-col gap-3 items-center justify-center">
              <LuInbox size={30} />
              <h3>No Messages</h3>
              <Button onClick={() => setIsOpen(true)} className="mt-5" color="light" startContent={<RiChatNewLine size={20} />}>
                Start a new conversation
              </Button>
            </div>
          )}

        </div>
        {chats?.map((user, index) => (
          <ContactCard
            key={index}
            user={user}
            setActiveChatUserData={setActiveChatUserData}
          />
        ))}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false)
          }}
          size="lg"
        >
          <div className="bg-white pb-0 mb-3 mx-3">
            <div className="relative">
              <FiSearch
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-700"
              />
              <Input
                className={`w-full pl-12`}
                placeholder="Search contacts"
              />
            </div>
          </div>

          {usersList?.map((user) => (
            <div onClick={() => handleCreateChat(user)} key={user.uid}>
              <ContactCard user={user} mode="create" />
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
};

export default ContactList;