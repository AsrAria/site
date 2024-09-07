// MARK: imports
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import app from "reducers/app";
import user from "reducers/user";

const rootReducers = combineReducers({
  app,
  user,
  routerReducer
});
export default rootReducers;
