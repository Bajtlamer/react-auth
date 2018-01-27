import React, { Component } from 'react';
import { 
	Card, CardHeader, CardFooter, CardBody,	CardTitle, Container, FormGroup, Row, CardText 
} from "reactstrap";
import Navigation from './Navbar';

class Account extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<Container>
					<Row>
						<div className="col-4 offset-4">
							<Card>
								<CardHeader>Account</CardHeader>
								<CardBody>
									<CardText>Some Account detail</CardText>
								</CardBody>
							</Card>
						</div>
					</Row>
				</Container>
			</div>
		)
	}
}

export default Account;