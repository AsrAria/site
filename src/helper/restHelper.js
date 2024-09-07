// MARK: library imports
import axios from "axios";
import store from "store";
import config from "config";
import { toast } from "react-toastify";
// MARK: project imports
import { logout } from "actions/user.js";
import { getObject, putObject, getString } from "./storageHelper";

// MARK: axios

function createHeader(authenticated) {
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    "Cache-Control": "no-cache"
  };

  if (authenticated) {
    if (getSecretKey() !== null) {
      headers["Secret-Key"] = getSecretKey();
    } else if (getAccessToken() !== null) {
      headers["Access-Token"] = getAccessToken().accessToken;
    }
  }

  return headers;
}

function createAxiosInstance(authenticated) {
  var headers = createHeader(authenticated);
  return axios.create({
    baseURL: config.api.baseUrl,
    headers
  });
}

// MARK: token

function getSecretKey() {
  var secretKey = getString("secretKey");
  if (secretKey.length > 0) return secretKey;
  return null;
}

function setAccessToken(data) {
  var token = getObject("accessToken");
  token.accessToken = data.access_token;
  token.refreshToken = data.refresh_token;
  putObject("accessToken", token);
}

function getAccessToken() {
  var token = getObject("accessToken");
  if (
    token.accessToken === undefined ||
    token.accessToken.length === 0 ||
    token.refreshToken.length === 0
  )
    return null;
  return token;
}

// MARK: helpers

const startLoading = enableLoading => {
  if (enableLoading) {
    store.dispatch({ type: "ADD_LOADING", payload: {} });
  }
};

const stopLoading = (
  enableLoading,
  notification = { enable: false },
  statusCode,
  defaultMessage = null
) => {
  if (enableLoading) {
    store.dispatch({ type: "REMOVE_LOADING", payload: {} });
  }
  if (notification.enable) {
    for (var key in notification) {
      if (key === statusCode.toString()) {
        toast.error(notification[key]);
        return;
      }
    }
    if (defaultMessage !== null) toast.error(defaultMessage);
    else toast.error("Unfortunately, the operation failed.");
  }
};

const errorHandler = (
  error = {},
  requestData = {},
  successCallBack = () => {},
  errorCallBack = () => {},
  authenticated,
  enableLoading = true,
  notification = { enable: true },
  autoLogout
) => {
  if (!error.response) error.response = { status: 0 };

  if (authenticated && error.response.status === 401) {
    if (
      !refreshToken(
        requestData,
        successCallBack,
        errorCallBack,
        enableLoading,
        notification,
        autoLogout
      )
    ) {
      stopLoading(
        enableLoading,
        notification,
        error.response.status,
        error.response && error.response.data
          ? error.response.data["message_en"]
          : null
      );
      errorCallBack(error);
    }
  } else {
    stopLoading(
      enableLoading,
      notification,
      error.response.status,
      error.response && error.response.data
        ? error.response.data["message_en"]
        : null
    );
    errorCallBack(error);
  }
};

const refreshToken = (
  requestData,
  successCallBack,
  errorCallBack,
  enableLoading,
  notification,
  autoLogout
) => {
  var token = getAccessToken();
  if (token) {
    var data = {
      access_token: token.accessToken,
      refresh_token: token.refreshToken
    };
    createAxiosInstance(false)
      .post("user/token/refresh", data)
      .then(function(response) {
        setAccessToken(response.data);
        if (requestData) {
          createAxiosInstance(true)(requestData)
            .then(function(response) {
              successCallBack(response);
              stopLoading(enableLoading);
            })
            .catch(function(error) {
              errorCallBack(error);
              stopLoading(
                enableLoading,
                notification,
                error.response.status,
                error.response && error.response.data
                  ? error.response.data["message_en"]
                  : null
              );
            });
        }
      })
      .catch(function() {
        if (autoLogout) logout()();
      });
    return true;
  } else {
    if (autoLogout) logout()();
    return false;
  }
};

// MARK: requests

const request = (
  requestData,
  successCallBack = () => {},
  errorCallBack = () => {},
  authenticated = true,
  enableLoading = true,
  notification = { enable: true },
  autoLogout = true
) => {
  startLoading(enableLoading);
  createAxiosInstance(authenticated)(requestData)
    .then(function(response) {
      stopLoading(enableLoading);
      successCallBack(response);
    })
    .catch(error => {
      errorHandler(
        error,
        requestData,
        successCallBack,
        errorCallBack,
        authenticated,
        enableLoading,
        notification,
        autoLogout
      );
    });
  return true;
};

export const getRequest = (
  url = "",
  successCallBack = () => {},
  errorCallBack = () => {},
  authenticated = true,
  enableLoading = true,
  notification = { enable: true },
  autoLogout = true
) => {
  return request(
    {
      url: url,
      method: "get"
    },
    successCallBack,
    errorCallBack,
    authenticated,
    enableLoading,
    notification,
    autoLogout
  );
};

export const putRequest = (
  url = "",
  data = {},
  successCallBack = () => {},
  errorCallBack = () => {},
  authenticated = true,
  enableLoading = true,
  notification = { enable: true },
  autoLogout = true
) => {
  return request(
    {
      url: url,
      data: data,
      method: "put"
    },
    successCallBack,
    errorCallBack,
    authenticated,
    enableLoading,
    notification,
    autoLogout
  );
};

export const postRequest = (
  url = "",
  data = {},
  successCallBack = () => {},
  errorCallBack = () => {},
  authenticated = true,
  enableLoading = true,
  notification = { enable: true },
  autoLogout = true
) => {
  return request(
    {
      url: url,
      data: data,
      method: "post"
    },
    successCallBack,
    errorCallBack,
    authenticated,
    enableLoading,
    notification,
    autoLogout
  );
};

export const deleteRequest = (
  url = "",
  data = {},
  successCallBack = () => {},
  errorCallBack = () => {},
  authenticated = true,
  enableLoading = true,
  notification = { enable: true },
  autoLogout = true
) => {
  return request(
    {
      url: url,
      data: data,
      method: "delete"
    },
    successCallBack,
    errorCallBack,
    authenticated,
    enableLoading,
    notification,
    autoLogout
  );
};

// MARK: upload request

export const upload = (
  url = "/upload/image",
  file,
  type,
  successCallBack,
  errorCallBack = () => {}
) => {
  const data = new FormData();
  data.append("file", file);
  data.append("type", type);

  postRequest(
    url,
    data,
    response => {
      successCallBack(response.data);
    },
    errorCallBack
  );
};

// MARK: fetchs

export const downloadFile = (
  url = "",
  name = "file.txt",
  authenticated = true,
  successCallBack = null
) => {
  async function handler() {
    try {
      startLoading(true);
      const response = await fetch(url, {
        headers: createHeader(authenticated)
      });
      const blob = await response.blob();
      var reader = new FileReader();
      reader.onload = () => {};
      reader.readAsDataURL(blob);
      if (!successCallBack) {
        var link = document.createElement("a");
        if (name != null) {
          link.download = name;
        }
        link.href = window.URL.createObjectURL(blob);
        link.target = "_blank";
        link.click();
      } else {
        successCallBack(window.URL.createObjectURL(blob));
      }
      stopLoading(true);
    } catch (error) {
      stopLoading(true);
    }
  }
  handler();
};

export const downloadBody = (response, name, raw = false) => {
  var link = document.createElement("a");
  link.download = name;
  var blob = new Blob([raw ? response.data : JSON.stringify(response.data)], {
    type: "text/plain"
  });
  link.href = window.URL.createObjectURL(blob);
  link.target = "_blank";
  link.click();
};
