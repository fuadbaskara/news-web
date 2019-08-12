import * as constants from "../constants/mainConstant.js";
import initialState from "../initialState/mainState.js";

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_TOP_HEADLINES:
      return state.set("headlines", action.payload.headlines);
    case constants.SET_NEWS:
      return state.set("news", action.payload.news);
    case constants.SET_POPULAR_NEWS:
      return state.set("popularNews", action.payload.popularNews);
    case constants.SET_CURRENT_PAGE_SEARCH:
      return state.set("currentPageSearch", action.payload.currentPageSearch);
    case constants.SET_CURRENT_PAGE_HOME:
      return state.set("currentPageHome", action.payload.currentPageHome);
    case constants.SET_FEATURED_NEWS:
      return state.set(
        "featuredPopularNews",
        action.payload.featuredPopularNews
      );
    case constants.SET_SEARCH_NEWS:
      return state.set("searchResult", action.payload.searchResult);
    case constants.SET_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};
