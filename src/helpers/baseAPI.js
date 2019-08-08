import axios from "axios";
import querystring from "qs";
import config from "../config.js";
import * as Cookies from "js-cookie";

const { QREDENTIALS, BASE_URL } = config;

const api = axios.create({
  baseURL: QREDENTIALS,
  timeout: 50000,
  headers: {
    Accept: "application/json"
  },
  paramsSerializer: params => querystring.stringify(params)
});

//request interceptors for handle errors

api.interceptors.request.use(
  request => {
    // console.log('Starting Request ', request)
    return request;
  },
  function(error) {
    let isLoginPage = window.location.pathname === "/login";
    if (
      !isLoginPage &&
      error.response.data.code === 400 &&
      error.response.data.message !== "Token expired" &&
      error.response.data.message !== "Code is required"
    ) {
      let errorData = {
        code: error.response.data.code,
        message: error.response.data.message[0]
      };
      localStorage.setItem("error", JSON.stringify(errorData));
      window.location = "/error";
    } else if (
      !isLoginPage &&
      error.response.data.message[0] !== "Token expired" &&
      error.response.data.message[0] !== "Code is required"
    ) {
      if (!error.response.data.code || !error.response.data.message[0]) {
        let errorData = {
          code: error.response.status,
          message: error.response.statusText
        };
        localStorage.setItem("error", JSON.stringify(errorData));
        window.location = "/error";
      } else {
        let errorData = {
          code: null,
          message: "Oops! Something Wrong Happen"
        };
        localStorage.setItem("error", JSON.stringify(errorData));
        window.location = "/error";
      }
    }
    return Promise.reject(error);
  }
);

//response interceptors for handle errors

api.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    let isLoginPage = window.location.pathname === "/login";
    if (
      !isLoginPage &&
      error.response.data.code === 400 &&
      error.response.data.message[0] !== "Token expired" &&
      error.response.data.message[0] !== "Code is required"
    ) {
      let errorData = {
        code: error.response.data.code,
        message: error.response.data.message[0]
      };
      localStorage.setItem("error", JSON.stringify(errorData));
      window.location = "/error";
    } else if (
      !isLoginPage &&
      error.response.data.message[0] !== "Token expired" &&
      error.response.data.message[0] !== "Code is required"
    ) {
      if (!error.response.data.code || !error.response.data.message[0]) {
        let errorData = {
          code: error.response.status,
          message: error.response.statusText
        };
        localStorage.setItem("error", JSON.stringify(errorData));
        window.location = "/error";
      } else {
        let errorData = {
          code: null,
          message: "Oops! Something Wrong Happen"
        };
        localStorage.setItem("error", JSON.stringify(errorData));
        window.location = "/error";
      }
    }
    return Promise.reject(error);
  }
);

/*
  1.  define interceptors for errors console.log error ==> done
  2.  log error to sentry ==> process
*/

export default {
  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} param query params
   */
  get: (url, customConfig = {}) => {
    const token = Cookies.get("connect");
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    return api
      .get(url, {
        baseURL: BASE_URL,
        ...customConfig
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  },

  /**
   * @param {Sring} url '/path/to/endpoint'
   * @param {Object} json
   * @param {Object} reqConfig  custom config for request
   */
  post: (url, json = {}, reqConfig = {}) => {
    const token = Cookies.get("connect");
    const isNot = url !== "/v1/qjob/login ";
    if (token && isNot) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    api.defaults.headers["Content-Type"] = "application/json";
    const data = json;
    return api
      .post(url, data, {
        baseURL: BASE_URL,
        ...reqConfig
      })
      .then(response => Promise.resolve(response.data))
      .catch(err => Promise.reject(err));
  }
};
