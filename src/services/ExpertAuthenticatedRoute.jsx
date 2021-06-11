import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Services from "./Services";

class ExpertAuthenticatedRoute extends Component {
  render() {
    if (Services.isExpertLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}
export default ExpertAuthenticatedRoute;
