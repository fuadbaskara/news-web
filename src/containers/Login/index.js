import React, { Component } from "react";
// import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import "../../assets/styles/Login.css";
import config from "../../config.js";
import api from "./../../helpers/api";
import Loading from "../../components/Loading";
import { setCookie, redirectTo, statusCookie, removeCookie } from "./../../helpers/helper";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as alertSelectors from "../../redux/selectors/alertSelector.js";
import * as alertActions from "../../redux/actions/alertAction.js";

const { DEVICE_ID, SOURCE } = config;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      cookie: null,
      password: "",
      username: "",
      deviceid: DEVICE_ID,
      source: SOURCE,
      isValidUsername: null,
      isValidPassword: null,
      errorUsername: "",
      errorPassword: "",
      isAutoLogin: false
    };
  }

  componentDidMount() {
    if (window.location.search.slice(1, 16) === "auto_login_code") {
      this.setState({
        isAutoLogin: true
      });
      const isActive = statusCookie("connect");
      if (isActive) {
        removeCookie('connect')
        this.setAutoLogin()
      }
    }
    window.addEventListener("beforeunload", () => {
      this.props.setAlert({
        message: "",
        type: ""
      });
    });
  }

  UNSAFE_componentWillUnmount() {
    this.props.setAlert({
      message: "",
      type: ""
    })
  }

  setAutoLogin = async () => {
    const isActive = statusCookie("connect");
    if (isActive) {
      removeCookie('connect')
    }
    await api
      .autoLogin({
        code: this.token
      })
      .then(response => {
        if (response.code === 200) {
          this.props.setAlert({
            message: "",
            type: ""
          });
          let token = response.data.token.slice(7);
          setCookie("connect", token, 7);
          this.authenticate = true;
          window.location = "/dashboard";
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            this.props.setAlert({
              message: error.response.data.message[0],
              type: "danger"
            });
          }
        }
      });
  };

  checkCookieStatus = () => {
    return statusCookie("connect");
  };

  async submitLogin(e) {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      deviceid: this.state.deviceid,
      source: this.state.source
    };
    await api
      .postLogin(data)
      .then(response => {
        // console.log(response)
        if (response.code === 200) {
          // console.log(response.data);
          this.props.setAlert({
            message: "",
            type: ""
          });
          let token = response.data.token.slice(7);
          setCookie("connect", token, 7);
          redirectTo("/dashboard");
        }
      })
      .catch(error => {
        if (error.response) {
          // console.log(error.response);
          if (error.response.status === 400) {
            if (error.response.data.message[0] === "Password Incorrect") {
              this.setState({
                isValidPassword: false,
                errorPassword: error.response.data.message[0]
              });
            } else {
              this.setState({
                isValidUsername: false,
                errorUsername: error.response.data.message[0]
              });
            }
          }
        }
      });
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="text-center">
          <Loading />
          <p>Loggin in, Please Wait...</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  getAlert: alertSelectors.selectAlert()
});

const mapDispatchToProps = dispatch => ({
  setToInitialState: () => dispatch(alertActions.setToInitialState()),
  setAlert: data => dispatch(alertActions.setAlert(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
