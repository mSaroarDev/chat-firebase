import { useSearchParams } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useGetMessages } from "../../hooks/api/messages";
import { useAuth } from "../../hooks/useAuth";

const groupConsecutiveMessages = (messages) => {
  const grouped = [];
  let currentGroup = [];

  messages?.forEach((msg, i) => {
    if (i === 0 || msg.senderId === messages[i - 1].senderId) {
      currentGroup.push(msg);
    } else {
      grouped.push(currentGroup);
      currentGroup = [msg];
    }
  });

  if (currentGroup.length) grouped.push(currentGroup);
  return grouped;
};

const MessagesList = () => {
  const { currUser } = useAuth();
  const me = currUser?.uid;

  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const { messages } = useGetMessages(chatId);

  const groupedMessages = groupConsecutiveMessages(messages);


  return (
    <div className="p-7 gap-2 h-full flex flex-col justify-end">
      {groupedMessages.map((group, index) => {
        const isMe = group[0].senderId === me;

        return (
          <div key={index} className={`w-full flex ${isMe ? "justify-end" : "justify-start"}`}>
            <div className={`flex ${isMe ? "flex-row-reverse" : "flex-row"} items-start gap-2`}>

              {!isMe && <Avatar id={group[0].senderId} />}

              <div className="flex flex-col gap-1">
                {group.map((msg) => (
                  <div
                    key={msg.id}
                    className={`py-2 px-4 rounded-lg w-fit ${isMe ? "bg-primary text-white self-end" : "bg-slate-200 text-black self-start"}`}
                  >
                    {msg.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;