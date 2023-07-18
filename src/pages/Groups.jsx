import React from 'react'
import Flex from "../components/layouts/Flex";
import Sidebar from "../components/Sidebar";
import UserSidebar from '../components/UserSidebar';
const Groups = () => {
  return (
    <Flex className="h-screen ">
      <Sidebar />
      <UserSidebar/>
    </Flex>
  );
}

export default Groups