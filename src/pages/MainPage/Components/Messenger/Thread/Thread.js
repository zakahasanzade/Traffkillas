// import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AccountProfile from "../Assets/AccountProfile.svg";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./Thread.css";

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

const Thread = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState(null);
  const token = localStorage.getItem("token");
  // const [input, setInput] = useState("");
  // const [messages, setMessages] = useState([]);
  // const threadName = useSelector(selectThreadName);
  // const threadId = useSelector(selectThreadId);
  // const user = useSelector(selectUser);

  // useEffect(() => {
  //   if (threadId) {
  //     db.collection("threads")
  //       .doc(threadId)
  //       .collection("messages")
  //       .orderBy("timestamp", "desc")
  //       .onSnapshot((snapshot) =>
  //         setMessages(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             data: doc.data(),
  //           }))
  //         )
  //       );
  //   }
  // }, [threadId]);

  // const sendMessage = (e) => {
  //   e.preventDefault();

  //   db.collection("threads").doc(threadId).collection("messages").add({
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //     message: input,
  //     uid: user.uid,
  //     photo: user.photo,
  //     email: user.email,
  //     displayName: user.displayName,
  //   });

  //   setInput("");

  // };
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`http://146.0.78.143:5354/hubs/messenger?token=${token}`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

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
            console.log(user);
          });
        })
        .catch((error) => console.error(error));
    }
  }, [connection]);

  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__header_left">
          <div className="thread__header_left_picture">
            <img src={AccountProfile}></img>
          </div>
          <div className="thread__header_left_info">
            <h1>Telegram</h1>
            <p>service notifications</p>
          </div>
        </div>
        <div className="thread__header_right">
          <i class="bi bi-search"></i>
          <i class="bi bi-telephone-fill"></i>
          <i class="bi bi-three-dots-vertical"></i>
        </div>
      </div>
      <div className="thread__messages">
        {/* <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} id={id} data={data} />
          ))}
        </FlipMove> */}
        {messages.map((message, index) => (
          <div key={index}>{message.messageText}</div>
        ))}
      </div>
      <div className="thread__input">
        <div className="thread__input_template">
          <i class="bi bi-chat-text-fill"></i>
        </div>
        <form className="thread__input_type">
          <i class="bi bi-emoji-smile"></i>
          <input placeholder="Message" type="text" />
          <i class="bi bi-paperclip" style={{ transform: "rotate(45deg)" }}></i>
        </form>

        <div className="thread__input_send">
          <i class="bi bi-send-fill" style={{ transform: "rotate(90deg)" }}></i>
        </div>
      </div>
    </div>
  );
};

export default Thread;
