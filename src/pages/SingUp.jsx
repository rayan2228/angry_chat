import React from "react";
import Flex from "../components/layouts/Flex";
import Input from "../components/layouts/Input";
import Checkbox from "../components/layouts/Checkbox";
import Button from "../components/layouts/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
const SingUp = () => {
  return (
    <>
      <Flex className="h-screen">
          <Flex className={"w-full lg:w-1/2 flex-col justify-center xl:pl-7 p-7  "}>
            <div>
              <h1 className="text-3xl font-bold font-inter text-primary">
                Welcome To <span>Chatt</span>
              </h1>
              <h2 className="mt-4 mb-6 text-2xl font-bold font-inter">
                Sign Up
              </h2>
              <Input type="text" placeholder="Name here" label="Full Name" />
              <Input type="email" placeholder="Enter your mail" label="email" />
              <div className="relative xl:w-[492px] w-full">
                <Input
                  type="password"
                  placeholder="Password"
                  label="Password"
                />
                <FiEyeOff className="absolute inline-block cursor-pointer right-4 top-14" />
              </div>
              <Checkbox
                label="Remember Me"
                className="flex items-center mt-4"
              />
              <Button text="Sign Up" />
              <p className="mt-6 text-base font-normal font-inter">
                Have an account?
                <a
                  href="#"
                  className="ml-2 text-base font-semibold font-inter text-primary"
                >
                  Sign in
                </a>
              </p>
            </div>
          </Flex>
        <div
          className="hidden w-1/2 h-screen bg-no-repeat bg-cover lg:block"
          style={{
            backgroundImage: `url(../assets/singupbg.webp)`,
          }}
        ></div>
      </Flex>
    </>
  );
};

export default SingUp;
