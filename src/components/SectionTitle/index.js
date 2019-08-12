import React, { Component } from "react";
import "../../assets/styles/SectionTitle.css";

class SectionTitle extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="news-section__title-outer-wrapper">
        <h4 className="news-section__title-inner-wrapper">
          <span className="news-section__title">{title}</span>
        </h4>
      </div>
    );
  }
}

export default SectionTitle;
