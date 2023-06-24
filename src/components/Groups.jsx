import React from "react";
import SearchInput from "./layouts/SearchInput";
import ChatLayout from "./layouts/ChatLayout";
const Groups = ({ heading }) => {
  return (
    <div className="w-1/3 p-4 duration-75 rounded-xl hover:shadow-primary_shadow ">
      <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
        {heading}
      </h2>
      <SearchInput  />
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
