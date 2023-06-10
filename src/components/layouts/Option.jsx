import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
const Option = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-[10%] font-normal text-xs text-right cursor-pointer relative ">
      <BsThreeDotsVertical onClick={() => setShow(!show)} />
      {show && (
        <div className="absolute top-[18px] right-5 cursor-pointer w-36  text-left capitalize rounded-md z-10 bg-slate-100">
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
  );
};

export default Option;