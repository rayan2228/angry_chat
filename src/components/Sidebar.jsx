import React from "react";
import Img from "./layouts/Img";
import SidebarButton from "./layouts/SidebarButton";
import { AiTwotoneHome } from "react-icons/Ai";
import { RxChatBubble } from "react-icons/rx";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { BsFilterCircle } from "react-icons/bs";
import Flex from "../components/layouts/Flex";
const Sidebar = () => {
  const getUrl = window.location.pathname;
  return (
    <Flex className="flex-col justify-between shadow-sm w-[200px] shadow-shadow  pt-[50px] pl-6  pb-10 ">
      <div className="capitalize">
        <Img src="../../public/assets/logo.webp" alt="logo" />
        <SidebarButton
          linkName="home"
          linkSrc="/home"
          className={
            getUrl === "/home" ? "text-white bg-primary rounded-l-lg" : ""
          }
        >
          <AiTwotoneHome className="text-xl" />
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
        <SidebarButton
          linkName="friends"
          linkSrc="/friends"
          className={
            getUrl === "/friends" ? "text-white bg-primary rounded-l-lg" : ""
          }
        >
          <FaUserFriends className="text-xl" />
        </SidebarButton>
        <SidebarButton
          linkName="pepole"
          linkSrc="/pepole"
          className={
            getUrl === "/pepole" ? "text-white bg-primary rounded-l-lg" : ""
          }
        >
          <BsFilterCircle className="text-xl" />
        </SidebarButton>
      </div>
      <SidebarButton
        linkSrc="/settings"
        className={
          getUrl === "/settings" ? "text-white bg-primary rounded-l-lg" : ""
        }
      >
        <Flex className="items-center gap-x-2 ">
          <Img src="../../public/assets/user.png" alt="user" />
          <div>
            <h2 className="text-base font-semibold font-inter">Paula Mora</h2>
            <h5 className="text-xs font-normal font-inter">Settings</h5>
          </div>
        </Flex>
      </SidebarButton>
    </Flex>
  );
};

export default Sidebar;
