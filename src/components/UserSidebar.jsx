import React, { useEffect, useState } from "react";
import NoData from "./layouts/NoData";
import PeopleLayout from "./layouts/PeopleLayout";
import Message from "./Message";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import SearchInput from "./layouts/SearchInput";
import Input from "./layouts/Input";
const UserSidebar = () => {
  return <div>UserSidebar</div>;
};

export default UserSidebar;
