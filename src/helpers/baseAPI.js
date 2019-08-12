import axios from "axios";
import querystring from "qs";
import config from "../config.js";

const { BASE_URL, API_KEY } = config;

const api = axios.create({
  baseURL: BASE_URL,
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
    return Promise.reject(error);
  }
);

//response interceptors for handle errors

api.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
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
    api.defaults.headers["Authorization"] = `Bearer ${API_KEY}`;
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
    if (API_KEY) {
      api.defaults.headers["Authorization"] = `Bearer ${API_KEY}`;
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
