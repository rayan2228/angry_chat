import React from "react";
import Flex from "../components/layouts/Flex";
import Sidebar from "../components/Sidebar";
import Img from "../components/layouts/Img";
const Settings = () => {
  const currentUser = JSON.parse(localStorage.getItem("userLoginInfo"));
  return (
    <Flex>
      <Sidebar />
      <Flex className="py-6 w-[90%] flex-col gap-y-16 ">
        <h2 className="text-xl font-semibold font-inter">Settings</h2>
        <Flex className="justify-between">
          <div className="w-[48%] shadow-primary_shadow  ">
            <h2 className="text-lg font-semibold font-inter">
              Profile Setting
            </h2>
            <Flex className="items-center w-full mt-8 gap-x-2">
              <Img
                src={currentUser.photoURL}
                alt="user"
                className="w-[48px] "
              />
              <div className="w-[60%]">
                <h2 className="text-base font-semibold font-inter ">
                  {currentUser.displayName}
                </h2>
                <h5 className="text-xs font-normal capitalize font-inter">
                  Stay Safe Stay Home
                </h5>
              </div>
              <p className="w-[20%] border border-primary text-center py-3 cursor-pointer font-inter text-lg font-semibold text-[#32375C]">
                logout
              </p>
            </Flex>
          </div>
          <div className="w-[48%] bg-slate-400 ">asdsa</div>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Settings;
