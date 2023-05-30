import React, { useState } from "react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import PeopleLayout from "./layouts/PeopleLayout";
const Friends = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl w-1/3 p-4 ">
      <h2 className="font-inter font-semibold text-2xl text-textColor">
        Friend
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
      <div className="h-[250px] overflow-y-auto ">
        <PeopleLayout
          src="../../../public/assets/friend.png"
          name="Jenny Wilson"
          classNameFlex="gap-x-4"
          classNameHeading="w-[75%]"
        >
          <div className="w-[10%] font-normal text-xs text-right cursor-pointer relative">
            <BsThreeDotsVertical onClick={() => setShow(!show)} />
            {show && (
              <div className="absolute top-[18px] right-5 cursor-pointer w-36  text-left capitalize rounded-md">
                <ul>
                  <li className="font-normal text-base p-2 duration-75 hover:bg-[#EBEBEF]">
                    message
                  </li>
                  <li className="font-normal text-base p-2 duration-75 hover:bg-[#EBEBEF]">
                    unfriend
                  </li>
                  <li className="font-normal text-base p-2 duration-75 hover:bg-[#EBEBEF]">
                    block
                  </li>
                </ul>
              </div>
            )}
          </div>
        </PeopleLayout>
      </div>
    </div>
  );
};

export default Friends;
