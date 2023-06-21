import React from 'react'
import { BsSearch } from "react-icons/bs";
const SearchInput = ({ handle, search }) => {
  return (
    <div className="relative mt-4 mb-5">
      <input
        type="search"
        name=""
        id=""
        className="w-full p-2 pl-[53px] rounded-md outline-none placeholder:font-inter placeholder:font-normal placeholder:text-sm placeholder:capitalize placeholder:text-secondaryTextColor border border-[#D3D3D3]"
        placeholder="search"
        value={search}
        onChange={handle}
      />
      <BsSearch className="absolute top-[53%] left-7 translate-x-[-50%] translate-y-[-50%] text-2xl" />
    </div>
  );
};

export default SearchInput