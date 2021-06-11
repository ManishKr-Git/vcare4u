import React, { Component } from "react";
import {
  CardImg,
  CardSubtitle,
  Col,
  Row,
  Button,
  Card,
  Input,
} from "reactstrap";
import Services from "./../services/Services.js";
import ReactStars from "react-rating-stars-component";
import LoadingComponent from "./LoadingComponent.jsx";
import { Link } from "react-router-dom";
export default class ExpertDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExpert: false,
      rating: 0,
      review: "",
      showLoading: true,
    };
    this.handleAddRating = this.handleAddRating.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.expertId;
    console.log("Manish");
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
  handleAddRating() {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const ratingData = {
      id: userData.id,
      raterName: userData.name,
      stars: this.state.rating,
      review: this.state.review,
    };
    const expertId = this.props.match.params.expertId;
    Services.updateExpertRating(expertId, ratingData).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <>
        {this.state.showLoading && <LoadingComponent></LoadingComponent>}
        {this.state.selectedExpert && (
          <div className="container mt-5">
            <Row>
              <Col sm={5}>
                <CardImg
                  width="250px"
                  height="350px"
                  src={
                    "data:image/jpeg;base64," + this.state.selectedExpert.image
                  }
                  alt="Image"
                  style={{
                    boxShadow:
                      "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
                  }}
                />
              </Col>
              <Col
                sm={7}
                style={{
                  boxShadow:
                    "0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
                  backgroundColor: "#E1EDE3",
                }}
                className="p-2"
              >
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
                    count={5}
                    size={24}
                    isHalf={true}
                    activeColor="#ffd700"
                    edit={false}
                  />
                  <small style={{ marginTop: "10px" }}>
                    {this.state.selectedExpert.rating}
                  </small>
                </div>
                <hr></hr>
                <CardSubtitle
                  className="p-1"
                  style={{
                    fontFamily: "Copperplate",
                    color: "#3A2925",
                    width: "500px",
                  }}
                >
                  {this.state.selectedExpert.description}
                </CardSubtitle>
                <span>
                  M.R.P.:
                  <del>₹{this.state.selectedExpert.priceWithoutDiscount}</del>
                </span>
                <br></br>
                Price:
                <span className="text-danger">
                  ₹{this.state.selectedExpert.fees}
                </span>
                <br></br>
                You Save:
                <span className="text-danger">
                  ₹{this.state.selectedExpert.fees}
                </span>
                <br></br>
                <br></br>
                <Link
                  to={
                    "/order-summary/ksuz2mc1d5xaf8h7lcdp4pzd5hyj05fkpl6r6031elpgn6tgpvsgs8w3b34cb26n/consultant-id/" +
                    this.state.selectedExpert.id
                  }
                  className="btn btn-primary"
                >
                  Book Appointment
                </Link>
              </Col>
            </Row>
            <hr></hr>
            <h3 style={{ color: "#ffc107" }}>Reviews and Ratings</h3>
            <hr style={{ borderTop: "1px solid #ffc107" }}></hr>
            <div
              style={{
                display: "flex",
              }}
            >
              <ReactStars
                count={5}
                size={50}
                isHalf={true}
                activeColor="#ffd700"
                classNames="m-2"
                onChange={(e) => {
                  this.setState({ rating: e });
                }}
              />
              <Input
                type="textarea"
                name="reviews"
                placeholder="Write Your Reviews Here (Optional)"
                style={{
                  height: "50px",
                  width: "500px",
                  resize: "true",
                  marginTop: "30px",
                }}
                onChange={(e) => {
                  this.setState({ review: e.target.value });
                }}
              />
              <Button
                color="warning"
                style={{ height: "50px", marginLeft: "5px", marginTop: "30px" }}
                onClick={this.handleAddRating}
              >
                Add My Review
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }
}
