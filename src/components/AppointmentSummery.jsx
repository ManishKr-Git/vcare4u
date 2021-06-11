import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import Services from "../services/Services";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
class AppointmentSummery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExpert: null,
    };
  }
  componentDidMount() {
    const id = this.props.match.params.expertId;
    console.log(id);
    Services.getExpert(id).then(
      (response) => {
        this.setState({ selectedExpert: response.data });
        console.log(this.state.selectedExpert);
        this.setState({ showLoading: false });
      },
      (error) => {
        console.log("Vinit");
        console.log(error);
        this.setState({ showLoading: false });
      }
    );
  }
  render() {
    return (
      <>
        <div className="booking">
          <center>
            <h3>Booking Summary</h3>
          </center>
          <hr />
          {this.state.selectedExpert && (
            <>
              <Row>
                <Col sm={3}>
                  <img
                    src={
                      "data:image/jpeg;base64," +
                      this.state.selectedExpert.image
                    }
                    alt=""
                    height="100px"
                    width="100px"
                    className="p-2"
                  />
                </Col>
                <Col sm={9}>
                  <h3 style={{ color: "#1B4A5F" }}>
                    {this.state.selectedExpert.name}
                  </h3>
                  <h6 style={{ color: "#307D9E" }}>
                    {this.state.selectedExpert.expertization} (
                    {this.state.selectedExpert.specification})
                  </h6>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <ReactStars
                      sm={5}
                      value={this.state.selectedExpert.rating}
                      count={1}
                      size={24}
                      isHalf={true}
                      color="yellow"
                      edit={false}
                    />
                    <small style={{ marginTop: "10px" }}>
                      {this.state.selectedExpert.rating}
                    </small>
                  </div>
                </Col>
              </Row>
              <div className="container p-1">
                <hr />
              </div>
              <Row className="p-2">
                <Col sm={10}>Subtotal</Col>
                <Col sm={2}>
                  {this.state.selectedExpert.priceWithoutDiscount}
                </Col>
              </Row>
              <Row className="p-2">
                <Col sm={10}>Discount</Col>
                <Col sm={2}>{this.state.selectedExpert.fees}</Col>
              </Row>
              <Row className="p-2">
                <Col sm={10}>
                  <b>Total</b>
                </Col>
                <Col sm={2}>
                  <b>{this.state.selectedExpert.fees}</b>
                </Col>
              </Row>
              <Row className="p-4">
                <Link
                  to={
                    "/order-summary/ksuz2mc1d5xaf8h7lcdp4pzd5hyj05fkpl6r6031elpgn6tgpvsgs8w3b34cb26n/consultant-id/" +
                    this.state.selectedExpert.id
                  }
                  className="btn btn-primary "
                >
                  Proceed to Pay
                </Link>
              </Row>
            </>
          )}
        </div>
      </>
    );
  }
}
export default AppointmentSummery;
