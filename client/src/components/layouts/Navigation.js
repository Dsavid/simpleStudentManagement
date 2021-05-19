import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";
import AuthContext from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";
function Navigation() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const logoutUser = () => {
    authContext.logoutUser();
  };
  return (
    <Navbar color="light" light expand="md">
      <Container>
        <Link to="/" className="text-decoration-none">
          Student Management
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {user && user.name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={logoutUser}>LogOut</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
