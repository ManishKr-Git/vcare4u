import React, { Component } from "react";
import Services from "./../services/Services.js";
import { Col, Row } from "reactstrap";
import LoadingComponent from "./LoadingComponent.jsx";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
class BookingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBookings: null,
      showLoading: true,
    };
  }
  componentDidMount() {
    if (Services.isExpertLoggedIn()) {
      const expertData = JSON.parse(sessionStorage.getItem("expert"));
      Services.getExpertBookings(expertData.data.id).then(
        (response) => {
          this.setState({ allBookings: response.data.data });
          console.log(this.state.allBookings);
          this.setState({ showLoading: false });
        },
        (error) => {
          console.log(error);
          this.setState({ showLoading: false });
        }
      );
    } else {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      Services.getUserBookings(userData.data.id).then(
        (response) => {
          this.setState({ allBookings: response.data.data });
          console.log(this.state.allBookings);
          this.setState({ showLoading: false });
        },
        (error) => {
          console.log(error);
          this.setState({ showLoading: false });
        }
      );
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Vcare4u | Bookings</title>
        </Helmet>
        <div className="container">
          <div className="booking">
            <h3>All Bookings</h3>
            {this.state.showLoading && (
              <LoadingComponent type="Circles"></LoadingComponent>
            )}
            {this.state.allBookings &&
              this.state.allBookings.map((booking) => (
                <div className="eachBooking">
                  <Row style={{ display: "flex" }}>
                    <Col>
                      <h5>
                        <Link
                          to={
                            "/expert-page/ksuz2mc1d5xaf8h7lcdp4pzd5hyj05fkpl6r6031elpgn6tgpvsgs8w3b34cb26n/" +
                            booking.expertId
                          }
                        >
                          {booking.expertName}
                        </Link>
                      </h5>
                    </Col>
                    <Col>
                      <p style={{ float: "right" }}>
                        Booked on:
                        {new Date(booking.bookedOn).toLocaleDateString()}
                      </p>
                    </Col>
                  </Row>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default BookingsComponent;
