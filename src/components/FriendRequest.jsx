import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import PeopleLayout from "./layouts/PeopleLayout";
import Flex from "./layouts/Flex";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const FriendRequest = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-1/3 p-4 overflow-hidden duration-75 rounded-xl hover:shadow-primary_shadow">
      {show && (
        <div className="absolute w-full h-full bg-[#222222bf] z-10 top-0 left-0 ">
          <RxCross2
            className="absolute text-xl text-white cursor-pointer top-3 right-3"
            onClick={() => setShow(false)}
          />
          <p className="absolute px-6 py-3 text-lg font-normal text-black capitalize bg-white rounded-md cursor-pointer top-10 right-3 font-inter">
            View Sent Request
          </p>
        </div>
      )}
      <Flex className="items-center justify-between">
        <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
          Friend Requests
        </h2>
        <BsThreeDotsVertical
          className="cursor-pointer"
          onClick={() => setShow(true)}
        />
      </Flex>
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
          classNameHeading="w-[55%]"
        >
          <div className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer flex-col flex items-center w-[30%]">
            <h4 className="w-full text-center text-white rounded-md bg-primary">
              confirm
            </h4>
            <h4>cancel</h4>
          </div>
        </PeopleLayout>
        <PeopleLayout
          src="../../../public/assets/friend.png"
          name="Jenny Wilson"
          classNameFlex="gap-x-4"
          classNameHeading="w-[55%]"
        >
          <div className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer flex-col flex items-center w-[30%]">
            <h4 className="w-full text-center text-white rounded-md bg-primary">
              confirm
            </h4>
            <h4>cancel</h4>
          </div>
        </PeopleLayout>
        <PeopleLayout
          src="../../../public/assets/friend.png"
          name="Jenny Wilson"
          classNameFlex="gap-x-4"
          classNameHeading="w-[55%]"
        >
          <div className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer flex-col flex items-center w-[30%]">
            <h4 className="w-full text-center text-white rounded-md bg-primary">
              confirm
            </h4>
            <h4>cancel</h4>
          </div>
        </PeopleLayout>
        <PeopleLayout
          src="../../../public/assets/friend.png"
          name="Jenny Wilson"
          classNameFlex="gap-x-4"
          classNameHeading="w-[55%]"
        >
          <div className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer flex-col flex items-center w-[30%]">
            <h4 className="w-full text-center text-white rounded-md bg-primary">
              confirm
            </h4>
            <h4>cancel</h4>
          </div>
        </PeopleLayout>
        <PeopleLayout
          src="../../../public/assets/friend.png"
          name="Jenny Wilson"
          classNameFlex="gap-x-4"
          classNameHeading="w-[55%]"
        >
          <div className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer flex-col flex items-center w-[30%]">
            <h4 className="w-full text-center text-white rounded-md bg-primary">
              confirm
            </h4>
            <h4>cancel</h4>
          </div>
        </PeopleLayout>
        <PeopleLayout
          src="../../../public/assets/friend.png"
          name="Jenny Wilson"
          classNameFlex="gap-x-4"
          classNameHeading="w-[55%]"
        >
          <div className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer flex-col flex items-center w-[30%]">
            <h4 className="w-full text-center text-white rounded-md bg-primary">
              confirm
            </h4>
            <h4>cancel</h4>
          </div>
        </PeopleLayout>
        <PeopleLayout
          src="../../../public/assets/friend.png"
          name="Jenny Wilson"
          classNameFlex="gap-x-4"
          classNameHeading="w-[55%]"
        >
          <div className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer flex-col flex items-center w-[30%]">
            <h4 className="w-full text-center text-white rounded-md bg-primary">
              confirm
            </h4>
            <h4>cancel</h4>
          </div>
        </PeopleLayout>
      </div>
    </div>
  );
};

export default FriendRequest;
