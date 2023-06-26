import React from "react";
import "../Sidebar.css";
import { ProSidebar, Menu, SubMenu } from "react-pro-sidebar";
import AccountProfile from "../../Assets/AccountProfile.svg";

const ChatsId = (e) => {
  return e.target.id;
};
const AllChats = ({ GetChat }) => {
  return (
    <div className="sidebar__threads_chats">
      <ProSidebar>
        <Menu style={{ backgroundColor: "white", padding: 0 }}>
          <SubMenu
            title={<p className="sidebar_sidebar_title">Re-deposit</p>}
            defaultOpen={true}
          >
            {GetChat &&
              GetChat.map((chats) => {
                const { chatId } = chats;
                return (
                  <Menu>
                    <div
                      id={chatId}
                      className="sidebar_sidebar_acoounts"
                      onClick={(e) => {
                        ChatsId(e);
                      }}
                    >
                      <div className="sidebar_accounts_img">
                        <img src={AccountProfile} alt="AccountProfile"></img>
                        <div className="sidebar_accounts_info">
                          <div className="sidebar_accounts_info_title">
                            {chatId}
                          </div>
                          <div className="sidebar_accounts_info_message">
                            Are you going to improve app perfomance?
                          </div>
                        </div>
                      </div>
                      <div className="sidebar_accounts_notification">
                        <div className="sidebar_accounts_notification_time">
                          19:01
                        </div>
                        <div className="sidebar_accounts_notification_num">
                          2
                        </div>
                      </div>
                    </div>
                  </Menu>
                );
              })}
          </SubMenu>
          <SubMenu
            title={<p className="sidebar_sidebar_title">Deposit</p>}
            defaultOpen={true}
          ></SubMenu>
          <SubMenu
            title={<p className="sidebar_sidebar_title">Нет ответа</p>}
            defaultOpen={true}
          ></SubMenu>
        </Menu>
      </ProSidebar>
    </div>
  );
};
export { AllChats, ChatsId };
