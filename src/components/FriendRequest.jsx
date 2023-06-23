import React, { useState, useEffect } from "react";
import PeopleLayout from "./layouts/PeopleLayout";
import Flex from "./layouts/Flex";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import SearchInput from "./layouts/SearchInput";
import NoData from "./layouts/NoData";
import { useSelector } from "react-redux";
const FriendRequest = () => {
  const currentUser = JSON.parse(
    useSelector((state) => state.userLoginInfo.userInfo)
  );
  const [requestList, setRequestList] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const db = getDatabase();
  const reqRef = ref(db, "friendRequest/");
  const userRef = ref(db, "users/");
  const [show, setShow] = useState(false);
  const [sendReq, setSendReq] = useState(false);
  useEffect(() => {
    onValue(reqRef, (snapshot) => {
      const requestList = [];
      snapshot.forEach((requests) => {
        requestList.push({
          receiver: requests.val().receiverId,
          sender: requests.val().senderId,
          key: requests.key,
        });
      });
      setRequestList(requestList);
    });
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
  const handleConfirm = (key, userId) => {
    set(push(ref(db, "friends/")), {
      conformerId: currentUser.uid,
      requesterId: userId,
    });
    remove(ref(db, "friendRequest/" + key));
  };
  const handleSearch = (e) => {
    let searchUserList = [];
    if (e.target.value) {
      users.filter((value) => {
        if (
          value.username.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          searchUserList.push(value);
        }
      });
      setSearchUserList(searchUserList);
    } else {
      setSearchUserList([]);
    }
    setSearch(e.target.value);
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
          <SearchInput value={search} handle={handleSearch} />
          <div className="h-[40vh]  overflow-y-auto ">
            {requestList.length ? (
              searchUserList.length ? (
                requestList.map(
                  (reqId) =>
                    reqId.receiver === currentUser.uid &&
                    searchUserList.map(
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
                              <h4
                                className="w-full text-center text-white rounded-md bg-primary"
                                onClick={() =>
                                  handleConfirm(reqId.key, val.userId)
                                }
                              >
                                confirm
                              </h4>
                              <h4 onClick={() => HandleCancel(reqId.key)}>
                                cancel
                              </h4>
                            </div>
                          </PeopleLayout>
                        )
                    )
                )
              ) : (
                requestList.map(
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
                              <h4
                                className="w-full text-center text-white rounded-md bg-primary"
                                onClick={() =>
                                  handleConfirm(reqId.key, val.userId)
                                }
                              >
                                confirm
                              </h4>
                              <h4 onClick={() => HandleCancel(reqId.key)}>
                                cancel
                              </h4>
                            </div>
                          </PeopleLayout>
                        )
                    )
                )
              )
            ) : (
              <NoData text="no Friend Requests" />
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
          <SearchInput value={search} handle={handleSearch} />
          <div className="h-[40vh]  overflow-y-auto ">
            {requestList.length ? (
              searchUserList.length ? (
                requestList.map(
                  (reqId) =>
                    reqId.sender === currentUser.uid &&
                    searchUserList.map(
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
                )
              ) : (
                requestList.map(
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
                )
              )
            ) : (
              <NoData text="No sent Requests" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRequest;
