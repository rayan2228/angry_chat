import React from "react";
import Flex from "./Flex";
import Img from "./Img";

const PeopleLayout = ({
  name,
  src,
  children,
  active,
  classNameFlex,
  classNameHeading,
  handle,
}) => {
  return (
    <div
      onClick={handle}
      className={
        active ? "p-2 mt-2 rounded-md bg-[#5B5F7D] text-white" : "p-2 mt-2 rounded-md"
      }
    >
      <Flex className={`font-inter  items-center ${classNameFlex}`}>
        <Img src={src} className="w-[14%]" alt="chat" />
        <h3
          className={
            active
              ? `font-semibold text-lg text-white ${classNameHeading}`
              : `font-semibold text-lg  ${classNameHeading}`
          }
        >
          {name}
        </h3>
        {children}
      </Flex>
    </div>
  );
};

export default PeopleLayout;
