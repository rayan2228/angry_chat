import React, { useEffect } from "react";
import Flex from "../components/layouts/Flex";
import Sidebar from "../components/Sidebar";
import Img from "../components/layouts/Img";
import { FiEdit } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineKey } from "react-icons/hi";
import { BsSun } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const currentUser = JSON.parse(localStorage.getItem("userLoginInfo"));
  const auth = getAuth();
  // navigate
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/singin");
    }
  }, [currentUser]);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("logout successfully ", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        localStorage.removeItem("userLoginInfo");
        setTimeout(() => {
          navigate("/singin");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <ToastContainer />
      <Flex className=" gap-x-6">
        <Sidebar />
        <Flex className="py-6 w-[90%] flex-col gap-y-16 h-screen">
          <h2 className="text-xl font-semibold font-inter">Settings</h2>
          <Flex className="justify-around">
            <div className="w-[48%] shadow-primary_shadow p-5 rounded-xl">
              <h2 className="text-lg font-semibold font-inter">
                Profile Setting
              </h2>
              <Flex className="items-center w-full mt-8 gap-x-2 border-b-2 border-[#D3D3D3] pb-8">
                <Img
                  src={currentUser ? currentUser.photoURL : ""}
                  alt="user"
                  className="w-[48px] "
                />
                <div className="w-[60%]">
                  <h2 className="text-base font-semibold font-inter ">
                    {currentUser ? currentUser.displayName : ""}
                  </h2>
                  <h5 className="text-xs font-normal capitalize font-inter">
                    Stay Safe Stay Home
                  </h5>
                </div>
                <p
                  className="w-[22%]  border-[2px] rounded-lg border-primary text-center py-3 cursor-pointer font-inter text-lg font-semibold text-[#32375C] capitalize"
                  onClick={handleLogout}
                >
                  log out
                </p>
              </Flex>
              <Flex className="flex-col mt-8 text-lg font-normal font-inter gap-y-7">
                <Flex className="items-center cursor-pointer gap-x-4">
                  <FiEdit className="text-2xl" />
                  <p>Edit Profile Info</p>
                </Flex>
                <Flex className="items-center cursor-pointer gap-x-4">
                  <CgProfile className="text-2xl" />
                  <p>Edit Profile Photo</p>
                </Flex>
              </Flex>
            </div>
            <div className="w-[48%] shadow-primary_shadow p-5 rounded-xl">
              <h2 className="text-lg font-semibold font-inter">
                Account Setting
              </h2>
              <Flex className="flex-col mt-8 text-lg font-normal font-inter gap-y-7">
                <Flex className="items-center cursor-pointer gap-x-4">
                  <HiOutlineKey className="text-2xl" />
                  <p>Change Password</p>
                </Flex>
                <Flex className="items-center cursor-pointer gap-x-4">
                  <BsSun className="text-2xl" />
                  <p>Theme</p>
                </Flex>
                <Flex className="items-center cursor-pointer gap-x-4">
                  <RiDeleteBin6Line className="text-2xl" />
                  <p>Delete Account</p>
                </Flex>
              </Flex>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Settings;
