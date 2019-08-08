import React, { Component } from "react";
import "../../assets/styles/Header.css";
import logo from "../../assets/images/logo.png";
import jobIcon from "../../assets/images/job_icon.png";
import avatar from "../../assets/images/img_avatar.png";
// import Alerts from "../Alerts/index.js";
// import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { statusCookie, removeCookie } from "../../helpers/helper.js";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as selectors from "../../redux/selectors/candidateListSelector";
import * as actions from "../../redux/actions/candidateListAction.js";
import * as alertSelectors from "../../redux/selectors/alertSelector.js";
import * as alertActions from "../../redux/actions/alertAction.js";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showUserMenu: false,
      dropdownOpen: false
    };
  }
  isLogin = false;

  UNSAFE_componentWillMount() {
    let path = window.location.pathname;
    if (path === "/login" && statusCookie("connect") === false) {
      this.isLogin = false;
    } else if (statusCookie("connect") === true) {
      this.isLogin = true;
    } else this.isLogin = false;
  }

  UNSAFE_componentWillUpdate() {
    let path = window.location.pathname;
    if (path === "/login" && statusCookie("connect") === false) {
      this.isLogin = false;
    } else if (statusCookie("connect") === true) {
      this.isLogin = true;
    } else this.isLogin = false;
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  logOut = () => {
    removeCookie("connect");
    this.removeError()
    this.props.setToInitialState();
    window.location = "/login";
  };

  removeError = () => {
    this.props.setAlert({
      message: '',
      type: ''
    })
    localStorage.removeItem('error')
  }

  render() {
    const { isLogin } = this;
    let alertMessage = "";
    let alertType = "";
    if (this.props.getAlert && this.props.getAlert.get("alert")) {
      alertMessage = this.props.getAlert.get("alert").get("message");
      alertType = this.props.getAlert.get("alert").get("type");
    }
    return (
      <div className="header-container__outer">
        {isLogin === true ? (
          <div className="header-container__inner">
            <div className="header-login d-flex justify-content-between">
              <div className="d-flex justify-content-start">
                <a href="/dashboard" onClick={() =>  this.removeError()}>
                  <img className="header-logo" src={logo} alt="Qjobs" />
                </a>
                <div className="job-nav-container">
                  <a href="/dashboard" onClick={() => this.removeError()}>
                    <img className="job-icon" src={jobIcon} alt="job-logo" />
                    <h5>
                      <strong className="cursor-pointer">Jobs</strong>
                    </h5>
                  </a>
                </div>
              </div>
              <div>
                {/*<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle
                    tag="span"
                    onClick={this.toggle}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                  >
                    <img
                      className="avatar cursor-pointer"
                      src={avatar}
                      alt="Avatar"
                      onClick={() =>
                        this.setState({
                          showUserMenu: !this.state.showUserMenu
                        })
                      }
                    />
                  </DropdownToggle>
                  <DropdownMenu className="user-menu">
                    <div className="menu-item" onClick={() => this.logOut()}>
                      <p className="cursor-pointer">Logout</p>
                    </div>
                  </DropdownMenu>
                </Dropdown>*/}
              </div>
            </div>
          </div>
        ) : (
          <div className="header-container__inner">
            <a href="/" onClick={() =>  this.removeError()}>
              <img className="header-logo" src={logo} alt="Qjobs" />
            </a>
          </div>
        )}
      {/*alertMessage && <Alerts message={alertMessage} type={alertType} />*/}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getInitialState: selectors.selectCandidateList(),
  getPageBottom: selectors.selectCandidateList(),
  getAlert: alertSelectors.selectAlert()
});

const mapDispatchToProps = dispatch => ({
  setToInitialState: () => dispatch(actions.setToInitialState()),
  setAlert: (data) => dispatch(alertActions.setAlert(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
