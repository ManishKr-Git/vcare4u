import React, { Component } from "react";
import PropTypes from "prop-types";
import contact from "./../images/contact-us-vector.png";
import { Input, Label, Button, Form, FormGroup, Col, Row } from "reactstrap";
import { fontSize } from "@material-ui/system";

class ContactUsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="contactUs">
          <div className="heading">
            <center>
              <h4>Contact Us</h4>
              <br />
              <h5>
                Have questions about our support services, or anything else? Let
                us know and we’ll get back to you.
              </h5>
            </center>
          </div>
          <hr />
          <div className="contactUs-banner">
            <Row>
              <Col
                sm={4}
                style={{
                  border: "1px solid #B9C8CE",
                  marginLeft: "10px",
                }}
              >
                <h4>Contact us</h4>
                <p style={{ fontSize: "70%" }}>
                  Feel free to contact us if you need some help, consulation or
                  you have some other questions.
                </p>
                <form>
                  <FormGroup>
                    <Input
                      placeholder="Your Name"
                      style={{ width: "340px" }}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Your Email"
                      style={{ width: "340px" }}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="textarea"
                      placeholder="Your Message..."
                      style={{ width: "340px", height: "100px" }}
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Button className="w-100" color="primary">
                      Submit
                    </Button>
                  </FormGroup>
                </form>
              </Col>
              <Col sm={7}>
                <img src={contact} width="600px" alt="" />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUsComponent;
