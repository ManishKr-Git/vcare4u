import React, { Component } from "react";
import { CardImg, CardSubtitle, Col, Row, Button, Input } from "reactstrap";
import Services from "./../services/Services.js";
import ReactStars from "react-rating-stars-component";
import LoadingComponent from "./LoadingComponent.jsx";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default class ExpertDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedExpert: false,
      rating: 0,
      review: "",
      showLoading: true,
      all_reviews: null,
    };
    this.handleAddRating = this.handleAddRating.bind(this);
  }
  componentDidMount() {
    document.getElementById("searchBar").value = "";
    const id = this.props.match.params.expertId;
    Services.getExpert(id).then(
      (response) => {
        Services.getExpertReviews(id).then(
          (response) => {
            console.log(response);
            this.setState({ all_reviews: response.data });
          },
          (error) => {
            console.log(error);
          }
        );
        this.setState({ selectedExpert: response.data });
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
      customerId: userData.data.id,
      raterName: userData.data.name,
      stars: this.state.rating,
      review: this.state.review,
    };
    console.log(ratingData);
    const expertId = this.props.match.params.expertId;
    Services.updateExpertRating(expertId, ratingData).then(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Vcare4u | ExpertsDetails</title>
        </Helmet>
        {this.state.showLoading && (
          <LoadingComponent type="Grid"></LoadingComponent>
        )}
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
                  {this.state.all_reviews && (
                    <small style={{ marginTop: "10px", marginLeft: "20px" }}>
                      {this.state.all_reviews.length}
                    </small>
                  )}
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
                  <del>???{this.state.selectedExpert.priceWithoutDiscount}</del>
                </span>
                <br></br>
                Price:
                <span className="text-danger">
                  ???{this.state.selectedExpert.fees}
                </span>
                <br></br>
                You Save:
                <span className="text-danger">
                  ???
                  {this.state.selectedExpert.priceWithoutDiscount -
                    this.state.selectedExpert.fees}
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
            <hr style={{ borderTop: "1px solid #ffc107" }}></hr>
            <div className="container ml-0 p-1">
              {this.state.all_reviews &&
                this.state.all_reviews.map((review) => (
                  <>
                    <div
                      style={{
                        backgroundColor: "#868785",
                        padding: "10px",
                        margin: "10px",
                        boxShadow:
                          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <h6 style={{ color: "#E6F369", margin: "5px" }}>
                          <span>{review.raterName}</span>
                        </h6>
                        <ReactStars
                          count={5}
                          size={20}
                          value={review.stars}
                          isHalf={true}
                          activeColor="#ffd700"
                          edit={false}
                        />
                      </div>
                      <h6 style={{ color: "#E6ECEA", margin: "5px" }}>
                        {review.review}
                      </h6>
                    </div>
                  </>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
