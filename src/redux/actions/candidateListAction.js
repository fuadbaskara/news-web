import * as constants from "../constants/candidateListConstant.js";

export function setToInitialState() {
  return { type: constants.SET_INITIAL_STATE };
}

export function setJobTitle(jobTitle) {
  return { type: constants.SET_JOB_TITLE, payload: { jobTitle } };
}

export function setCity(city) {
  return { type: constants.SET_CITY, payload: { city } };
}

export function setPageTop(page) {
  return { type: constants.SET_PAGE_TOP, payload: { page } };
}

export function setPageBottom(page) {
  return { type: constants.SET_PAGE_BOTTOM, payload: { page } };
}

export function setActiveTab(activeTab) {
  return { type: constants.SET_ACTIVE_TAB, payload: { activeTab } };
}

export function setInbox(data) {
  return { type: constants.SET_INBOX, payload: { data } };
}

export function setReviewed(data) {
  return { type: constants.SET_REVIEWED, payload: { data } };
}

export function setUnsuitable(data) {
  return { type: constants.SET_UNSUITABLE, payload: { data } };
}

export function setData(data) {
  return { type: constants.SET_DATA, payload: { data } };
}

// export function setAlert(data) {
//   return { type: constants.SET_ALERT, payload: { data } };
// }
