import React, { Component } from "react";
import "../../assets/styles/PopularNews.css";
import SideNewsCard from "../SideNewsCard";
import SectionTitle from "../SectionTitle";

class FeaturedPopularNews extends Component {
  render() {
    const { articles } = this.props.featuredPopularNews;
    return (
      <div className="popular-news">
        <SectionTitle title={"Featured News"} />
        {<SideNewsCard articles={articles} />}
      </div>
    );
  }
}

export default FeaturedPopularNews;
