import React from "react";
import { BsSearch } from "react-icons/bs";
import ChatLayout from "./layouts/ChatLayout";
const Chats = () => {
  return (
    <div className="rounded-xl w-1/3 p-4  ">
      <h2 className="font-inter font-semibold text-2xl text-textColor">Chat</h2>
      <div className="relative mt-4 mb-5">
        <input
          type="search"
          name=""
          id=""
          className="w-full p-2 pl-[53px] rounded-md outline-none placeholder:font-inter placeholder:font-normal placeholder:text-sm placeholder:capitalize placeholder:text-secondaryTextColor border border-[#D3D3D3]"
          placeholder="search"
        />
        <BsSearch className="absolute top-[53%] left-7 translate-x-[-50%] translate-y-[-50%] text-2xl" />
      </div>
      <div className="h-[250px] overflow-y-auto ">
        <ChatLayout
          name="Jenny Wilson"
          message="Love You....."
          time="10:30 PM"
        />
        <ChatLayout
          name="Savannah Nguyen"
          message="Love You....."
          time="Yesterday, 10:00 AM "
        />
        <ChatLayout
          name="Jenny Wilson"
          message="Love You....."
          time="10:30 PM"
        />
        <ChatLayout
          name="Courtney Henry"
          message="Love You....."
          time="Yesterday, 10:00 AM"
        />
        <ChatLayout
          name="Courtney Henry"
          message="Love You....."
          time="Yesterday, 10:00 AM"
        />
        <ChatLayout
          name="Courtney Henry"
          message="Love You....."
          time="Yesterday, 10:00 AM"
        />
        <ChatLayout
          name="Courtney Henry"
          message="Love You....."
          time="Yesterday, 10:00 AM"
        />
      </div>
    </div>
  );
};

export default Chats;