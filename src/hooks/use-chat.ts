import ChatContext from "@src/contexts/ChatContext";
import { useContext } from "react";

const useChats = () => useContext(ChatContext);

export default useChats;
