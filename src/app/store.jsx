import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import userMessageSlice from "../slices/userMessageSlice";
export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
    userMessageInfo: userMessageSlice,
  },
});
