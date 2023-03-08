import React, { useEffect, useState, useRef } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./Sidedropdown.css";

const SideDropdown = ({ allChats, GetProjectId }) => {
  return (
    <SideNav
    // className="sideDropwown"
    // onSelect={(selected) => {
    //   // Add your code here
    // }}
    >
      <SideNav.Toggle />
      <SideNav.Nav
      // defaultSelected="home"
      >
        {allChats &&
          allChats.map((projects) => {
            const { name, id } = projects;
            return (
              <NavItem
                // eventKey="home"
                onClick={() => GetProjectId(id)}
              >
                <NavIcon>
                  <i
                    class="bi bi-person-circle"
                    style={{ fontSize: "1.75em" }}
                  ></i>
                </NavIcon>
                <NavText>{name}</NavText>
              </NavItem>
            );
          })}
        {/* <NavItem eventKey="charts">
          <NavIcon>
            <i
              className="fa fa-fw fa-line-chart"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>Charts</NavText>
          {/* <NavItem eventKey="charts/linechart">
              <NavText>Line Chart</NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
              <NavText>Bar Chart</NavText>
            </NavItem> 
        </NavItem> */}
        
      </SideNav.Nav>
      {/* {allChats &&
          allChats.map((projects) => {
            const { name, id } = projects;
            return <div onClick={() => GetProjectId(id)}>{name}</div>;
          })} */}
    </SideNav>
  );
};
export default SideDropdown;
