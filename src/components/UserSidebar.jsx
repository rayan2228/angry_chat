import React, { useState } from "react";
import Flex from "./layouts/Flex";
import SearchInput from "./layouts/SearchInput";
import ChatLayout from "./layouts/ChatLayout";
import Input from "../components/layouts/Input";
import { ToastContainer, toast } from "react-toastify";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { ThreeDots } from "react-loader-spinner";
const UserSidebar = () => {
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const groupRef = ref(db, "groups/");
  const [createGroupShow, setCreateGroupShow] = useState(false);
  const [createGroup, setCreateGroup] = useState({
    groupName: "",
    groupTag: "",
    groupImage:"",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSetGroup = (e) => {
    const updateValue = {
      ...createGroup,
      [e.target.name]: e.target.value,
    };
    setCreateGroup(updateValue);
  };
  const handleCreateGroup = () => {
    if (!createGroup.groupName || !createGroup.groupTag) {
      setError("all field are required");
    } else {
      setLoading(true);
      set(push(groupRef), {
        groupName: createGroup.groupName,
        groupTag: createGroup.groupTag,
        adminId: currentUser.uid,
      }).then(() => {
        setCreateGroupShow(false);
        setLoading(false);
        setCreateGroup({
          groupName: "",
          groupTag: "",
        });
      });
    }
  };
  return (
    <>
      <ToastContainer />
      {createGroupShow && (
        <div className="w-screen h-screen fixed bg-[rgba(50,55,92,0.35)] flex justify-center items-center z-10">
          <Flex className="w-[500px] bg-primary rounded-lg p-7 shadow-primary_shadow flex-col items-center gap-y-4">
            <div className="w-full text-white ">
              {error && (
                <p className="p-4 text-sm font-medium capitalize bg-red-500 rounded-md font-inter">
                  {error}
                </p>
              )}

              <Input
                inputClass="text-black rounded-md"
                type="text"
                label="Group Name"
                value={createGroup.groupName}
                name="groupName"
                handle={handleSetGroup}
              />
              <Input
                inputClass="text-black rounded-md"
                type="text"
                label="Group Tagline"
                value={createGroup.groupTag}
                name="groupTag"
                handle={handleSetGroup}
              />
            </div>
            {loading ? (
              <div className="flex items-center justify-center w-full py-3 mt-6 text-xl font-semibold bg-white rounded-md text-primary font-inter">
                <ThreeDots
                  height=""
                  width="80"
                  radius="9"
                  color="#32375C"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <button
                className="w-full py-2 text-lg font-semibold capitalize bg-white rounded-lg font-inter "
                onClick={handleCreateGroup}
              >
                create group
              </button>
            )}

            <button
              className="w-full py-2 text-lg font-semibold text-white capitalize bg-red-500 rounded-lg font-inter "
              onClick={() => {
                setCreateGroupShow(false),
                  setCreateGroup({
                    groupName: "",
                    groupTag: "",
                  }),
                  setError(""),
                  setLoading(false);
              }}
            >
              cancel
            </button>
          </Flex>
        </div>
      )}
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
