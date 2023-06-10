import React from "react";
import { Link } from "react-router-dom";

const SidebarButton = ({linkName,children,linkSrc,className}) => {

 
  return (
    <div className=" mt-8">
      <Link
        to={linkSrc}
        className={`flex items-center py-3 pl-3 text-lg font-semibold  gap-x-2 ${className}`}
      >
        {children}
        {linkName}
      </Link>
    </div>
  );
};

export default SidebarButton;
