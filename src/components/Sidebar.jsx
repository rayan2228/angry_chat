import React from 'react'
import Img from './layouts/Img'
import SidebarButton from './layouts/SidebarButton';
import { AiTwotoneHome } from "react-icons/Ai";
const Sidebar = () => {
  return (
    <div className="w-[15%] h-screen  pt-[50px] pl-6  shadow-sm  shadow-shadow capitalize">
      <Img src="../../public/assets/logo.webp" alt="logo" />
      <SidebarButton/>
      <SidebarButton/>

    </div>
  );
}

export default Sidebar