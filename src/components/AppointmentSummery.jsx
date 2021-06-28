import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";
import Services from "../services/Services";
import ReactStars from "react-rating-stars-component";
class AppointmentSummery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExpert: null,
    };
    this.handleBooking = this.handleBooking.bind(this);
  }
  handleBooking() {
    const expertId = this.props.match.params.expertId;
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const bookingData = {
      userId: userData.data.id,
      expertId: expertId,
      userName: userData.data.name,
      expertName: this.state.selectedExpert.name,
      userRating: 0,
      fees: this.state.selectedExpert.fees,
      expertRating: this.state.selectedExpert.rating,
    };
    Services.createOrder(bookingData).then(
      (response) => {
        if (response.data.status === "created") {
          const options = {
            key: "rzp_test_eLPfUeW6aBcJdA",
            amount: bookingData.fees * 100, //  = INR 1
            name: "VCARE4U",
            description: "Booking Payment",
            image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
            handler: function (response) {
              window.location.href = "/order-placed/";
            },
            prefill: {
              name: "",
              contact: "",
              email: "",
            },
            notes: {
              address: "",
            },
            theme: {
              color: "success",
              hide_topbar: true,
            },
          };
          var rzp1 = new window.Razorpay(options);
          rzp1.open();
        }
      },
      (error) => {
        console.log(error);
      }
    );
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
        <div className="bookingSummary">
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
                <Col sm={2}>
                  {this.state.selectedExpert.priceWithoutDiscount -
                    this.state.selectedExpert.fees}
                </Col>
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
                <Button
                  color="primary"
                  id="payment"
                  onClick={this.handleBooking}
                >
                  Proceed to Pay
                </Button>
              </Row>
            </>
          )}
        </div>
      </>
    );
  }
}
export default AppointmentSummery;
