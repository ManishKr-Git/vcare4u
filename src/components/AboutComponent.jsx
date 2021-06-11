import React, { Component } from "react";

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
              }}
            >
              VCARE4U
            </h1>
            <hr />
            <h2>Our Mission</h2>
            <p>
              Vcare4u is on a mission to make consultancy affordable and
              accessible for over a billion+ Indians. We believe in empowering
              our users with the most accurate, comprehensive, and curated
              information and care, enabling them to make better life decisions.
            </p>
          </center>
        </div>
      </div>
    );
  }
}

export default AboutComponent;
