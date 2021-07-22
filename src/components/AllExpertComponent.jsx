import React, { Component } from "react";
import Services from "../services/Services";
import ReactStars from "react-rating-stars-component";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import LoadingComponent from "./LoadingComponent";
import CarouselComponent from "./CarouselComponent";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
class AllExpertComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experts: [],
      showLoading: true,
      selectedExpert: null,
      rating: [],
    };
    this.handleExpertPage = this.handleExpertPage.bind(this);
  }
  componentDidMount() {
    Services.getAllExperts().then(
      (response) => {
        this.setState({ showLoading: false });
        this.setState({ experts: response.data });
        console.log(response.data);
      },
      (error) => {
        this.setState({ showLoading: false });
        console.log(error);
      }
    );
  }
  handleExpertPage(expert) {
    this.props.history.push(
      `/expert-page/ksuz2mc1d5xaf8h7lcdp4pzd5hyj05fkpl6r6031elpgn6tgpvsgs8w3b34cb26n/${expert.id}`
    );
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Vcare4u | Home</title>
        </Helmet>
        <CarouselComponent></CarouselComponent>
        <hr></hr>
        <div className="container">
          <h3 style={{ color: "white" }}>Our Experts</h3>
          <hr></hr>
          {this.state.showLoading && (
            <LoadingComponent type="BallTriangle"></LoadingComponent>
          )}
          {this.state.experts.map((expert) => (
            <Card
              className="p-0"
              text="white"
              style={{
                backgroundColor: "#073743",
                width: "16rem",
                display: "inline-block",
                marginLeft: "13px",
                marginBottom: "13px",
                boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
              }}
              key={expert.id}
            >
              <CardImg
                width="300px"
                height="200px"
                src={"data:image/jpeg;base64," + expert.image}
                alt="Image"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.handleExpertPage(expert);
                }}
                className="p-1"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ReactStars
                  sm={5}
                  value={expert.rating}
                  count={5}
                  size={24}
                  isHalf={true}
                  activeColor="#ffd700"
                  edit={false}
                />
                <span className="m-1" style={{ color: "white" }}>
                  <small>{expert.rating}</small>
                </span>
              </div>
              <CardBody
                className="p-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.handleExpertPage(expert);
                }}
              >
                <CardTitle tag="h5" style={{ color: "#FFF" }}>
                  {expert.name.split(" ")[0]}
                </CardTitle>
                <CardSubtitle style={{ fontSize: "90%", color: "#FFF" }}>
                  {expert.expertization} <span>({expert.specification})</span>
                </CardSubtitle>
              </CardBody>
              <div className="p-2">
                <span style={{ float: "left", color: "#F0EFEB" }}>
                  M.R.P.:
                  <del>₹{expert.priceWithoutDiscount}</del>
                </span>
                <span style={{ float: "right", color: "#F0EFEB" }}>
                  Price:
                  <span className="text-danger">₹{expert.fees}</span>
                </span>
                <br />
                <span style={{ float: "right", color: "#F0EFEB" }}>
                  You Save:
                  <span className="text-danger">
                    ₹{expert.priceWithoutDiscount - expert.fees}
                  </span>
                </span>
                <br />
                <Link
                  to={
                    "/order-summary/ksuz2mc1d5xaf8h7lcdp4pzd5hyj05fkpl6r6031elpgn6tgpvsgs8w3b34cb26n/consultant-id/" +
                    expert.id
                  }
                  className="btn btn-success w-100"
                >
                  Book Appointement
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  }
}
export default AllExpertComponent;
