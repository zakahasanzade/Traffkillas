import React from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import "./Messenger.css";
import Thread from "./Thread/Thread.js";
import SideDropdown from "./SideDropdown/SideDropdown";
import { useEffect, useState } from "react";

function Messenger({ CloseMessengerWindow, position }) {
  const [NewChatId, setNewChatId] = useState();
  const [VisibleChatName, UpdateVisibleChatName] = useState();
  const [messages, setMessages] = useState([]);
  const [stateChat, setStateChat] = useState();
  const [closeMessenger, setCloseMesenger] = useState();
  const [OnceUpdate, setOnceUpdate] = useState();
  const [allChats, setAllChats] = useState([]);
  const [chatsFlipped, setChatsFlipped] = useState(false);
  const editChatsFlipped = (el) => {
    setChatsFlipped(el);
  };
  const GetProjectId = (ChatId) => {
    setProjcetId(ChatId);
  };
  var url = null;
  const GetAllProjects = () => {
    const positionEmployee = localStorage.position;
    if (positionEmployee == 3 || positionEmployee == 2) {
      url = `https://api2.traffkillas.kz/api/v1/projects/my`;
      // } else if (positionEmployee == 2) {
      //   url = `https://api2.traffkillas.kz/api/v1/teamlead/availableProjects`;
    } else if (positionEmployee == 1 || positionEmployee == 0) {
      url = `https://api2.traffkillas.kz/api/v1/admin/availableProjects`;
    }
    fetch(url, {
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
        setChatsFlipped(Array(JSON.parse(result).length).fill(false));
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
        if (el.visibleName.toLowerCase().includes(sortChats.toLowerCase())) {
          return el;
        }
      });
      setSortGetChats(ResGetChats);
    }
  }, [sortChats]);
  useEffect(() => {
    const positionEmployee = localStorage.position;
    if (positionEmployee == 3 || positionEmployee == 2) {
      url = `https://api2.traffkillas.kz/api/v1/messages/getChats?projectId=${ProjectId}`;
      // } else if (positionEmployee == 2) {
      //   url = `https://api2.traffkillas.kz/api/v1/teamlead/chats?projectId=${ProjectId}`;
    } else if (positionEmployee == 1 || positionEmployee == 0) {
      url = `https://api2.traffkillas.kz/api/v1/admin/chats?projectId=${ProjectId}`;
    }
    ProjectId &&
      fetch(url, {
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
          setGetChat(JSON.parse(result));
          setSortGetChats(JSON.parse(result));
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
    const positionEmployee = localStorage.position;
    if (positionEmployee == 3 || positionEmployee == 2) {
      url = `https://api2.traffkillas.kz/api/v1/messages/fromChat?chat=${NewChatId}&projectId=${ProjectId}`;
      // } else if (positionEmployee == 2) {
      //   url = `https://api2.traffkillas.kz/api/v1/teamlead/messages?chat=${NewChatId}&projectId=${ProjectId}`;
    } else if (positionEmployee == 1 || positionEmployee == 0) {
      url = `https://api2.traffkillas.kz/api/v1/admin/messages?chat=${NewChatId}&projectId=${ProjectId}`;
    }
    NewChatId &&
      fetch(url, {
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
          // UserMessagesArr = JSON.parse(result);
          // setUserMessages(UserMessagesArr);
          setMessages(JSON.parse(result));
          // SetOpenChat(true);
          // GetStateChat(openChat);
          // StopRendering("lkdfnmc");
        });
  }, [NewChatId]);
  useEffect(() => {}, [messages]);
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
      .then((result) => {});
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
  };
  const UpdateVisibleName = (visibleName) => {
    UpdateVisibleChatName(visibleName);
  };
  const GetStateChat = (StateChat) => {
    setStateChat(StateChat);
  };
  const CloseMessenger = (window) => {
    setCloseMesenger(window);
    CloseMessengerWindow(window);
  };
  const RenderChats = (chats) => {
    setOnceUpdate("chats");
  };
  const StopRendering = (hook) => {
    setOnceUpdate(hook);
  };
  useEffect(() => {}, [ProjectId]);
  return (
    <div className="telegram">
      <SideDropdown
        chatsFlipped={chatsFlipped}
        allChats={allChats}
        GetProjectId={GetProjectId}
        editChatsFlipped={editChatsFlipped}
      />
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
        UpdateVisibleName={UpdateVisibleName}
        setActiveChat={setActiveChat}
      />
      <Thread
        NewChatId={NewChatId}
        VisibleChatName={VisibleChatName}
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
//           connection
//             .invoke("join")
//             .then(() => {
//               setMessage("");
//             })
//             .catch((error) => console.error(error));
//           connection.on("messageNotification", (user, message) => {
//             const newMessage = `${user}: ${message}`;
//             setMessages((messages) => [...messages, newMessage]);
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
