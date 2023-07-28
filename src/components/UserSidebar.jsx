import React, { useEffect, useState } from "react";
import NoData from "./layouts/NoData";
import PeopleLayout from "./layouts/PeopleLayout";
import Message from "./Message";
import {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
  push,
} from "firebase/database";
import SearchInput from "./layouts/SearchInput";
import Flex from "./layouts/Flex";
import Option from "./layouts/option";
import { useDispatch, useSelector } from "react-redux";
import { userMessageInfo } from "../slices/userMessageSlice";
const UserSidebar = () => {
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const activeMessage = useSelector(
    (state) => state.userMessageInfo.userMessageInfo
  );
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsKey, setFriendsKey] = useState([]);
  const [search, setSearch] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const userRef = ref(db, "users/");
  const friendRef = ref(db, "friends/");
  const blockRef = ref(db, "blocks/");
  const dispatch = useDispatch();
  useEffect(() => {
    onValue(userRef, (snapshot) => {
      const users = [];
      snapshot.forEach((user) => {
        users.push({ ...user.val(), userId: user.key });
      });
      setUsers(users);
    });
    onValue(friendRef, (snapshot) => {
      const friends = [];
      const friendsKey = [];
      snapshot.forEach((friend) => {
        friends.push(friend.val().conformerId + friend.val().requesterId);
        friendsKey.push(
          friend.key +
            "__" +
            friend.val().conformerId +
            "__" +
            friend.val().requesterId
        );
      });
      setFriends(friends);
      setFriendsKey(friendsKey);
    });
  }, []);
  const handleUnfriend = (unfriendKey) => {
    unfriendKey.map((key) => {
      if (key) {
        remove(ref(db, "friends/" + key.toString()));
      }
    });
  };
  const handleBlock = (blockKey, userId) => {
    blockKey.map((key) => {
      if (key) {
        remove(ref(db, "friends/" + key.toString()));
      }
    });
    set(push(blockRef), {
      currentUserId: currentUser.uid,
      blockId: userId,
    });
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
  const handleUserMessage = (selectUser) => {
    dispatch(userMessageInfo(selectUser));
    localStorage.setItem("userMessageInfo", JSON.stringify(selectUser));
  };
  return (
    <>
      <Flex className="h-screen flex-col py-[50px]  w-[400px]   border-r-2 border-[#D3D3D3] bg-[#FCFCFC] px-4 ml-6">
        <Flex className="items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
            Chats
          </h2>
        </Flex>
        <SearchInput value={search} handle={handleSearch} />
        {friends.length ? (
          searchUserList.length ? (
            searchUserList.map((user) =>
              friends.includes(currentUser.uid + user.userId) ||
              friends.includes(user.userId + currentUser.uid) ? (
                <PeopleLayout
                  src={user.profile_picture}
                  name={user.username}
                  classNameFlex="gap-x-4 cursor-pointer"
                  classNameHeading="w-[75%] text-white"
                  handle={() => handleUserMessage(user)}
                  key={user.userId}
                >
                  <Option
                    second="unfriend"
                    third="block"
                    handleSecond={() =>
                      handleUnfriend(
                        friendsKey.map(
                          (val) =>
                            val.split("__").includes(user.userId) &&
                            val.split("__")[0]
                        )
                      )
                    }
                    handleThird={() =>
                      handleBlock(
                        friendsKey.map(
                          (val) =>
                            val.split("__").includes(user.userId) &&
                            val.split("__")[0]
                        ),
                        user.userId
                      )
                    }
                  />
                </PeopleLayout>
              ) : (
                ""
              )
            )
          ) : (
            users.map((user) =>
              friends.includes(currentUser.uid + user.userId) ||
              friends.includes(user.userId + currentUser.uid) ? (
                <PeopleLayout
                  src={user.profile_picture}
                  name={user.username}
                  className="bg-[#5B5F7D]"
                  classNameFlex="gap-x-4 cursor-pointer "
                  classNameHeading={"w-[75%]" + " " + activeMessage.userId == user.uid ? "text-white" : ""}
                  handle={() => handleUserMessage(user)}
                  key={user.userId}
                >
                  <Option
                    second="unfriend"
                    third="block"
                    handleSecond={() =>
                      handleUnfriend(
                        friendsKey.map(
                          (val) =>
                            val.split("__").includes(user.userId) &&
                            val.split("__")[0]
                        )
                      )
                    }
                    handleThird={() =>
                      handleBlock(
                        friendsKey.map(
                          (val) =>
                            val.split("__").includes(user.userId) &&
                            val.split("__")[0]
                        ),
                        user.userId
                      )
                    }
                  />
                </PeopleLayout>
              ) : (
                ""
              )
            )
          )
        ) : (
          <NoData text="No Friends List" />
        )}
      </Flex>
      <Message status={"personal"} />
    </>
  );
};

export default UserSidebar;
