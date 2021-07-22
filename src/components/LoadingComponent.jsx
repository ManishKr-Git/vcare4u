import React, { Component } from "react";
import Loader from "react-loader-spinner";
class LoadingComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <center>
          <Loader
            type={this.props.type}
            color="#00BFFF"
            height={200}
            width={200}
          />
        </center>
      </div>
    );
  }
}
export default LoadingComponent;
