import React from "react";
import Img from "./layouts/Img";
import SidebarButton from "./layouts/SidebarButton";
import { AiFillHome } from "react-icons/ai";
import { RxChatBubble } from "react-icons/rx";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { BsFilterCircle } from "react-icons/bs";
import Flex from "../components/layouts/Flex";

const Sidebar = () => {
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const getUrl = window.location.pathname;
  return (
    <Flex className="flex-col justify-between  w-[200px]  pt-[50px] pl-6  pb-10 shadow-sidebar_shadow">
      <div className="capitalize">
        <picture>
          <img src="assets/logo.webp" alt="logo" />
        </picture>
        <SidebarButton
          linkName="home"
          linkSrc="/home"
          className={
            getUrl === "/home" ? "text-white bg-primary rounded-l-lg" : ""
          }
        >
          <AiFillHome className="text-xl" />
        </SidebarButton>
        <SidebarButton
          linkName="chat"
          linkSrc="/chats"
          className={
            getUrl === "/chats" ? "text-white bg-primary rounded-l-lg" : ""
          }
        >
          <RxChatBubble className="text-xl" />
        </SidebarButton>
        <SidebarButton
          linkName="groups"
          linkSrc="/groups"
          className={
            getUrl === "/groups" ? "text-white bg-primary rounded-l-lg" : ""
          }
        >
          <HiOutlineUserGroup className="text-xl" />
        </SidebarButton>
      </div>
      <SidebarButton
        linkSrc="/settings"
        className={
          getUrl === "/settings" ? "text-white bg-primary rounded-l-lg" : ""
        }
      >
        <Flex className="items-center gap-x-2 ">
          <Img
            src={currentUser ? currentUser.photoURL : ""}
            alt="user"
            className="w-[25%] "
          />
          <div className="w-[70%]">
            <h2 className="text-base font-semibold font-inter ">
              {currentUser ? currentUser.displayName : ""}
            </h2>
            <h5 className="text-xs font-normal font-inter">Settings</h5>
          </div>
        </Flex>
      </SidebarButton>
    </Flex>
  );
};

export default Sidebar;
