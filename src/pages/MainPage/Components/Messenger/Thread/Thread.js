// import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import AccountProfile from "../Assets/AccountProfile.svg";
import { MessageBox } from "react-chat-elements";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { CSSTransition } from "react-transition-group";
import { JsonHubProtocol } from "@microsoft/signalr";
import "./Thread.css";
import { ChatsId } from "../Sidebar/Components/AllChats";

// import db from "../firebase";
// import firebase from "firebase";
// import {
//   selectThreadId,
//   selectThreadName,
// } from "../features/counter/threadSlice";
// import { selectUser } from "../features/counter/userSlice";
// import Message from "./Message";
// import * as timeago from "timeago.js";
// import FlipMove from "react-flip-move";

const Thread = ({ NewChatId, chatMessages, stateChat, RenderChats }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState(null);
  const token = localStorage.getItem("token");
  const [typeMessage, SetTypeMessage] = useState();
  const [showTemplate, setShowTemplate] = useState();
  const chatRef = useRef();

  let UserMessagesArr = [];
  const GetChatMessages = () => {
    fetch(
      `http://146.0.78.143:5354/api/v1/messages/fromChat?chat=${NewChatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        UserMessagesArr = JSON.parse(result);
        console.log(messages);
        setMessages(UserMessagesArr);
        // GetchatMessage(UserMessagesArr);
        // SetOpenChat(true);
        // GetStateChat(openChat);
        // StopRendering("lkdfnmc");
      });
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`http://146.0.78.143:5354/hubs/messenger?token=${token}`)
      // .withHubProtocol(protocol)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);
  useEffect(() => {
    GetChatMessages();
  }, [NewChatId]);
  const UserArr = [];
  const [messageGet, setMessageGet] = useState();
  const [messageGetId, setMessageGetId] = useState();
  const [TestState, setTestState] = useState(true);
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR connected");
          connection
            .invoke("join")
            .then(() => {
              console.log("Message sent");
              setMessage("");
            })
            .catch((error) => console.error(error));
          connection.on("messageNotification", (user, message) => {
            // const newMessage = `${user}: ${message}`;
            // setMessages((messages) => [...messages, newMessage]);
            // console.log(user.messageText);
            // UserArr = [...user.messageText];
            setMessageGet(user.messageText);
            setMessageGetId(user.chatId);
            // AppendRecievedMessage(user);
          });
        })
        .catch((error) => console.error(error));
    }
  }, [connection]);

  useEffect(() => {
    console.log(messageGet);
    let sendTime = new Date().getTime();
    console.log(messages, "Hello1");
    let newMessage = {
      chatId: NewChatId,
      direction: 0,
      sendTime: sendTime,
      text: messageGet,
    };
    setMessages([...messages, newMessage]);
    console.log(messages, "Hello2");
  }, [messageGet]);

  const CurrentTimeForSending =
    (new Date().getHours().toLocaleString().length == 1
      ? "0" + new Date().getHours()
      : new Date().getHours()) +
    ":" +
    (new Date().getMinutes().toLocaleString().length == 1
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes());
  const AppendSendingMessage = () => {
    var messageBox = document.querySelector(`.thread__messages`);
    var message = document.createElement("div");

    message.className = "modal-body";
    message.innerHTML = `<div class="msg-body">
            <ul>
              <li class="repaly">
                <p>
                  ${typeMessage}
                  <br />
                  <span class="time">${CurrentTimeForSending}</span>
                </p>
              </li>
            </ul>
          </div>`;
    return messageBox.append(message);
  };
  const AppendRecievedMessage = (user) => {
    var messageBox = document.querySelector(`.thread__messages`);
    var message = document.createElement("div");
    message.className = "modal-body";
    message.innerHTML = `<div class="msg-body">
            <ul>
              <li class="sender">
                <p>
                  ${user.messageText}
                  <br />
                  <span class="time chat_time">${CurrentTimeForSending}</span>
                </p>
              </li>
            </ul>
          </div>`;

    messageBox.append(message);
    console.log(user.messageText);
    console.log(user.chatId);
    console.log(messageBox);
    console.log(NewChatId);
  };

  const sendMessage = (e) => {
    connection
      .invoke("sendMessage", typeMessage, NewChatId)
      .then(() => {
        document.querySelector(".thread__input_type").reset();
        // document.querySelector(".sent_message").innerHTML = typeMessage;
        // RenderChats(true);

        // AppendSendingMessage();
        let sendTime = new Date().getTime();
        console.log(messages, "Hello1");
        let newMessage = {
          chatId: NewChatId,
          direction: 1,
          sendTime: sendTime,
          text: typeMessage,
        };
        setMessages([...messages, newMessage]);
        console.log(messages, "Hello2");

        console.log(messageGetId);
        console.log(NewChatId);
        TestState && (chatRef.current.scrollTop = chatRef.current.scrollHeight);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    TestState && (chatRef.current.scrollTop = chatRef.current.scrollHeight);
  }, [messages]);

  const handleEnterKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage(event);
    }
  };
  const TemplateText = useRef(null);
  const AppendText = () => {
    console.log(TemplateText.current.textContent);
    document.querySelector(".thread__input_type_input").value +=
      TemplateText.current.textContent;
  };
  useEffect(() => {
    const CloseTemplateText = (e) => {
      setShowTemplate(false);
    };
    document.body.addEventListener("click", CloseTemplateText);
  }, []);
  return (
    <div className="thread">
      {NewChatId && (
        <div className="thread__header">
          <div className="thread__header_left">
            <div className="thread__header_left_picture">
              <img src={AccountProfile}></img>
            </div>
            <div className="thread__header_left_info">
              <h1>{NewChatId}</h1>
              <p>service notifications</p>
            </div>
          </div>
          <div className="thread__header_right">
            <i class="bi bi-search"></i>
            <i class="bi bi-three-dots-vertical"></i>
          </div>
        </div>
      )}
      <div
        className={`thread__messages`}
        style={{ display: "flex", flexDirection: "column" }}
        ref={chatRef}
      >
        {messages &&
          messages.map((messages, index, array) => {
            const { chatId, text, sendTime, direction } = messages;
            const LastDateNum =
              index == 0 ? null : new Date(array[index - 1].sendTime);
            const standartFormat = new Date(sendTime);
            const lastTime =
              (standartFormat.getHours().toLocaleString().length == 1
                ? "0" + standartFormat.getHours()
                : standartFormat.getHours()) +
              ":" +
              (standartFormat.getMinutes().toLocaleString().length == 1
                ? "0" + standartFormat.getMinutes()
                : standartFormat.getMinutes());
            const ChatDate =
              standartFormat.getDate() +
              " " +
              standartFormat.toLocaleString("ru-ru", { month: "short" });
            return (
              <div class="modal-body" key={messages + index}>
                <div class="msg-body">
                  <ul>
                    {index === 0 ||
                    LastDateNum.getDate() + LastDateNum.getMonth() !==
                      standartFormat.getDate() + standartFormat.getMonth() ? (
                      <li>
                        <div class="divider">
                          <h6>{ChatDate}</h6>
                        </div>
                      </li>
                    ) : null}

                    {direction === 0 ? (
                      <li class="sender">
                        <p>
                          {" "}
                          {text}
                          <span class="time chat_time">{lastTime}</span>
                        </p>
                      </li>
                    ) : (
                      ""
                    )}
                    {direction === 1 ? (
                      <li class="repaly">
                        <p>
                          {text}

                          <span class="time">{lastTime}</span>
                        </p>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
      </div>

      <div className="thread__input">
        <div
          className="thread__input_template"
          onClick={(e) => {
            e.stopPropagation();
            setShowTemplate(!showTemplate);
          }}
        >
          <i class="bi bi-chat-text-fill"></i>
        </div>
        <form className="thread__input_type">
          <i class="bi bi-emoji-smile"></i>
          <input
            className="thread__input_type_input"
            onKeyDown={(event) => handleEnterKeyPress(event)}
            placeholder="Message"
            type="text"
            onChange={(e) => {
              SetTypeMessage(e.target.value);
            }}
          />
          <i class="bi bi-paperclip" style={{ transform: "rotate(45deg)" }}></i>
        </form>

        <div
          onClick={(e) => {
            sendMessage(e);
            // RenderChats("true");

            // console.log(messageGetId);
          }}
          className="thread__input_send"
        >
          <i class="bi bi-send-fill" style={{ transform: "rotate(90deg)" }}></i>
        </div>
        <CSSTransition
          in={showTemplate}
          classNames="alert"
          timeout={1000}
          unmountOnExit
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="messagenger_template"
          >
            <div className="messagenger_template_newMessage">
              <p>Новый шаблон:</p>
              <div className="messagenger_template_newMessage_input">
                <input placeholder="Template" />
                <i class="bi bi-plus-circle-fill"></i>
              </div>
            </div>
            <div className="messagenger_template_message">
              <p ref={TemplateText} onClick={AppendText}>
                Я — рэпер, ты — стример Это неуловимый, редкий покемон
                Оксепаратист Экстримирон
              </p>
              <i class="bi bi-trash3-fill"></i>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Thread;
{
  /* <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} id={id} data={data} />
          ))}
        </FlipMove> */
}
{
  /* {chatMessages &&
          chatMessages.map((messages) => {
            const { chatId, text, sendTime, direction } = messages;
            return (
              <>
                {direction === 0 ? (
                  <span className="received_message">
                    <span>{text}</span>
                  </span>
                ) : (
                  ""
                )}
                {direction === 1 ? (
                  <span className="send_message">
                    <label
                      style={{
                        backgroundColor: "white",
                        padding: "8px 16px",
                        borderRadius: "25px",
                        margin: "5px",
                        maxWidth: "900px",
                      }}
                    >
                      {text}
                    </label>{" "}
                  </span>
                ) : (
                  ""
                )}
              </>
            );
          })} */
}
