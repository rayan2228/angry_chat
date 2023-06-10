import React, { useEffect, useState, createRef } from "react";
import Flex from "../components/layouts/Flex";
import Sidebar from "../components/Sidebar";
import Img from "../components/layouts/Img";
import { FiEdit } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineKey } from "react-icons/hi";
import { BsSun } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";
import Input from "../components/layouts/Input";
const Settings = () => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const [photoUploadShow, setPhotoUploadShow] = useState(false);
  const [updateUserDataShow, setUpdateUserDataShow] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const data = useSelector((state) => state.userLoginInfo.userLoginInfo);
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data) {
      navigate("/singin");
    }
  }, [data, currentUser]);
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

  // image crop
  const HandleImageUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `profilePic/${currentUser.uid}`);
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const profilePic = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, profilePic, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            dispatch(userLoginInfo(auth.currentUser))
            localStorage.setItem("userLoginInfo", JSON.stringify(auth.currentUser))
            setPhotoUploadShow(false);
            setImage("");
          });
        });
      });
    }
  };
  return (
    <>
      <ToastContainer />
      {photoUploadShow && (
        <div className="w-screen h-screen fixed bg-[rgba(50,55,92,0.35)] flex justify-center items-center">
          <Flex className="w-[500px] bg-primary rounded-lg p-7 shadow-primary_shadow flex-col items-center gap-y-4">
            {image ? (
              <div className="rounded-full overflow-hidden w-[100px] h-[100px]">
                <div className="w-full h-full overflow-hidden rounded-full img-preview" />
              </div>
            ) : (
              <Img
                src={currentUser ? currentUser.photoURL : ""}
                alt="user"
                className="w-[100px]"
              />
            )}

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-50 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={HandleImageUpload}
                />
              </label>
            </div>
            {image && (
              <div>
                <Cropper
                  ref={cropperRef}
                  style={{ height: 200, width: "100%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
              </div>
            )}
            <button
              className="w-full py-2 text-lg font-semibold capitalize bg-white rounded-lg font-inter "
              onClick={getCropData}
            >
              upload
            </button>
            <button
              className="w-full py-2 text-lg font-semibold text-white capitalize bg-red-500 rounded-lg font-inter "
              onClick={() => {
                setPhotoUploadShow(false), setImage("");
              }}
            >
              cancel
            </button>
          </Flex>
        </div>
      )}
      {updateUserDataShow && (
        <div className="w-screen h-screen fixed bg-[rgba(50,55,92,0.35)] flex justify-center items-center">
          <Flex className="w-[500px] bg-primary rounded-lg p-7 shadow-primary_shadow flex-col items-center gap-y-4">
            <div className="w-full text-white">
              <Input
                type="text"
                label="Edit Your Name"
                value={currentUser.displayName}
                inputClass="text-black"
              />
            </div>
            <button
              className="w-full py-2 text-lg font-semibold capitalize bg-white rounded-lg font-inter "
              onClick={getCropData}
            >
              upload
            </button>
            <button
              className="w-full py-2 text-lg font-semibold text-white capitalize bg-red-500 rounded-lg font-inter "
              onClick={() => {
                setUpdateUserDataShow(false);
              }}
            >
              cancel
            </button>
          </Flex>
        </div>
      )}
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
                  <p onClick={() => setUpdateUserDataShow(true)}>Edit Profile Info</p>
                </Flex>
                <Flex className="items-center cursor-pointer gap-x-4">
                  <CgProfile className="text-2xl" />
                  <p onClick={() => setPhotoUploadShow(true)}>
                    Edit Profile Photo
                  </p>
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
