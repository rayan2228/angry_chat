import React from "react";
import Flex from "../components/layouts/Flex";
import Sidebar from "../components/Sidebar";
import GroupSidebar from "../components/GroupSidebar";
const Groups = () => {
  return (
    <Flex className="h-screen gap-x-6">
      <Sidebar />
      <GroupSidebar />
    </Flex>
  );
};

export default Groups;
