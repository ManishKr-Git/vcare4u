import React, { Component } from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import { Col, Row } from "reactstrap";
import f1 from "./../images/feedback1.png";
import f2 from "./../images/feedback2.webp";
import f3 from "./../images/feedback3.png";
import connect from "./../images/connect.svg";
import trust from "./../images/trust.svg";
import transparency from "./../images/transparency.svg";
class AboutComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="aboutPage">
          <center>
            <h1
              style={{
                fontSize: "600%",
                fontFamily: "initial",
                color: "#062B39",
              }}
            >
              VCARE4U
            </h1>
            <hr />
            <h2>Our Mission</h2>
            <h6
              style={{
                color: "#0C0C00",
                marginBottom: "20px",
                fontWeight: "inherit",
              }}
            >
              Vcare4u is on a mission to make consultancy affordable and
              accessible for over a billion+ Indians. We believe in empowering
              our users with the most accurate, comprehensive, and curated
              information and care, enabling them to make better life decisions.
            </h6>
            <div className="bg-image-inspire">
              <div
                className="center-block"
                style={{ textAlign: "left", width: "50%" }}
              >
                <h1>Vcare4u - It is the way</h1>
                <p>
                  It is the journey that takes you to new destinations every day
                  with endless possibilities of life on the back of happiness,
                  energy, and hope. Vcare4u wants to make this journey easy for
                  every Indian and help them live easier and longer lives.
                </p>
              </div>
            </div>
            <hr />
            <div>
              <h1>
                Each time a person finds the right consultant, we build a better
                nation
              </h1>
              <Row>
                <Col sm={4}>
                  <Card>
                    <CardImg src={f1}></CardImg>
                    <CardBody>
                      <CardTitle tag="h6">
                        Found the doctor who cured my wife’s brain tumor
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={4}>
                  <Card>
                    <CardImg src={f2}></CardImg>
                    <CardBody>
                      <CardTitle tag="h6">
                        Found the agent who helped me to find better insurance
                        policy for my family
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={4}>
                  <Card>
                    <CardImg src={f3}></CardImg>
                    <CardBody>
                      <CardTitle tag="h6">
                        Found the lawyer who helped me to get back my business
                      </CardTitle>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            <hr />
            <div className="approach">
              <h3>Our Approach</h3>
              <Row>
                <Col sm={4}>
                  <img src={connect} alt="" />
                  <h1>Connect</h1>
                </Col>
                <Col sm={4}>
                  <img src={trust} alt="" />
                  <h1>Trust</h1>
                </Col>
                <Col sm={4}>
                  <img src={transparency} alt="" />
                  <h1>Transparency</h1>
                </Col>
              </Row>
            </div>
          </center>
        </div>
      </div>
    );
  }
}

export default AboutComponent;
