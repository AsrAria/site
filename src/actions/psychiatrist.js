// MARK: imports
import { postRequest } from "helper/restHelper.js";

// MARK: api

export const BASE_URL = "/psychiatrist";

export const psychiatristCreateMeeting = (
  id,
  person,
  startTime,
  length,
  successCallBack,
  errorCallBack
) => {
  return function() {
    postRequest(
      BASE_URL + "/" + id + "/meeting",
      {
        person: person,
        start_time: startTime,
        length: length
      },
      response => {
        successCallBack(response.data);
      },
      () => {
        errorCallBack();
      },
      true,
      true,
      {
        enable: true
      }
    );
  };
};
