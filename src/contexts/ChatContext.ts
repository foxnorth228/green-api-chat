import { createContext } from "react";

interface IChatContext {
  chats: object;
  setChats: React.Dispatch<React.SetStateAction<object>>;
}
const ChatContext = createContext<IChatContext>({
  chats: {},
  setChats: () => {},
});

export default ChatContext;
