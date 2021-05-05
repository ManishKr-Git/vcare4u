import React, { Component } from "react";
import { Input, Label, Button, Form, FormGroup, Col, Row } from "reactstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import Services from "./../services/Services.js";
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
      occupations: [
        { value: "Doctor", label: "Doctor" },
        { value: "Engineer", label: "Engineer" },
      ],
      specialization: [],
      Doctor: [
        { value: "Anesthesiologists", label: "Anesthesiologists" },
        { value: "Cardiologists", label: "Cardiologists" },
        {
          value: "Colon and Rectal Surgeons",
          label: "Colon and Rectal Surgeons",
        },
      ],
      Engineer: [
        { value: "Electronic Engineer", label: "Electronic Engineer" },
        { value: "Mechanical Engineer", label: "Mechanical Engineer" },
        { value: "Computer Engineer", label: "Computer Engineer" },
      ],
      selctedExpertization: "",
      selctedSpecialization: "",
    };
    this.handleExpertSubmit = this.handleExpertSubmit.bind(this);
  }
  handleExpertSubmit(e) {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      aadhar: this.state.aadhar,
      password: this.state.password,
      // cpassword: this.state.cpassword,
      expertization: this.state.selctedExpertization,
      specification: this.state.selctedSpecialization,
      description: this.state.description,
      imageUrl: "",
    };
    const formData = new FormData();
    formData.append("expert", JSON.stringify(data));
    formData.append("image", this.state.image);
    console.log(data);
    Services.addExpert(formData);
    // this.props.prop.history.push(`/login/`);
  }

  render() {
    return (
      <div id="expertSignupComponent">
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
                pattern="[0-9]{12}"
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
                  if (e.value === "Doctor") {
                    this.setState({ specialization: this.state.Doctor });
                  } else {
                    this.setState({ specialization: this.state.Engineer });
                  }
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
                options={this.state.specialization}
                onChange={(e) => {
                  this.setState({
                    selctedSpecialization: e.value,
                  });
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
export default ExpertSignupComponent;
