import React, { Component } from "react";
import firebase from "./../services/firebase";
import * as firebaseui from "firebaseui";

class MobileComponent extends Component {
  constructor(props) {
    super(props);
    this.handleOtp = this.handleOtp.bind(this);
  }
  handleOtp(values) {
    const uiConfig = {
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            type: "image",
            size: "nomrla",
            badge: "bottomleft",
          },
          defaultCounty: "IN",
        },
      ],
      callbacks: {
        signInSuccessUrl: "https://www.youtube.com/",
      },
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebase", uiConfig);
  }
  render() {
    return (
      <div id="firebase">
        {/* <input type="text" name="phone" id="phone" />
        <input type="hidden" name="otp" id="otp" placeholder="enter otp" />
        <label></label>
        <div id="recaptcha"></div>
        <Button onClick={this.handleOtp}>Send Otp</Button> */}
      </div>
    );
  }
}
export default MobileComponent;
