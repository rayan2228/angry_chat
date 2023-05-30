import React from "react";
import Flex from "./Flex";
import Img from "./Img";

const ChatLayout = ({ name, message, time }) => {
  return (
    <Flex className=" justify-between font-inter my-4 ">
      <Img src="../../../public/assets/chat.png" className="w-[14%]" alt="chat" />
      <Flex className="flex-col w-[48%]">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="font-normal text-xs">{message}</p>
      </Flex>
      <p className="w-[36%] font-normal text-xs text-right">{time}</p>
    </Flex>
  );
};

export default ChatLayout;
