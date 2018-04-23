import React from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { firebase, db } from '../firebase';
import { Redirect } from 'react-router';
import Loader from 'react-loader';
import './navbar.css'


const Logination = (props) => {
  const { isLogged, doLogout, currentUser, isAdmin } = props;

  if (isLogged === true) {
    return (
      <UncontrolledDropdown nav >
        {currentUser ?
          (<DropdownToggle nav caret>
            {currentUser.email}
          </DropdownToggle>) : (<div className="spinner"><Loader scale={0.40} /></div>)}
        <DropdownMenu >
          <a className="dropdown-item" href="/account/">Uživatelský účet</a>
          {isAdmin ?<a className="dropdown-item" href="/admin" >Administrace</a>:''}
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" onClick={doLogout}>Odhlásit</a>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  } else {
    return <NavLink href="/login/">Přihlásit</NavLink>
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
      user: null,
      isAdmin: false
    };
  }

  componentDidMount() {
    const userid = this.getCurrentUserFromStore().uid;
    this.getUserIsAdministrator(userid);
  }

  getCurrentUserFromStore = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  logout = () => {
    let that = this;
    firebase.auth.signOut().then(function (resp) {
      localStorage.setItem('user', null);
      that.setState({
        isLogged: false,
        user: null
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  getUserIsAdministrator = (id) => {
      db.getUserIsAdmin(id).then(snap => {
        let isAdmin = snap.val().isAdmin;
        this.setState({isAdmin})
      }).catch(err => {
        console.log(err);
      });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { children } = this.props;
    const user = this.getCurrentUserFromStore();
    // const isAdmin = this.getUserIsAdministrator(user.uid);
    // console.log(this.state.isAdmin);

    return (
      this.state.isLogged ? (
        <div>
          <Navbar color="light" light expand="sm dnavbar">
            <Container>
              <NavbarBrand href="/">Panel řidiče</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <Logination isLogged={this.state.isLogged} doLogout={this.logout} isAdmin={this.state.isAdmin} currentUser={user} />
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          {children}
        </div>
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    );
  }
}

export default Navigation;