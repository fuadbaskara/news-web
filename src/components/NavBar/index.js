import React, { Component } from "react";
import "../../assets/styles/NavBar.css";
// import jobIcon from "../../assets/images/job_icon.png";
// import avatar from "../../assets/images/img_avatar.png";
// import { statusCookie, removeCookie } from "../../helpers/helper.js";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as selectors from "../../redux/selectors/mainSelector";
import * as actions from "../../redux/actions/mainAction.js";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      showUserMenu: false,
      dropdownOpen: false
    };
  }

  render() {
    return (
      <div className="col-12 col-md-12 navigation-bar">
        <a
          href="#"
          role="button"
          className="burger-menu navigation-bar__burger-menu"
          style={{ outline: "none" }}
          onClick={() =>
            this.setState({
              dropdownOpen: !this.state.dropdownOpen
            })
          }
        >
          <span className="navigation-bar__text">MENU</span>
          <i className="fa fa-bars" />
        </a>
        <div
          className={
            this.state.dropdownOpen === true
              ? "expanded"
              : this.state.dropdownOpen === false
              ? "expandable"
              : ""
          }
        >
          <ul className="navigation-bar__main-menu">
            <li className="navigation-bar__list">
              <a href="/">Home</a>
            </li>
            <li className="navigation-bar__list">
              <a href="/search?q=bussiness">Bussiness</a>
            </li>
            <li className="navigation-bar__list">
              <a href="/search?q=technology">Technology</a>
            </li>
            <li className="navigation-bar__list">
              <a href="/search?q=economy">Economy</a>
            </li>
            <li className="navigation-bar__list">
              <a href="/search?q=sports">Sports</a>
            </li>
            <li className="navigation-bar__list">
              <a href="/search?q=entertainment">Entertainment</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getTopHeadlines: selectors.getTopHeadlines()
});

const mapDispatchToProps = dispatch => ({
  setToInitialState: () => dispatch(actions.setToInitialState()),
  setTopHeadlines: query => dispatch(actions.setTopHeadlines(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
