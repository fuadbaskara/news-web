import React, { Component } from "react";
import "../../assets/styles/Header.css";
import "../../assets/styles/BreakingNews.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { createStructuredSelector } from "reselect";
import * as selectors from "../../redux/selectors/mainSelector";
import * as actions from "../../redux/actions/mainAction.js";
import NavBar from "../NavBar";

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showUserMenu: false,
      dropdownOpen: false,
      keyword: ""
    };
  }

  submitSearch(e) {
    if (e.key === "Enter") {
      console.log(this.context);
      // this.context.router.history.push("/?q=" + this.state.keyword);
      // this.context.router.history.replace("/search?q=" + this.state.keyword);
      window.location = "/search?q=" + this.state.keyword;
    }
  }

  render() {
    let headlines = this.props.getTopHeadlines.slides
      ? this.props.getTopHeadlines.slides
      : null;
    console.log(headlines);
    return (
      <div className="header-container">
        <div className="header-container__outer container">
          <div className="top_bar margin-15">
            <div className="row">
              <div className="col-md-6 col-sm-12 time">
                <span className="top-logo">Q-NEWS</span>
                <i className="fa fa-clock-o" />
                <span className="current-date">
                  {moment(new Date()).format("LL")}
                </span>
              </div>
              <div className="col-md-6 col-sm-12 social">
                <input
                  type="search"
                  placeholder="Search …"
                  className="search-field"
                  value={this.state.keyword}
                  onChange={event =>
                    this.setState({ keyword: event.target.value })
                  }
                  onKeyUp={event => this.submitSearch(event)}
                />
                <div className="top-search">
                  <i className="fa fa-search" />
                  <span>SEARCH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-0">
          <div className="col-sm-12 col-md-12 p-0">
            <div className="newsTicker">
              <p>
                {headlines &&
                  headlines.length > 1 &&
                  headlines.map((item, index) => (
                    <a href={item.url} key={index}>
                      <span className="date">
                        {moment(item.publishedAt).format("LL")}
                      </span>
                      <span className="story">{item.hero}</span>
                    </a>
                  ))}
              </p>
            </div>
            <NavBar />
          </div>
        </div>
      </div>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  getTopHeadlines: selectors.getTopHeadlines()
});

const mapDispatchToProps = dispatch => ({
  setToInitialState: () => dispatch(actions.setToInitialState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
