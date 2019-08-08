import { fromJS } from "immutable";

export default fromJS({
  jobTitle: "",
  city: "",
  pageTop: 1,
  pageBottom: 1,
  activeTab: "inbox",
  inbox: null,
  reviewed: null,
  unsuitable: null,
  data: null,
  alert: {
    message: 'lola',
    type: 'lalo'
  }
});
