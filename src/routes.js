import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import AuthCheck from "./authcheck";
import Login from "./containers/Login";
import Header from "./components/Header";
// import Dashboard from "./containers/Dashboard";
// import CandidateList from "./containers/CandidateList";
// import ProfileDetail from "./containers/ProfileDetail";
// import ResetPassword from "./containers/ResetPassword";
// import RequestReset from "./containers/RequestReset";
import ErrorPage from "./containers/ErrorPage";

// const DashboardPage = () => (
//   <div>
//     <Route exact path="/dashboard" component={Dashboard} />
//     <Route
//       exact
//       path="/dashboard/candidate-list/:job_id"
//       component={CandidateList}
//     />
//     <Route
//       path="/dashboard/candidate-list/:job_id/profile-detail/:referral_id"
//       component={ProfileDetail}
//     />
//   </div>
// );

export default class Routes extends Component {
  render() {
    return (
      <div style={{ marginTop: "100px" }}>
        <Header />
        <Switch>
          {/*<Route exact path="/" component={AuthCheck(Dashboard)} />*/}
          <Route path="/login" component={Login} />
          {/*<Route path="/dashboard" component={AuthCheck(DashboardPage)} />
          <Route path="/reset-password" component={RequestReset} />
          <Route
            path="/reset-password/:username/:token"
            component={ResetPassword}
          />
          <Route path="/error" component={ErrorPage} />
        <Route render={() => <Redirect to="/error" />} />*/}
        </Switch>
      </div>
    );
  }
}
