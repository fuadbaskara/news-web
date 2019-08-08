import { createSelector } from "reselect";

export const selectCandidateList = state => state => state.candidateListReducer;

export const getInitialState = () =>
  createSelector(
    selectCandidateList(),
    state => state
  );

export const getJobTitle = () =>
  createSelector(
    selectCandidateList(),
    state => state.get("jobTitle")
  );

export const getCity = () =>
  createSelector(
    selectCandidateList(),
    state => state.get("city")
  );

export const getPageTop = () =>
  createSelector(
    selectCandidateList(),
    state => state.get("pageTop")
  );

export const getPageBottom = () =>
  createSelector(
    selectCandidateList(),
    state => state.get("pageBottom")
  );

export const getActiveTab = () =>
  createSelector(
    selectCandidateList(),
    state => state.get("activeTab")
  );

export const getInbox = () =>
  createSelector(
    selectCandidateList(),
    state => state.get("inbox")
  );

export const getReviewed = () =>
  createSelector(
    selectCandidateList(),
    state => state.get("reviewed")
  );

export const getUnsuitable = () =>
  createSelector(
    selectCandidateList(),
    state => state.get("unsuitable")
  );

export const getData = () =>
  createSelector(
    selectCandidateList(),
    state => state.get("data")
  );

// export const getAlert = () =>
//   createSelector(
//     selectCandidateList(),
//     state => state.get("alert")
//   );
