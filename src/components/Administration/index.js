import React, { Component } from 'react';
import {
	Card, CardHeader, CardBody, Container, Row, CardText
} from "reactstrap";
import { checkAuth } from '../../services/fireAuth';
import Navigation from '../Navbar';
import AdminTabs from './Tabs';

class Administration extends Component {

	render() {
		const user = JSON.parse(localStorage.getItem('user'));

		return (
				<Navigation isLogged={checkAuth()} >
					<Container>
					<AdminTabs />
					</Container>
				</Navigation>
		)
	}
}

export default Administration;