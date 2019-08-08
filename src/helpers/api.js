// import qs from 'qs';
import API from "./baseAPI";
import config from "../config.js";

const {
  QREDENTIALS
} = config;

export default {
  postLogin: loginData =>
    API.post("/qjob/login", loginData, {
      baseURL: QREDENTIALS
    }),
  autoLogin: loginData =>
    API.post("/qjob/auto_login", loginData, {
      baseURL: QREDENTIALS
    }),
  getJobList: (limit, page) =>
    API.get(`/client/list?limit=${limit ? limit : 10}&page=${page}`),
  getCandidateList: (id, reviewed, page, limit) =>
    API.get(
      `/candidate/screened/list?job_id=${id}${
        reviewed === true ? "&reviewed=true" : ""
      }&page=${page ? page : 1}${limit ? `&limit=${limit}` : "&limit=1"}`
    ),
  getUnsuitableList: (id, limit, page) =>
    API.get(
      `/candidate/not_suitable/list?job_id=${id}&limit=${
        limit ? limit : 10
      }&page=${page}`
    ),
  setInterviewOrUnsuitable: data => API.post("/candidate/status", data),
  getProfile: referral_id => API.get("/candidate/referral/" + referral_id),
  requestResetPassword: userName => API.post("/qjob/request/reset", userName),
  resetPassword: data => API.post("/qjob/reset", data)
};
