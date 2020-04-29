import React from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <h1 className="d-none d-sm-block">DimpleMe</h1>
              <h2 className="d-block d-sm-none">DimpleMe</h2>
            </NavbarBrand>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
