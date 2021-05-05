import React, { Component } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import Services from "./../services/Services.js";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      activationMessage: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount() {
    let activationCode = this.props.match.params.activationCode;
    if (activationCode) {
      Services.activateAccount(activationCode).then(
        (response) => {
          this.setState({
            activationMessage:
              "Your acccount has been activated. Now you can use our services",
          });
        },
        (error) => {
          this.setState({
            errorMessage:
              "Unexpected error occured!! Please try after some time",
          });
        }
      );
    }
  }
  handleLogin(values) {
    values.preventDefault();
    let err = "";
    let email = values.target.email.value;
    let password = values.target.password.value;
    let isExpertLogin = values.target.isExpertLogin.checked;
    if (email === "") {
      err += "Email is missing\n";
    }
    if (password === "") {
      err += "Password is missing";
    }
    if (err === "") {
      const data = {
        email: email,
        password: password,
      };
      if (isExpertLogin) {
        Services.userLogin(data).then(() => {
          console.log("Success or not");
        });
      } else {
        console.log("YAHA");
        Services.userLogin(data).then(
          (response) => {
            console.log(response);
            this.props.history.push(`/home/${response.data.name}`);
          },
          (error) => {
            if (error.message.includes("404"))
              this.setState({ errorMessage: "Invalid Credentials" });
            else this.setState({ errorMessage: "User is not activated" });
          }
        );
      }
    } else {
      this.setState({ errorMessage: err });
      return;
    }
  }
  render() {
    return (
      <div id="loginForm">
        <Form onSubmit={this.handleLogin}>
          <h2>Welcome to vCare4U</h2>
          <hr />
          {this.state.errorMessage && (
            <div
              className="alert alert-danger"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {this.state.errorMessage}
            </div>
          )}
          {this.state.activationMessage && (
            <div className="alert alert-success">
              {this.state.activationMessage}
            </div>
          )}
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email"
              onClick={() => {
                this.setState({ errorMessage: "", activationMessage: "" });
              }}
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onClick={() => {
                this.setState({ errorMessage: "", activationMessage: "" });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="checkbox"
              name="isExpertLogin"
              id="isExpertLogin"
              placeholder="Password"
              style={{ marginLeft: "2px" }}
            />
            <Label for="isExpertLogin" style={{ marginLeft: "17px" }}>
              Sign in as an expert
            </Label>
          </FormGroup>
          <Button type="submit" color="success">
            Login
          </Button>
          <br></br>
          <br></br>
          <p>
            Not a member?<Link to="/signup"> Register Here</Link>
          </p>
        </Form>
      </div>
    );
  }
}

export default LoginComponent;
