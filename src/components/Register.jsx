import React, { Component } from 'react';
import { 
	Card, CardHeader, CardBody,	Container, Row, CardText 
} from "reactstrap";

class Register extends Component {
	render() {
		return (
			<div>
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
			</div>
		)
	}
}

export default Register;