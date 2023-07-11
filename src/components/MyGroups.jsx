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
import Option from "./layouts/option";
import NoData from "./layouts/NoData";
import { RxCross2 } from "react-icons/rx";
import Flex from "./layouts/Flex";
const MyGroups = () => {
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  // const userRef = ref(db, "users/");
  const groupRef = ref(db, "groups/");
  const groupRequestRef = ref(db, "groupRequests/");
  // const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [show, setShow] = useState(false);
  const [notShow, setNotShow] = useState(true);
  const [memberRequests, setMemberRequests] = useState([]);
  const [groupRequestKey, setGroupRequestKey] = useState("");

  useEffect(() => {
    // onValue(userRef, (snapshot) => {
    //   const users = [];
    //   snapshot.forEach((user) => {
    //     users.push({ ...user.val(), userId: user.key });
    //   });
    //   setUsers(users);
    // });
    onValue(groupRef, (snapshot) => {
      const groups = [];
      snapshot.forEach((group) => {
        groups.push({ ...group.val(), key: group.key });
      });
      setGroups(groups);
    });
  }, []);
  const handleShow = (key) => {
    setShow(true);
    setNotShow(false);
    setGroupRequestKey(key);
    onValue(groupRequestRef, (snapshot) => {
      const memberRequests = [];
      snapshot.forEach((memberRequest) => {
        memberRequests.push({
          ...memberRequest.val(),
          memberRequestKey: memberRequest.key,
        });
      });
      setMemberRequests(memberRequests);
    });
  };
  const HandleCancel = (id) => {
    remove(ref(db, "groupRequests/" + id));
  };
  return (
    <>
      {show && (
        <div className="w-1/3 p-4 duration-75 rounded-xl hover:shadow-primary_shadow ">
          <Flex className="items-center justify-between relative">
            <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
              member request
            </h2>
            <RxCross2
              className="absolute text-xl text-black cursor-pointer top-2 right-3"
              onClick={() => {
                setShow(false), setNotShow(true);
              }}
            />
          </Flex>
          <SearchInput />
          <div className="h-[40vh]  overflow-y-auto ">
            {memberRequests.length ? (
              memberRequests.map(
                (memberRequest) =>
                  memberRequest.groupKey === groupRequestKey && (
                    <PeopleLayout
                      src={memberRequest.requestImg}
                      name={memberRequest.requestName}
                      classNameFlex="gap-x-4"
                      classNameHeading="w-[75%]"
                      key={memberRequest.memberRequestKey}
                    >
                      <div className="font-inter font-normal text-lg capitalize text-textColor cursor-pointer flex-col flex items-center w-[30%]">
                        <h4
                          className="w-full text-center text-white rounded-md bg-primary"
                          onClick={() => handleConfirm(reqId.key, val.userId)}
                        >
                          approve
                        </h4>
                        <h4
                          onClick={() =>
                            HandleCancel(memberRequest.memberRequestKey)
                          }
                        >
                          cancel
                        </h4>
                      </div>
                    </PeopleLayout>
                  )
              )
            ) : (
              <NoData text="no member requests" />
            )}
          </div>
        </div>
      )}
      {notShow && (
        <div className="w-1/3 p-4 duration-75 rounded-xl hover:shadow-primary_shadow ">
          <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
            my groups
          </h2>
          <SearchInput />
          <div className="h-[40vh]  overflow-y-auto ">
            {groups.length ? (
              groups.map(
                (group) =>
                  group.adminId == currentUser.uid && (
                    <PeopleLayout
                      src={group.groupImg}
                      name={group.groupName}
                      classNameFlex="gap-x-4"
                      classNameHeading="w-[75%]"
                      key={group.key}
                    >
                      <Option
                        first="requests"
                        second="delete"
                        handleFirst={() => handleShow(group.key)}
                      />
                    </PeopleLayout>
                  )
              )
            ) : (
              <NoData text="create a new group" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyGroups;
