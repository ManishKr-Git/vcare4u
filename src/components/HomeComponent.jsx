import React, { Component } from "react";
import Services from "./../services/Services";
class HomeComponent extends Component {
  componentDidMount() {
    var experts = Services.getAllExperts();
    console.log(experts);
  }
  render() {
    return (
      <div className="container">
        <h1>Home</h1>
      </div>
    );
  }
}
export default HomeComponent;
