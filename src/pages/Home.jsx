import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Flex from "../components/layouts/Flex";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";
import Groups from "../components/Groups";
import Friends from "../components/Friends";
import People from "../components/People";
import FriendRequest from "../components/FriendRequest";
import BlockList from "../components/BlockList";

const Home = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.userLoginInfo.userLoginInfo);
  console.log(data);
  useEffect(() => {
    if (!data) {
      navigate("/singin");
    }
  }, [data]);

  return (
    <>
      <Flex className=" gap-x-6 overflow-y-clip">
        <Sidebar />
        <Flex className="py-6 w-[90%] flex-wrap justify-between">
          <Chats />
          <Groups />
          <Friends />
          <People />
          <FriendRequest />
          <BlockList />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
