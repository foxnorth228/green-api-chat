import config from "@hooks/useReceiveNotification/config";
import configApi from "@services/GreenApi/config";
import globalConfig from "@src/config";
import { StoreDispatch } from "@src/store";
import { useChats, useChatsAddMessage } from "@store/chatsSlice/hooks";
import { changeFailedRequest } from "@store/failedRequestsSlice";
import { useFailedRequests } from "@store/failedRequestsSlice/hooks";
import { useCallback, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

const useReceiveNotification = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const failedReq = useFailedRequests();
  const chats = useChats();
  const addMessage = useChatsAddMessage();

  const sendFailedRequests = useCallback(async () => {
    if (globalConfig.service === null) {
      return null;
    }
    const requests = [...failedReq];
    while (requests.length !== 0) {
      const { action, method, body } = requests[0];
      const result = await globalConfig.service.makeAction(
        action,
        method,
        body,
      );
      if (typeof result === "string") {
        break;
      }
      requests.shift();
    }
    if (failedReq.length !== 0) {
      dispatch(changeFailedRequest(requests));
    }
  }, [dispatch, failedReq]);

  const checkServiceAndReceiveNotification = useCallback(async () => {
    if (globalConfig.service === null) {
      return null;
    }
    const result = await globalConfig.service?.receiveNotification();
    if (typeof result === "string") {
      if (result === configApi.errorFailedFetch) {
        return false;
      }
      throw result;
    }
    if (
      !result ||
      !result.receiptId ||
      typeof result.receiptId === "undefined"
    ) {
      return true;
    }
    await globalConfig.service?.deleteNotification(result.receiptId);
    const body = result.body;
    const sender = String(parseInt(body?.senderData?.chatId ?? ""));
    const typeMessage = body?.messageData?.typeMessage;
    if (typeMessage && typeMessage === "textMessage" && sender in chats) {
      addMessage(sender, {
        isUserOwner: false,
        message: body?.messageData?.textMessageData?.textMessage ?? "",
      });
    }
    return true;
  }, [addMessage, chats]);

  useLayoutEffect(() => {
    let isCancelled = false;
    async function callback() {
      const isServiceWorks = await checkServiceAndReceiveNotification();
      if (!isCancelled) {
        if (isServiceWorks === null) {
          return;
        }
        if (isServiceWorks) {
          sendFailedRequests();
          callback();
        } else {
          setTimeout(callback, config.delayBetweenCheckingService);
        }
      }
    }
    callback();
    return () => {
      isCancelled = true;
    };
  });
};

export default useReceiveNotification;
