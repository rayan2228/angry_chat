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
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import PeopleLayout from "./layouts/PeopleLayout";
import Option from "./layouts/option";
import NoData from "./layouts/NoData";
import { RxCross2 } from "react-icons/rx";
import Flex from "./layouts/Flex";
const MyGroups = () => {
  const storage = getStorage();
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const userRef = ref(db, "users/");
  const groupRef = ref(db, "groups/");
  const groupRequestRef = ref(db, "groupRequests/");
  const groupMemberRef = ref(db, "groupMembers/");
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [notShow, setNotShow] = useState(true);
  const [memberRequests, setMemberRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [groupRequestKey, setGroupRequestKey] = useState("");
  const [groupMemberKey, setGroupMemberKey] = useState("");

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      const users = [];
      snapshot.forEach((user) => {
        users.push({ ...user.val(), userId: user.key });
      });
      setUsers(users);
    });
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
    onValue(groupRef, (snapshot) => {
      const groups = [];
      snapshot.forEach((group) => {
        groups.push({ ...group.val(), key: group.key });
      });
      setGroups(groups);
    });
  }, []);
  const handleShowInfo = (key) => {
    setShowInfo(true);
    setShow(false);
    setNotShow(false);
    setGroupMemberKey(key);
    onValue(groupMemberRef, (snapshot) => {
      const members = [];
      snapshot.forEach((member) => {
        members.push({
          ...member.val(),
          memberKey: member.key,
        });
      });
      setMembers(members);
    });
  };
  const handleShow = (key) => {
    setShow(true);
    setNotShow(false);
    setShowInfo(false);
    setGroupRequestKey(key);
  };
  const HandleCancel = (id) => {
    remove(ref(db, "groupRequests/" + id));
  };
  const handleRemoveMember = (id) => {
    remove(ref(db, "groupMembers/" + id));
  };
  const handleDelete = (key) => {
    memberRequests.map((requests) => {
      if (requests.groupKey === key) {
        remove(ref(db, "groupRequests/" + requests.memberRequestKey));
      }
    });
    groups.map((group) => {
      if (group.key === key) {
        let reference = group.groupImg.split("%2F")[1].split("?")[0];
        const desertRef = storageRef(storage, `groupProfile/${reference}`);
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
          });
      }
    });
    remove(ref(db, "groups/" + key));
  };
  const handleApprove = (member) => {
    set(push(groupMemberRef), {
      groupKey: member.groupKey,
      adminId: member.adminId,
      groupName: member.groupName,
      groupTag: member.groupTag,
      groupImg: member.groupImg,
      memberId: member.requestId,
    }).then(() => {
      remove(ref(db, "groupRequests/" + member.memberRequestKey));
    });
  };
  return (
    <>
      {show && (
        <div className="w-1/3 p-4 duration-75 rounded-xl hover:shadow-primary_shadow ">
          <Flex className="relative items-center justify-between">
            <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
              member request
            </h2>
            <RxCross2
              className="absolute text-xl text-black cursor-pointer top-2 right-3"
              onClick={() => {
                setShowInfo(false), setShow(false), setNotShow(true);
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
                          onClick={() => handleApprove(memberRequest)}
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
      {showInfo && (
        <div className="w-1/3 p-4 duration-75 rounded-xl hover:shadow-primary_shadow ">
          <Flex className="relative items-center justify-between">
            <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
              group info
            </h2>
            <RxCross2
              className="absolute text-xl text-black cursor-pointer top-2 right-3"
              onClick={() => {
                setShowInfo(false), setShow(false), setNotShow(true);
              }}
            />
          </Flex>
          <SearchInput />
          <div className="h-[40vh]  overflow-y-auto ">
            {members.length ? (
              members.map(
                (member) =>
                  member.groupKey === groupMemberKey &&
                  users.map(
                    (user) =>
                      member.memberId === user.userId && (
                        <PeopleLayout
                          src={user.profile_picture}
                          name={user.username}
                          classNameFlex="gap-x-4"
                          classNameHeading="w-[75%]"
                          key={user.userId}
                        >
                          <p
                            className="font-inter font-normal text-lg capitalize text-white cursor-pointer w-[25%] bg-red-500 text-center rounded-md"
                            onClick={() => handleRemoveMember(member.memberKey)}
                          >
                            remove
                          </p>
                        </PeopleLayout>
                      )
                  )
              )
            ) : (
              <NoData text="no members" />
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
                        first="info"
                        second="requests"
                        third="delete"
                        handleFirst={() => handleShowInfo(group.key)}
                        handleSecond={() => handleShow(group.key)}
                        handleThird={() => handleDelete(group.key)}
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
