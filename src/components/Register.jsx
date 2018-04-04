import React, { Component } from 'react';
import { 
	Card, CardHeader, CardBody,	Container, Row, CardText 
} from "reactstrap";
import Navigation from './Navbar';
import { checkAuth } from '../services/fireAuth';

class Register extends Component {
	// state = {}
	render() {
		const isLogged = checkAuth();
		// console.log(this.props);
		return (
			<div>
				{/* <Navigation isLogged={isLogged}> */}
				<Container>
					<Row>
						<div className="col-4 offset-4">
							<Card>
								<CardHeader>Registration</CardHeader>
								<CardBody>
									<CardText>some Ipsum dolor</CardText>
								</CardBody>
							</Card>
						</div>
					</Row>
				</Container>
				{/* </Navigation> */}
			</div>
		)
	}
}

export default Register;