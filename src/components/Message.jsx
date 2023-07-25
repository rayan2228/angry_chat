import React, { useState } from "react";
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
import { RxCross2 } from "react-icons/rx";
import ModalImage from "react-modal-image";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useSelector } from "react-redux";
const Message = ({ status }) => {
  const activeMessage = useSelector((state) =>
   state.userMessageInfo.userMessageInfo
  );
  console.log(activeMessage);
  const [show, setShow] = useState(false);
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }
  return (
    <>
      {show && (
        <div className="absolute z-10 flex items-center justify-center w-screen h-screen bg-[rgba(50,55,92,0.35)]">
          <div className="w-[80vw] h-screen">
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
              isImageMirror={true}
              isFullscreen={true}
            />
          </div>
          <RxCross2
            className="absolute text-3xl text-white bg-red-500 cursor-pointer top-2 right-4"
            onClick={() => setShow(false)}
          />
        </div>
      )}
      <Flex className="flex-col grow">
        <Flex className="px-4 pt-[50px]  gap-x-4 items-center shadow-primary_shadow pb-4">
          <Img src={activeMessage.profile_picture} className="w-[14%]" />
          <h2 className="w-[90%] font-inter text-lg font-medium capitalize text-[#222222]">
            {activeMessage.username}
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
              <h6 className="mt-2 text-xs font-inter text-slate-600">12:00</h6>
            </div>
            {/* message send */}
            <div className="mt-4 text-right">
              <div className=" inline-block text-lg capitalize font-inter text-[#ffffff] bg-[#5B5F7D] rounded-md px-6 font-normal py-1 text-left">
                hello
              </div>
              <h6 className="mt-2 text-xs font-inter text-slate-600">12:00</h6>
            </div>
            {/* message receive image */}
            <div className="mt-4 text-left">
              <div className="inline-block  bg-[#E9E9E9] rounded-md p-2 w-[200px]">
                <ModalImage
                  small={
                    "https://cdn.pixabay.com/photo/2023/05/23/18/12/hummingbird-8013214_1280.jpg"
                  }
                  large={
                    "https://cdn.pixabay.com/photo/2023/05/23/18/12/hummingbird-8013214_1280.jpg"
                  }
                  showRotate={true}
                />
              </div>
              <h6 className="mt-2 text-xs font-inter text-slate-600">12:00</h6>
            </div>
            {/* message send */}
            <div className="mt-4 text-right">
              <div className=" inline-block text-lg capitalize font-inter text-[#ffffff] bg-[#5B5F7D] rounded-md px-6 font-normal py-1 text-left">
                hello
              </div>
              <h6 className="mt-2 text-xs font-inter text-slate-600">12:00</h6>
            </div>
            {/* message send img */}
            <div className="mt-4 text-right">
              <div className=" inline-block bg-[#5B5F7D] rounded-md p-2 w-[200px]">
                <ModalImage
                  small={
                    "https://cdn.pixabay.com/photo/2023/05/23/18/12/hummingbird-8013214_1280.jpg"
                  }
                  large={
                    "https://cdn.pixabay.com/photo/2023/05/23/18/12/hummingbird-8013214_1280.jpg"
                  }
                  showRotate={true}
                />
              </div>
              <h6 className="mt-2 text-xs font-inter text-slate-600">12:00</h6>
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
              <BsCamera
                className="text-xl cursor-pointer"
                onClick={() => setShow(true)}
              />
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