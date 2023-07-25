import React from 'react'
import Flex from "../components/layouts/Flex";
import Sidebar from "../components/Sidebar";
import UserSidebar from '../components/UserSidebar';
const Chats = () => {
  return (
    <Flex className="h-screen gap-x-6">
      <Sidebar />
      <UserSidebar/>
    </Flex>
  )
}

export default Chats