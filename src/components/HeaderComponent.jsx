import React, { Component } from "react";
import { Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import logo from ".././images/logo.png";
import Services from "../services/Services.js";
class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggenIn: false,
      isExpertLoggedIn: false,
    };

    this.hadleLogout = this.hadleLogout.bind(this);
  }
  hadleLogout = () => {
    Services.logout();
    window.location.href = "/login";
  };
  render() {
    return (
      <Navbar expand="md" bg="dark" variant="dark" className="p-1">
        <Navbar.Brand>
          <Link to={Services.isExpertLoggedIn ? "#" : "/home"}>
            <img
              src={logo}
              alt="logo"
              height="40px"
              style={{ margin: "0", padding: "0" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-na" className="justify-content-end">
          <Nav className=" justify-content-end">
            <Form inline style={{ marginRight: "150px" }}>
              <Form.Control
                style={{ height: "30px", width: "360px", borderRadius: "15px" }}
                type="text"
                placeholder="Search Here"
                className="mr-sm-2"
              />
              <Button
                color="success"
                style={{
                  height: "30px",
                  padding: "0 10px 0 10px",
                  borderRadius: "15px",
                }}
              >
                Search
              </Button>
            </Form>
            <ul className="navbar-nav justify-content-end">
              {!Services.isExpertLoggedIn() && (
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              )}
              <Link className="nav-link" to="/about">
                About
              </Link>
              <Link className="nav-link" to="/contactus">
                Contact Us
              </Link>
              {!(Services.isExpertLoggedIn() || Services.isUserLoggedIn()) && (
                <Link className="nav-link" to="/login">
                  Login/Signup
                </Link>
              )}
              {(Services.isExpertLoggedIn() || Services.isUserLoggedIn()) && (
                <NavDropdown
                  alignRight
                  title="My Account"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      View Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      to="/bookings"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Bookings
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.hadleLogout}>
                    <Link
                      to="/#"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderComponent;
