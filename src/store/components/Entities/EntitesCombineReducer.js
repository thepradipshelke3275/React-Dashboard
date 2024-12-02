import { combineReducers } from "redux";
import Users from "./usersSlice";

export const entitesReducer = combineReducers({
  users: Users,
});
