import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navbar';
import { Jumbotron } from 'reactstrap';
import { checkAuth } from './services/fireAuth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation isLogged={checkAuth()} >
        <Jumbotron>
          <h1 className="display-4 text-center">Hello, world!</h1>
        </Jumbotron>
        </Navigation>
      </div>
    );
  }
}

export default App;
