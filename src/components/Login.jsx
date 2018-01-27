import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom'

import {
	Card, Button, CardHeader, CardFooter, CardBody,
	CardTitle, CardText, Form, FormText, Container, FormGroup, Input, Label, Row, Alert
} from "reactstrap";
import "./Login.css";
import Navigation from './Navbar';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			submitted: false,
			logging: false,
			isAuthenticated: false,
			redirectToReferrer: false,
			error: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		// e.preventDefault();

		this.setState({ submitted: true });
		const { username, password } = this.state;
		const { dispatch } = this.props;
		if (username && password) {
			console.log('prihlasuji');
			this.login(username, password);
			// console.log(x);
		} else {
			// alert('Neco se posralo');
		}
	}

	login = (username, password) => {
		// localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYWp0QHZvbG55LmN6IiwiaWF0IjoxNTE3MDAxNzM3LCJleHAiOjE1MTcwMDUzMzd9.ju-9zlgg1eJfJ46ZHUaGoitOW6RFgNSIQOwLwZ2ooxQ');
		this.setState({ logging: true });
		// console.log('login');
		// var logged = false;

		// this.setState({ redirectToReferrer: true })
		axios.post('http://localhost:3001/api/login', {
			email: username,
			password: password
		},{
			'Content-Type': 'application/json',
			'content-type': 'application/x-www-form-urlencoded'
		}).then(response => {
			if(typeof response.data.token !== 'undefined'){
				console.log(response);
				localStorage.setItem('token',response.data.token);
				this.isAuthenticated = true;
				this.setState({ redirectToReferrer: true });
				console.log(this.isAuthenticated);
			}
		}).catch(err =>{
			this.isAuthenticated = false;
			// this.setState({ redirectToReferrer: false });
			this.setState({ 
				error: 'Username or password are wrong', 
				logging: false
			});
		})
		// console.log(this.isAuthenticated);
			// this.setState({ redirectToReferrer: this.isAuthenticated })

	}


	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
		return (
			<div>
				<Navigation />
				<Container>
					<Row>
						<div className="col-4 offset-4">
							<Card>
								<CardHeader>Login page</CardHeader>
								<CardBody>
								{this.state.error && <Alert color="danger">{this.state.error}</Alert>}
									<Form onSubmit={this.handleSubmit}>
										<FormGroup>
											<Label for="exampleEmail">Email</Label>
											<Input type="email" name="username" id="loginEmail" placeholder="Email" onChange={this.handleChange} />
											{this.state.submitted && !this.state.username &&
												<div className="help-block">Username required</div>
											}
										</FormGroup>
										<FormGroup>
											<Label for="password">Password</Label>
											<Input type="password" name="password" id="loginPassword" placeholder="Password" onChange={this.handleChange} />
											{this.state.submitted && !this.state.password &&
												<div className="help-block">Password required</div>
											}
										</FormGroup>
										<Button color="primary" className="btnMineWidth" onClick={() => this.handleSubmit(this)}>Login</Button>
										
										{this.state.logging &&
											<img className="loginLoader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
										}
									</Form>
								</CardBody>
							</Card>
						</div>
					</Row>
				</Container>
			</div>
		);
	}
}


export default Login;
