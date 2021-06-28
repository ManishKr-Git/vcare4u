import React, { Component } from "react";
import Services from "./../services/Services.js";
import { Col, Row } from "reactstrap";
class BookingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBookings: null,
    };
  }
  componentDidMount() {
    if (Services.isExpertLoggedIn()) {
      console.log("Yes");
      const expertData = JSON.parse(sessionStorage.getItem("expert"));
      Services.getExpertBookings(expertData.data.id).then(
        (response) => {
          this.setState({ allBookings: response.data.data });
          console.log(this.state.allBookings);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      Services.getUserBookings(userData.data.id).then(
        (response) => {
          this.setState({ allBookings: response.data.data });
          console.log(this.state.allBookings);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="booking">
          <h3>All Bookings</h3>
          {this.state.allBookings &&
            this.state.allBookings.map((booking) => (
              <div className="eachBooking">
                <Row style={{ display: "flex" }}>
                  <Col>
                    <h5>{booking.expertName}</h5>
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
    );
  }
}

export default BookingsComponent;
