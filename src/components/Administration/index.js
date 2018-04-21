import React, { Component } from 'react';
import { Container } from "reactstrap";
import { checkAuth } from '../../services/fireAuth';
import Navigation from '../Navbar';
import AdminTabs from './Tabs';

class Administration extends Component {

	render() {
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