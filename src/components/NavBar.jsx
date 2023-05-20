import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/bb-logo.png";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavBar = () => {
  const history = useHistory();

  const handleSelect = (selectedKey) => history.push(selectedKey);

  return (
    <div style={{ width: "100%" }}>
      <Navbar bg="light" expand="lg" onSelect={handleSelect}>
        <Navbar.Brand onClick={() => history.push("/")}>
          <img
            src={logo}
            alt="BrainBounce-logo"
            style={{ height: "50px", marginLeft: "10px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ marginRight: "10px" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link eventKey="/">Home</Nav.Link>
            <Nav.Link eventKey="/courses">Courses</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item eventKey="/add-course">
                Add New Course
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="#another-action">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="#something-else-here">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
    </div>
  );
};

export default NavBar;
