import React, { Component } from "react";
import "../../assets/styles/PopularNews.css";
import SideNewsCard from "../SideNewsCard";
// import moment from "moment";

class PopularNews extends Component {
  constructor() {
    super();
    this.state = {
      showUserMenu: false,
      dropdownOpen: false
    };
  }

  render() {
    const { articles } = this.props.popularNews;
    return (
      <div className="popular-news">
        <div className="popular-news__title-outer-wrapper">
          <h4 className="popular-news__title-inner-wrapper">
            <span className="popular-news__title">Popular News</span>
          </h4>
        </div>
        {<SideNewsCard articles={articles} />}
      </div>
    );
  }
}

export default PopularNews;
