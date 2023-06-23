import React from "react";
import { BsSearch } from "react-icons/bs";
import ChatLayout from "./layouts/ChatLayout";
const Groups = ({ heading }) => {
  return (
    <div className="w-1/3 p-4 duration-75 rounded-xl hover:shadow-primary_shadow ">
      <h2 className="text-2xl font-semibold font-inter text-textColor capitalize">
        {heading}
      </h2>
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
      <div className="h-[40vh]  overflow-y-auto ">
        <ChatLayout
          src="../../../public/assets/group.png"
          name="Jenny Wilson"
          message="Love You....."
          time="10:30 PM"
        />
        <ChatLayout
          src="../../../public/assets/group.png"
          name="Savannah Nguyen"
          message="Love You....."
          time="Yesterday, 10:00 AM "
        />
        <ChatLayout
          src="../../../public/assets/group.png"
          name="Jenny Wilson"
          message="Love You....."
          time="10:30 PM"
        />
        <ChatLayout
          src="../../../public/assets/group.png"
          name="Courtney Henry"
          message="Love You....."
          time="Yesterday, 10:00 AM"
        />
        <ChatLayout
          src="../../../public/assets/group.png"
          name="Courtney Henry"
          message="Love You....."
          time="Yesterday, 10:00 AM"
        />
        <ChatLayout
          src="../../../public/assets/group.png"
          name="Courtney Henry"
          message="Love You....."
          time="Yesterday, 10:00 AM"
        />
        <ChatLayout
          src="../../../public/assets/group.png"
          name="Courtney Henry"
          message="Love You....."
          time="Yesterday, 10:00 AM"
        />
      </div>
    </div>
  );
};

export default Groups;
