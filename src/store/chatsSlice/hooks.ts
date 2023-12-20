import { RootState } from "@src/store";
import { addChat, addMessage } from "@store/chatsSlice/index";
import { IChatMessage } from "@store/chatsSlice/types";
import { useDispatch, useSelector } from "react-redux";

export const useChats = () => {
  return useSelector((state: RootState) => state.chats);
};

export const useChatsAddChat = () => {
  const dispatch = useDispatch();
  return (phone: string) => dispatch(addChat(phone));
};

export const useChatsAddMessage = () => {
  const dispatch = useDispatch();
  return (phone: string, message: IChatMessage) =>
    dispatch(addMessage({ phone, message }));
};
