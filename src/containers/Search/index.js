import React, { Component } from "react";
import "../../assets/styles/LandingPage.css";
import "../../assets/styles/Pagination.css";
import NewsCard from "../../components/NewsCard";
import PopularNews from "../../components/PopularNews";
import PopularNewsShimmer from "../../components/PopularNewsShimmer";
import CardNewsShimmer from "../../components/CardNewsShimmer";
import FeaturedPopularNews from "../../components/FeaturedPopularNews";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as selectors from "../../redux/selectors/mainSelector.js";
import * as actions from "../../redux/actions/mainAction.js";
import QueryString from "query-string";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      totalPage: 0,
      loading: null,
      query: ""
    };
  }

  componentDidMount() {
    let query = this.props.location.search
      ? QueryString.parse(this.props.location.search)
      : null;
    this.setState({ query: query, loading: true });
    let currentPage =
      this.props.getCurrentPageSearch > 0 ? this.props.getCurrentPageSearch : 1;
    let queryHeadlines = {
      category: "technology",
      page: currentPage
    };
    let querySearch = {
      q: query ? query.q : "it",
      pageSize: 10,
      language: "en",
      page: currentPage
    };
    let queryFeatured = {
      q: "it",
      pageSize: 10,
      domains: "nytimes.com",
      sortBy: "popularity",
      language: "en",
      page: currentPage
    };
    let queryPopular = {
      q: query !== null ? query.q : "it",
      pageSize: 10,
      sortBy: "popularity",
      page: currentPage
    };
    this.getData(querySearch, queryPopular, queryFeatured, queryHeadlines);
  }

  getData = async (
    querySearch,
    queryPopular,
    queryFeatured,
    queryHeadlines
  ) => {
    await this.props.dispatchChainActionPageSearch(
      querySearch,
      queryPopular,
      queryFeatured,
      queryHeadlines
    );
    let totalPage = Math.ceil(this.props.getSearchResult.totalResults / 10);
    this.setState({ totalPage: totalPage, loading: false });
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  changePage = data => {
    this.setState({ loading: true });
    let page = data.selected + 1;
    this.props.setCurrentpageSearch(page);
    this.getNewsPage(page);
    this.scrollToTop();
  };

  getNewsPage = page => {
    this.props
      .searchNews({
        q: this.state.query.q.q ? this.state.query.q.q : "it",
        pageSize: 10,
        page: page
      })
      .then(() => this.setState({ loading: false }));
  };

  render() {
    let searchResult = this.props.getSearchResult
      ? this.props.getSearchResult
      : null;
    let popularNews = this.props.getPopularNews
      ? this.props.getPopularNews
      : null;
    let featuredPopularNews = this.props.getFeaturedPopularNews
      ? this.props.getFeaturedPopularNews
      : null;
    return (
      <section className="padding-top">
        <div className="container">
          <div className="row">
            <div className=" col-small-12 col-med-8 recent-post">
              <div>
                {(searchResult !== null &&
                  searchResult.articles &&
                  searchResult.articles.length > 1 &&
                  this.state.loading === false) ||
                this.state.loading === false ? (
                  <NewsCard searchResult={searchResult} />
                ) : (
                  <CardNewsShimmer />
                )}
              </div>
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={
                  this.state.totalPage > 0 ? this.state.totalPage : 100
                }
                forcePage={
                  this.props.getCurrentPageSearch > 0
                    ? this.props.getCurrentPageSearch - 1
                    : 1 - 1
                }
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={this.changePage}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
            <aside
              className=" col-small-12 col-med-4 sidebar"
              style={{
                position: "relative",
                overflow: "visible",
                boxSizing: "border-box",
                minHeight: "1px"
              }}
            >
              {(popularNews !== null &&
                popularNews.articles &&
                popularNews.articles.length > 1 &&
                this.state.loading === false) ||
              this.state.loading === false ? (
                <PopularNews popularNews={popularNews} />
              ) : (
                <PopularNewsShimmer />
              )}
              {featuredPopularNews !== null &&
              featuredPopularNews.articles &&
              featuredPopularNews.articles.length > 1 &&
              this.state.loading === false ? (
                <FeaturedPopularNews
                  featuredPopularNews={featuredPopularNews}
                />
              ) : (
                <PopularNewsShimmer />
              )}
            </aside>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getSearchResult: selectors.getSearchResult(),
  getPopularNews: selectors.getPopularNews(),
  getFeaturedPopularNews: selectors.getFeaturedPopularNews(),
  getCurrentPageSearch: selectors.getCurrentPageSearch()
});

const mapDispatchToProps = dispatch => ({
  setToInitialState: () => dispatch(actions.setToInitialState()),
  setCurrentpageSearch: page => dispatch(actions.setCurrentpageSearch(page)),
  searchNews: query => dispatch(actions.searchNews(query)),
  setPopularNews: query => dispatch(actions.setPopularNews(query)),
  setFeaturedPopularNews: query =>
    dispatch(actions.setFeaturedPopularNews(query)),
  dispatchChainActionPageSearch: (
    querySearch,
    queryPopular,
    queryFeatured,
    queryHeadlines
  ) =>
    dispatch(
      actions.dispatchChainActionPageSearch(
        querySearch,
        queryPopular,
        queryFeatured,
        queryHeadlines
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
