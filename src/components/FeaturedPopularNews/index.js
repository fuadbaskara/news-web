import React, { Component } from "react";
import "../../assets/styles/PopularNews.css";
import SideNewsCard from "../SideNewsCard";

class FeaturedPopularNews extends Component {
  render() {
    const { articles } = this.props.featuredPopularNews;
    return (
      <div className="popular-news">
        <div className="popular-news__title-outer-wrapper">
          <h4 className="popular-news__title-inner-wrapper">
            <span className="popular-news__title">Featured Popular News</span>
          </h4>
        </div>
        {<SideNewsCard articles={articles} />}
      </div>
    );
  }
}

export default FeaturedPopularNews;
