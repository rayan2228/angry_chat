import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
const Option = ({ handleSecond, handleThird, first, second, third }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-[10%] font-normal text-xs text-right cursor-pointer relative ">
      <BsThreeDotsVertical onClick={() => setShow(!show)} />
      {show && (
        <div className="absolute top-[18px] right-5 cursor-pointer w-36  text-left capitalize rounded-md z-10 bg-slate-100">
          <ul>
            {first && (
              <li className="font-normal text-base p-2 duration-75 hover:bg-[#EBEBEF]">
                {first}
              </li>
            )}
            {second && (
              <li
                className="font-normal text-base p-2 duration-75 hover:bg-[#EBEBEF]"
                onClick={handleSecond}
              >
                {second}
              </li>
            )}
            {third && (
              <li
                className="font-normal text-base p-2 duration-75 hover:bg-[#EBEBEF]"
                onClick={handleThird}
              >
                {third}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Option;
