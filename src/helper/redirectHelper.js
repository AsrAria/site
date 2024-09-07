// MARK: imports
import { history } from "index.js";

// MARK: functions

export const redirectTo = path => {
  if (history.location.pathname !== path) history.push(path);
  return true;
};
