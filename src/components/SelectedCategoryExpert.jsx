import React, { Component } from "react";
import Services from "../services/Services";
import CarouselComponent from "./CarouselComponent";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import LoadingComponent from "./LoadingComponent";
import { Helmet } from "react-helmet";
export class SelectedCategoryExpert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      allExperts: null,
      loading: true,
    };
  }
  componentDidMount() {
    const category = this.props.match.params.category;
    this.setState({ category: category });
    Services.getSelectedCategoryExperts(category).then((response) => {
      this.setState({ allExperts: response.data.data });
      this.setState({ loading: false });
      console.log(this.state.allExperts);
    });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Vcare4u | Expert</title>
        </Helmet>
        <CarouselComponent></CarouselComponent>
        <hr />

        <div className="container">
          <h3>
            Our Best {this.state.category} {"  "}Consultants
          </h3>
          <hr />
          {this.state.loading && (
            <LoadingComponent type="bars"></LoadingComponent>
          )}
          {!this.state.loading &&
            this.state.allExperts &&
            this.state.allExperts.map((expert) => (
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
