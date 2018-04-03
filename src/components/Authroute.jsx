import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { checkAuth } from '../services/fireAuth';
import { firebase } from '../firebase';

// export const AuthRoute = ({ component: Component, ...rest }) => {
	// componentDidMount() {
 //      firebase.auth.onAuthStateChanged(authUser => {
 //      	//let logged = !!authUser = false;
 //        this.setState({logged: true})
 //        localStorage.setItem('user', JSON.stringify(authUser));
 //      });
 //    }

export const AuthRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={props => (
        checkAuth() ? (
            <Component {...props} isLogged={true} />
        ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
    )} />
}