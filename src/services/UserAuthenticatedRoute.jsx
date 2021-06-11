import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Services from "./Services";

class UserAuthenticatedRoute extends Component {
  render() {
    if (Services.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
export default UserAuthenticatedRoute;
