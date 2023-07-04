import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref as storeRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import Flex from "./Flex";
import { ThreeDots } from "react-loader-spinner";
import Input from "./Input";
const CreateGroup = ({ show }) => {
  const db = getDatabase();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const groupRef = ref(db, "groups/");
  const [createGroupShow, setCreateGroupShow] = useState(true);

  const [createGroup, setCreateGroup] = useState({
    groupName: "",
    groupTag: "",
  });
  const [groupImg, setGroupImg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSetGroup = (e) => {
    const updateValue = {
      ...createGroup,
      [e.target.name]: e.target.value,
    };
    setCreateGroup(updateValue);
  };
  const handleSetGroupImg = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();

    reader.onload = () => {
      setGroupImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const handleCreateGroup = () => {
    if (!createGroup.groupName || !createGroup.groupTag || !groupImg) {
      console.log(groupImg);
      setError("all field are required");
    } else {
      setLoading(true);
      const storage = getStorage();
      const storageRef = storeRef(storage, `groupProfile/${currentUser.uid}`);
      uploadString(storageRef, groupImg, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          set(push(groupRef), {
            groupName: createGroup.groupName,
            groupTag: createGroup.groupTag,
            adminId: currentUser.uid,
            groupImg: downloadURL,
          }).then(() => {
            setCreateGroupShow(false);
            setLoading(false);
            setCreateGroup({
              groupName: "",
              groupTag: "",
            });
          });
        });
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {createGroupShow && show && (
        <div className="w-screen h-screen  fixed bg-[rgba(50,55,92,0.35)] flex justify-center items-center z-10">
          <Flex className="w-[500px] bg-primary rounded-lg p-7 shadow-primary_shadow flex-col items-center gap-y-4">
            <div className="w-full text-white ">
              {error && (
                <p className="p-4 text-sm font-medium capitalize bg-red-500 rounded-md font-inter">
                  {error}
                </p>
              )}
              <Input
                inputClass="text-black rounded-md"
                type="text"
                label="Group Name"
                value={createGroup.groupName}
                name="groupName"
                handle={handleSetGroup}
              />
              <Input
                inputClass="text-black rounded-md"
                type="text"
                label="Group Tagline"
                value={createGroup.groupTag}
                name="groupTag"
                handle={handleSetGroup}
              />
              <div className="flex flex-col items-center justify-center w-full mt-5">
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
                    onChange={handleSetGroupImg}
                  />
                </label>
              </div>
            </div>
            {loading ? (
              <div className="flex items-center justify-center w-full py-3 mt-6 text-xl font-semibold bg-white rounded-md text-primary font-inter">
                <ThreeDots
                  height=""
                  width="80"
                  radius="9"
                  color="#32375C"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <button
                className="w-full py-2 text-lg font-semibold capitalize bg-white rounded-lg font-inter "
                onClick={handleCreateGroup}
              >
                create group
              </button>
            )}

            <button
              className="w-full py-2 text-lg font-semibold text-white capitalize bg-red-500 rounded-lg font-inter "
              onClick={() => {
                setCreateGroupShow(false),
                  setCreateGroup({
                    groupName: "",
                    groupTag: "",
                  }),
                  setError(""),
                  setLoading(false);
              }}
            >
              cancel
            </button>
          </Flex>
        </div>
      )}

    </>
  );
};

export default CreateGroup;
