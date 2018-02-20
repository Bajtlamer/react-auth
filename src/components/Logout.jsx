import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
	constructor(props) {
		super(props);
		localStorage.setItem('token', null);
	}

	render() {
		const { from } = { from: { pathname: '/login' } }
		return (
			<Redirect to={from} />
		)
	}
}

export default Logout;
