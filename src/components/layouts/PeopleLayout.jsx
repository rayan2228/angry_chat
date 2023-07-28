import React from "react";
import Flex from "./Flex";
import Img from "./Img";

const PeopleLayout = ({
  name,
  src,
  children,
  className,
  classNameFlex,
  classNameHeading,
  handle,
}) => {
  return (
    <div onClick={handle} className={`p-2 mt-2 rounded-md ${className}`}>
      <Flex className={`font-inter  items-center ${classNameFlex}`}>
        <Img src={src} className="w-[14%]" alt="chat" />
        <h3 className={`font-semibold text-lg  ${classNameHeading}  `}>
          {name}
        </h3>
        {children}
      </Flex>
    </div>
  );
};

export default PeopleLayout;
