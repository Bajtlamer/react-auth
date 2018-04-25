import React, { Component } from 'react';
import {
  Redirect
} from 'react-router-dom'

import {
	Card, 
	Button, 
	CardHeader, 
	CardBody,
	Form, 
	Container, 
	FormGroup, 
	Input, 
	Label, 
	Row, 
	Alert
} from "reactstrap";
import "./Login.css";
import { auth, db } from '../firebase';


class Login extends Component {
	constructor(props) {
		super(props);
		this.url = 'http://localhost:3001/api/login';

		this.errors = [
			{404 : 'Not Found'}
		];

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
		if (username && password) {
			
			this.login(username, password);
		} else {
			this.setState({error: 'Uživatelské jméno  a heslo nesmí být prázdné!'});
		}
	}

	login = (username, password) => {
		this.setState({ logging: true });
		
		auth.doSignInWithEmailAndPassword(username, password)
      	.then((user) => {
				let _usr = user.providerData[0];
				let _uid = user.uid;
	        db.updateUser(_usr, _uid).then(err => {
				if (err) {
					console.log(err);
				}else{
					console.log('User has successfuly updated...');
				}
			});

			localStorage.setItem('user', JSON.stringify(user));
			
	        this.setState({
	        	redirectToReferrer: true, 
	        	logging: false 
	        });
      	}).catch(error => {
      		this.setState({ 
				error: 'Chybné uživatelské jméno, nebo heslo.', 
				logging: false
	      	});
		})
      }


	handleErrors(err){
		let code = 0
		let message = 'Undefined ';

		if(typeof err.response === 'undefined'){
			code = -1;
		}else{
			code = err.response.status;
		}

		switch (code) {
			case 404:
				message = '404 Not Found.'
				break;
			case 401:
				message = 'Login failed.'
				break;
			default:
				message += err.message;
				break;
		}

		return message;
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
				{/* <Navigation /> */}
				<Container>
					<Row>
						<div className="col-md-4 col-sm-12 offset-sm-4">
							<Card>
								<CardHeader className="flixbus-bg">Přihlášení do systému FlixBUS</CardHeader>
								<CardBody>
								{this.state.error && <Alert color="danger">{this.state.error}</Alert>}
									<Form onSubmit={this.handleSubmit}>
										<FormGroup>
											<Label for="exampleEmail">Email</Label>
											<Input type="email" name="username" id="loginEmail" placeholder="Email" onChange={this.handleChange} />
											{this.state.submitted && !this.state.username &&
												<div className="help-block">Vyžadován email</div>
											}
										</FormGroup>
										<FormGroup>
											<Label for="password">Heslo</Label>
											<Input type="password" name="password" id="loginPassword" placeholder="Password" onChange={this.handleChange} />
											{this.state.submitted && !this.state.password &&
												<div className="help-block">Vyžadováno heslo</div>
											}
										</FormGroup>
										<Button size="sm" color="primary" className="btnMineWidth" onClick={() => this.handleSubmit(this)}>Přihlásit</Button>
										
										{this.state.logging &&
											<img alt="Loader..." className="loginLoader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
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
