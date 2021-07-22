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
import AllExpertComponent from "./AllExpertComponent.jsx";
import ExpertDetailsComponent from "./ExpertDetailsComponent";
import LogoutComponent from "./LogoutComponent";
import AboutComponent from "./AboutComponent";
import ContactUsComponent from "./ContactUsComponent";
import ProfileComponent from "./ProfileComponent";
import BookingsComponent from "./BookingsComponent";
import UserAuthenticatedRoute from "../services/UserAuthenticatedRoute";
import AppointmentSummery from "./AppointmentSummery.jsx";
import OrderPlaced from "./OrderPlaced.jsx";
import { SelectedCategoryExpert } from "./SelectedCategoryExpert.jsx";
class RouteComponent extends Component {
  render() {
    return (
      <Router>
        <>
          <HeaderComponent />
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/login" exact component={LoginComponent} />
            <UserAuthenticatedRoute
              Route
              path="/home/:username"
              exact
              component={HomeComponent}
            />
            <Route path="/expert-page" exact component={AllExpertComponent} />
            <Route
              path="/selectedCategory/:category"
              exact
              component={SelectedCategoryExpert}
            />
            <Route path="/home" exact component={HomeComponent} />
            <Route path="/signup" exact component={SignupComponent} />
            <Route path="/user" exact component={UserSignupComponent} />
            <Route path="/logout" exact component={LogoutComponent} />
            <Route path="/about" exact component={AboutComponent} />
            <Route path="/contactus" exact component={ContactUsComponent} />
            <Route path="/expert" exact component={ExpertSignupComponent} />
            <Route path="/profile" exact component={ProfileComponent} />
            <Route path="/bookings" exact component={BookingsComponent} />
            <UserAuthenticatedRoute
              Route
              path="/order-summary/ksuz2mc1d5xaf8h7lcdp4pzd5hyj05fkpl6r6031elpgn6tgpvsgs8w3b34cb26n/consultant-id/:expertId"
              exact
              component={AppointmentSummery}
            />
            <UserAuthenticatedRoute
              Route
              path="/order-placed/"
              exact
              component={OrderPlaced}
            />
            <UserAuthenticatedRoute
              Route
              path="/expert-page/ksuz2mc1d5xaf8h7lcdp4pzd5hyj05fkpl6r6031elpgn6tgpvsgs8w3b34cb26n/:expertId"
              exact
              component={ExpertDetailsComponent}
            />
            <Route
              path="/email-verification/activating-account/"
              exact
              component={LoginComponent}
            />
            <Route
              path="/expert-email-verification/activating-account/:activationCode"
              exact
              component={LoginComponent}
            />
            <Route
              path="/user-email-verification/activating-account/:activationCode"
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
    );
  }
}
export default RouteComponent;
