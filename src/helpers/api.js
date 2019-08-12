import QueryString from "query-string";
import API from "./baseAPI";

export default {
  getTopHeadlines: query =>
    API.get("/top-headlines?" + QueryString.stringify(query)),
  getEverything: query => API.get("/everything?" + QueryString.stringify(query))
};
