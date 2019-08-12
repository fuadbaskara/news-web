import React, { Component } from "react";
import moment from "moment";

class NewsCardLandscape extends Component {
  render() {
    const { articles } = this.props;
    return (
      <div>
        {articles.map((news, index) => (
          <article className="row recent-news__article-wrapper" key={index}>
            <div className="col-med-3">
              <figure className="recent-news__figure">
                <a href={news.url}>
                  <img
                    className="recent-news__img"
                    src={news.urlToImage}
                    alt=""
                  />
                </a>
              </figure>
            </div>
            <div className="col-med-9">
              <h3 className="recent-news__title">
                <a className="recent-news__link" href={news.url}>
                  {news.title}
                </a>
              </h3>
              <div className="post_meta recent-news__meta">
                <span className="meta_author_name recent-news__meta-author">
                  <a href={news.url} className="recent-news__author">
                    {news.author}
                  </a>
                </span>
                <div
                  style={{ marginTop: "3px" }}
                  className="recent-news__meta-date"
                >
                  <span className="recent-news__date">
                    {moment(news.publishedAt).format("LL")}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }
}

export default NewsCardLandscape;
