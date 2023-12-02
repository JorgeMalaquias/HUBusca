import { combineReducers } from "redux";
import usersReducer from "./users/slice";

const rootReducer = combineReducers({ usersReducer });

export default rootReducer;
