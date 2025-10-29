import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import { useGetUserById } from "../../hooks/api/users";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";

const ContactCard = ({
  user,
  mode,
  setActiveChatUserData
}) => {

  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  const navigate = useNavigate()
  const { currUser } = useAuth();
  const myId = currUser.uid;
  const opponentId = user?.participantIds?.find((id) => id !== myId);

  const [userData, setUserData] = useState(null);
  const { getUser } = useGetUserById(opponentId);

  useEffect(() => {
    const fetchUser = async () => {
      if (mode !== "create") {
        const userData = await getUser();
        setUserData(userData);
      }
    }
    fetchUser();
  }, [opponentId]);

  return (
    <>
      <div 
        onClick={()=> {
          setActiveChatUserData(userData);
          navigate(`/dashboard/chats?chatId=${user?.id}`)
        }}
        className={`p-4 rounded-xl flex items-start justify-between border cursor-pointer ${user?.id === chatId ? "bg-primary/10 border-primary/50" : "border-transparent "}`}
      >
        <div className="flex items-start gap-2">
          <Avatar name={userData?.displayName || "No Name"} />
          <div>
            <h3 className="font-medium">
              {userData?.displayName?.split(" ")[0] || user?.displayName || "No Name"}
            </h3>
            {mode !== "create" ? (
              <p className="text-sm text-slate-500 -mt-1 line-clamp-1">
                {user?.lastMessage || "waiting for message..."}
              </p>
            ) : (
              <p className="text-sm text-slate-500 -mt-1">
                {user?.email || "No Email"}
              </p>
            )}
          </div>
        </div>
        <div>
          {mode !== "create" ? (
            <p className="text-xs text-slate-400 text-nowrap">
              {/* {moment(user?.updatedAt).fromNow()} */}
            </p>
          ) : (
            <p className="text-xs text-slate-400">Active Now</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactCard;