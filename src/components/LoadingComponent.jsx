import React, { Component } from "react";
import loading from "./../images/Fidget-spinner.gif";
class LoadingComponent extends Component {
  render() {
    return (
      <div className="loading">
        <img src={loading} alt="" />
      </div>
    );
  }
}
export default LoadingComponent;
