// MARK: imports
import { toast } from "react-toastify";
import { postRequest, getRequest } from "helper/restHelper.js";

// MARK: api

export const BASE_URL = "/person";

export const submitTest = (id, choices, successCallBack) => {
  return function() {
    postRequest(
      BASE_URL + "/" + id + "/submit_test",
      {
        choices: choices
      },
      response => {
        toast.success("The test was successfully registered.");
        successCallBack(response.data.data);
      },
      () => {},
      true,
      true,
      {
        enable: true
      }
    );
  };
};

export const getPsychiatristSuggestion = (
  id,
  successCallBack,
  errorCallBack
) => {
  return function() {
    getRequest(
      BASE_URL + "/" + id + "/psychiatrist_suggestion",
      response => {
        successCallBack(response.data.list);
      },
      errorCallBack,
      true,
      true,
      {
        enable: true
      }
    );
  };
};

export const getMeetingSuggestion = (
  id,
  psychiatrist,
  startDate,
  endDate,
  length,
  successCallBack,
  errorCallBack
) => {
  return function() {
    getRequest(
      BASE_URL +
        "/" +
        id +
        "/meeting_suggestion" +
        "?psychiatrist=" +
        psychiatrist +
        "&start_date=" +
        startDate +
        "&end_date=" +
        endDate +
        "&length=" +
        length,
      response => {
        successCallBack(response.data.list);
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

export const personCreateMeeting = (
  id,
  psychiatrist,
  startTime,
  length,
  successCallBack,
  errorCallBack
) => {
  return function() {
    postRequest(
      BASE_URL + "/" + id + "/meeting",
      {
        psychiatrist: psychiatrist,
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
