import React, { Component } from "react";
import { Input, Label, Button, Form, FormGroup, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import Services from "./../services/Services.js";
import { LOCAL_URL } from "./../services/constant.js";
import LoadingComponent from "./LoadingComponent.jsx";
import firebase from "./../services/firebase";
class UserSignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      aadhar: "",
      password: "",
      cpassword: "",
      errorMessage: "",
      showLoading: false,
      showOtpPanel: false,
      otp: "",
      isVerified: false,
    };

    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.handleSendOtp = this.handleSendOtp.bind(this);
  }
  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        this.setState({ isVerified: true });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isVerified: false });
      });
  };
  handleSendOtp(e) {
    e.preventDefault();
    if (this.state.phone.length !== 10) {
      alert("Invalid Phone Number");
      return;
    }
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.phone;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        alert("OTP Sent");
        this.setState({ showOtpPanel: true });
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        alert("SMS not sent!!Please try after some time");
      });
  }
  handleUserSubmit(values) {
    values.preventDefault();
    let errorMessage = "";
    if (this.state.name === "") {
      errorMessage += "Invalid Full Name\n";
    }
    if (this.state.email === "") {
      errorMessage += "Invalid Email\n";
    }
    if (this.state.phone === "") {
      errorMessage += "Invalid Phone Number\n";
    }
    if (!this.state.isVerified) {
      errorMessage += "Phone Number is Not Verified\n";
    }
    if (this.state.aadhar.length < 12) {
      errorMessage += "Invalid Aadhar Number\n";
    }
    if (this.state.password === "" && this.state.cpassword === "") {
      errorMessage += "Invalid Password\n";
    }
    if (this.state.password !== this.state.cpassword) {
      errorMessage += "Password should match\n";
    }
    if (errorMessage !== "") {
      this.setState({ errorMessage: errorMessage });
      return;
    } else {
      const user = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        aadhar: this.state.aadhar,
        password: this.state.password,
        rating: 0,
        isActivated: false,
        activationCode: Services.generateActivationCode(),
      };
      this.setState({ showLoading: true });
      Services.addUser(user).then(
        (response) => {
          console.log(response);
          values.target.message.value =
            LOCAL_URL +
            "/user-email-verification/activating-account/" +
            user.activationCode;
          emailjs
            .sendForm(
              "service_jzbj4gb",
              "template_tl4pcoa",
              values.target,
              "user_p31RWvNCXxHcyhALlr3D1"
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );
          this.props.prop.history.push(`/accounts/activate-email`);
        },
        (error) => {
          console.log(error);
          this.setState({ showLoading: false });
          console.log(error);
        }
      );
    }
  }
  render() {
    return (
      <>
        {this.state.showLoading && <LoadingComponent></LoadingComponent>}
        {!this.state.showLoading && (
          <div id="userSignupComponent">
            {this.state.errorMessage && (
              <div
                className="alert alert-danger"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {this.state.errorMessage}
              </div>
            )}
            <Form onSubmit={this.handleUserSubmit}>
              <FormGroup row>
                <Label for="name" sm={3}>
                  Full Name
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Full Name Here"
                    onChange={(e) => {
                      this.setState({ name: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="email" sm={3}>
                  Email
                </Label>
                <Col sm={9}>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email Here"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <div id="sign-in-button"></div>
                <Label for="phone" sm={3}>
                  Mobile Number
                </Label>
                <Col sm={6}>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter Phone Number"
                    pattern="[0-9]{10}"
                    onChange={(e) => {
                      this.setState({ phone: e.target.value });
                      this.setState({ isVerified: false });
                    }}
                  />
                </Col>
                <Col sm={3}>
                  <Button
                    color="success"
                    onClick={this.handleSendOtp}
                    style={{
                      padding: 0,
                      margin: "0",
                      width: "80px",
                      height: "40px",
                    }}
                  >
                    send otp
                  </Button>
                </Col>
              </FormGroup>
              {this.state.showOtpPanel && (
                <FormGroup row>
                  <Label for="otp" sm={3}>
                    Enter OTP
                  </Label>
                  <Col sm={6}>
                    <Input
                      type="text"
                      name="otp"
                      id="otp"
                      placeholder="Enter OTP here"
                      onChange={(e) => {
                        this.setState({ otp: e.target.value });
                      }}
                    />
                  </Col>
                  <Col sm={3}>
                    <Button
                      color="success"
                      onClick={this.onSubmitOTP}
                      style={{
                        padding: 0,
                        margin: "0",
                        width: "80px",
                        height: "40px",
                      }}
                    >
                      Verify
                    </Button>
                  </Col>
                </FormGroup>
              )}
              <FormGroup row>
                <Label for="phone" sm={3}>
                  Aadhar Number
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name="aadhar"
                    id="aadhar"
                    placeholder="Enter Aadhar Number Here"
                    onChange={(e) => {
                      this.setState({ aadhar: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" sm={3}>
                  Password
                </Label>
                <Col sm={9}>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Don't tell to anyone"
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="cpassword" sm={3}>
                  Confirm Password
                </Label>
                <Col sm={9}>
                  <Input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="Don't tell to anyone"
                    onChange={(e) => {
                      this.setState({ cpassword: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <Row>
                <input type="hidden" name="message" />
              </Row>
              <Row>
                <Col>
                  <Button type="submit" color="success" sm={3}>
                    Signup
                  </Button>
                </Col>
                <Col sm={9}>
                  <p>
                    Already a member? <Link to="/login"> Login Here</Link>
                  </p>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </>
    );
  }
}
export default UserSignupComponent;
