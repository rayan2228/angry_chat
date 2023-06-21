import React, { useState, useEffect } from "react";
import PeopleLayout from "./layouts/PeopleLayout";
import Option from "./layouts/option";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import SearchInput from "./layouts/SearchInput";
const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsKey, setFriendsKey] = useState([]);
  const [search, setSearch] = useState("");
  const [searchUserList, setSearchUserList] = useState([]);
  const userRef = ref(db, "users/");
  const friendRef = ref(db, "friends/");
  const blockRef = ref(db, "blocks/");
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
    <div className="w-1/3 p-4 duration-75 rounded-xl hover:shadow-primary_shadow">
      <h2 className="text-2xl font-semibold font-inter text-textColor">
        Friend
      </h2>
      <SearchInput value={search} handle={handleSearch} />
      <div className="h-[40vh]  overflow-y-auto ">
        {searchUserList.length
          ? searchUserList.map((user) =>
              friends.includes(currentUser.uid + user.userId) ||
              friends.includes(user.userId + currentUser.uid) ? (
                <PeopleLayout
                  src={user.profile_picture}
                  name={user.username}
                  classNameFlex="gap-x-4"
                  classNameHeading="w-[75%]"
                  key={user.userId}
                >
                  <Option
                    handleUnfriend={() =>
                      handleUnfriend(
                        friendsKey.map(
                          (val) =>
                            val.split("__").includes(user.userId) &&
                            val.split("__")[0]
                        )
                      )
                    }
                    handleBlock={() =>
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
          : users.map((user) =>
              friends.includes(currentUser.uid + user.userId) ||
              friends.includes(user.userId + currentUser.uid) ? (
                <PeopleLayout
                  src={user.profile_picture}
                  name={user.username}
                  classNameFlex="gap-x-4"
                  classNameHeading="w-[75%]"
                  key={user.userId}
                >
                  <Option
                    handleUnfriend={() =>
                      handleUnfriend(
                        friendsKey.map(
                          (val) =>
                            val.split("__").includes(user.userId) &&
                            val.split("__")[0]
                        )
                      )
                    }
                    handleBlock={() =>
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
            )}
      </div>
    </div>
  );
};

export default Friends;
