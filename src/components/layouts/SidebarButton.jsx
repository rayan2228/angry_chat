import React from "react";

const SidebarButton = ({linkName,children}) => {
  return (
    <div className="w-[128px] mt-8">
      <a
        href=""
        className="flex items-center py-3 pl-3 text-lg font-semibold rounded-lg gap-x-2 text-fuchsia-50 bg-primary "
      >
        {children}
        {linkName}
      </a>
    </div>
  );
};

export default SidebarButton;
