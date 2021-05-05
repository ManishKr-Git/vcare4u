import React, { Component } from "react";
import UserSignupComponent from "./UserSignupComponent.jsx";
import ExpertSignupComponent from "./ExpertSignupComponent.jsx";
class SignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userActive: true,
      expertActive: false,
    };
    this.handleUserSignup = this.handleUserSignup.bind(this);
    this.handleExpertSignup = this.handleExpertSignup.bind(this);
  }
  handleUserSignup() {
    console.log(this.props);
    this.setState({ userActive: true });
    this.setState({ expertActive: false });
  }
  handleExpertSignup() {
    this.setState({ userActive: false });
    this.setState({ expertActive: true });
  }
  render() {
    return (
      <>
        <div id="signup_header">
          <button
            id="user"
            className="signupButton"
            onClick={this.handleUserSignup}
            style={{
              color: this.state.userActive ? "green" : "black",
              borderBottom: this.state.userActive ? "green solid 1px" : "none",
            }}
          >
            User Signup
          </button>
          <button
            id="expert"
            className="signupButton"
            onClick={this.handleExpertSignup}
            style={{
              color: this.state.expertActive ? "green" : "black",
              borderBottom: this.state.expertActive
                ? "green solid 1px"
                : "none",
            }}
          >
            Expert Signup
          </button>
        </div>
        {this.state.userActive && <UserSignupComponent prop={this.props} />}
        {this.state.expertActive && <ExpertSignupComponent prop={this.props} />}
      </>
    );
  }
}
export default SignupComponent;
