import { combineReducers } from "redux";
import { loginReducer, planets } from "./reducers";
export default combineReducers({
  loginReducer,
  planets
});
