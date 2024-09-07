// MARK: library imports
import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
// project imports
import config from "./config.js";
import rootReducer from "./reducers/index";
import { getString, putString, getObject } from "helper/storageHelper.js";

// MARK: default state

putString("version", "2");

const defaultState = {
  app: {
    loading: 0
  },
  user: {
    email: getString("email"),
    profile: getObject("profile"),
    accessToken: getString("accessToken"),
    activateTTL: new Date(getObject("activateTTL"))
  }
};

// MARK:  apply middle wares

let middleware = {};
middleware = applyMiddleware(thunk);
if (config.debug.reduxLogger && process.env.NODE_ENV !== "production")
  middleware = applyMiddleware(thunk, logger);

// MARK: export

const store = createStore(rootReducer, defaultState, middleware);
export default store;
