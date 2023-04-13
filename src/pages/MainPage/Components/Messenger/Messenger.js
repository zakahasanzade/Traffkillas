import React from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import "./Messenger.css";
import Thread from "./Thread/Thread.js";
import SideDropdown from "./SideDropdown/SideDropdown";
import { useEffect, useState } from "react";

function Messenger({ CloseMessengerWindow }) {
  const [NewChatId, setNewChatId] = useState();
  const [messages, setMessages] = useState([]);
  const [stateChat, setStateChat] = useState();
  const [closeMessenger, setCloseMesenger] = useState();
  const [OnceUpdate, setOnceUpdate] = useState();
  const [allChats, setAllChats] = useState([]);
  const GetProjectId = (ChatId) => {
    setProjcetId(ChatId);
    console.log(ChatId);
  };
  const GetAllProjects = () => {
    fetch(`https://api2.traffkillas.kz/api/v1/projects/my`, {
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
        setAllChats(JSON.parse(result));
        setMessages();
      });
  };
  const [GetChat, setGetChat] = useState([]);
  const [ProjectId, setProjcetId] = useState(null);
  const [navColor, setNavColor] = useState();
  const [sortChats, setSortChats] = useState();
  const [sortGetChats, setSortGetChats] = useState(GetChat);

  useEffect(() => {
    if (ProjectId) {
      let CopyGetChat = GetChat;
      const ResGetChats = CopyGetChat.filter((el) => {
        if (el.chatId.toLowerCase().includes(sortChats.toLowerCase())) {
          return el;
        }
      });
      setSortGetChats(ResGetChats);
    }
  }, [sortChats]);
  useEffect(() => {
    ProjectId &&
      fetch(
        `https://api2.traffkillas.kz/api/v1/messages/getChats?projectId=${ProjectId}`,
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
          console.log(JSON.parse(result));
          setGetChat(JSON.parse(result));
          setSortGetChats(JSON.parse(result));
          console.log(GetChat);
          setNavColor(Array(JSON.parse(result).length).fill(false));
        });
  }, [ProjectId]);
  const [activeChat, setActiveChat] = useState("All");
  useEffect(() => {
    if (ProjectId) {
      let CopyGetChat = GetChat;
      const ResGetChats = CopyGetChat.filter((el) => {
        if (el.chatId.toLowerCase().includes(sortChats.toLowerCase())) {
          return el;
        }
      });
      setSortGetChats(ResGetChats);
    }
  }, [activeChat]);
  useEffect(() => {
    NewChatId &&
      fetch(
        `https://api2.traffkillas.kz/api/v1/messages/fromChat?chat=${NewChatId}&projectId=${ProjectId}`,
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
          // UserMessagesArr = JSON.parse(result);
          // setUserMessages(UserMessagesArr);
          setMessages(JSON.parse(result));
          console.log(messages);
          // SetOpenChat(true);
          // GetStateChat(openChat);
          // StopRendering("lkdfnmc");
        });
  }, [NewChatId]);
  const ChatFolders = () => {
    fetch(
      `https://api2.traffkillas.kz/api/v1/messages/fromChat?chat=${NewChatId}&projectId=${ProjectId}`,
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
        console.log(result);
      });
  };

  useEffect(() => {
    GetAllProjects();
  }, []);
  // const GetchatMessage = (GetMessage) => {
  //   setMessages(GetMessage);
  // };
  const setChangeNavColor = (nav) => {
    setNavColor(nav);
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
      <SideDropdown allChats={allChats} GetProjectId={GetProjectId} />
      <Sidebar
        // GetchatMessage={GetchatMessage}
        UpdateChatId={UpdateChatId}
        GetStateChat={GetStateChat}
        CloseMessenger={CloseMessenger}
        OnceUpdate={OnceUpdate}
        StopRendering={StopRendering}
        sortGetChats={sortGetChats}
        ProjectId={ProjectId}
        navColor={navColor}
        setChangeNavColor={setChangeNavColor}
        ChatFolders={ChatFolders}
        setSortChats={setSortChats}
        setActiveChat={setActiveChat}
      />
      <Thread
        NewChatId={NewChatId}
        messages={messages}
        setMessages={setMessages}
        stateChat={stateChat}
        RenderChats={RenderChats}
        ProjectId={ProjectId}
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
