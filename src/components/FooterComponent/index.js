import React, { Component } from "react";
import "../../assets/styles/FooterComponent.css";

class FooterComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container footer">
        <div className="row">
          <div className="col-12 col-md-12 bottom-logo">
            <h1 className="logo">
              <a href="/">Q-News</a>
            </h1>
            <div className="footer__links">
              <ul>
                <li className="linkedin">
                  <a href="https://www.linkedin.com/in/fuad-baskara-b07ab7164/">
                    <i className="fa fa-linkedin" />
                  </a>
                </li>
                <li className="github">
                  <a href="https://github.com/fuadbaskara">
                    <i className="fa fa-github" />
                  </a>
                </li>
                <li className="facebook">
                  <a href="https://www.facebook.com/fuad.baskara">
                    <i className="fa fa-facebook" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-12 coppyright">
            {" "}
            <p>
              All data provided by{" "}
              <a href="https://newsapi.org/" title="NewsApi.org">
                newsApi.org
              </a>
            </p>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default FooterComponent;
