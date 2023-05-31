import React from 'react'

const Option = () => {
  return (
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
  );
}

export default Option