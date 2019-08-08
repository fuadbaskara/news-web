import * as constants from "../constants/alertConstant.js";

export function setAlert(data) {
  return { type: constants.SET_ALERT, payload: { data } };
}

export function setToInitialState() {
  return { type: constants.SET_ALERT_INITIAL_STATE };
}
