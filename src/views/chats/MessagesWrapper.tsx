import { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { MdAddIcCall } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useCreateMessage } from "../../hooks/api/messages";
import MessagesList from "./MessagesList";

const MessagesWrapper = ({
  activeChatUserData
}) => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const { createMessage } = useCreateMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMessage(chatId, message);
    setMessage("");
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col border-x border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={()=> navigate(`/dashboard/chats`)} className="more-action-button">
              <IoIosArrowBack size={20} />
            </button>
            <Avatar name={activeChatUserData?.displayName} />
            <div>
              <h3 className="font-medium">
                {activeChatUserData?.displayName}
              </h3>
              <div className="text-sm text-slate-500 flex items-center gap-1 -mt-1.5">
                <div className="bg-green-700 w-2 h-2 rounded-full"></div>
                <span>online</span>
              </div>
            </div>
          </div>
          <Button color="light" startContent={<MdAddIcCall size={20} />} className="text-primary">Call</Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <MessagesList />
        </div>
        <div className="flex items-center justify-between px-5 py-2 gap-2 border-t border-slate-200">
          <Button color="light"><CgAttachment size={25} className="text-primary" /></Button>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
              <Input
                className={`w-full pr-12 pl-5`}
                placeholder="Write your message..."
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                disabled={!message.trim()}
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer"
              >
                <HiMiniPaperAirplane
                  onClick={handleSubmit}
                  size={22}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MessagesWrapper;