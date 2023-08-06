import React, { useEffect, useRef, useState } from "react";
import Img from "./layouts/Img";
import Flex from "./layouts/Flex";
import {
  BsEmojiSmile,
  BsCardImage,
  BsCamera,
  BsMic,
  BsSendFill,
} from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
  push,
} from "firebase/database";
import {
  getStorage,
  ref as imageRef,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { RxCross2 } from "react-icons/rx";
import ModalImage from "react-modal-image";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import EmojiPicker from "emoji-picker-react";
import ScrollToBottom from "react-scroll-to-bottom";
import Option from "./layouts/Option";
const Message = ({ status }) => {
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const activeMessage = useSelector(
    (state) => state.userMessageInfo.userMessageInfo
  );
  const activeGroupMessage = useSelector(
    (state) => state.groupMessageInfo.groupMessageInfo
  );
  const messageRef = ref(db, "messages/");
  const [show, setShow] = useState(false);
  const [emojiShow, setEmojiShow] = useState(false);
  const [messageBtnShow, setMessageBtnShow] = useState(false);
  const [message, setMessage] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  let date = new Date();
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorderRef = useRef(null);
  function handleTakePhoto(dataUri) {
    const storage = getStorage();
    const storageRef = imageRef(
      storage,
      `singleMessageImage/${date.getTime()}`
    );
    const message4 = dataUri;
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(messageRef), {
          whoSend: currentUser.uid,
          whoReceived: activeMessage.userId,
          messageImg: downloadURL,
          time: `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        });
      });
    });
    setShow(false);
  }
  useEffect(() => {
    if (message) {
      setMessageBtnShow(true);
    } else {
      setMessageBtnShow(false);
    }
    onValue(messageRef, (snapshot) => {
      const userMessage = [];
      snapshot.forEach((messages) => {
        userMessage.push({
          ...messages.val(),
          userMessageId: messages.key,
        });
      });
      setUserMessage(userMessage);
    });
  }, [message]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    set(push(messageRef), {
      whoSend: currentUser.uid,
      whoReceived: activeMessage.userId,
      message,
      time: `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    });
    setMessage("");
    setEmojiShow(false);
  };

  const handleImageSend = (e) => {
    let file = e.target.files[0];
    const storage = getStorage();
    const storageRef = imageRef(
      storage,
      `singleMessageImage/${date.getTime()}_${file.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(messageRef), {
            whoSend: currentUser.uid,
            whoReceived: activeMessage.userId,
            messageImg: downloadURL,
            time: `${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          });
        });
      }
    );
  };
  const handleEmojiMessage = (emojiData) => {
    setMessage(message + emojiData.emoji);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 256; // Adjust for more or fewer visual bars.
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.connect(audioContext.destination);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setAudioChunks((chunks) => [...chunks, e.data]);
      }
    };

    mediaRecorder.start();
    setRecording(true);

    const visualize = () => {
      analyser.getByteFrequencyData(dataArray);
      // Use the dataArray to update your visual representation (e.g., a bar graph).
      requestAnimationFrame(visualize);
    };

    visualize();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    console.log("yes");
  };

  const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    // Use the AudioPlayer component to play the recorded audio.
  };

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
      {status == "personal" && activeMessage ? (
        <Flex className="flex-col w-[55%] flex-grow">
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
            <ScrollToBottom className="h-screen overflow-y-auto">
              {/* message receive */}
              {userMessage.map((message) =>
                message.whoReceived === currentUser.uid &&
                message.whoSend === activeMessage.userId ? (
                  message.message ? (
                    <div className="mt-4 text-left">
                      <div className="inline-block text-lg capitalize font-inter text-[#222222] bg-[#E9E9E9] rounded-md px-6 font-normal py-1">
                        {message.message}
                      </div>
                      <h6 className="mt-2 text-xs font-inter text-slate-600">
                        {moment(message.time, "DDMMYYYY hh:mm").fromNow()}
                      </h6>
                    </div>
                  ) : message.messageImg ? (
                    // message receive image
                    message.whoReceived === currentUser.uid &&
                    message.whoSend === activeMessage.userId && (
                      <div className="mt-4 text-left">
                        <div className="inline-block  bg-[#E9E9E9] rounded-md p-2 w-[200px]">
                          <ModalImage
                            small={message.messageImg}
                            large={message.messageImg}
                            showRotate={true}
                          />
                        </div>
                        <h6 className="mt-2 text-xs font-inter text-slate-600">
                          {moment(message.time, "DDMMYYYY hh:mm").fromNow()}
                        </h6>
                      </div>
                    )
                  ) : (
                    ""
                  )
                ) : // message send
                message.message ? (
                  message.whoReceived === activeMessage.userId &&
                  message.whoSend === currentUser.uid && (
                    <div className="mt-4 text-right">
                      <div className=" inline-block text-lg  font-inter text-[#ffffff] bg-[#5B5F7D] rounded-md px-6 font-normal py-1 text-left">
                        {message.message}
                      </div>
                      <h6 className="mt-2 text-xs font-inter text-slate-600">
                        {moment(message.time, "DDMMYYYY hh:mm").fromNow()}
                      </h6>
                    </div>
                  )
                ) : message.messageImg ? (
                  //  message send img
                  message.whoReceived === activeMessage.userId &&
                  message.whoSend === currentUser.uid && (
                    <div className="mt-4 text-right">
                      <div className=" inline-block bg-[#5B5F7D] rounded-md p-2 w-[200px]">
                        <ModalImage
                          small={message.messageImg}
                          large={message.messageImg}
                          showRotate={true}
                        />
                      </div>
                      <h6 className="mt-2 text-xs font-inter text-slate-600">
                        {moment(message.time, "DDMMYYYY hh:mm").fromNow()}
                      </h6>
                    </div>
                  )
                ) : (
                  ""
                )
              )}
            </ScrollToBottom>
            <div className="relative bg-[#F4F4F4]">
              <textarea
                name=""
                id=""
                className="py-4 pl-3  rounded-lg outline-none w-[75%]  break-words bg-transparent h-[50px] resize-none"
                placeholder="write a message"
                onChange={handleMessage}
                value={message}
              ></textarea>
              {emojiShow && (
                <div className="absolute left-0 w-full bottom-16 h-80">
                  <EmojiPicker
                    height="100%"
                    width="100%"
                    onEmojiClick={handleEmojiMessage}
                  />
                </div>
              )}
              <Flex className="absolute top-[37%] gap-x-3 right-4 ">
                <BsEmojiSmile
                  className={
                    emojiShow
                      ? "text-xl cursor-pointer text-[#32375C]"
                      : "text-xl cursor-pointer "
                  }
                  onClick={() => setEmojiShow(!emojiShow)}
                />
                <label htmlFor="image">
                  <BsCardImage className="text-xl cursor-pointer" />
                </label>
                <input
                  type="file"
                  hidden
                  id="image"
                  onChange={handleImageSend}
                />
                <BsCamera
                  className="text-xl cursor-pointer"
                  onClick={() => setShow(true)}
                />
                <BsMic className="text-xl cursor-pointer" />
                <button onClick={startRecording} disabled={recording}>
                  Start Recording
                </button>
                <button onClick={stopRecording} disabled={!recording}>
                  Stop Recording
                </button>
                <button
                  onClick={playRecording}
                  disabled={audioChunks.length === 0}
                >
                  Play Recording
                </button>
                {messageBtnShow && (
                  <BsSendFill
                    className="text-xl cursor-pointer text-[#32375C]"
                    onClick={() => handleSendMessage()}
                  />
                )}
              </Flex>
            </div>
          </Flex>
        </Flex>
      ) : status == "group" && activeGroupMessage ? (
        <Flex className="flex-col w-[55%] flex-grow">
          <Flex className="px-4 pt-[50px]  gap-x-4 items-center shadow-primary_shadow pb-4">
            <Img src={activeGroupMessage.groupImg} className="w-[14%]" />
            <div className="w-[90%] font-inter text-lg font-medium capitalize text-[#222222] ">
              <h2 className="">{activeGroupMessage.groupName}</h2>
              <h2 className="text-xs">
                {activeGroupMessage.groupTag}
              </h2>
            </div>
            <div className="text-right">
              <Option />
            </div>
          </Flex>
          <Flex className="flex-col h-screen p-6 overflow-y-auto">
            <ScrollToBottom className="h-screen overflow-y-auto">
              {/* message receive */}
              {userMessage.map((message) =>
                message.whoReceived === currentUser.uid &&
                message.whoSend === activeMessage.userId ? (
                  message.message ? (
                    <div className="mt-4 text-left">
                      <div className="inline-block text-lg capitalize font-inter text-[#222222] bg-[#E9E9E9] rounded-md px-6 font-normal py-1">
                        {message.message}
                      </div>
                      <h6 className="mt-2 text-xs font-inter text-slate-600">
                        {moment(message.time, "DDMMYYYY hh:mm").fromNow()}
                      </h6>
                    </div>
                  ) : message.messageImg ? (
                    // message receive image
                    message.whoReceived === currentUser.uid &&
                    message.whoSend === activeMessage.userId && (
                      <div className="mt-4 text-left">
                        <div className="inline-block  bg-[#E9E9E9] rounded-md p-2 w-[200px]">
                          <ModalImage
                            small={message.messageImg}
                            large={message.messageImg}
                            showRotate={true}
                          />
                        </div>
                        <h6 className="mt-2 text-xs font-inter text-slate-600">
                          {moment(message.time, "DDMMYYYY hh:mm").fromNow()}
                        </h6>
                      </div>
                    )
                  ) : (
                    ""
                  )
                ) : // message send
                message.message ? (
                  message.whoReceived === activeMessage.userId &&
                  message.whoSend === currentUser.uid && (
                    <div className="mt-4 text-right">
                      <div className=" inline-block text-lg  font-inter text-[#ffffff] bg-[#5B5F7D] rounded-md px-6 font-normal py-1 text-left">
                        {message.message}
                      </div>
                      <h6 className="mt-2 text-xs font-inter text-slate-600">
                        {moment(message.time, "DDMMYYYY hh:mm").fromNow()}
                      </h6>
                    </div>
                  )
                ) : message.messageImg ? (
                  //  message send img
                  message.whoReceived === activeMessage.userId &&
                  message.whoSend === currentUser.uid && (
                    <div className="mt-4 text-right">
                      <div className=" inline-block bg-[#5B5F7D] rounded-md p-2 w-[200px]">
                        <ModalImage
                          small={message.messageImg}
                          large={message.messageImg}
                          showRotate={true}
                        />
                      </div>
                      <h6 className="mt-2 text-xs font-inter text-slate-600">
                        {moment(message.time, "DDMMYYYY hh:mm").fromNow()}
                      </h6>
                    </div>
                  )
                ) : (
                  ""
                )
              )}
            </ScrollToBottom>
            <div className="relative bg-[#F4F4F4]">
              <textarea
                name=""
                id=""
                className="py-4 pl-3  rounded-lg outline-none w-[75%]  break-words bg-transparent h-[50px] resize-none"
                placeholder="write a message"
                onChange={handleMessage}
                value={message}
              ></textarea>
              {emojiShow && (
                <div className="absolute left-0 w-full bottom-16 h-80">
                  <EmojiPicker
                    height="100%"
                    width="100%"
                    onEmojiClick={handleEmojiMessage}
                  />
                </div>
              )}
              <Flex className="absolute top-[37%] gap-x-3 right-4 ">
                <BsEmojiSmile
                  className={
                    emojiShow
                      ? "text-xl cursor-pointer text-[#32375C]"
                      : "text-xl cursor-pointer "
                  }
                  onClick={() => setEmojiShow(!emojiShow)}
                />
                <label htmlFor="image">
                  <BsCardImage className="text-xl cursor-pointer" />
                </label>
                <input
                  type="file"
                  hidden
                  id="image"
                  onChange={handleImageSend}
                />
                <BsCamera
                  className="text-xl cursor-pointer"
                  onClick={() => setShow(true)}
                />
                <BsMic className="text-xl cursor-pointer" />
                <button onClick={startRecording} disabled={recording}>
                  Start Recording
                </button>
                <button onClick={stopRecording} disabled={!recording}>
                  Stop Recording
                </button>
                <button
                  onClick={playRecording}
                  disabled={audioChunks.length === 0}
                >
                  Play Recording
                </button>
                {messageBtnShow && (
                  <BsSendFill
                    className="text-xl cursor-pointer text-[#32375C]"
                    onClick={() => handleSendMessage()}
                  />
                )}
              </Flex>
            </div>
          </Flex>
        </Flex>
      ) : (
        <div className="flex items-center justify-center grow">
          <p className="text-lg font-semibold text-center capitalize font-inter">
            Select a chat or start{" "}
            <span className="block">a new conversation</span>
          </p>
        </div>
      )}
    </>
  );
};

export default Message;
