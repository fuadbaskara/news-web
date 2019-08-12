import React, { Component } from "react";
import "../../assets/styles/NewsCard.css";
import moment from "moment";

class NewsCard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { articles } = this.props.searchResult;
    return (
      <div className="row news-card">
        {articles.map((item, index) => (
          <article className="col-md-6 section_margin" key={index}>
            <div className="wrap">
              <figure className="news-card__figure">
                <a className="news-card__img-link" href={item.url}>
                  <img
                    className="news-card__img"
                    src={item.urlToImage ? item.urlToImage : null}
                    alt=""
                  />
                </a>
              </figure>
            </div>
            <h3 className="news-card__title">
              <a className="news-card__title-link" href={item.url}>
                {item.title}
              </a>
            </h3>
            <div className="post_meta news-card__meta">
              <span className="meta_author_name news-card__meta-author">
                <a href={item.url} className="author news-card__author">
                  {item.author}
                </a>
              </span>
              <span className="meta_date news-card__meta-date">
                {moment(item.publishedAt).format("LL")}
              </span>
            </div>
            <p className="news-card__description">{item.description}</p>
          </article>
        ))}
      </div>
    );
  }
}

export default NewsCard;
