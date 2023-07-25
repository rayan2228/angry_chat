import { createSlice } from "@reduxjs/toolkit";

const userMessageSlice = createSlice({
  name: "userMessage",
  initialState: {
    userMessageInfo: JSON.parse(localStorage.getItem("userMessageInfo"))
      ? JSON.parse(localStorage.getItem("userMessageInfo"))
      : null,
  },
  reducers: {
    userMessageInfo: (state, actions) => {
      state.userMessageInfo = actions.payload;
    },
  },
});
export const { userMessageInfo } = userMessageSlice.actions;

export default userMessageSlice.reducer;
