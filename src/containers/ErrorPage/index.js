import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Error.css";

class ErrorPage extends Component {
  constructor() {
    super();
    this.state = {
      error: {
        code: "500",
        message: "Oops! Something Went Wrong"
      }
    };
  }

  componentDidMount() {
    let errorMessage = JSON.parse(localStorage.getItem("error"));
    this.setState({
      error: {
        code:
          errorMessage && errorMessage.code ? String(errorMessage.code) : "404",
        message:
          errorMessage && errorMessage.message
            ? errorMessage.message
            : "Page Not Found"
      }
    });
  }

  render() {
    return (
      <div className="error-page-container container text-center">
        <h1>
          {this.state.error.message ? this.state.error.message : "Busted!"}
        </h1>
        <div className="error-code">
          <span>
            {this.state.error.code ? this.state.error.code.charAt(0) : "X"}
          </span>
          <span>
            {this.state.error.code ? this.state.error.code.charAt(1) : "X"}
          </span>
          <span>
            {this.state.error.code ? this.state.error.code.charAt(2) : "X"}
          </span>
        </div>
        <br />
        <br />
        {this.state.error.code === "404" ? (
          <p className="text-muted">
            Looks like the page you’re trying to visit a Page that doesn’t
            exist.
            <br />
            Please check the URL and try your luck again.
          </p>
        ) : this.state.error.code.charAt(0) === "5" ? (
          <p className="text-muted">
            Unfortunately the site is down for a bit of maintenance right now.
            <br />
            But soon we'll be up and the sun will shine again.
          </p>
        ) : this.state.error.code === "400" ? (
          <p className="text-muted">
            <strong>Bad Request Error.</strong>
            <br />
            Please check again your URL or what you're trying to do.
          </p>
        ) : (
          <p className="text-muted">
            <strong>Oops! something went Wrong.</strong>
            <br />
            Please check again your URL or what you're trying to do.
          </p>
        )}
        <br />
        {(this.state.error.code && this.state.error.code.charAt(0) === "4") ||
        (this.state.error.code && this.state.error.code.charAt(0) === "5") ? (
          <Link to="/">
            <button className="button-error">
              {this.state.error.code.charAt(0) === "4" ||
              this.state.error.code.charAt(0) === "5"
                ? "Back to Homepage"
                : ""}
            </button>
          </Link>
        ) : null}
      </div>
    );
  }
}

export default ErrorPage;
