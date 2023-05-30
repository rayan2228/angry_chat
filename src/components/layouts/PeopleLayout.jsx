import React from "react";
import Flex from "./Flex";
import Img from "./Img";

const PeopleLayout = ({
  name,
  src,
  children,
  classNameFlex,
  classNameHeading,
}) => {
  return (
    <Flex className={`font-inter my-4 items-center ${classNameFlex}`}>
      <Img src={src} className="w-[14%]" alt="chat" />
      <h3 className={`font-semibold text-lg  ${classNameHeading}`}>{name}</h3>
      {children}
    </Flex>
  );
};

export default PeopleLayout;
