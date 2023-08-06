import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import userMessageSlice from "../slices/userMessageSlice";
import groupMessageSlice from "../slices/groupMessageSlice";
export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
    userMessageInfo: userMessageSlice,
    groupMessageInfo: groupMessageSlice,
  },
});
