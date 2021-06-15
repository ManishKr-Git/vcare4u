import { Button } from "reactstrap";
import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import order from "./../images/order_placed.png";
import right from "./../images/right.gif";
class OrderPlaced extends Component {
  constructor(props) {
    super(props);
    this.gotoBookings = this.gotoBookings.bind(this);
  }
  gotoBookings() {
    this.props.history.push("/bookings");
  }
  render() {
    return (
      <div className="order_placed">
        <Row>
          <Col sm={6}>
            <img src={order} alt="order_vector" width="105%" />
          </Col>
          <Col sm={6}>
            <div className="thankyou">
              <center>
                <div className="inner_placed">
                  <img src={right} alt="success" height="200px" width="200px" />
                  <h5>Awesome!</h5>
                  <p>
                    You appointment has been booked, details will be send to you
                    on your e-mail
                  </p>
                  <Button color="success" onClick={this.gotoBookings}>
                    Go to Your Bookings
                  </Button>
                </div>
              </center>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default OrderPlaced;
