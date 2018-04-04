import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { firebase } from '../firebase';

class Logout extends Component {
	constructor(props) {
		super(props);
		// localStorage.setItem('user', null);
		firebase.auth.signOut().then(function(resp) {
			  console.log('Sign-out successful.');
				localStorage.setItem('user', null);
			}).catch(function(error) {
			  console.log(error);
			});
		}

	render() {
		const { from } = { from: { pathname: '/login' } }
		return (
			<Redirect to={from} />
		)
	}
}

export default Logout;
