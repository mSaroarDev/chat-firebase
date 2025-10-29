import { get, getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import "../../configs/firebase";
import { useAuth } from "../useAuth";

const db = getDatabase();

export const useFetchUsers = () => {
  const [usersList, setUsersList] = useState();
  const { currUser } = useAuth();

  const usersRef = ref(db, 'users');

  useEffect(() => {
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const usersArray = Object.values(data || []);
      const filteredUsers = usersArray.filter(user => user.uid !== currUser?.uid);
      setUsersList(filteredUsers);
    })
  }, [])

  return {
    usersList
  }
};

export const useGetUserById = (userId) => {
  const getUser = async () => {
    const snapshot = await get(ref(db, `users/${userId}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      return null;
    }
  };

  return {
    getUser
  }
};