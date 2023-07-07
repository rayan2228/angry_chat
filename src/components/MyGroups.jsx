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
const MyGroups = () => {
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  // const userRef = ref(db, "users/");
  const groupRef = ref(db, "groups/");
  // const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
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
  // console.log("groups", groups);
  return (
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
                  <Option first="requests" second="delete" />
                </PeopleLayout>
              )
          )
        ) : (
          <NoData text="create a new group" />
        )}
      </div>
    </div>
  );
};

export default MyGroups;
