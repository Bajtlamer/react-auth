import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navbar';
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
  DropdownItem,
  Jumbotron } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navigation />
        <Jumbotron>
          <h1 className="display-4 text-center">Hello, world!</h1>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
