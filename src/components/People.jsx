import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import PeopleLayout from "./layouts/PeopleLayout";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
const People = () => {
  const currentUser = JSON.parse(localStorage.getItem("userLoginInfo"));
  const [userList, setUserList] = useState([]);
  const [requestArr, setRequestArr] = useState([]);
  const [requestArrKey, setRequestArrKey] = useState(false);
  const db = getDatabase();
  const usersRef = ref(db, "users/");
  const reqRef = ref(db, "friendRequest/");

  useEffect(() => {
    onValue(usersRef, (snapshot) => {
      let users = [];
      snapshot.forEach((user) => {
        if (currentUser.uid != user.key) {
          users.push({ ...user.val(), userId: user.key });
        }
      });
      setUserList(users);
    });
  }, []);
  const handleAdd = (userId) => {
    set(push(ref(db, "friendRequest/")), {
      senderId: currentUser.uid,
      receiverId: userId,
    });
  };
  useEffect(() => {
    onValue(reqRef, (snapshot) => {
      const requestArr = [];
      // const requestArrKey = [];
      snapshot.forEach((requests) => {
        requestArr.push(
          {
            requestId: requests.val().receiverId + requests.val().senderId,
            requestKey: requests.key
          }
        );
        // requestArrKey.push(requests.key);
      });
      setRequestArr(requestArr);
      // requestArr.length ? setRequestArrKey(true) : setRequestArrKey(false);
      // setRequestArrKey(requestArrKey);
    });
  }, []);
  console.log(requestArr);
  const handleCancel = (array, id) => {
    // array.map((value) => {
    //   if (
    //     value.split("__").includes(currentUser.uid + id) ||
    //     value.split("__").includes(currentUser.uid + id)
    //   ) {
    //     remove(ref(db, "friendRequest/" + value.split("__")[1]));
    //   }
    // });
    // console.log("array", array, "id", id);
  };
  return (
    <div className="w-1/3 p-4 capitalize duration-75 rounded-xl hover:shadow-primary_shadow ">
      <h2 className="text-2xl font-semibold font-inter text-textColor">
        People
      </h2>
      <div className="relative mt-4 mb-5">
        <input
          type="search"
          name=""
          id=""
          className="w-full p-2 pl-[53px] rounded-md outline-none placeholder:font-inter placeholder:font-normal placeholder:text-sm placeholder:capitalize placeholder:text-secondaryTextColor border border-[#D3D3D3]"
          placeholder="search"
        />
        <BsSearch className="absolute top-[53%] left-7 translate-x-[-50%] translate-y-[-50%] text-2xl" />
      </div>
      <div className="h-[40vh] overflow-y-auto ">
        {userList.map((user) => (
          <PeopleLayout
            src={user.profile_picture}
            name={user.username}
            classNameFlex="gap-x-4"
            classNameHeading="w-[60%]"
            key={user.userId}
          >
{
  requestArr.map((value)=>{
    // console.log(((value.requestId == user.userId + currentUser.uid)||(value.requestId == currentUser.uid +user.userId)) ? "cancle" : "add");
    if (((value.requestId == user.userId + currentUser.uid)||(value.requestId == currentUser.uid +user.userId))) (
      <p
      className="font-inter font-normal text-lg capitalize text-white cursor-pointer w-[24%] bg-red-500 text-center rounded-md"
      onClick={() => handleCancel(requestArr, user.userId)}
    >
      cancel
    </p>
  )
  })
}
            {/* <p
              className="font-inter font-normal text-lg capitalize text-white cursor-pointer w-[24%] bg-red-500 text-center rounded-md"
              onClick={() => handleCancel(requestArr, user.userId)}
            >
              cancel
            </p>
            <p
              className="font-inter font-normal text-lg capitalize text-white cursor-pointer w-[24%] bg-primary text-center rounded-md"
              onClick={() => handleAdd(user.userId)}
            >
              Add
            </p> */}
          </PeopleLayout>
        ))}
      </div>
    </div>
  );
};

export default People;
