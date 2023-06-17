import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import PeopleLayout from "./layouts/PeopleLayout";
import Flex from "./layouts/Flex";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { getDatabase, ref, onValue, remove } from "firebase/database";
const FriendRequest = () => {
  const currentUser = JSON.parse(localStorage.getItem("userLoginInfo"));
  const [requestList, setRequestList] = useState([]);
  const [requestArrKey, setRequestArrKey] = useState([]);
  const [users, setUsers] = useState([]);
  const db = getDatabase();
  const reqRef = ref(db, "friendRequest/");
  const userRef = ref(db, "users/");
  const [show, setShow] = useState(false);
  const [sendReq, setSendReq] = useState(false);
  useEffect(() => {
    onValue(reqRef, (snapshot) => {
      const requestList = [];
      // const requestArrKey = [];
      snapshot.forEach((requests) => {
        requestList.push({
          receiver: requests.val().receiverId,
          sender: requests.val().senderId,
          key: requests.key,
        });
        // requestArrKey.push(requests.key + "__" + requests.val().receiverId);
      });
      setRequestList(requestList);
    });
  }, []);
  useEffect(() => {
    onValue(userRef, (snapshot) => {
      const users = [];
      snapshot.forEach((user) => {
        users.push({ ...user.val(), userId: user.key });
      });
      setUsers(users);
    });
  }, []);
  const HandleCancel = (id) => {
    remove(ref(db, "friendRequest/" + id));
  };
  return (
    <>
      {!sendReq && (
        <div className="relative w-1/3 p-4 overflow-hidden duration-75 rounded-xl hover:shadow-primary_shadow">
          {show && (
            <div className="absolute w-full h-full bg-[#140e0ebf] z-10 top-0 left-0 ">
              <RxCross2
                className="absolute text-xl text-white cursor-pointer top-3 right-3"
                onClick={() => setShow(false)}
              />
              <p
                className="absolute px-6 py-3 text-lg font-normal text-black capitalize bg-white rounded-md cursor-pointer top-10 right-3 font-inter"
                onClick={() => {
                  setSendReq(true), setShow(false);
                }}
              >
                View Sent Requests
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
          <div className="h-[40vh]  overflow-y-auto ">
            {requestList.map(
              (reqId) =>
                reqId.receiver === currentUser.uid &&
                users.map(
                  (val) =>
                    val.userId === reqId.sender && (
                      <PeopleLayout
                        src={val.profile_picture}
                        name={val.username}
                        classNameFlex="gap-x-4"
                        classNameHeading="w-[55%]"
                        key={val.userId}
                      >
                        <div className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer flex-col flex items-center w-[30%]">
                          <h4 className="w-full text-center text-white rounded-md bg-primary">
                            confirm
                          </h4>
                          <h4 onClick={() => HandleCancel(reqId.key)}>
                            cancel
                          </h4>
                        </div>
                      </PeopleLayout>
                    )
                )
            )}
          </div>
        </div>
      )}
      {sendReq && (
        <div className="relative w-1/3 p-4 overflow-hidden duration-75 rounded-xl hover:shadow-primary_shadow">
          {show && (
            <div className="absolute w-full h-full bg-[#222222bf] z-10 top-0 left-0 ">
              <RxCross2
                className="absolute text-xl text-white cursor-pointer top-3 right-3"
                onClick={() => setShow(false)}
              />
              <p
                className="absolute px-6 py-3 text-lg font-normal text-black capitalize bg-white rounded-md cursor-pointer top-10 right-3 font-inter"
                onClick={() => {
                  setSendReq(false), setShow(false);
                }}
              >
                View Friend Requests
              </p>
            </div>
          )}
          <Flex className="items-center justify-between">
            <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
              sent Requests
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
          <div className="h-[40vh]  overflow-y-auto ">
            {requestList.map(
              (reqId) =>
                reqId.sender === currentUser.uid &&
                users.map(
                  (val) =>
                    val.userId === reqId.receiver && (
                      <PeopleLayout
                        src={val.profile_picture}
                        name={val.username}
                        classNameFlex="gap-x-4"
                        classNameHeading="w-[55%]"
                        key={val.userId}
                      >
                        <p
                          className="text-lg font-normal text-center text-white capitalize bg-red-500 rounded-md cursor-pointer font-inter w-[24%]"
                          onClick={() => HandleCancel(reqId.key)}
                        >
                          cancel
                        </p>
                      </PeopleLayout>
                    )
                )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRequest;
