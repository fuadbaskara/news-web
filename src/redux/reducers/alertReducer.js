import * as constants from "../constants/alertConstant.js";
import initialState from "../initialState/alertState.js";

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_ALERT:
      return state.setIn(['alert', 'message'], action.payload.data.message)
                  .setIn(['alert', 'type'], action.payload.data.type)
    case constants.SET_ALERT_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};
