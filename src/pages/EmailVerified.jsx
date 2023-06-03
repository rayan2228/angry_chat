import React from "react";
import { Link } from "react-router-dom";
import Flex from "../components/layouts/Flex";

const EmailVerified = () => {
  return (
    <Flex className="flex-col items-center justify-center h-screen bg-primary gap-y-3">
      <h2 className="text-2xl font-semibold text-white capitalize font-inter">
        please verify your email
      </h2>
      <Link
        to={"/singin"}
        className="px-10 py-3 font-semibold text-white capitalize bg-black rounded-md font-inter"
      >
        singin
      </Link>
    </Flex>
  );
};

export default EmailVerified;
