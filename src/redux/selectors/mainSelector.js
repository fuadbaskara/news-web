import { createSelector } from "reselect";

export const selectData = state => state => state.mainReducer;

export const getInitialState = () =>
  createSelector(
    selectData(),
    state => state
  );

export const getTopHeadlines = () =>
  createSelector(
    selectData(),
    state => state.get("headlines")
  );

export const getNews = () =>
  createSelector(
    selectData(),
    state => state.get("news")
  );

export const getPopularNews = () =>
  createSelector(
    selectData(),
    state => state.get("popularNews")
  );

export const getSearchResult = () =>
  createSelector(
    selectData(),
    state => state.get("searchResult")
  );

export const getFeaturedPopularNews = () =>
  createSelector(
    selectData(),
    state => state.get("featuredPopularNews")
  );

export const getCurrentPageSearch = () =>
  createSelector(
    selectData(),
    state => state.get("currentPageSearch")
  );

export const getCurrentPageHome = () =>
  createSelector(
    selectData(),
    state => state.get("currentPageHome")
  );
