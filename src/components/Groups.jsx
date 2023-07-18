import React, { useEffect, useState } from "react";
import SearchInput from "./layouts/SearchInput";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import PeopleLayout from "./layouts/PeopleLayout";
import NoData from "./layouts/NoData";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import Flex from "./layouts/Flex";
const Groups = () => {
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const groupRef = ref(db, "groups/");
  const groupRequestRef = ref(db, "groupRequests/");
  const groupMemberRef = ref(db, "groupMembers/");
  const [groups, setGroups] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);
  const [groupRequestsCancel, setGroupRequestsCancel] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [sendGroupReq, setSendGroupReq] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    onValue(groupRef, (snapshot) => {
      const groups = [];
      snapshot.forEach((group) => {
        groups.push({ ...group.val(), key: group.key });
      });
      setGroups(groups);
    });
    onValue(groupRequestRef, (snapshot) => {
      const groupRequests = [];
      const groupRequestsCancel = [];
      snapshot.forEach((groupRequest) => {
        groupRequests.push(groupRequest.val().groupKey + currentUser.uid);
        groupRequestsCancel.push({
          ...groupRequest.val(),
          groupRequestKey: groupRequest.key,
        });
      });
      setGroupRequests(groupRequests);
      setGroupRequestsCancel(groupRequestsCancel);
    });
    onValue(groupMemberRef, (snapshot) => {
      const groupMembers = [];
      snapshot.forEach((groupMember) => {
        groupMembers.push(groupMember.val().groupKey + currentUser.uid);
      });
      setGroupMembers(groupMembers);
    });
  }, []);
  const handleJoin = (group) => {
    set(push(groupRequestRef), {
      groupKey: group.key,
      adminId: group.adminId,
      groupName: group.groupName,
      groupTag: group.groupTag,
      groupImg: group.groupImg,
      requestId: currentUser.uid,
      requestImg: currentUser.photoURL,
      requestName: currentUser.displayName,
    });
  };
  const handleCancel = (id) => {
    remove(ref(db, "groupRequests/" + id));
  };
  return (
    <>
      {!sendGroupReq && (
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
                  setSendGroupReq(true), setShow(false);
                }}
              >
                View Sended Group Requests
              </p>
            </div>
          )}
          <Flex className="items-center justify-between">
            <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
              groups
            </h2>
            <BsThreeDotsVertical
              className="cursor-pointer"
              onClick={() => setShow(true)}
            />
          </Flex>
          <SearchInput />
          <div className="h-[40vh]  overflow-y-auto ">
            {groups.length ? (
              groups.map(
                (group) =>
                  group.adminId != currentUser.uid &&
                  !(
                    groupRequests.includes(group.key + currentUser.uid) ||
                    groupRequests.includes(currentUser.uid + group.key) ||
                    groupMembers.includes(group.key + currentUser.uid) ||
                    groupMembers.includes(currentUser.uid + group.key)
                  ) && (
                    <PeopleLayout
                      src={group.groupImg}
                      name={group.groupName}
                      classNameFlex="gap-x-4"
                      classNameHeading="w-[75%]"
                      key={group.key}
                    >
                      <p
                        className="font-inter font-normal text-lg capitalize text-white cursor-pointer w-[24%] bg-primary text-center rounded-md"
                        onClick={() => handleJoin(group)}
                      >
                        join
                      </p>
                    </PeopleLayout>
                  )
              )
            ) : (
              <NoData text="no group to show" />
            )}
          </div>
        </div>
      )}
      {sendGroupReq && (
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
                  setSendGroupReq(false), setShow(false);
                }}
              >
                View Groups
              </p>
            </div>
          )}
          <Flex className="items-center justify-between">
            <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
              group requests
            </h2>
            <BsThreeDotsVertical
              className="cursor-pointer"
              onClick={() => setShow(true)}
            />
          </Flex>
          <SearchInput />
          <div className="h-[40vh]  overflow-y-auto ">
            {groupRequestsCancel.length ? (
              groupRequestsCancel.map(
                (group) =>
                  group.requestId === currentUser.uid && (
                    <PeopleLayout
                      src={group.groupImg}
                      name={group.groupName}
                      classNameFlex="gap-x-4"
                      classNameHeading="w-[75%]"
                      key={group.key}
                    >
                      <p
                        className="font-inter font-normal text-lg capitalize text-white cursor-pointer w-[24%] bg-red-500 text-center rounded-md"
                        onClick={() => handleCancel(group.groupRequestKey)}
                      >
                        cancel
                      </p>
                    </PeopleLayout>
                  )
              )
            ) : (
              <NoData text="no group to show" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Groups;
