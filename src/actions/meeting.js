// MARK: imports
import { upload, getRequest } from "helper/restHelper.js";

// MARK: api

export const BASE_URL = "/meeting";

// MARK: file api

export const UPLOAD_FILE_URL = BASE_URL + "/:id/file";

export const uploadFile = (id, file, successCallBack, errorCallBack) => {
  return function() {
    upload(
      UPLOAD_FILE_URL.replace(":id", id),
      file,
      "attachment",
      successCallBack,
      errorCallBack
    );
  };
};

// MARK: address api

export const ADDRESS_URL = BASE_URL + "/:id/address";

export const getAddress = (id, successCallBack, errorCallBack) => {
  return function() {
    getRequest(ADDRESS_URL.replace(":id", id), successCallBack, errorCallBack);
  };
};

// MARK: helper functsions

export const addToCalendar = meeting => {
  return function() {
    let id = meeting.id;
    let text = "Psykon meeting";
    let description = "Psykon meeting";
    let dates = (meeting.start_time + "/" + meeting.end_time)
      .replaceAll("-", "")
      .replaceAll(":", "");
    window.open(
      "https://calendar.google.com/calendar/u/0/r/eventedit" +
        "?text=" +
        text +
        "&dates=" +
        dates +
        "&ctz=UTC" +
        "&details=" +
        description +
        "&pli=1" +
        "&uid=" +
        id +
        "&sf=true",
      "_blank"
    );
  };
};
