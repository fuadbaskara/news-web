import React, { Component } from "react";
import "../../assets/styles/RecentNews.css";
import NewsCardLandscape from "../NewsCardLandscape";
import SectionTitle from "../SectionTitle";
// import moment from "moment";

class RecentNews extends Component {
  constructor() {
    super();
    this.state = {
      showUserMenu: false,
      dropdownOpen: false
    };
  }

  render() {
    const { articles } = this.props.news;
    return (
      <div className="recent-news">
        <SectionTitle title={"Recent News"} />
        {<NewsCardLandscape articles={articles} />}
      </div>
    );
  }
}

export default RecentNews;
