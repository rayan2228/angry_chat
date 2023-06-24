import React, { useState } from "react";
import Flex from "./layouts/Flex";
import SearchInput from "./layouts/SearchInput";
import ChatLayout from "./layouts/ChatLayout";
<<<<<<< HEAD

import { getDatabase} from "firebase/database";


import CreateGroup from "./layouts/CreateGroup";
=======
import Input from "../components/layouts/Input";
import { ToastContainer, toast } from "react-toastify";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
} from "firebase/database";
import {
  getStorage,
  ref as storeRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { ThreeDots } from "react-loader-spinner";
>>>>>>> parent of 447789e (dynamic  option li show)
const UserSidebar = () => {
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const [createGroupShow, setCreateGroupShow] = useState(false);
  return (
    <>
      <CreateGroup show={createGroupShow}/>
      <Flex className="h-screen flex-col py-[50px]  w-[430px] pr-4  border-r-2 border-[#D3D3D3]">
        <Flex className="items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
            Group
          </h2>
          <button
            className="text-primary font-inter font-semibold text-lg border-[2px] border-primary py-[10px] px-6 rounded-md"
            onClick={() => setCreateGroupShow(true)}
          >
            Create Group
          </button>
        </Flex>
        <SearchInput />
        <div className="h-screen overflow-y-auto">
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
          <ChatLayout
            src="../../../public/assets/chat.png"
            name="Jenny Wilson"
            message="Love You....."
            time="10:30 PM"
          />
        </div>
      </Flex>
    </>
  );
};

export default UserSidebar;
