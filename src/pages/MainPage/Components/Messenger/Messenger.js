import React from "react";
import { ChatId, Sidebar } from "./Sidebar/Sidebar";
import "./Messenger.css";
import Thread from "./Thread/Thread.js";
import SideDropdown from "./SideDropdown/SideDropdown";
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

function Messenger({ CloseMessengerWindow }) {
  const [NewChatId, setNewChatId] = useState();
  const [chatMessages, SetChatMessages] = useState();
  const [stateChat, setStateChat] = useState();
  const [closeMessenger, setCloseMesenger] = useState();
  const [OnceUpdate, setOnceUpdate] = useState();
  const [allChats, setAllChats] = useState([]);
  const GetChatId = (ChatId) => {
    setGetChatId(ChatId);
    console.log(ChatId);
  };
  const GetAllProjects = () => {
    fetch(`http://146.0.78.143:5355/api/v1/projects/my`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        setAllChats([JSON.parse(result)[0]]);
      });
  };
  const [GetChat, setGetChat] = useState();
  const [getChatId, setGetChatId] = useState();
  useEffect(() => {
    fetch(
      `http://146.0.78.143:5355/api/v1/messages/getChats?projectId=${getChatId}`,
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
        // GetChatArr = new Array(JSON.parse(result)["data"]);
        console.log(JSON.parse(result));
        // setNavColor(Array(JSON.parse(result).length).fill(false));
      });
  }, [getChatId]);

  useEffect(() => {
    GetAllProjects();
  }, []);
  const GetchatMessage = (GetMessage) => {
    SetChatMessages(GetMessage);
  };
  const UpdateChatId = (ChatId) => {
    setNewChatId(ChatId);
    console.log(ChatId);
  };
  const GetStateChat = (StateChat) => {
    setStateChat(StateChat);
  };
  const CloseMessenger = (window) => {
    setCloseMesenger(window);
    CloseMessengerWindow(window);
    console.log(closeMessenger);
  };
  const RenderChats = (chats) => {
    setOnceUpdate("chats");
  };
  const StopRendering = (hook) => {
    setOnceUpdate(hook);
  };
  return (
    <div className="telegram">
      <SideDropdown allChats={allChats} GetChatId={GetChatId} />
      <Sidebar
        GetchatMessage={GetchatMessage}
        UpdateChatId={UpdateChatId}
        GetStateChat={GetStateChat}
        CloseMessenger={CloseMessenger}
        OnceUpdate={OnceUpdate}
        StopRendering={StopRendering}
        GetChat={GetChat}
      />
      <Thread
        NewChatId={NewChatId}
        chatMessages={chatMessages}
        stateChat={stateChat}
        RenderChats={RenderChats}
      />
    </div>
  );
}

export default Messenger;

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [user, setUser] = useState("");
//   const [message, setMessage] = useState("");
//   const [connection, setConnection] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const newConnection = new HubConnectionBuilder()
//       .withUrl(`http://146.0.78.143:5354/hubs/messenger?token=${token}`)
//       .withAutomaticReconnect()
//       .build();

//     setConnection(newConnection);
//   }, []);

//   useEffect(() => {
//     if (connection) {
//       connection
//         .start()
//         .then(() => {
//           console.log("SignalR connected");
//           connection
//             .invoke("join")
//             .then(() => {
//               console.log("Message sent");
//               setMessage("");
//             })
//             .catch((error) => console.error(error));
//           connection.on("messageNotification", (user, message) => {
//             const newMessage = `${user}: ${message}`;
//             setMessages((messages) => [...messages, newMessage]);
//             console.log(typeof user);
//           });
//         })
//         .catch((error) => console.error(error));
//     }
//   }, [connection]);

//   const sendMessage = () => {};

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           placeholder="User"
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         {/* <button onClick={sendMessage}>Send</button> */}
//       </div>
//       {messages.map((message, index) => (
//         <div key={index}>{message}</div>
//       ))}
//     </div>
//   );
// }

// export default App;
