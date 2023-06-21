import React, { useState, useEffect } from "react";
import PeopleLayout from "./layouts/PeopleLayout";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import SearchInput from "./layouts/SearchInput";
const BlockList = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [blockList, setBlockList] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [search, setSearch] = useState("");
  const db = getDatabase();
  const blockRef = ref(db, "blocks/");
  const userRef = ref(db, "users/");
  useEffect(() => {
    onValue(blockRef, (snapshot) => {
      const blockList = [];
      snapshot.forEach((blocks) => {
        blockList.push({
          currentUserId: blocks.val().currentUserId,
          blockId: blocks.val().blockId,
          key: blocks.key,
        });
      });
      setBlockList(blockList);
    });
    onValue(userRef, (snapshot) => {
      const users = [];
      snapshot.forEach((user) => {
        users.push({ ...user.val(), userId: user.key });
      });
      setUsers(users);
    });
  }, []);
  const HandleUnblock = (key) => {
    remove(ref(db, "blocks/" + key));
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
    <div className="w-1/3 p-4 duration-75 rounded-xl hover:shadow-primary_shadow ">
      <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
        Block List
      </h2>
      <SearchInput value={search} handle={handleSearch} />
      <div className="h-[40vh]  overflow-y-auto ">
        {searchUserList.length
          ? blockList.map(
              (blocks) =>
                blocks.currentUserId === currentUser.uid &&
                searchUserList.map(
                  (val) =>
                    val.userId === blocks.blockId && (
                      <PeopleLayout
                        src={val.profile_picture}
                        name={val.username}
                        classNameFlex="gap-x-4"
                        classNameHeading="w-[55%]"
                        key={val.userId}
                      >
                        <p
                          className="text-lg font-normal text-center text-white capitalize bg-red-500 rounded-md cursor-pointer font-inter w-[30%]"
                          onClick={() => HandleUnblock(blocks.key)}
                        >
                          unblock
                        </p>
                      </PeopleLayout>
                    )
                )
            )
          : blockList.map(
              (blocks) =>
                blocks.currentUserId === currentUser.uid &&
                users.map(
                  (val) =>
                    val.userId === blocks.blockId && (
                      <PeopleLayout
                        src={val.profile_picture}
                        name={val.username}
                        classNameFlex="gap-x-4"
                        classNameHeading="w-[55%]"
                        key={val.userId}
                      >
                        <p
                          className="text-lg font-normal text-center text-white capitalize bg-red-500 rounded-md cursor-pointer font-inter w-[30%]"
                          onClick={() => HandleUnblock(blocks.key)}
                        >
                          unblock
                        </p>
                      </PeopleLayout>
                    )
                )
            )}
      </div>
    </div>
  );
};

export default BlockList;
