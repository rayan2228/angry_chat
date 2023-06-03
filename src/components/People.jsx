import React from "react";
import { BsSearch } from "react-icons/bs";
import PeopleLayout from "./layouts/PeopleLayout";
const People = () => {
  return (
    <div className="w-1/3 p-4 rounded-xl capitalize">
      <h2 className="text-2xl font-semibold font-inter text-textColor">
        People
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
          <p className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer w-[10%]">
            Add
          </p>
        </PeopleLayout>
        <PeopleLayout
          src="../../../public/assets/friend.png"
          name="Jenny Wilson"
          classNameFlex="gap-x-4"
          classNameHeading="w-[75%]"
        >
          <p className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer w-[10%]">
            Add
          </p>
        </PeopleLayout>
      </div>
    </div>
  );
};

export default People;