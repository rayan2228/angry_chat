import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userLoginInfo: localStorage.getItem("userLoginInfo")
      ? localStorage.getItem("userLoginInfo")
      : null,
  },
  reducers: {
    userLoginInfo: (state, actions) => {
      state.userLoginInfo = actions.payload;
    },
  },
});

export const { userLoginInfo } = userSlice.actions;

export default userSlice.reducer;
