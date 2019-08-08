import * as constants from "../constants/candidateListConstant.js";
import initialState from "../initialState/candidateListState.js";

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_JOB_TITLE:
      return state.set("jobTitle", action.payload.jobTitle);
    case constants.SET_CITY:
      return state.set("city", action.payload.city);
    case constants.SET_PAGE_TOP:
      return state.set("pageTop", action.payload.page);
    case constants.SET_PAGE_BOTTOM:
      return state.set("pageBottom", action.payload.page);
    case constants.SET_ACTIVE_TAB:
      return state.set("activeTab", action.payload.activeTab);
    case constants.SET_INBOX:
      return state.set("inbox", action.payload.data);
    case constants.SET_REVIEWED:
      return state.set("reviewed", action.payload.data);
    case constants.SET_UNSUITABLE:
      return state.set("unsuitable", action.payload.data);
    case constants.SET_DATA:
      return state.set("data", action.payload.data);
    // case constants.SET_ALERT:
    //   return state.setIn(['alert', 'message'], action.payload.data.message)
    //               .setIn(['alert', 'type'], action.payload.data.type)
    case constants.SET_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};
