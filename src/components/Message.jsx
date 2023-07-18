import React from "react";
import Img from "./layouts/Img";
import Flex from "./layouts/Flex";
import Option from "./layouts/option";
import {
  BsEmojiSmile,
  BsCardImage,
  BsCamera,
  BsMic,
  BsSendFill,
} from "react-icons/bs";
const Message = () => {
  return (
    <>
      <Flex className="flex-col grow">
        <Flex className="px-4 pt-[50px]  gap-x-4 items-center shadow-primary_shadow pb-4">
          <Img src="../../public/assets/default.png" className="w-[14%]" />
          <h2 className="w-[90%] font-inter text-lg font-medium capitalize text-[#222222]">
            rayan{" "}
          </h2>
          <div className="text-right">
            <Option />
          </div>
        </Flex>
        <Flex className="flex-col h-screen p-6 overflow-y-auto">
          <div className="h-screen overflow-y-auto">
            {/* message receive */}
            <div className="mt-4 text-left">
              <div className="inline-block text-lg capitalize font-inter text-[#222222] bg-[#E9E9E9] rounded-md px-6 font-normal py-1">
                hello
              </div>
            </div>
            {/* message send */}
            <div className="mt-4 text-right">
              <div className=" inline-block text-lg capitalize font-inter text-[#ffffff] bg-[#5B5F7D] rounded-md px-6 font-normal py-1 text-left">
                hello
              </div>
            </div>
            {/* message receive image */}
            <div className="mt-4 text-left">
              <div className="inline-block  bg-[#E9E9E9] rounded-md p-2 w-[200px]">
                <img src="https://cdn.pixabay.com/photo/2023/05/23/18/12/hummingbird-8013214_1280.jpg" />
              </div>
            </div>
            {/* message send */}
            <div className="mt-4 text-right">
              <div className=" inline-block text-lg capitalize font-inter text-[#ffffff] bg-[#5B5F7D] rounded-md px-6 font-normal py-1 text-left">
                hello
              </div>
            </div>
            {/* message send img */}
            <div className="mt-4 text-right">
              <div className=" inline-block bg-[#5B5F7D] rounded-md p-2 w-[200px]">
                <img src="https://cdn.pixabay.com/photo/2023/05/23/18/12/hummingbird-8013214_1280.jpg" />
              </div>
            </div>
          </div>
          <div className="relative bg-[#F4F4F4]">
            <textarea
              name=""
              id=""
              className="py-4 pl-3  rounded-md outline-none w-[75%]  break-words bg-transparent h-[50px] resize-none"
              placeholder="write a message"
            ></textarea>
            <Flex className="absolute top-[37%] gap-x-3 right-4 ">
              <BsEmojiSmile className="text-xl cursor-pointer" />
              <BsCardImage className="text-xl cursor-pointer" />
              <BsCamera className="text-xl cursor-pointer" />
              <BsMic className="text-xl cursor-pointer" />
              <BsSendFill className="text-xl cursor-pointer text-[#32375C]" />
            </Flex>
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default Message;
