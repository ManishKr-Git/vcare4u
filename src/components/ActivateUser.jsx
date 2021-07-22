import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import email from "./../images/email.png";
class ActivateUser extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Vcare4u | Activation</title>
        </Helmet>
        <div
          className="container"
          style={{ textAlign: "center", marginTop: "50px  " }}
        >
          <Card style={{ width: "400px", margin: "0 auto" }}>
            <CardImg top width="200px" height="200px" src={email} alt="Image" />
            <CardBody>
              <CardTitle tag="h3">You're Almost There</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Activate Your Account
              </CardSubtitle>
              <CardText>
                Please confirm that you want to use this email adddress as{" "}
                <b>vCare4U </b>
                service account. Once done you will be able to login to your
                account.
              </CardText>
              <Button
                color="success"
                onClick={() =>
                  window.location.assign("https://mail.google.com/mail")
                }
              >
                Activate My Account
              </Button>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}
export default ActivateUser;
