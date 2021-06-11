import React, { Component } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import Services from "./../services/Services.js";
import LoadingComponent from "./LoadingComponent";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      activationMessage: "",
      showLoading: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount() {
    let activationCode = this.props.match.params.activationCode;
    const url = window.location.href;
    if (activationCode) {
      this.setState({ showLoading: true });
      if (url.includes("expert")) {
        Services.activateExpertAccount(activationCode).then(
          (response) => {
            this.setState({
              activationMessage:
                "Your acccount has been activated. Now you can use our services",
            });
            this.setState({ showLoading: false });
          },
          (error) => {
            this.setState({
              errorMessage:
                "Unexpected error occured!! Please try after some time",
            });
            this.setState({ showLoading: false });
          }
        );
      } else {
        Services.activateUserAccount(activationCode).then(
          (response) => {
            this.setState({
              activationMessage:
                "Your acccount has been activated. Now you can use our services",
            });
            this.setState({ showLoading: false });
          },
          (error) => {
            this.setState({
              errorMessage:
                "Unexpected error occured!! Please try after some time",
            });
            this.setState({ showLoading: false });
          }
        );
      }
    }
  }
  handleLogin(values) {
    values.preventDefault();
    console.log("Manish");
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
      this.setState({ showLoading: true });
      const data = {
        email: email,
        password: password,
      };
      if (isExpertLogin) {
        Services.expertLogin(data).then(
          (response) => {
            sessionStorage.setItem("expert", JSON.stringify(response.data));
            window.location.href = `/bookings/`;
          },
          (error) => {
            if (error.message.includes("404")) {
              this.setState({ errorMessage: "Invalid Credentials" });
            } else this.setState({ errorMessage: "Expert is not activated" });
            this.setState({ showLoading: false });
          }
        );
      } else {
        Services.userLogin(data).then(
          (response) => {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = `/home/${response.data.name}`;
          },
          (error) => {
            if (error.message.includes("404")) {
              this.setState({ errorMessage: "Invalid Credentials" });
              console.log("Vinit Chutoa ha");
            } else this.setState({ errorMessage: "User is not activated" });
            this.setState({ showLoading: false });
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
      <>
        <div className="container mt-5">
          {this.state.showLoading && <LoadingComponent></LoadingComponent>}
          {!this.state.showLoading && (
            <div id="loginForm">
              <Form onSubmit={this.handleLogin}>
                <h2 style={{ color: "white" }}>Login</h2>
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
                  <div className="alert alert-warning">
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
                      this.setState({
                        errorMessage: "",
                        activationMessage: "",
                      });
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
                      this.setState({
                        errorMessage: "",
                        activationMessage: "",
                      });
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
          )}
        </div>
      </>
    );
  }
}

export default LoginComponent;
