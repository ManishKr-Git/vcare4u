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
        <div className="container mt-3">
          <div id="signup_header" className="mb-2">
            <span
              style={{
                position: "absolute",
                padding: "8px 54px 8px 58px",
                marginLeft: "15px",
                cursor: "pointer",
                color: this.state.userActive ? "white" : "black",
              }}
              onClick={this.handleUserSignup}
            >
              User Signup
            </span>
            <span
              style={{
                position: "absolute",
                padding: "8px 54px 8px 58px",
                marginLeft: "212px",
                cursor: "pointer",
                color: this.state.expertActive ? "white" : "black",
              }}
              onClick={this.handleExpertSignup}
            >
              Expert Signup
            </span>
          </div>
          {this.state.userActive && <UserSignupComponent prop={this.props} />}
          {this.state.expertActive && (
            <ExpertSignupComponent prop={this.props} />
          )}
        </div>
      </>
    );
  }
}
export default SignupComponent;
