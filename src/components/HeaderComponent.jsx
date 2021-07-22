import React, { Component } from "react";
import { Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import logo from ".././images/logo.png";
import Services from "../services/Services.js";
import { LOCAL_URL } from "../services/constant";
class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggenIn: false,
      isExpertLoggedIn: false,
      displaySearchResult: false,
      searchText: "",
      searchResult: [],
      allExperts: [],
      occupations: [
        { value: "Doctor", label: "Doctors Consulting" },
        { value: "Engineer", label: "Engineers Consulting" },
        { value: "Lawyer", label: "Lawyers Consulting" },
        { value: "HR", label: "HRs Consulting" },
        { value: "Others", label: "Others" },
      ],
    };

    this.hadleLogout = this.hadleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchResultClick = this.handleSearchResultClick.bind(this);
  }
  hadleLogout = () => {
    Services.logout();
    window.location.href = "/login";
  };
  handleChange(e) {
    if (e.target.value.length > 0) {
      this.setState({ searchText: e.target.value });
      const result = [];
      this.setState({ displaySearchResult: true });
      this.state.allExperts.filter((item) => {
        if (
          item.name.toLowerCase().includes(this.state.searchText.toLowerCase())
        ) {
          console.log(item.name);
          result.push(item);
        }
      });
      this.setState({ searchResult: result });
    } else {
      this.setState({ displaySearchResult: false });
    }
  }
  componentDidMount() {
    Services.getAllExperts().then(
      (response) => {
        this.setState({ allExperts: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  handleSearchResultClick(e) {
    console.log(e);
  }
  render() {
    return (
      <>
        <Navbar expand="md" bg="dark" variant="dark" className="p-1">
          <Navbar.Brand>
            <Link to="/home">
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
              {!Services.isExpertLoggedIn() && (
                <Form inline style={{ marginRight: "50px", marginLeft: "0px" }}>
                  <Form.Control
                    style={{
                      height: "30px",
                      width: "360px",
                      borderRadius: "15px",
                    }}
                    type="text"
                    id="searchBar"
                    placeholder="Search an Expert by Name..."
                    className="mr-sm-2"
                    onChange={this.handleChange}
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
              )}
              <ul className="navbar-nav justify-content-end">
                {!Services.isExpertLoggedIn() && (
                  <Link className="nav-link" to="/expert-page">
                    All Experts
                  </Link>
                )}
                {!Services.isExpertLoggedIn() && (
                  <NavDropdown title="Our Services" id="basic-nav-dropdown">
                    {this.state.occupations.map((menu) => (
                      <>
                        <NavDropdown.Item key={menu.label}>
                          <Link
                            // to={`/selectedCategory/${menu.value}`}
                            style={{
                              textDecoration: "none",
                              color: "#072937",
                            }}
                            onClick={() => {
                              window.location.assign(
                                LOCAL_URL + "/selectedCategory/" + menu.value
                              );
                            }}
                          >
                            {menu.label}
                          </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                      </>
                    ))}
                  </NavDropdown>
                )}
                <Link className="nav-link" to="/about">
                  About
                </Link>
                <Link className="nav-link" to="/contactus">
                  Contact Us
                </Link>
                {!(
                  Services.isExpertLoggedIn() || Services.isUserLoggedIn()
                ) && (
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
                    {/* <NavDropdown.Item>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      View Profile
                    </Link>
                  </NavDropdown.Item> */}
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
        <Navbar className="searchResultNavbar">
          <Navbar.Collapse className="justify-content-end">
            {this.state.displaySearchResult && (
              <div className="searchResult">
                {this.state.searchResult.length > 0 ? (
                  this.state.searchResult.map((expert) => (
                    <div>
                      <Link
                        className="nav-link"
                        to={
                          "/expert-page/ksuz2mc1d5xaf8h7lcdp4pzd5hyj05fkpl6r6031elpgn6tgpvsgs8w3b34cb26n/" +
                          expert.id
                        }
                      >
                        {expert.name}
                      </Link>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div>
                    <h5>No Result Found!!!</h5>
                  </div>
                )}
              </div>
            )}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default HeaderComponent;
