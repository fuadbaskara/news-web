import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import Search from "./containers/Search";
import Header from "./components/Header";
import ErrorPage from "./containers/ErrorPage";
import Footer from "./components/FooterComponent";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/search" component={Search} />
          <Route render={() => <Redirect to="/error" />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
