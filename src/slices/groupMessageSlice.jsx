import { createSlice } from "@reduxjs/toolkit";

const groupMessageSlice = createSlice({
  name: "groupMessage",
  initialState: {
    userMessageInfo: JSON.parse(localStorage.getItem("groupMessageInfo"))
      ? JSON.parse(localStorage.getItem("groupMessageInfo"))
      : null,
  },
  reducers: {
    groupMessageInfo: (state, actions) => {
      state.groupMessageInfo = actions.payload;
    },
  },
});
export const { groupMessageInfo } = groupMessageSlice.actions;

export default groupMessageSlice.reducer;
