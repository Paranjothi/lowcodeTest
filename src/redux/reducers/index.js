import { combineReducers } from "@reduxjs/toolkit";
import User from "./UserReducer";
import Login from "./LoginReducer";
export default combineReducers({
  Login,
  User
});