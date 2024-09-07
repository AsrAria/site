// MARK: imports
import store from "store";
import { toast } from "react-toastify";
import { redirectTo } from "helper/redirectHelper";
import {
  upload,
  getRequest,
  putRequest,
  postRequest
} from "helper/restHelper.js";
import {
  putObject,
  putString,
  removeObject,
  removeString
} from "helper/storageHelper.js";

// MARK: api

export const BASE_URL = "/user";

export const REGISTER_URL = BASE_URL + "/register";

export const register = (role, email, password) => {
  return function() {
    postRequest(
      REGISTER_URL,
      {
        role: role,
        email: email,
        password: password
      },
      response => {
        saveEmail(response.data);
        toast.success("Your registration was successful.");
      },
      () => {},
      false,
      true,
      {
        enable: true,
        400: "The password must be more than 8 characters long and consist of numbers or uppercase and lowercase English letters.",
        409: "The selected email is duplicate."
      }
    );
  };
};

export const AUTHENTICATE_URL = BASE_URL + "/activate/code";

export const login = (email, password) => {
  return function() {
    postRequest(
      AUTHENTICATE_URL,
      {
        email: email,
        password: password
      },
      response => {
        saveEmail(response.data);
        toast.success("An activation code has been sent to you.");
      },
      () => {},
      false,
      true,
      {
        enable: true,
        400: "The entered email or password is incorrect.",
        401: "The entered email or password is incorrect.",
        404: "The entered email or password is incorrect."
      }
    );
  };
};

export const ACTIVATE_URL = BASE_URL + "/activate";

export const activate = (email, code) => {
  return function() {
    postRequest(
      ACTIVATE_URL,
      {
        email: email,
        code: code
      },
      response => {
        saveAuthenticateInfo(response.data);
      },
      () => {},
      false,
      true,
      {
        enable: true,
        400: "The activation code entered is incorrect.",
        401: "The activation code entered is incorrect."
      }
    );
  };
};

export const UPDATE_PROFILE_URL = BASE_URL + "/:id";

export const updateProfile = (role, id, data) => {
  return function() {
    putRequest(
      (role === 0 ? "person" : role === 1 ? "psychiatrist" : "organization") +
        "/" +
        id,
      data,
      response => {
        setUserInfo(response.data);
        toast.success("Your account information was successfully updated.");
      },
      () => {},
      true,
      true,
      {
        enable: true,
        400: "The email you entered is incorrect."
      },
      false
    );
  };
};

export const GET_PROFILE_URL = BASE_URL + "/:id";

export const getProfile = (role, id) => {
  return function() {
    getRequest(
      (role === 0 ? "person" : role === 1 ? "psychiatrist" : "organization") +
        "/" +
        id,
      response => {
        setUserInfo(response.data);
      },
      () => {},
      true,
      true,
      {
        enable: false
      },
      false
    );
  };
};

export const CHANGE_PASSWORD_URL = BASE_URL + "/password";

export const changePassword = (oldPassword, newPassword) => {
  return function() {
    putRequest(
      CHANGE_PASSWORD_URL,
      {
        old_password: oldPassword,
        new_password: newPassword
      },
      () => {
        toast.success("Password changed successfully.");
        redirectTo("/");
      },
      () => {},
      true,
      true,
      {
        enable: true,
        400: "The password must be more than 8 characters long and consist of numbers or uppercase and lowercase English letters.",
        401: "Wrong password."
      },
      false
    );
  };
};

export const RECOVER_PASSWORD_URL = BASE_URL + "/password/recover";

export const recoverPassword = email => {
  return function() {
    postRequest(
      RECOVER_PASSWORD_URL,
      {
        email: email
      },
      () => {
        redirectTo("/");
        toast.success("A password change link will be sent to you.");
      },
      () => {},
      false,
      true,
      {
        enable: true,
        400: "The email you entered is incorrect.",
        404: "The email you entered is incorrect."
      },
      false
    );
  };
};

export const SET_PASSWORD_URL = BASE_URL + "/password/set";

export const setPassword = (token, password) => {
  return function() {
    postRequest(
      SET_PASSWORD_URL,
      {
        token: token,
        new_password: password
      },
      () => {
        redirectTo("/");
        toast.success("New password registered successfully.");
      },
      () => {},
      false,
      true,
      {
        enable: true,
        400: "The password must be more than 8 characters long and consist of numbers or uppercase and lowercase English letters.",
        401: "Password change token has expired. Start the password recovery process from the beginning."
      },
      false
    );
  };
};

export const logout = () => {
  return function() {
    localStorage.clear();
    deleteAuthenticateInfo();
    redirectTo("/login");
  };
};

export const UPLOAD_IMAGE_URL = BASE_URL + "/:id/image";

export const uploadImage = (id, file, type, successCallBack, errorCallBack) => {
  return function() {
    upload(
      UPLOAD_IMAGE_URL.replace(":id", id),
      file,
      type,
      successCallBack,
      errorCallBack
    );
  };
};

export const UPLOAD_FILE_URL = BASE_URL + "/:id/file";

export const uploadFile = (id, file, type, successCallBack, errorCallBack) => {
  return function() {
    upload(
      UPLOAD_FILE_URL.replace(":id", id),
      file,
      type,
      successCallBack,
      errorCallBack
    );
  };
};

export const PAYMENT_URL = BASE_URL + "/:id/pay";

export const increaseBalance = (id, amount) => {
  return function() {
    postRequest(
      PAYMENT_URL.replace(":id", id),
      {
        amount: amount
      },
      response => {
        window.location.href = response.data.url;
      },
      () => {},
      true,
      true,
      {
        enable: true
      },
      false
    );
  };
};

// MARK: storage handler

export const savePermissions = data => {
  return function() {
    putObject("permissions", data);
    store.dispatch({ type: "SET_PERMISSIONS", payload: data });
  };
};

const saveEmail = data => {
  var activateTTL = new Date(new Date().getTime() + data.activate_ttl * 1000);

  putString("email", data.email);
  putObject("activateTTL", activateTTL.getTime());

  store.dispatch({ type: "SET_EMAIL", payload: data.email });
  store.dispatch({
    type: "SET_ACTIVATE_TTL",
    payload: activateTTL
  });
};

const setUserInfo = user => {
  putObject("profile", user);
  putString("email", user.email);

  store.dispatch({ type: "SET_PROFILE", payload: user });
  store.dispatch({ type: "SET_EMAIL", payload: user.email });
};

export const deleteUserInfo = () => {
  removeObject("profile");
  removeString("email");

  store.dispatch({ type: "SET_PROFILE", payload: null });
  store.dispatch({ type: "SET_EMAIL", payload: "" });
};

const saveAuthenticateInfo = data => {
  setUserInfo(data.user);

  removeString("activateTTL");
  putObject("accessToken", {
    accessToken: data.access_token,
    refreshToken: data.refresh_token
  });

  store.dispatch({ type: "SET_ACCESS_TOKEN", payload: data.access_token });
  store.dispatch({ type: "SET_ACTIVATE_TTL", payload: null });
};

export const deleteAuthenticateInfo = () => {
  deleteUserInfo();

  removeObject("accessToken");
  removeString("activateTTL");

  store.dispatch({ type: "SET_ACCESS_TOKEN", payload: "" });
  store.dispatch({ type: "SET_ACTIVATE_TTL", payload: null });
};
