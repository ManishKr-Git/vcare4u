import React, { Component } from "react";
import { Input, Label, Button, Form, FormGroup, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import Services from "./../services/Services.js";
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
    };

    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.generateActivationCode = this.generateActivationCode.bind(this);
  }
  generateActivationCode() {
    let code = "";
    for (let k = 1; k <= 32; k++) {
      if (Math.random() * 10 > 3)
        code += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      else code += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    return code;
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
        activationCode: this.generateActivationCode(),
      };
      Services.addUser(user).then(
        (response) => {
          values.target.message.value =
            "https://vcare4-u.herokuapp.com/emailVerification/activatingAccount/" +
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
        }
      );
    }
  }
  render() {
    return (
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
            <Label for="phone" sm={3}>
              Mobile Number
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number Here"
                pattern="[0-9]{10}"
                onChange={(e) => {
                  this.setState({ phone: e.target.value });
                }}
              />
            </Col>
          </FormGroup>
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
    );
  }
}
export default UserSignupComponent;
