import React, { Component } from "react";
import { Input, Label, Button, Form, FormGroup, Col, Row } from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import Services from "./../services/Services.js";
import emailjs from "emailjs-com";
import { LOCAL_URL } from "./../services/constant.js";
import LoadingComponent from "./LoadingComponent.jsx";
import firebase from "./../services/firebase";
class ExpertSignupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      aadhar: "",
      phone: "",
      password: "",
      cpassword: "",
      image: "",
      description: "",
      fees: "",
      isVerified: false,
      selctedExpertization: "",
      selctedSpecialization: "",
      occupations: [
        { value: "Doctor", label: "Doctor" },
        { value: "Engineer", label: "Engineer" },
        { value: "Lawyer", label: "Lawyers" },
        { value: "HR", label: "HR consulting" },
      ],
      specialization: {
        Doctor: [
          { value: "Anesthesiologists", label: "Anesthesiologists" },
          { value: "Cardiologists", label: "Cardiologists" },
          {
            value: "Colon and Rectal Surgeons",
            label: "Colon and Rectal Surgeons",
          },
          {
            value: "Audiologist",
            label: "Audiologist",
          },
          {
            value: "Dentist",
            label: "Dentist",
          },
          {
            value: "Gynaecologist",
            label: "Gynaecologist",
          },
        ],
        Engineer: [
          { value: "Electronic Engineer", label: "Electronic Engineer" },
          { value: "Mechanical Engineer", label: "Mechanical Engineer" },
          { value: "Computer Engineer", label: "Computer Engineer" },
          { value: "Chemical engineering", label: "Chemical engineering" },
          { value: "Civil engineering", label: "Civil engineering" },
        ],
        Lawyer: [
          {
            value: "Intellectual Property Lawyer",
            label: "Intellectual Property Lawyer",
          },
          { value: "Public Interest Lawyer", label: "Public Interest Lawyer" },
          { value: "Tax Lawyer", label: "Tax Lawyer" },
          { value: "Corporate Lawyer", label: "Corporate Lawyers" },
          { value: "Criminal Lawyer", label: "Criminal Lawyer" },
        ],
        HR: [
          {
            value: "Human resources assistant",
            label: "Human resources assistant",
          },
          {
            value: "Human resources specialist",
            label: "Human resources specialist",
          },
        ],
      },
    };
    this.handleExpertSubmit = this.handleExpertSubmit.bind(this);
    this.handleSendOtp = this.handleSendOtp.bind(this);
    this.validateAlphanumericPasswordCheck =
      this.validateAlphanumericPasswordCheck.bind(this);
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
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        this.setState({ isVerified: true });
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
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
  validateAlphanumericPasswordCheck(password) {
    let regex = /^[a-zA-Z0-9!@#$%^&()_+\-=[]{};':"\\|,.<>\/?]{8,}$/;
    return regex.test(password);
  }
  handleExpertSubmit(e) {
    e.preventDefault();
    let errorMessage = "";
    if (this.state.name === "") {
      errorMessage += "Invalid Name\n";
    }
    if (this.state.email === "") {
      errorMessage += "Invalid Email\n";
    }
    if (this.state.phone === "") {
      errorMessage += "Invalid Phone Number\n";
    }
    if (this.state.aadhar.length < 12) {
      errorMessage += "Invalid Aadhar Number\n";
    }
    if (this.state.password.length < 8) {
      errorMessage +=
        "Password length should be minimum 8 and should contain combination of alphabets,numbers and special characters!\n";
    }
    if (!this.validateAlphanumericPasswordCheck(this.state.passwordssword)) {
      errorMessage +=
        "Password length should be minimum 8 and should contain\n";
    }
    if (this.state.password === "" && this.state.cpassword === "") {
      errorMessage += "Invalid Password\n";
    }
    if (this.state.password !== this.state.cpassword) {
      errorMessage += "Password should match\n";
    }

    if (this.state.selctedExpertization === "") {
      errorMessage += "Choose a Expertization Field\n";
    }
    if (this.state.selctedSpecialization === "") {
      errorMessage += "Choose a Specialization Field\n";
    }
    if (this.state.fees === "") {
      errorMessage += "Enter price per appointment\n";
    }
    if (this.state.description === "") {
      errorMessage += "Provide a description about you\n";
    }
    if (this.state.image === "") {
      errorMessage += "An image of you can increase customer's trust\n";
    }
    if (errorMessage !== "") {
      this.setState({ errorMessage: errorMessage });
      return;
    }
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      aadhar: this.state.aadhar,
      password: this.state.password,
      expertization: this.state.selctedExpertization,
      specification: this.state.selctedSpecialization,
      description: this.state.description,
      fees: this.state.fees,
      image: null,
      activationCode: Services.generateActivationCode(),
    };
    const formData = new FormData();
    formData.append("expert", JSON.stringify(data));
    formData.append("image", this.state.image);
    console.log(data);
    this.setState({ showLoading: true });
    Services.addExpert(formData).then(
      (response) => {
        e.target.image.value = null;
        e.target.phone.value = null;
        e.target.aadhar.value = null;
        e.target.description.value = null;

        e.target.message.value =
          LOCAL_URL +
          "/expert-email-verification/activating-account/" +
          data.activationCode;
        emailjs
          .sendForm(
            "service_jzbj4gb",
            "template_tl4pcoa",
            e.target,
            "user_p31RWvNCXxHcyhALlr3D1"
          )
          .then(
            (result) => {
              console.log(result.text);
              this.props.prop.history.push(`/accounts/activate-email`);
            },
            (error) => {
              this.setState({ showLoading: false });
              console.log(error.text);
            }
          );
      },
      (error) => {
        this.setState({ showLoading: false });
        console.log(error.response);
        this.setState({ errorMessage: error.response.data.message });
      }
    );
  }

  render() {
    return (
      <div id="expertSignupComponent">
        {this.state.errorMessage && (
          <div
            className="alert alert-danger"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {this.state.errorMessage}
          </div>
        )}
        {this.state.showLoading && (
          <LoadingComponent type="Circles"></LoadingComponent>
        )}
        {!this.state.showLoading && (
          <Form onSubmit={this.handleExpertSubmit}>
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
                  onClick={this.handleSendOtp}
                  color="success"
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
                    onClick={this.onSubmitOTP}
                    color="success"
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
              <Label for="aadhar" sm={3}>
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
            <FormGroup row>
              <Label for="occupation" sm={3}>
                Expertization Field
              </Label>
              <Col sm={9}>
                <Select
                  options={this.state.occupations}
                  onChange={(e) => {
                    console.log(e.value);
                    this.setState({ selctedExpertization: e.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="specialization" sm={3}>
                Specialization
              </Label>
              <Col sm={9}>
                <Select
                  name="specialization"
                  options={
                    this.state.specialization[this.state.selctedExpertization]
                  }
                  onChange={(e) => {
                    this.setState({
                      selctedSpecialization: e.value,
                    });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Fees" sm={3}>
                Fees/ Appointment
              </Label>
              <Col sm={9}>
                <Input
                  name="fees"
                  id="fees"
                  onChange={(e) => {
                    this.setState({ fees: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={3}>
                Description
              </Label>
              <Col sm={9}>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="The more descriptive and detailed you are, the better our ability to match your expertise with our clients needs."
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={4}>
                Upload Image
              </Label>
              <Col sm={8}>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => {
                    this.setState({ image: e.target.files[0] });
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
        )}
      </div>
    );
  }
}
export default ExpertSignupComponent;
