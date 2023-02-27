import React from "react";
import "../Sidebar.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import AccountProfile from "../../Assets/AccountProfile.svg";

const Marketing = ({ GetChat }) => {
  return (
    <ProSidebar>
      <Menu style={{ backgroundColor: "white", padding: 0 }}>
        <SubMenu
          title={<p className="sidebar_sidebar_title">Re-deposit</p>}
          defaultOpen={true}
        >
          <Menu>
            <div className="sidebar_sidebar_acoounts">
              <div className="sidebar_accounts_img">
                <img src={AccountProfile} alt="AccountProfile"></img>
                <div className="sidebar_accounts_info">
                  <div className="sidebar_accounts_info_title">Telegram</div>
                  <div className="sidebar_accounts_info_message">
                    Are you going to improve app perfomance?
                  </div>
                </div>
              </div>
              <div className="sidebar_accounts_notification">
                <div className="sidebar_accounts_notification_time">19:01</div>
                <div className="sidebar_accounts_notification_num">2</div>
              </div>
            </div>
          </Menu>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
};
export default Marketing;
