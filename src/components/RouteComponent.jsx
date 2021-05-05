import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignupComponent from "./SignupComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import ActivateUser from "./ActivateUser.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import LoginComponent from "./LoginComponent.jsx";
import UserSignupComponent from "./UserSignupComponent.jsx";
import ExpertSignupComponent from "./ExpertSignupComponent.jsx";
import HomeComponent from "./HomeComponent.jsx";
class RouteComponent extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <>
            <HeaderComponent />
            <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" exact component={LoginComponent} />
              <Route path="/home/:username" exact component={HomeComponent} />
              <Route path="/signup" exact component={SignupComponent} />
              <Route path="/user" exact component={UserSignupComponent} />
              <Route path="/expert" exact component={ExpertSignupComponent} />
              <Route
                path="/email-verification/activating-account/"
                exact
                component={LoginComponent}
              />
              <Route
                path="/emailVerification/activatingAccount/:activationCode"
                exact
                component={LoginComponent}
              />
              <Route
                path="/accounts/activate-email"
                exact
                component={ActivateUser}
              />
            </Switch>
            <FooterComponent />
          </>
        </Router>
      </div>
    );
  }
}
export default RouteComponent;
