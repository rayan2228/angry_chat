import React from "react";
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
const Groups = ({ heading }) => {
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const groupRef = ref(db, "groups/");
  return (
    <div className="w-1/3 p-4 duration-75 rounded-xl hover:shadow-primary_shadow ">
      <h2 className="text-2xl font-semibold capitalize font-inter text-textColor">
        {heading}
      </h2>
      <SearchInput />
      <div className="h-[40vh]  overflow-y-auto ">
        <PeopleLayout
          // src={user.profile_picture}
          // name={user.username}
          classNameFlex="gap-x-4"
          classNameHeading="w-[75%]"
        >
          <Option
            first="requests"
            second="delete"
          />
        </PeopleLayout>
      </div>
    </div>
  );
};

export default Groups;
