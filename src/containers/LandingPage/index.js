import React, { Component } from "react";
import "../../assets/styles/LandingPage.css";
import "../../assets/styles/Pagination.css";
import ReactPaginate from "react-paginate";
import Slider from "../../components/Slider";
import CarouselShimmer from "../../components/CarouselShimmer";
import SectionTitle from "../../components/SectionTitle";
import RecentNewsShimmer from "../../components/RecentNewsShimmer";
import PopularNewsShimmer from "../../components/PopularNewsShimmer";
import PopularNews from "../../components/PopularNews";
import FeaturedPopularNews from "../../components/FeaturedPopularNews";
import RecentNews from "../../components/RecentNews";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as selectors from "../../redux/selectors/mainSelector.js";
import * as actions from "../../redux/actions/mainAction.js";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      headlines: {},
      totalPage: 0,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    let currentPage =
      this.props.getCurrentPageHome > 0 ? this.props.getCurrentPageHome : 1;
    let queryHeadlines = {
      category: "technology",
      page: currentPage
    };
    let queryNews = {
      q: "it",
      sortBy: "publishedAt",
      language: "en",
      pageSize: 10,
      page: currentPage
    };
    let queryPopular = {
      q: "it",
      pageSize: 10,
      sortBy: "popularity",
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
    this.getData(queryHeadlines, queryNews, queryPopular, queryFeatured);
  }

  getData = async (queryHeadlines, queryNews, queryPopular, queryFeatured) => {
    await this.props.dispatchChainActionHome(
      queryHeadlines,
      queryNews,
      queryPopular,
      queryFeatured
    );
    let totalPage = Math.ceil(this.props.getNews.totalResults / 10);
    this.setState({ totalPage: totalPage, loading: false });
  };

  scrollToTop = () => {
    let scrollTo = document.getElementsByClassName("recent-news")[0].offsetTop;
    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  };

  changePage = data => {
    this.setState({ loading: true });
    let page = data.selected + 1;
    this.props.setCurrentpageHome(page);
    this.getNewsPage(page);
    this.scrollToTop();
  };

  getNewsPage = page => {
    this.props
      .setNews({
        q: "it",
        pageSize: 10,
        page: page
      })
      .then(() => this.setState({ loading: false }));
  };

  render() {
    let headlines = this.props.getTopHeadlines.slides
      ? this.props.getTopHeadlines.slides
      : null;
    let news = this.props.getNews ? this.props.getNews : null;
    let popularNews = this.props.getPopularNews
      ? this.props.getPopularNews
      : null;
    let featuredPopularNews = this.props.getFeaturedPopularNews
      ? this.props.getFeaturedPopularNews
      : null;
    return (
      <section className="landing-page">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-8 recent-post">
              <SectionTitle title={"Top Headlines"} />
              {headlines && headlines.length > 1 ? (
                <div className="slider-section">
                  <Slider slides={headlines} interval={10} duration={0.8} />
                </div>
              ) : (
                <CarouselShimmer />
              )}
              <div style={{ marginTop: "45px" }}>
                {news &&
                news.articles &&
                news.articles.length > 1 &&
                this.state.loading === false ? (
                  <RecentNews news={news} />
                ) : (
                  <RecentNewsShimmer />
                )}
              </div>
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={this.state.totalPage}
                forcePage={
                  this.props.getCurrentPageHome > 0
                    ? this.props.getCurrentPageHome - 1
                    : 1
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
              className="col-xs-12 col-sm-12 col-md-4 sidebar"
              style={{
                position: "relative",
                overflow: "visible",
                boxSizing: "border-box",
                minHeight: "1px",
                borderLeft: "1px solid #eee"
              }}
            >
              {popularNews &&
              popularNews.articles &&
              popularNews.articles.length > 1 &&
              this.state.loading === false ? (
                <PopularNews popularNews={popularNews} />
              ) : (
                <PopularNewsShimmer />
              )}
              {featuredPopularNews &&
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
  getTopHeadlines: selectors.getTopHeadlines(),
  getNews: selectors.getNews(),
  getPopularNews: selectors.getPopularNews(),
  getFeaturedPopularNews: selectors.getFeaturedPopularNews(),
  getCurrentPageHome: selectors.getCurrentPageHome()
});

const mapDispatchToProps = dispatch => ({
  setToInitialState: () => dispatch(actions.setToInitialState()),
  setTopHeadlines: query => dispatch(actions.setTopHeadlines(query)),
  setNews: query => dispatch(actions.setNews(query)),
  setPopularNews: query => dispatch(actions.setPopularNews(query)),
  setCurrentpageHome: query => dispatch(actions.setCurrentpageHome(query)),
  setFeaturedPopularNews: query =>
    dispatch(actions.setFeaturedPopularNews(query)),
  dispatchChainActionHome: (
    queryHeadlines,
    queryNews,
    queryPopular,
    queryFeatured
  ) =>
    dispatch(
      actions.dispatchChainActionHome(
        queryHeadlines,
        queryNews,
        queryPopular,
        queryFeatured
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
