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
  DropdownItem
} from 'reactstrap';
import { checkAuth } from '../services/fireAuth';
import { firebase } from '../firebase';
import { Redirect } from 'react-router';

const Logination = (props) => {
  const { isLogged, doLogout } = props;

  // let isLogged = checkAuth();

  if (isLogged === true) {
    return (
      <UncontrolledDropdown nav >
        <DropdownToggle nav caret>
          Options
    </DropdownToggle>
        <DropdownMenu >
          <DropdownItem>
            <NavLink href="/account/">Account</NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink href="/register/">Register</NavLink>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
          <NavLink onClick={doLogout}>Logout</NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  } else {
    return <NavLink href="/login/">Login</NavLink>
  }
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isOpen: false,
      isLogged: this.props.isLogged,
    };
  }

  logout = () => {
    let that = this;
    firebase.auth.signOut().then(function(resp) {
      // console.log('Sign-out successful.');
      localStorage.setItem('user', null);
      that.setState({
        isLogged: false
      });
    }).catch(function(error) {
      console.log(error);
    });
  }
  

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { children } = this.props;

    return (
      this.state.isLogged ? (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Logination isLogged={this.state.isLogged} doLogout={this.logout}/>
            </Nav>
          </Collapse>
        </Navbar>
        {children}
      </div>
      ):(
        <Redirect to={{ pathname: '/login' }} />
      )
    );
  }
}

export default Navigation;