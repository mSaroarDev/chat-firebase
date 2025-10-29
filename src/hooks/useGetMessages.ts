import { useContext } from "react";
import { MessagesContext } from "../contexts/MessagesContext";

export const useMessages = () => {
  return useContext(MessagesContext)
}