import React, { Component } from "react";
import { Button } from "reactstrap";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import headerImage from "./../static/images/experts.png";
import svg1 from "./../static/images/svg2.svg";
import svg2 from "./../static/images/svg4.png";
import { Link } from "react-router-dom";
import "./../styles/myStyle.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
class HomeComponent extends Component {
  constructor(props) {
    super(props);
    Aos.init({ duration: 1000 });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Vcare4u | Home</title>
        </Helmet>
        <div className="homediv" data-aos="slide-right" data-aos-once="true">
          <div
            className="mainDiv1"
            style={{
              backgroundColor: "#b2ccdc",
              padding: "0px",
              width: "100%",
              display: "flex",
            }}
          >
            <div className="col" data-aos="flip-left" data-aos-once="true">
              <img src={headerImage} alt="" width="100%" />
            </div>
            <div className="p-0 col">
              <div style={{ marginTop: "100px" }}>
                <center>
                  <h1
                    style={{
                      fontSize: "7vw",
                      fontFamily: "Bradley Hand, cursive",
                      color: "#2F4F4F",
                    }}
                  >
                    VCARE4U
                  </h1>
                </center>
              </div>

              <div className="p-3 mt-3">
                <center className="p-2">
                  <h2
                    style={{ color: "#401419", fontSize: "3vw" }}
                    data-aos="zoom-in-up"
                    data-aos-once="true"
                  >
                    Book Your Seat Before It's Too Late
                  </h2>
                  <div className="m-5">
                    <p>The world is here, where are you!</p>
                    <Button
                      outline
                      color="warning"
                      style={{ borderRadius: "50px" }}
                      data-aos="zoom-out-up"
                      data-aos-once="true"
                    >
                      <Link
                        to="/experts"
                        style={{
                          color: "black",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                        className="nav-link p-0"
                      >
                        Book Your Expert Today
                      </Link>
                    </Button>
                  </div>
                </center>
              </div>
            </div>
          </div>
          <div className="firstSvg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
              <path
                fill="#00558c"
                fill-opacity="0.3"
                d="M0,32L80,48C160,64,320,96,480,101.3C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="homediv">
          <div
            className="mainDiv2"
            style={{
              backgroundColor: "#d0dffa",
              padding: "0px",
              width: "100%",
              display: "flex",
            }}
          >
            <div className="p-0 col secondCol">
              <div style={{ marginTop: "100px" }}>
                <center>
                  <h1
                    style={{
                      fontSize: "7vw",
                      fontFamily: "Bradley Hand, cursive",
                      color: "#2F4F4F",
                    }}
                  >
                    VCARE4U
                  </h1>
                </center>
              </div>

              <div className="p-3 mt-3">
                <center className="p-2">
                  <h2
                    style={{ color: "#401419", fontSize: "3vw" }}
                    data-aos="zoom-in-up"
                    data-aos-once="true"
                  >
                    Brings You The Easiest Way For Consultancy
                  </h2>
                  <div className="m-5">
                    <p>The world is here, where are you!</p>
                    <Button
                      outline
                      color="warning"
                      style={{ borderRadius: "50px" }}
                      data-aos="zoom-out-up"
                      data-aos-once="true"
                    >
                      <Link
                        to="/experts"
                        style={{
                          color: "black",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                        className="nav-link p-0"
                      >
                        Become An Expert Today
                      </Link>
                    </Button>
                  </div>
                </center>
              </div>
            </div>
            <div
              className="col firstCol"
              data-aos="flip-down"
              data-aos-once="true"
            >
              <img src={svg2} alt="" width="100%" />
            </div>
          </div>
          <div className="firstSvg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
              <path
                fill="#6495ed"
                fill-opacity="0.3"
                d="M0,32L80,48C160,64,320,96,480,101.3C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
              ></path>
            </svg>
          </div>
        </div>

        <div className="serviceDiv">
          <h1>Vcare4u Provides</h1>
          <OwlCarousel
            className="owl-theme"
            loop
            items="3"
            autoplay
            dots
            center="true"
          >
            <div class="item">
              <center>
                <h4>Person One</h4>
                <div>
                  <img src={svg1} height="200px" width="200px" />
                </div>
              </center>
            </div>
            <div class="item">
              <center>
                <h4>Person Two</h4>
                <div>
                  <img src={svg1} height="200px" width="200px" />
                </div>
              </center>
            </div>
            <div class="item">
              <center>
                <h4>Person Three</h4>
                <div>
                  <img src={svg1} height="200px" width="200px" />
                </div>
              </center>
            </div>
          </OwlCarousel>
        </div>
      </>
    );
  }
}
export default HomeComponent;
