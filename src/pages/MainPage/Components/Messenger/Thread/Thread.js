// import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import AccountProfile from "../Assets/AccountProfile.svg";
import { MessageBox } from "react-chat-elements";
import { HubConnectionBuilder } from "@microsoft/signalr";
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
  const chatRef = useRef();

  const GetChatMessages = (e) => {
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
      .then((result) => {});
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`http://146.0.78.143:5354/hubs/messenger?token=${token}`)
      // .withHubProtocol(protocol)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);
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
            const newMessage = `${user}: ${message}`;
            setMessages((messages) => [...messages, newMessage]);
            console.log(user.messageText);
            // UserArr = [...user.messageText];
            RenderChats(true);
            setMessageGet(user.messageText);
            setMessageGetId(user.chatId);
          });
        })
        .catch((error) => console.error(error));
    }
  }, [connection]);

  const AppendSendingMessage = () => {
    var messageBox = document.querySelector(".thread__messages");
    var message = document.createElement("div");
    const CurrentTimeForSending =
      (new Date().getHours().toLocaleString().length == 1
        ? "0" + new Date().getHours()
        : new Date().getHours()) +
      ":" +
      (new Date().getMinutes().toLocaleString().length == 1
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes());
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
    messageBox.append(message);
    console.log(message);
  };
  const AppendRecievedMessage = () => {
    var messageBox = document.querySelector(".thread__messages");
    var message = document.createElement("div");
    message.className = "modal-body";
    message.innerHTML = `<div class="msg-body">
            <ul>
              <li class="sender">
                <p>
                  ${typeMessage}
                  <br />
                  <span class="time chat_time">{lastTime}</span>
                </p>
              </li>
            </ul>
          </div>`;

    messageBox.append(message);
    console.log(message);
  };

  const sendMessage = (e) => {
    connection
      .invoke("sendMessage", typeMessage, NewChatId)
      .then(() => {
        document.querySelector(".thread__input_type").reset();
        // document.querySelector(".sent_message").innerHTML = typeMessage;
        // RenderChats(true);
        AppendSendingMessage();
        TestState && (chatRef.current.scrollTop = chatRef.current.scrollHeight);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    TestState && (chatRef.current.scrollTop = chatRef.current.scrollHeight);
  }, [chatMessages]);

  const handleEnterKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage(event);
    }
  };
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
        className="thread__messages"
        style={{ display: "flex", flexDirection: "column" }}
        ref={chatRef}
      >
        {chatMessages &&
          chatMessages.map((messages, index, array) => {
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
            const ChatDateNum = standartFormat.getDate();
            const ChatDate =
              standartFormat.getDate() +
              " " +
              standartFormat.toLocaleString("ru-ru", { month: "short" });
            return (
              <div class="modal-body">
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

                    {index !== 0 && console.log(LastDateNum)}
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
        <div className="thread__input_template">
          <i class="bi bi-chat-text-fill"></i>
        </div>
        <form className="thread__input_type">
          <i class="bi bi-emoji-smile"></i>
          <input
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
{
  /* {messageGet && messageGetId === NewChatId && (
          <div className="received_message">{messageGet}</div>
        )} */
}
