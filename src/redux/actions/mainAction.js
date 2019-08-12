import * as constants from "../constants/mainConstant.js";
import api from "../../helpers/api.js";

export function setToInitialState() {
  return { type: constants.SET_INITIAL_STATE };
}

export function setTopHeadlines(query) {
  return async dispatch => {
    try {
      let regExp = /\.(jpe?g|png|gif|bmp)$/i;
      const response = await api.getTopHeadlines(query);
      let headlines = {
        slides: []
      };
      for (let i = 0; i < response.articles.length; i++) {
        if (regExp.test(response.articles[i].urlToImage)) {
          headlines.slides.push({
            url: response.articles[i].url,
            publishedAt: response.articles[i].publishedAt,
            hero: response.articles[i].title,
            text: response.articles[i].description,
            image: response.articles[i].urlToImage
          });
        }
      }
      dispatch({
        type: constants.SET_TOP_HEADLINES,
        payload: {
          headlines: headlines.slides.length > 1 ? headlines : "No Data"
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setNews(query) {
  return async dispatch => {
    try {
      // let regExp = /\.(jpe?g|png|gif|bmp)$/i
      const response = await api.getEverything(query);
      let news = response;
      dispatch({
        type: constants.SET_NEWS,
        payload: {
          news: news ? news : "No Data"
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchNews(query) {
  return async dispatch => {
    try {
      const response = await api.getEverything(query);
      let news = response;
      dispatch({
        type: constants.SET_SEARCH_NEWS,
        payload: {
          searchResult: news ? news : "No Data"
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setPopularNews(query) {
  return async dispatch => {
    try {
      const response = await api.getEverything(query);
      let popularNews = response;
      dispatch({
        type: constants.SET_POPULAR_NEWS,
        payload: {
          popularNews: popularNews ? popularNews : "No Data"
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setCurrentpageSearch(page) {
  return async dispatch => {
    try {
      dispatch({
        type: constants.SET_CURRENT_PAGE_SEARCH,
        payload: {
          currentPageSearch: page ? page : 1
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setCurrentpageHome(page) {
  return async dispatch => {
    try {
      dispatch({
        type: constants.SET_CURRENT_PAGE_HOME,
        payload: {
          currentPageHome: page ? page : 1
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setFeaturedPopularNews(query) {
  return async dispatch => {
    try {
      // let regExp = /\.(jpe?g|png|gif|bmp)$/i
      const response = await api.getEverything(query);
      let featuredPopularNews = response;
      dispatch({
        type: constants.SET_FEATURED_NEWS,
        payload: {
          featuredPopularNews: featuredPopularNews
            ? featuredPopularNews
            : "No Data"
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function dispatchChainActionHome(
  queryHeadlines,
  queryNews,
  queryPopular,
  queryFeatured
) {
  return async dispatch => {
    dispatch(setTopHeadlines(queryHeadlines));
    dispatch(setPopularNews(queryPopular));
    dispatch(setNews(queryNews));
    dispatch(setFeaturedPopularNews(queryFeatured));
  };
}

export function dispatchChainActionPageSearch(
  querySearch,
  queryPopular,
  queryFeatured,
  queryHeadlines
) {
  return async dispatch => {
    dispatch(setTopHeadlines(queryHeadlines));
    dispatch(setPopularNews(queryPopular));
    await dispatch(searchNews(querySearch));
    await dispatch(setFeaturedPopularNews(queryFeatured));
  };
}
