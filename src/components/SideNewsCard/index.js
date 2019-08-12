import React, { Component } from "react";
import moment from "moment";

class SideNewsCard extends Component {
  render() {
    const { articles } = this.props;
    return (
      <div>
        {articles.slice(0, 5).map((item, index) => (
          <div className="popular-news__article-wrapper" key={index}>
            <div className="popular-news__article">
              <span className="vertical-align popular-news__article-index">
                {index + 1}.
              </span>
              <div className="popular-news__article-title">
                <a href={item.url}>
                  <strong>{item.title}</strong>
                </a>
                <p className="meta">
                  <span className="meta__item">
                    {moment(item.publishedAt).format("LL")}
                  </span>
                  {/*<span>{item.author}</span>*/}
                </p>
              </div>
              <figure className="popular-news__article-figure">
                <a href={item.url}>
                  <img
                    className="popular-news__article-img"
                    src={item.urlToImage}
                    alt=""
                  />
                </a>
              </figure>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default SideNewsCard;
