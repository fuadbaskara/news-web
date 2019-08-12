import React, { Component } from "react";
import "../../assets/styles/RecentNews.css";
import NewsCardLandscape from "../NewsCardLandscape";
import SectionTitle from "../SectionTitle";

class RecentNews extends Component {
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
