import { useEffect, useState } from "react";
import { useGetUserById } from "../hooks/api/users";

type AvatarProps = {
  name: string;
  id?: string;
};

const Avatar = ({ name, id }: AvatarProps) => {

  const [userData, setUserData] = useState(null);
  const { getUser } = useGetUserById(id);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUserData(userData);
    }
    fetchUser();
  }, []);

  const getInitials = () => {
    const fistWord = id ? userData?.displayName?.charAt(0).toUpperCase() : name?.charAt(0).toUpperCase();
    return fistWord;
  };

  return (
    <>
      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <span className="text-primary font-medium text-2xl">
          {getInitials()}
        </span>
      </div>
    </>
  );
};

export default Avatar;