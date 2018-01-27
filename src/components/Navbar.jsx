import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import { checkAuth } from '../services/AuthService';

const Logination = props => {
  const { isLogged } = props;
  // let isAuthenticated = checkAuth();
  if(isLogged){
    return <NavLink href="/logout/">Logout</NavLink>
  }else{
    return <NavLink href="/login/">Login</NavLink>
  }
}

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const isLogged = checkAuth();
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/account/">Account</NavLink>
              </NavItem>
              <NavItem>
                <Logination isLogged={isLogged}/>
                {/* <NavLink href="/login/">Login</NavLink> */}
              </NavItem>
              <UncontrolledDropdown nav >
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}