import { useContext } from "react"
import { ChatContext } from "../contexts/ChatsContext"

export const useChats = () => {
  return useContext(ChatContext)
}