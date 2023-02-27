import React from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import "./Messenger.css";
import Thread from "./Thread/Thread.js";
import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

function Messenger({ CloseMessengerWindow }) {
  const [NewChatId, setNewChatId] = useState();
  const [chatMessages, SetChatMessages] = useState();
  const [stateChat, setStateChat] = useState();
  const [closeMessenger, setCloseMesenger] = useState();
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
  return (
    <div className="telegram">
      <Sidebar
        GetchatMessage={GetchatMessage}
        UpdateChatId={UpdateChatId}
        GetStateChat={GetStateChat}
        CloseMessenger={CloseMessenger}
      />
      <Thread
        NewChatId={NewChatId}
        chatMessages={chatMessages}
        stateChat={stateChat}
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
