import React, { Component } from 'react';
import {
	Card, CardHeader, CardBody, Container, Row, CardText
} from "reactstrap";
import Navigation from './Navbar';

class Account extends Component {

	render() {
		const { isLogged } = this.props;
		const user = JSON.parse(localStorage.getItem('user'));

		return (
			<div>
				<Navigation isLogged={isLogged}/>
				<Container>
					<Row>
						<div className="col-4 offset-4">
							<Card>
								<CardHeader>Account</CardHeader>
								<CardBody>
									<CardText>Email: {user.email}</CardText>
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