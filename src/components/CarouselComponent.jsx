import Carousel from "react-bootstrap/Carousel";
import React, { Component } from "react";
import { images } from "./../services/constant";
class CarouselComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Carousel controls={false} fade={true} interval={1500}>
        {images.map((image) => (
          <Carousel.Item key={Math.random(100)}>
            <img
              className="d-block w-100"
              src={image.default}
              alt="First slide"
              style={{ height: "450px" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}
export default CarouselComponent;
