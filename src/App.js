import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navbar';
import { Container, Jumbotron } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Container>
      <Navigation />
        <Jumbotron>
          <h1 className="display-4 text-center">Hello, world!</h1>
        </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default App;
