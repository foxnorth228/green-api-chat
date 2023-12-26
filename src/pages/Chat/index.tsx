import "./style.scss";

import { ChatManager } from "@components/ChatManager";
import { ChatMenu } from "@components/ChatMenu";
import { ChatZone } from "@components/ChatZone";
import useMatchMedia from "@hooks/useMatchMedia";
import useReceiveNotification from "@hooks/useReceiveNotification";
import useRedirectUnauthUser from "@hooks/useRedirectUnauthUser";
import React, { useState } from "react";

const Chat = () => {
  useRedirectUnauthUser();
  useReceiveNotification();

  const isMatches = useMatchMedia("(max-width: 767px)");
  const [currentChat, setCurrentChat] = useState("");
  return (
    <main className="chat">
      {isMatches ? (
        <>
          <section className="chat__menu_mobile">
            <input
              id="menu__toggle"
              type="checkbox"
              className="menu__toggle"
            ></input>
            <label htmlFor="menu__toggle" className="menu__btn">
              <span></span>
            </label>
            <ChatMenu currentChat={currentChat} />
            <ChatManager
              className="interactElem"
              chat={currentChat}
              setCurrentChat={setCurrentChat}
            />
          </section>
          <ChatZone currentChat={currentChat} />
        </>
      ) : (
        <>
          <ChatMenu currentChat={currentChat} />
          <ChatManager
            className=""
            chat={currentChat}
            setCurrentChat={setCurrentChat}
          />
          <ChatZone currentChat={currentChat} />
        </>
      )}
    </main>
  );
};

export default Chat;
