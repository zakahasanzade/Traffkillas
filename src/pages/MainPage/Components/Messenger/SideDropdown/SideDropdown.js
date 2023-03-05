import React, { useEffect, useState, useRef } from "react";
import "./Sidedropdown.css";

const SideDropdown = ({ allChats, GetChatId }) => {
  return (
    <div className="sideDropwown">
      {allChats &&
        allChats.map((projects) => {
          const { name, id } = projects;
          return <div onClick={() => GetChatId(id)}>{name}</div>;
        })}
    </div>
  );
};
export default SideDropdown;
