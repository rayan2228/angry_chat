import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import PeopleLayout from "./layouts/PeopleLayout";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
const People = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const dataFromLocal = JSON.parse(localStorage.getItem("userLoginInfo"));
  const [userList, setUserList] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [requestArr, setRequestArr] = useState([]);
  const [friendArr, setFriendArr] = useState([]);
  const [blockArr, setBlockArr] = useState([]);
  const [search, setSearch] = useState("");
  const db = getDatabase();
  const usersRef = ref(db, "users/");
  const reqRef = ref(db, "friendRequest/");
  const friendRef = ref(db, "friends/");
  const blockRef = ref(db, "blocks/");

  useEffect(() => {
    onValue(usersRef, (snapshot) => {
      let users = [];
      snapshot.forEach((user) => {
        if (dataFromLocal.uid != user.key) {
          users.push({ ...user.val(), userId: user.key });
        }
      });
      setUserList(users);
    });
    onValue(reqRef, (snapshot) => {
      const requestArr = [];
      snapshot.forEach((requests) => {
        requestArr.push(requests.val().senderId + requests.val().receiverId);
      });
      setRequestArr(requestArr);
    });
    onValue(friendRef, (snapshot) => {
      const friendArr = [];
      snapshot.forEach((friend) => {
        friendArr.push(friend.val().conformerId + friend.val().requesterId);
      });
      setFriendArr(friendArr);
    });
    onValue(blockRef, (snapshot) => {
      const blockArr = [];
      snapshot.forEach((blockedUser) => {
        blockArr.push(
          blockedUser.val().currentUserId + blockedUser.val().blockId
        );
      });
      setBlockArr(blockArr);
    });
  }, []);
  const handleAdd = (userId) => {
    set(push(ref(db, "friendRequest/")), {
      senderId: currentUser.uid,
      receiverId: userId,
    });
  };
  const handleSearch = (e) => {
    let searchUserList = [];
    if (e.target.value) {
      userList.filter((value) => {
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
    <div className="w-1/3 p-4 capitalize duration-75 rounded-xl hover:shadow-primary_shadow ">
      <h2 className="text-2xl font-semibold font-inter text-textColor">
        People
      </h2>
      <div className="relative mt-4 mb-5">
        <input
          type="search"
          className="w-full p-2 pl-[53px] rounded-md outline-none placeholder:font-inter placeholder:font-normal placeholder:text-sm placeholder:capitalize placeholder:text-secondaryTextColor border border-[#D3D3D3]"
          placeholder="search"
          value={search}
          onChange={handleSearch}
        />
        <BsSearch className="absolute top-[53%] left-7 translate-x-[-50%] translate-y-[-50%] text-2xl" />
      </div>
      <div className="h-[40vh] overflow-y-auto ">
        {searchUserList.length
          ? searchUserList.map(
              (user) =>
                !(
                  friendArr.includes(currentUser.uid + user.userId) ||
                  friendArr.includes(user.userId + currentUser.uid) ||
                  requestArr.includes(currentUser.uid + user.userId) ||
                  requestArr.includes(user.userId + currentUser.uid) ||
                  blockArr.includes(currentUser.uid + user.userId) ||
                  blockArr.includes(user.userId + currentUser.uid)
                ) && (
                  <PeopleLayout
                    src={user.profile_picture}
                    name={user.username}
                    classNameFlex="gap-x-4"
                    classNameHeading="w-[60%]"
                    key={user.userId}
                  >
                    <p
                      className="font-inter font-normal text-lg capitalize text-white cursor-pointer w-[24%] bg-primary text-center rounded-md"
                      onClick={() => handleAdd(user.userId)}
                    >
                      Add
                    </p>
                  </PeopleLayout>
                )
            )
          : userList.map(
              (user) =>
                !(
                  friendArr.includes(currentUser.uid + user.userId) ||
                  friendArr.includes(user.userId + currentUser.uid) ||
                  requestArr.includes(currentUser.uid + user.userId) ||
                  requestArr.includes(user.userId + currentUser.uid) ||
                  blockArr.includes(currentUser.uid + user.userId) ||
                  blockArr.includes(user.userId + currentUser.uid)
                ) && (
                  <PeopleLayout
                    src={user.profile_picture}
                    name={user.username}
                    classNameFlex="gap-x-4"
                    classNameHeading="w-[60%]"
                    key={user.userId}
                  >
                    <p
                      className="font-inter font-normal text-lg capitalize text-white cursor-pointer w-[24%] bg-primary text-center rounded-md"
                      onClick={() => handleAdd(user.userId)}
                    >
                      Add
                    </p>
                  </PeopleLayout>
                )
            )}
      </div>
    </div>
  );
};

export default People;
