import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const LoginReducer = createSlice({
  name: "Login",
  initialState,
  reducers: {
    defaultAction: (state, { payload }) => {
      console.log("LoginReducer state and payload", state, payload);
    },
  },
});

const { reducer, actions } = LoginReducer;
export const { defaultAction } = actions;
export default reducer;
