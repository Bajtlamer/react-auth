import React from 'react';
import { Jumbotron, Container } from "reactstrap";
import Navigation from './Navbar';

const NotFound = () =>
    <div>
        <Navigation />
        <Container>
            <Jumbotron>
                <div className="col-4 offset-4">
                    <h3>404 page not found</h3>
                    <p>We are sorry but the page you are looking for does not exist.</p>
                </div>
            </Jumbotron>
        </Container>
    </div>

export default NotFound;