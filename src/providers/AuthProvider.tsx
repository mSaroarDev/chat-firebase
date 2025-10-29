import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

import "../configs/firebase";

type currUser = {
  name: string;
  email: string;
  uid: string;
}

type AuthContestProps = {
  loading: boolean;
  currUser: currUser;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currUser, setCurrUser] = useState(null);

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrUser(user);
      setLoading(false);
    })

    return () => unsubscribe();
  }, [])

  const signUp = async (email, password, name) => {
    // create user
    const userCreated = await createUserWithEmailAndPassword(auth, email, password);
    console.log({ userCreated });

    // store user data in realtime database
    await set(ref(db, `users/${userCreated.user.uid}`), {
      displayName: name,
      email,
      uid: userCreated.user.uid,
      createdAt: new Date().toISOString()
    })

    // update profile
    await updateProfile(auth.currentUser, {
      displayName: name
    });

    // set user to the curruser state
    const user = auth.currentUser;
    setCurrUser({
      ...user
    })
  };

  const login = (email, password) => {
    const res = signInWithEmailAndPassword(auth, email, password);
    return res;
  };

  const logout = () => {
    const res = signOut(auth);
    return res;
  };

  const contextValue: AuthContestProps = {
    loading,
    currUser,
    signUp,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
};